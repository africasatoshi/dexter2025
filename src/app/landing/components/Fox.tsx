/**
 * Fox.tsx
 * Enhanced Dexter mascot with soul-piercing eyes
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TIMING } from '../constants/messages';

interface FoxProps {
  onWake: () => void;
  isIntroComplete: boolean;
  isAwake: boolean;
}

export default function Fox({ onWake, isIntroComplete, isAwake }: FoxProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleWakeClick = () => {
    if (isIntroComplete && !isAwake) {
      onWake();
    }
  };

  return (
    <div className="relative group">
      {/* Main fox container */}
      <motion.div
        className="relative cursor-pointer text-8xl"
        animate={isAwake ? {
          scale: [1, 1.2, 0.9, 1.1, 1],
          rotate: [0, 360],
          transition: {
            duration: TIMING.WAKE_ANIMATION / 1000,
            times: [0, 0.4, 0.6, 0.8, 1],
            type: "spring",
            stiffness: 260,
            damping: 20
          }
        } : {}}
        whileHover={isIntroComplete && !isAwake ? { scale: 1.1 } : {}}
        onClick={handleWakeClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Fox emoji with enhanced styling */}
        <div className={`relative transition-transform duration-300
          ${isAwake ? 'group-hover:scale-105' : ''}
          ${isIntroComplete && !isAwake ? 'animate-gentle-bounce' : ''}`}
        >
          {/* Outer eye glow layer */}
          <div className={`absolute top-[42%] left-[28%] w-4 h-4 rounded-full
            transition-all duration-500 ${isAwake ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            style={{
              background: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,255,255,0) 70%)',
              filter: 'blur(4px)',
              transform: 'translate(-25%, -25%)'
            }}
          />
          <div className={`absolute top-[42%] right-[28%] w-4 h-4 rounded-full
            transition-all duration-500 ${isAwake ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            style={{
              background: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,255,255,0) 70%)',
              filter: 'blur(4px)',
              transform: 'translate(25%, -25%)'
            }}
          />

          {/* Middle eye glow layer */}
          <div className={`absolute top-[42%] left-[28%] w-3 h-3 rounded-full
            transition-all duration-500 ${isAwake ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            style={{
              background: 'radial-gradient(circle, rgba(0,255,255,0.8) 0%, rgba(0,255,255,0) 70%)',
              filter: 'blur(2px) brightness(1.5)',
              boxShadow: '0 0 15px rgba(0,255,255,0.5)',
              transform: 'translate(-25%, -25%)'
            }}
          />
          <div className={`absolute top-[42%] right-[28%] w-3 h-3 rounded-full
            transition-all duration-500 ${isAwake ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            style={{
              background: 'radial-gradient(circle, rgba(0,255,255,0.8) 0%, rgba(0,255,255,0) 70%)',
              filter: 'blur(2px) brightness(1.5)',
              boxShadow: '0 0 15px rgba(0,255,255,0.5)',
              transform: 'translate(25%, -25%)'
            }}
          />

          {/* Core eye glow - intense center */}
          <div className={`absolute top-[42%] left-[28%] w-2 h-2 rounded-full
            transition-all duration-500 ${isAwake ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            style={{
              background: 'radial-gradient(circle, #FFFFFF 0%, #00FFFF 40%, rgba(0,255,255,0) 70%)',
              filter: 'brightness(2)',
              boxShadow: `
                0 0 10px #00FFFF,
                0 0 20px rgba(0,255,255,0.8),
                0 0 30px rgba(0,255,255,0.4),
                inset 0 0 15px rgba(255,255,255,0.8)
              `,
              transform: 'translate(-25%, -25%)'
            }}
          />
          <div className={`absolute top-[42%] right-[28%] w-2 h-2 rounded-full
            transition-all duration-500 ${isAwake ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            style={{
              background: 'radial-gradient(circle, #FFFFFF 0%, #00FFFF 40%, rgba(0,255,255,0) 70%)',
              filter: 'brightness(2)',
              boxShadow: `
                0 0 10px #00FFFF,
                0 0 20px rgba(0,255,255,0.8),
                0 0 30px rgba(0,255,255,0.4),
                inset 0 0 15px rgba(255,255,255,0.8)
              `,
              transform: 'translate(25%, -25%)'
            }}
          />

          {/* Base emoji */}
          <span className="relative z-10">
            🦊
          </span>
        </div>
      </motion.div>
    </div>
  );
} 