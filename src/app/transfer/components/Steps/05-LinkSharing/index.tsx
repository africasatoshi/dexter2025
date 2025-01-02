/**
 * LinkSharing step component
 * Generates and displays a unique link for the recipient
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LinkSharingProps {
  onNext: () => void;
}

const TIMEOUT_OPTIONS = [
  { value: 24, label: '24 hours' },
  { value: 48, label: '48 hours' },
  { value: 72, label: '72 hours' },
  { value: 168, label: '1 week' }
];

export default function LinkSharing({ onNext }: LinkSharingProps): React.ReactElement {
  const [selectedTimeout, setSelectedTimeout] = useState<number>();
  const [isCopied, setIsCopied] = useState(false);

  // Mock unique link
  const uniqueLink = 'https://dexter.com/test/abc123xyz789';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(uniqueLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Link display */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-medium">Share this link with the recipient</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={uniqueLink}
            readOnly
            className="flex-grow bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3
              text-white font-mono text-sm focus:outline-none"
          />
          <motion.button
            onClick={handleCopy}
            className="px-4 py-2 bg-white/10 rounded-lg border border-white/20
              hover:bg-white/20 hover:border-white/30 transition-all duration-300
              active:scale-95 backdrop-blur-sm whitespace-nowrap"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCopied ? 'Copied!' : 'Copy Link'}
          </motion.button>
        </div>
      </motion.div>

      {/* Timeout selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Set link expiration (optional)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TIMEOUT_OPTIONS.map((option, index) => (
            <motion.button
              key={option.value}
              onClick={() => setSelectedTimeout(option.value)}
              className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300
                ${selectedTimeout === option.value
                  ? 'bg-white/20 border-white/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-lg font-medium">{option.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recipient preview */}
      <motion.div
        className="space-y-4 bg-white/5 rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-medium">Recipient View Preview</h3>
        <div className="space-y-4 text-white/70">
          <p>The recipient will see:</p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Transaction details and amount to return</li>
            <li>Your wallet address pre-filled for return transfer</li>
            <li>Clear instructions to complete the test transfer</li>
            <li>Estimated gas fees for the return transaction</li>
          </ol>
        </div>
      </motion.div>

      {/* Return to dashboard button */}
      <motion.button
        onClick={onNext}
        className="w-full px-6 py-3 bg-white/10 rounded-lg border border-white/20
          hover:bg-white/20 hover:border-white/30 transition-all duration-300
          active:scale-95 backdrop-blur-sm"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        Return to Dashboard
      </motion.button>
    </div>
  );
} 