/**
 * TestTransfer step component
 * Handles test amount selection and displays fee breakdown
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TestTransferProps {
  onNext: () => void;
}

interface TestAmount {
  amount: number;
  sendGasFee: number;
  returnGasFee: number;
  totalCharge: number;
}

const TEST_AMOUNTS: TestAmount[] = [
  { amount: 1, sendGasFee: 0.25, returnGasFee: 0.25, totalCharge: 1.50 },
  { amount: 2, sendGasFee: 0.25, returnGasFee: 0.25, totalCharge: 2.50 },
  { amount: 5, sendGasFee: 0.25, returnGasFee: 0.25, totalCharge: 5.50 },
  { amount: 10, sendGasFee: 0.25, returnGasFee: 0.25, totalCharge: 10.50 }
];

export default function TestTransfer({ onNext }: TestTransferProps): React.ReactElement {
  const [selectedAmount, setSelectedAmount] = useState<TestAmount>();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!selectedAmount) {
      setError('Please select an amount');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Amount selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {TEST_AMOUNTS.map((amount, index) => (
          <motion.button
            key={amount.amount}
            onClick={() => {
              setSelectedAmount(amount);
              setError('');
            }}
            className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300
              ${selectedAmount?.amount === amount.amount
                ? 'bg-white/20 border-white/30'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-2xl font-bold">${amount.amount}</div>
            <div className="text-sm text-white/50">USD</div>
          </motion.button>
        ))}
      </div>

      {/* Fee breakdown */}
      {selectedAmount && (
        <motion.div
          className="space-y-4 bg-white/5 rounded-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-white/70">Send Gas Fee</span>
            <span className="text-white">${selectedAmount.sendGasFee}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Return Gas Fee</span>
            <span className="text-white">${selectedAmount.returnGasFee}</span>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
            <span className="text-white/70">Total Charge</span>
            <span className="text-white font-bold">${selectedAmount.totalCharge}</span>
          </div>
        </motion.div>
      )}

      {/* Error message */}
      {error && (
        <motion.div
          className="text-red-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {/* Connect/Send button */}
      <motion.button
        onClick={() => {
          if (!isWalletConnected) {
            setIsWalletConnected(true);
          } else {
            handleSubmit();
          }
        }}
        className="w-full px-6 py-3 bg-white/10 rounded-lg border border-white/20
          hover:bg-white/20 hover:border-white/30 transition-all duration-300
          active:scale-95 backdrop-blur-sm"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {isWalletConnected ? 'Send Test Transfer' : 'Connect Wallet'}
      </motion.button>
    </div>
  );
} 