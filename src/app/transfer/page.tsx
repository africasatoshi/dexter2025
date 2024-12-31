/**
 * Transfer page
 * Handles the multi-step flow for creating a new test transfer
 */

'use client';

import React, { useState } from 'react';
import { AssetSelection } from '@/app/transfer/components/Steps';
import Dexter from '@/app/transfer/components/Dexter';
import type { TransferStep } from '@/app/transfer/types';

export default function TransferPage(): React.ReactElement {
  const [currentStep, setCurrentStep] = useState<TransferStep>('asset-selection');

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 'asset-selection':
        return <AssetSelection onNext={() => setCurrentStep('safety-scan')} />;
      // Other steps will be added as we implement them
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Dexter and chat section */}
        <Dexter currentStep={currentStep} />
        
        {/* Step content */}
        <div className="space-y-6">
          {renderStep()}
        </div>
      </div>
    </main>
  );
} 