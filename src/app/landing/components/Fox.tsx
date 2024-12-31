/**
 * Fox.tsx
 * Interactive fox mascot component
 * Features:
 * - Subtle glow when clickable
 * - Wake-up spin animation
 * - Smooth transitions
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TIMING } from '../constants/messages';

interface FoxProps {
  onWake: () => void;
  isIntroComplete: boolean;
  isAwake: boolean;
}

export default function Fox({ onWake, isIntroComplete, isAwake }: FoxProps) {
  const handleClick = () => {
    if (isIntroComplete && !isAwake) {
      onWake();
    }
  };

  return (
    <motion.div
      className="cursor-pointer select-none text-6xl"
      animate={isIntroComplete && !isAwake ? { scale: 1.05 } : { scale: 1 }}
      whileHover={isIntroComplete && !isAwake ? { scale: 1.1 } : {}}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        style={{ filter: isIntroComplete && !isAwake ? 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.3))' : 'none' }}
        animate={{ 
          filter: isIntroComplete && !isAwake ? [
            'drop-shadow(0 0 5px rgba(0, 255, 255, 0.1))',
            'drop-shadow(0 0 8px rgba(0, 255, 255, 0.3))',
            'drop-shadow(0 0 5px rgba(0, 255, 255, 0.1))'
          ] : 'none'
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <motion.div
          animate={isAwake ? { 
            rotate: [0, 360],
            scale: [1, 1.2, 0.9, 1.1, 1],
            y: [0, -10, 20, -5, 0]
          } : {}}
          transition={{
            duration: TIMING.WAKE_ANIMATION / 1000,
            times: [0, 0.4, 0.6, 0.8, 1],
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          🦊
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 