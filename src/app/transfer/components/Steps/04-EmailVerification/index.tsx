/**
 * EmailVerification step component
 * Shows transaction receipt and handles email verification
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EmailVerificationProps {
  onNext: () => void;
}

interface TransactionReceipt {
  hash: string;
  amount: number;
  asset: string;
  chain: string;
  recipientAddress: string;
}

// Mock transaction data
const TRANSACTION: TransactionReceipt = {
  hash: '0x1234...5678',
  amount: 1.0,
  asset: 'ETH',
  chain: 'Ethereum',
  recipientAddress: '0xabcd...ef90'
};

export default function EmailVerification({ onNext }: EmailVerificationProps): React.ReactElement {
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsEmailSubmitted(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some(digit => !digit)) {
      setError('Please enter the complete verification code');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Transaction receipt */}
      <motion.div
        className="bg-white/5 rounded-lg p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-medium">Transaction Receipt</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-white/70">Amount</span>
            <span>{TRANSACTION.amount} {TRANSACTION.asset}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Network</span>
            <span>{TRANSACTION.chain}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Recipient</span>
            <span className="font-mono">{TRANSACTION.recipientAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Transaction Hash</span>
            <span className="font-mono">{TRANSACTION.hash}</span>
          </div>
        </div>
      </motion.div>

      {!isEmailSubmitted ? (
        /* Email form */
        <motion.form
          onSubmit={handleEmailSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="space-y-2">
            <label className="block text-sm text-white/70">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3
                text-white placeholder:text-white/30 focus:outline-none focus:border-white/20
                transition-all duration-300"
            />
          </div>
          {error && (
            <motion.div
              className="text-red-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
          <motion.button
            type="submit"
            className="w-full px-6 py-3 bg-white/10 rounded-lg border border-white/20
              hover:bg-white/20 hover:border-white/30 transition-all duration-300
              active:scale-95 backdrop-blur-sm"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Verification Code
          </motion.button>
        </motion.form>
      ) : (
        /* OTP verification */
        <motion.form
          onSubmit={handleOtpSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="space-y-4">
            <label className="block text-center text-white/70">
              Enter the 6-digit code sent to {email}
            </label>
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center bg-black/20 backdrop-blur-sm border border-white/10
                    rounded-lg text-white text-xl focus:outline-none focus:border-white/20
                    transition-all duration-300"
                />
              ))}
            </div>
          </div>
          {error && (
            <motion.div
              className="text-red-400 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
          <motion.button
            type="submit"
            className="w-full px-6 py-3 bg-white/10 rounded-lg border border-white/20
              hover:bg-white/20 hover:border-white/30 transition-all duration-300
              active:scale-95 backdrop-blur-sm"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Verify Email
          </motion.button>
        </motion.form>
      )}
    </div>
  );
} 