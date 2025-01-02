/**
 * Dexter Mascot component for transfer flow
 * A professional, detective-like version of Dexter that guides users through the transfer process
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { TransferStep } from '@/app/transfer/types';

interface MascotProps {
  currentStep: TransferStep;
  isScanning?: boolean;
}

export default function Mascot({ currentStep, isScanning = false }: MascotProps): React.ReactElement {
  return (
    <div className="relative">
      {/* Pulsating glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Mascot emoji */}
      <motion.div
        className="text-6xl md:text-7xl select-none relative z-10"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        🦊
      </motion.div>
    </div>
  );
} 