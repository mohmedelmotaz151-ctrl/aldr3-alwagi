import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy } from 'lucide-react';
import { BOARD_SIZE, PLAYER_COLORS, COMMON_PATH, HOME_STRETCH, BASE_POSITIONS, START_INDEX } from '../constants/board';
import { Player, Token, PlayerColor } from '../types/game';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LudoBoardProps {
  players: Record<string, Player>;
  currentPlayerId: string;
  onTokenClick: (tokenId: number) => void;
  canMove: boolean;
}

const LudoBoard: React.FC<LudoBoardProps> = ({ players, currentPlayerId, onTokenClick, canMove }) => {
  const renderCell = (r: number, c: number) => {
    // Determine cell type (Base, Path, Home)
    const isRedBase = r < 6 && c < 6;
    const isGreenBase = r < 6 && c > 8;
    const isYellowBase = r > 8 && c > 8;
    const isBlueBase = r > 8 && c < 6;
    
    const isHome = r >= 6 && r <= 8 && c >= 6 && c <= 8;
    
    let cellColor = '';
    let icon = null;

    if (isRedBase) cellColor = 'bg-red-500/10 hover:bg-red-500/20 transition-colors';
    if (isGreenBase) cellColor = 'bg-green-500/10 hover:bg-green-500/20 transition-colors';
    if (isYellowBase) cellColor = 'bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors';
    if (isBlueBase) cellColor = 'bg-blue-500/10 hover:bg-blue-500/20 transition-colors';

    // Highlight specific cells (Starts, Straights)
    const isRedStart = r === 6 && c === 1;
    const isGreenStart = r === 1 && c === 8;
    const isYellowStart = r === 8 && c === 13;
    const isBlueStart = r === 13 && c === 6;

    if (isRedStart) cellColor = 'bg-red-500 shadow-inner ring-1 ring-white/20';
    if (isGreenStart) cellColor = 'bg-green-500 shadow-inner ring-1 ring-white/20';
    if (isYellowStart) cellColor = 'bg-yellow-500 shadow-inner ring-1 ring-white/20';
    if (isBlueStart) cellColor = 'bg-blue-500 shadow-inner ring-1 ring-white/20';

    // Home Stretches
    const redHomeStretch = r === 7 && c >= 1 && c <= 5;
    const greenHomeStretch = c === 7 && r >= 1 && r <= 5;
    const yellowHomeStretch = r === 7 && c >= 9 && c <= 13;
    const blueHomeStretch = c === 7 && r >= 9 && r <= 13;

    if (redHomeStretch) cellColor = 'bg-red-500/80';
    if (greenHomeStretch) cellColor = 'bg-green-500/80';
    if (yellowHomeStretch) cellColor = 'bg-yellow-500/80';
    if (blueHomeStretch) cellColor = 'bg-blue-500/80';

    return (
      <div 
        key={`${r}-${c}`}
        id={`cell-${r}-${c}`}
        className={cn(
          "border-[0.5px] border-slate-700/30 relative aspect-square",
          cellColor || (isHome ? "bg-slate-800" : "bg-white"),
          isHome && "border-none"
        )}
      >
        {isHome && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full relative rotate-45 scale-150">
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-600 shadow-lg" />
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-600 shadow-lg" />
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-600 shadow-lg" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-600 shadow-lg" />
                </div>
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] pointer-events-none flex items-center justify-center">
                   <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center -rotate-12">
                      <Trophy className="w-4 h-4 text-white shadow-xl" />
                   </div>
                </div>
            </div>
        )}
      </div>
    );
  };

  const getCoordinates = (player: Player, token: Token): { r: number, c: number } => {
    if (token.status === 'base') {
      const baseCoords = BASE_POSITIONS[player.color][token.id];
      return { r: baseCoords[0], c: baseCoords[1] };
    }
    if (token.status === 'path') {
      const coords = COMMON_PATH[token.pos];
      return { r: coords[0], c: coords[1] };
    }
    if (token.status === 'home-stretch') {
      const coords = HOME_STRETCH[player.color][token.pos];
      return { r: coords[0], c: coords[1] };
    }
    return { r: 7, c: 7 }; // Home
  };

  return (
    <div className="max-w-[500px] w-full mx-auto p-1.5 bg-slate-900 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800 relative z-10">
      <div className="grid grid-cols-15 relative bg-white rounded-sm overflow-hidden border-[6px] border-slate-800">
        {Array.from({ length: BOARD_SIZE }).map((_, r) => 
          Array.from({ length: BOARD_SIZE }).map((_, c) => renderCell(r, c))
        )}

        {/* Tokens */}
        {(Object.values(players) as Player[]).map(player => 
          player.tokens.map(token => {
            const { r, c } = getCoordinates(player, token);
            const isSelectable = player.id === currentPlayerId && canMove;
            
            return (
              <motion.div
                key={`${player.id}-${token.id}`}
                id={`token-${player.id}-${token.id}`}
                layout
                initial={false}
                animate={{
                  top: `${(r / BOARD_SIZE) * 100}%`,
                  left: `${(c / BOARD_SIZE) * 100}%`,
                  scale: token.status === 'home' ? 0 : 1,
                  opacity: token.status === 'home' ? 0 : 1,
                  zIndex: isSelectable ? 30 : 10
                }}
                className={cn(
                  "absolute w-[6.66%] aspect-square p-[1.5px] cursor-pointer transition-transform duration-300",
                  isSelectable && "z-30"
                )}
                onClick={() => isSelectable && onTokenClick(token.id)}
              >
                <div 
                  className={cn(
                    "w-full h-full rounded-lg border-2 border-white/40 shadow-xl flex items-center justify-center transition-all",
                    isSelectable ? "ring-4 ring-indigo-500/50 scale-110 shadow-indigo-500/40" : "scale-90"
                  )}
                  style={{ 
                    backgroundColor: PLAYER_COLORS[player.color],
                    boxShadow: isSelectable ? `0 10px 15px -3px ${PLAYER_COLORS[player.color]}60` : undefined
                  }}
                >
                  <div className="w-1/2 h-1/2 rounded-full bg-white/40 shadow-inner" />
                  {isSelectable && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
                      className="absolute -inset-2 border-2 border-white/30 rounded-xl pointer-events-none"
                    />
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LudoBoard;
