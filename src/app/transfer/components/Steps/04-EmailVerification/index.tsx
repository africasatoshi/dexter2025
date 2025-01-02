/**
 * EmailVerification step component
 * Shows transaction receipt and handles email verification
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ErrorPopover } from '../AssetSelection/ErrorPopover';
import type { TransferDetails } from '@/app/transfer/types';
import { formatUSD, formatCrypto } from '../../../../utils/format';

interface EmailVerificationProps {
  onNext: () => void;
  transferDetails: TransferDetails;
}

export default function EmailVerification({ onNext, transferDetails }: EmailVerificationProps): React.ReactElement {
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [isCopied, setIsCopied] = useState<'recipient' | 'hash' | null>(null);

  const validateEmail = (email: string): string[] => {
    const errors: string[] = [];
    if (!email) {
      errors.push('Please enter your email address');
    } else if (!email.includes('@')) {
      errors.push("Please include an '@' in the email address");
    } else if (email.startsWith('@') || email.endsWith('@')) {
      errors.push("Email address cannot start or end with '@'");
    } else if (!email.includes('.')) {
      errors.push("Please include a domain (e.g. '.com')");
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push('Please enter a valid email address');
    }
    return errors;
  };

  const validateOtp = (otp: string[]): string[] => {
    const errors: string[] = [];
    if (otp.some(digit => !digit)) {
      errors.push('Please enter all 6 digits of the verification code');
    } else if (!otp.every(digit => /^\d$/.test(digit))) {
      errors.push('Verification code can only contain numbers');
    }
    return errors;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErrors = validateEmail(email);
    if (emailErrors.length > 0) {
      setErrors(emailErrors);
      setShowErrors(true);
      return;
    }
    setErrors([]);
    setShowErrors(false);
    setIsEmailSubmitted(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return; // Only allow digits

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
    const otpErrors = validateOtp(otp);
    if (otpErrors.length > 0) {
      setErrors(otpErrors);
      setShowErrors(true);
      return;
    }
    setErrors([]);
    setShowErrors(false);
    onNext();
  };

  const handleCopy = async (text: string, type: 'recipient' | 'hash') => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(type);
      setTimeout(() => setIsCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Transfer Summary */}
      <motion.div
        className="bg-white/5 rounded-lg p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-medium">Transfer Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-white/70">Amount Sent</span>
            <div className="text-right">
              <span className="text-white">{formatUSD(transferDetails.totalAmount)} </span>
              <span className="text-white/50">
                {formatCrypto(transferDetails.totalAmount, transferDetails.asset)}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Network</span>
            <span>{transferDetails.chain}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Recipient</span>
            <button
              onClick={() => handleCopy(transferDetails.recipientAddress, 'recipient')}
              className="font-mono text-right hover:text-blue-400 transition-colors"
            >
              {transferDetails.recipientAddress}
              {isCopied === 'recipient' && (
                <span className="ml-2 text-green-400">Copied!</span>
              )}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Transaction Hash</span>
            <button
              onClick={() => handleCopy(transferDetails.transactionHash || '', 'hash')}
              className="font-mono text-right hover:text-blue-400 transition-colors"
            >
              {transferDetails.transactionHash}
              {isCopied === 'hash' && (
                <span className="ml-2 text-green-400">Copied!</span>
              )}
            </button>
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

          <ErrorPopover 
            errors={errors} 
            show={showErrors} 
            onClose={() => setShowErrors(false)} 
          />

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

          <ErrorPopover 
            errors={errors} 
            show={showErrors} 
            onClose={() => setShowErrors(false)} 
          />

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