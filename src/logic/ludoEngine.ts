import { Token, Player, GameState, PlayerColor } from '../types/game';
import { START_INDEX, SAFE_ZONES } from '../constants/board';

export class LudoEngine {
  static canMoveToken(token: Token, diceValue: number): boolean {
    if (token.status === 'home') return false;
    
    if (token.status === 'base') {
      return diceValue === 6;
    }
    
    // In path or home stretch
    const currentRelativePos = token.status === 'path' ? token.pos : 52 + token.pos;
    if (currentRelativePos + diceValue > 57) return false;
    
    return true;
  }

  static getNextPosition(token: Token, diceValue: number, color: PlayerColor): { pos: number; status: Token['status'] } {
    if (token.status === 'base') {
      return { pos: START_INDEX[color], status: 'path' };
    }

    if (token.status === 'path') {
      const startIdx = START_INDEX[color];
      // Calculate how many steps taken from start
      const stepsTaken = (token.pos - startIdx + 52) % 52;
      
      if (stepsTaken + diceValue < 51) {
        return { pos: (token.pos + diceValue) % 52, status: 'path' };
      } else if (stepsTaken + diceValue === 51) {
          // This logic might vary slightly depending on if 51 is the last cell before home stretch
          return { pos: (token.pos + diceValue) % 52, status: 'path' };
      } else {
        // Move to home stretch
        const homeStretchIdx = stepsTaken + diceValue - 51 - 1; // 0-indexed for home stretch
        if (homeStretchIdx > 5) return { pos: token.pos, status: 'path' }; // Should be blocked by canMoveToken anyway
        return { pos: homeStretchIdx, status: homeStretchIdx === 5 ? 'home' : 'home-stretch' };
      }
    }

    if (token.status === 'home-stretch') {
      const newPos = token.pos + diceValue;
      if (newPos < 5) return { pos: newPos, status: 'home-stretch' };
      if (newPos === 5) return { pos: 5, status: 'home' };
    }

    return { pos: token.pos, status: token.status };
  }

  static checkCollision(players: Record<string, Player>, currentPlayerId: string, targetPos: number, targetStatus: Token['status']): string | null {
    if (targetStatus !== 'path') return null;
    if (SAFE_ZONES.includes(targetPos)) return null;

    for (const [playerId, player] of Object.entries(players)) {
      if (playerId === currentPlayerId) continue;
      
      for (const token of player.tokens) {
        if (token.status === 'path' && token.pos === targetPos) {
          return playerId; // Found a victim
        }
      }
    }
    return null;
  }

  static isGameFinished(players: Record<string, Player>): boolean {
     // Game finished if only one player left or all players finished (usually determined by winner list)
     return false; // Handled by room logic
  }
}
