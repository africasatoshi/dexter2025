/**
 * Transfer page
 * Handles the multi-step flow for creating a new test transfer
 */

'use client';

import React, { useState } from 'react';
import {
  AssetSelection,
  SafetyScan,
  TestTransfer,
  EmailVerification,
  LinkSharing
} from '@/app/transfer/components/Steps';
import Dexter from '@/app/transfer/components/Dexter';
import type { TransferStep } from '@/app/transfer/types';

export default function TransferPage(): React.ReactElement {
  const [currentStep, setCurrentStep] = useState<TransferStep>('asset-selection');

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 'asset-selection':
        return <AssetSelection onNext={() => setCurrentStep('safety-scan')} />;
      case 'safety-scan':
        return <SafetyScan onNext={() => setCurrentStep('test-transfer')} />;
      case 'test-transfer':
        return <TestTransfer onNext={() => setCurrentStep('email-verification')} />;
      case 'email-verification':
        return <EmailVerification onNext={() => setCurrentStep('link-sharing')} />;
      case 'link-sharing':
        return <LinkSharing onNext={() => window.location.href = '/dashboard'} />;
      default:
        return null;
    }
  };

  // Calculate progress percentage
  const getProgress = () => {
    const steps: TransferStep[] = [
      'asset-selection',
      'safety-scan',
      'test-transfer',
      'email-verification',
      'link-sharing'
    ];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress bar */}
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          />
        </div>

        {/* Dexter and chat section */}
        <Dexter currentStep={currentStep} />
        
        {/* Step content */}
        <div className="space-y-6">
          {renderStep()}
        </div>

        {/* Back button */}
        {currentStep !== 'asset-selection' && (
          <div className="fixed bottom-8 left-8">
            <button
              onClick={() => {
                switch (currentStep) {
                  case 'safety-scan':
                    setCurrentStep('asset-selection');
                    break;
                  case 'test-transfer':
                    setCurrentStep('safety-scan');
                    break;
                  case 'email-verification':
                    setCurrentStep('test-transfer');
                    break;
                  case 'link-sharing':
                    setCurrentStep('email-verification');
                    break;
                }
              }}
              className="px-6 py-3 bg-white/5 hover:bg-white/10
                rounded-lg font-medium transition-colors"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </main>
  );
} 