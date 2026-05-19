import React from 'react';
import { motion } from 'motion/react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DiceUIProps {
  value: number | null;
  onRoll: () => void;
  disabled: boolean;
  isRolling: boolean;
  color: string;
}

const DiceUI: React.FC<DiceUIProps> = ({ value, onRoll, disabled, isRolling, color }) => {
  const DiceIcon = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6][(value || 1) - 1];

  return (
    <div className="relative group">
      {/* Outer Glow */}
      <div 
        className={cn(
            "absolute -inset-4 rounded-3xl blur-2xl opacity-0 transition-opacity duration-500",
            !disabled && "group-hover:opacity-20"
        )}
        style={{ backgroundColor: color }}
      />

      <motion.button
        id="dice-button"
        whileTap={{ scale: 0.95 }}
        whileHover={{ translateY: -2 }}
        onClick={onRoll}
        disabled={disabled || isRolling}
        className={cn(
          "w-20 h-20 rounded-2xl shadow-2xl transition-all relative overflow-hidden flex items-center justify-center border-b-4",
          disabled ? "bg-slate-800 border-slate-900 grayscale cursor-not-allowed opacity-40" : "cursor-pointer active:border-b-0 active:translate-y-1"
        )}
        style={{ 
          backgroundColor: !disabled ? color : undefined,
          borderColor: !disabled ? 'rgba(0,0,0,0.2)' : undefined,
          boxShadow: !disabled ? `0 15px 30px -5px ${color}50` : undefined,
          color: 'white'
        }}
      >
        <motion.div
          animate={isRolling ? {
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1],
            y: [0, -10, 0]
          } : {}}
          transition={isRolling ? { repeat: Infinity, duration: 0.4 } : {}}
          className="relative z-10"
        >
          <DiceIcon size={40} strokeWidth={2.5} />
        </motion.div>
        
        {!disabled && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        )}

        {isRolling && (
          <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
              <div className="w-full h-full animate-pulse" />
          </div>
        )}
      </motion.button>

      {!disabled && !isRolling && (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase font-black tracking-widest text-indigo-400 group-hover:text-indigo-300 pointer-events-none"
        >
            It's your turn
        </motion.div>
      )}
    </div>
  );
};

export default DiceUI;
