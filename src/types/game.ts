export type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

export interface Token {
  id: number;
  pos: number; // -1: base, 0-51: path, 52-56: home stretch, 57: home
  status: 'base' | 'path' | 'home-stretch' | 'home';
}

export interface Player {
  id: string;
  name: string;
  photoURL?: string;
  color: PlayerColor;
  isBot: boolean;
  isReady: boolean;
  tokens: Token[];
  isWinner: boolean;
}

export interface GameState {
  currentPlayerIndex: number;
  diceValue: number | null;
  diceRolled: boolean;
  consecutiveSixes: number;
  turnStartTime: number;
  lastRollTime: number;
  winners: string[]; // List of playerIds
  gameStatus: 'lobby' | 'playing' | 'finished';
  spectatorCount?: number;
}

export interface Room {
  id: string;
  hostId: string;
  maxPlayers: number;
  players: Record<string, Player>;
  spectators?: Record<string, { id: string, name: string }>;
  gameState: GameState;
  createdAt: any;
}
