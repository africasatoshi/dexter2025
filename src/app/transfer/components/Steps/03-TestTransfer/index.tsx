/**
 * TestTransfer step component
 * Handles test amount selection and displays fee breakdown
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CRYPTO_RATES, GAS_FEES, type Asset, type Chain, type TransferDetails } from '@/app/transfer/types';

interface TestTransferProps {
  onNext: (details: TransferDetails) => void;
  selectedAsset: Asset;
  selectedChain: Chain;
}

interface TestAmount {
  amount: number;
  sendGasFee: number;
  returnGasFee: number;
  totalCharge: number;
}

const formatUSD = (amount: number) => `$${amount.toFixed(2)}`;

const formatCrypto = (usdAmount: number, asset: 'BTC' | 'ETH' | 'USDC' | 'USDT') => {
  const rate = CRYPTO_RATES[asset];
  const cryptoAmount = usdAmount / rate.usdPrice;
  return `(${cryptoAmount.toFixed(6)} ${rate.symbol})`;
};

export default function TestTransfer({ onNext, selectedAsset, selectedChain }: TestTransferProps): React.ReactElement {
  const [selectedAmount, setSelectedAmount] = useState<number>();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [error, setError] = useState('');

  const gasFees = GAS_FEES[selectedChain];
  const TEST_AMOUNTS = [1, 2, 5, 10];

  const handleSubmit = () => {
    if (!selectedAmount) {
      setError('Please select an amount');
      return;
    }

    // Create transfer details
    const details: TransferDetails = {
      testAmount: selectedAmount,
      sendGasFee: gasFees.sendGas,
      returnGasFee: gasFees.returnGas,
      totalAmount: getTotalCharge(selectedAmount),
      recipientAddress: '0xabcd...ef90', // This should come from previous step
      asset: selectedAsset,
      chain: selectedChain,
      transactionHash: '0x1234...5678' // This would be generated after actual transaction
    };

    onNext(details);
  };

  const getTotalCharge = (testAmount: number) => {
    return testAmount + gasFees.sendGas + gasFees.returnGas;
  };

  return (
    <div className="space-y-8">
      {/* Amount selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {TEST_AMOUNTS.map((amount, index) => (
          <motion.button
            key={amount}
            onClick={() => {
              setSelectedAmount(amount);
              setError('');
            }}
            className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300
              ${selectedAmount === amount
                ? 'bg-white/20 border-white/30'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-2xl font-bold">{formatUSD(amount)}</div>
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
            <span className="text-white/70">Test Amount</span>
            <div className="text-right">
              <span className="text-white">{formatUSD(selectedAmount)} </span>
              <span className="text-white/50">{formatCrypto(selectedAmount, selectedAsset)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Send Gas Fee</span>
            <div className="text-right">
              <span className="text-white">{formatUSD(gasFees.sendGas)} </span>
              <span className="text-white/50">{formatCrypto(gasFees.sendGas, selectedAsset)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Return Gas Fee</span>
            <div className="text-right">
              <span className="text-white">{formatUSD(gasFees.returnGas)} </span>
              <span className="text-white/50">{formatCrypto(gasFees.returnGas, selectedAsset)}</span>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
            <span className="text-white/70">Total Charge</span>
            <div className="text-right">
              <span className="text-white font-bold">{formatUSD(getTotalCharge(selectedAmount))} </span>
              <span className="text-white/50">{formatCrypto(getTotalCharge(selectedAmount), selectedAsset)}</span>
            </div>
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

      {/* Button container */}
      <div className="flex gap-4">
        <motion.button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium 
            transition-colors w-[100px]"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
        <motion.button
          onClick={() => {
            if (!isWalletConnected) {
              setIsWalletConnected(true);
            } else {
              handleSubmit();
            }
          }}
          className="flex-1 px-6 py-3 bg-white/10 rounded-lg border border-white/20
            hover:bg-white/20 hover:border-white/30 transition-all duration-300"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {isWalletConnected ? 'Send Test Transfer' : 'Connect Wallet'}
        </motion.button>
      </div>
    </div>
  );
} 