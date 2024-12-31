/**
 * SafetyButton.tsx
 * Sleek, mysterious button with cybersecurity vibes
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface SafetyButtonProps {
  show: boolean;
}

export default function SafetyButton({ show }: SafetyButtonProps) {
  const router = useRouter();
  
  if (!show) return null;

  return (
    <motion.button
      onClick={() => router.push('/dashboard')}
      className="group relative px-12 py-4 rounded-md overflow-hidden
        min-w-[300px] h-[60px] flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        border border-white/10
        hover:bg-black/60 hover:border-white/20
        shadow-[0_0_20px_rgba(0,0,0,0.5)]
        transition-all duration-500"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.23, 1, 0.32, 1],
          delay: 0.2
        }
      }}
      exit={{ 
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 0.3
        }
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Scan line effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100
        bg-[linear-gradient(transparent_0%,transparent_40%,rgba(255,255,255,0.1)_50%,transparent_60%,transparent_100%)]
        animate-scan transition-opacity duration-300" />

      {/* Button text */}
      <span className="relative dos-text text-white/90 text-lg tracking-[0.2em] uppercase">
        Enter Safety Zone
      </span>

      {/* Highlight line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] 
        bg-white/5 group-hover:bg-white/20
        transition-colors duration-500" />
    </motion.button>
  );
} 