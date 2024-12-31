/**
 * ErrorPopover component
 * Sleek floating panel that shows validation errors
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorPopoverProps {
  errors: string[];
  show: boolean;
  onClose: () => void;
}

export function ErrorPopover({ errors, show, onClose }: ErrorPopoverProps): React.ReactElement | null {
  if (!show || errors.length === 0) return null;

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-[2px]"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full max-w-md bg-[#1a1a1a]/95 backdrop-blur-xl border border-red-500/20
            rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10
              flex items-center justify-center text-white/40 hover:text-white/70
              transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v5" />
                  <path d="M12 16.5v.5" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-lg text-white">Validation Required</div>
                <div className="text-sm text-white/50">Please address the following:</div>
              </div>
            </div>
          </div>

          {/* Error list */}
          <div className="p-6 space-y-3">
            {errors.map((error, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="text-red-400 mt-0.5">•</div>
                <div className="text-white/70">{error}</div>
              </motion.div>
            ))}
          </div>

          {/* Footer with hint */}
          <div className="px-6 py-4 bg-white/5">
            <div className="text-sm text-white/40 text-center">
              Click anywhere outside to dismiss
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 