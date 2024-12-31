/**
 * ErrorHandler component for AssetSelection step
 * Displays validation errors with modern styling
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorHandlerProps {
  message: string;
}

export function ErrorHandler({ message }: ErrorHandlerProps): React.ReactElement {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm"
      >
        <div className="flex items-start gap-3">
          <div className="text-red-400 mt-0.5">⚠️</div>
          <div className="flex-grow">
            <div className="text-red-300 font-medium">Error</div>
            <div className="text-red-200/70 text-sm mt-1">{message}</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 