import { PlayerColor } from '../types/game';

export const BOARD_SIZE = 15;

// Path coordinates (x, y) starting from index 0 (top of the cross on the left arm)
// This is typical Ludo path logic
export const COMMON_PATH: [number, number][] = [
  [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], // Left arm top row
  [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], // Top arm left col
  [0, 7], [0, 8], // Top arm top edge
  [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], // Top arm right col
  [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], // Right arm top row
  [7, 14], [8, 14], // Right arm right edge
  [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], // Right arm bottom row
  [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], // Bottom arm right col
  [14, 7], [14, 6], // Bottom arm bottom edge
  [13, 6], [12, 6], [11, 6], [10, 6], [9, 6], // Bottom arm left col
  [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], // Left arm bottom row
  [7, 0] // Left arm left edge (total 52)
];

export const HOME_STRETCH: Record<PlayerColor, [number, number][]> = {
  red: [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5]], // Left arm middle row
  green: [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7]], // Top arm middle col
  yellow: [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9]], // Right arm middle row
  blue: [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7]] // Bottom arm middle col
};

export const START_INDEX: Record<PlayerColor, number> = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39
};

export const BASE_POSITIONS: Record<PlayerColor, [number, number][]> = {
  red: [[1, 1], [1, 4], [4, 1], [4, 4]],
  green: [[1, 10], [1, 13], [4, 10], [4, 13]],
  yellow: [[10, 10], [10, 13], [13, 10], [13, 13]],
  blue: [[10, 1], [10, 4], [13, 1], [13, 4]]
};

export const SAFE_ZONES = [0, 8, 13, 21, 26, 34, 39, 47];

export const PLAYER_COLORS: Record<PlayerColor, string> = {
  red: '#ef4444',
  green: '#22c55e',
  yellow: '#eab308',
  blue: '#3b82f6'
};
