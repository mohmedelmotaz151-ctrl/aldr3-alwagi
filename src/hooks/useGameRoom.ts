import { useState, useEffect, useCallback } from 'react';
import { db, auth } from '../lib/firebase';
import { 
  doc, 
  onSnapshot, 
  updateDoc, 
  setDoc, 
  serverTimestamp, 
  getDoc 
} from 'firebase/firestore';
import { Room, GameState, Player, Token, PlayerColor } from '../types/game';
import { LudoEngine } from '../logic/ludoEngine';
import { BotAI } from '../logic/botPlayer';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const useGameRoom = (roomId: string | null) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRolling, setIsRolling] = useState(false);

  const joinAsSpectator = useCallback(async () => {
    if (!roomId || !auth.currentUser) return;
    const user = auth.currentUser;
    try {
      await updateDoc(doc(db, 'rooms', roomId), {
        [`spectators.${user.uid}`]: {
          id: user.uid,
          name: user.displayName || 'Spectator',
        }
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `rooms/${roomId}`);
    }
  }, [roomId]);

  const leaveSpectator = useCallback(async () => {
    if (!roomId || !auth.currentUser) return;
    const user = auth.currentUser;
    try {
        // We use dot notation to delete fields in firestore if needed, but for simplicity we can just clear it on disconnect if we had presence.
        // For now, we'll just remove ourselves from the map.
        // updateDoc with deleteField() is what's usually used.
        const { deleteField } = await import('firebase/firestore');
        await updateDoc(doc(db, 'rooms', roomId), {
            [`spectators.${user.uid}`]: deleteField()
        });
    } catch (error) {
        // Non-critical if exit fails
    }
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const unsub = onSnapshot(doc(db, 'rooms', roomId), (snap) => {
      if (snap.exists()) {
        const data = snap.data() as Room;
        setRoom(data);
        
        // Handle Bot Turn
        const currentPlayer = (Object.values(data.players) as Player[])[data.gameState.currentPlayerIndex];
        if (data.gameState.gameStatus === 'playing' && currentPlayer?.isBot && data.hostId === auth.currentUser?.uid) {
           handleBotTurn(data);
        }
      }
      setLoading(false);
    }, (error) => {
        handleFirestoreError(error, OperationType.GET, `rooms/${roomId}`);
    });

    return () => unsub();
  }, [roomId]);

  const handleBotTurn = async (currentRoom: Room) => {
    // Delay for realism
    setTimeout(async () => {
        if (!currentRoom.gameState.diceRolled) {
            await rollDice();
        } else {
            const botPlayer = (Object.values(currentRoom.players) as Player[])[currentRoom.gameState.currentPlayerIndex];
            const diceValue = currentRoom.gameState.diceValue;
            if (diceValue) {
                const moveIdx = BotAI.selectMove(botPlayer, diceValue);
                if (moveIdx !== null) {
                    await moveToken(moveIdx);
                } else {
                    await nextTurn();
                }
            }
        }
    }, 1500);
  };

  const rollDice = async () => {
    if (!room || room.gameState.diceRolled) return;
    setIsRolling(true);
    
    // Simulate delay
    await new Promise(r => setTimeout(r, 800));
    
    const value = Math.floor(Math.random() * 6) + 1;
    const newState: Partial<GameState> = {
      diceValue: value,
      diceRolled: true,
      lastRollTime: Date.now()
    };

    // Rule: Three 6s in a row
    let consecutiveSixes = room.gameState.consecutiveSixes || 0;
    if (value === 6) {
        consecutiveSixes++;
        if (consecutiveSixes === 3) {
            newState.consecutiveSixes = 0;
            newState.diceRolled = false;
            newState.diceValue = null;
            // Skip turn? Usually 3 sixes means turn ends
            await nextTurn();
            setIsRolling(false);
            return;
        }
    } else {
        consecutiveSixes = 0;
    }
    newState.consecutiveSixes = consecutiveSixes;

    try {
        await updateDoc(doc(db, 'rooms', room.id), {
           'gameState': { ...room.gameState, ...newState }
        });
    } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `rooms/${room.id}`);
    }
    setIsRolling(false);

    // Auto-skip if no moves
    const currentPlayer = (Object.values(room.players) as Player[])[room.gameState.currentPlayerIndex];
    const canMoveAny = currentPlayer.tokens.some(t => LudoEngine.canMoveToken(t, value));
    if (!canMoveAny && value !== 6) {
        setTimeout(nextTurn, 1000);
    }
  };

  const moveToken = async (tokenIdx: number) => {
    if (!room || !room.gameState.diceRolled || room.gameState.diceValue === null) return;
    
    const playerIds = Object.keys(room.players);
    const currentPlayerId = playerIds[room.gameState.currentPlayerIndex];
    const player = room.players[currentPlayerId];
    const token = player.tokens[tokenIdx];
    const diceValue = room.gameState.diceValue;

    if (!LudoEngine.canMoveToken(token, diceValue)) return;

    const next = LudoEngine.getNextPosition(token, diceValue, player.color);
    const updatedTokens = [...player.tokens];
    updatedTokens[tokenIdx] = { ...token, ...next };

    const updates: any = {
      [`players.${currentPlayerId}.tokens`]: updatedTokens
    };

    // Check collision
    const victimId = LudoEngine.checkCollision(room.players, currentPlayerId, next.pos, next.status);
    if (victimId) {
        const victim = (room.players as Record<string, Player>)[victimId];
        const victimTokens = victim.tokens.map(t => {
            if (t.status === 'path' && t.pos === next.pos) {
                return { ...t, status: 'base', pos: -1 } as Token;
            }
            return t;
        });
        updates[`players.${victimId}.tokens`] = victimTokens;
    }

    // Check if player won
    const allHome = updatedTokens.every(t => t.status === 'home');
    if (allHome && !player.isWinner) {
        updates[`players.${currentPlayerId}.isWinner`] = true;
        const newWinners = [...(room.gameState.winners || []), currentPlayerId];
        updates['gameState.winners'] = newWinners;
        if (newWinners.length === playerIds.length - 1) {
            updates['gameState.gameStatus'] = 'finished';
        }
    }

    try {
        await updateDoc(doc(db, 'rooms', room.id), updates);
    } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `rooms/${room.id}`);
    }
    
    // Rule: Roll again on 6 or kill or win
    if (diceValue === 6 || victimId || (allHome && !player.isWinner)) {
        try {
            await updateDoc(doc(db, 'rooms', room.id), {
               'gameState.diceRolled': false,
               'gameState.diceValue': null
            });
        } catch (error) {
            handleFirestoreError(error, OperationType.UPDATE, `rooms/${room.id}`);
        }
    } else {
        await nextTurn();
    }
  };

  const nextTurn = async () => {
    if (!room) return;
    const playerIds = Object.keys(room.players);
    let nextIndex = (room.gameState.currentPlayerIndex + 1) % playerIds.length;
    
    // Skip players who already won
    while (room.players[playerIds[nextIndex]].isWinner && room.gameState.winners.length < playerIds.length) {
        nextIndex = (nextIndex + 1) % playerIds.length;
    }

    try {
        await updateDoc(doc(db, 'rooms', room.id), {
           'gameState.currentPlayerIndex': nextIndex,
           'gameState.diceRolled': false,
           'gameState.diceValue': null,
           'gameState.consecutiveSixes': 0,
           'gameState.turnStartTime': Date.now()
        });
    } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `rooms/${room.id}`);
    }
  };

  return { room, loading, rollDice, moveToken, isRolling, joinAsSpectator, leaveSpectator };
};
