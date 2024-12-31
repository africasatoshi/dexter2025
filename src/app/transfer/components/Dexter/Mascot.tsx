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
  // For now, we'll use the fox emoji with enhanced styling
  // We'll update this with a proper SVG design later
  return (
    <motion.div
      className="text-6xl md:text-7xl select-none relative"
      initial={{ scale: 0.9 }}
      animate={{ 
        scale: isScanning ? [0.9, 1.1, 0.9] : 1,
        filter: isScanning ? ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] : 'brightness(1)'
      }}
      transition={{
        duration: isScanning ? 2 : 0.3,
        repeat: isScanning ? Infinity : 0,
        ease: 'easeInOut'
      }}
    >
      🦊
      {/* Glowing eyes effect - only shows when scanning */}
      {isScanning && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: ['0 0 20px #00ffff', '0 0 40px #00ffff', '0 0 20px #00ffff']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.div>
  );
} 