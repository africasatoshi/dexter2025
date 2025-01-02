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
import type { TransferStep, Asset, Chain, TransferDetails } from '@/app/transfer/types';

export default function TransferPage(): React.ReactElement {
  const [currentStep, setCurrentStep] = useState<TransferStep>('asset-selection');
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [selectedChain, setSelectedChain] = useState<Chain>();
  const [transferDetails, setTransferDetails] = useState<TransferDetails>();

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 'asset-selection':
        return <AssetSelection 
          onNext={() => setCurrentStep('safety-scan')}
          onAssetSelect={(asset: Asset, chain: Chain) => {
            setSelectedAsset(asset);
            setSelectedChain(chain);
          }}
        />;
      case 'safety-scan':
        return <SafetyScan onNext={() => setCurrentStep('test-transfer')} />;
      case 'test-transfer':
        if (!selectedAsset || !selectedChain) {
          setCurrentStep('asset-selection');
          return null;
        }
        return (
          <TestTransfer 
            onNext={(details: TransferDetails) => {
              setTransferDetails(details);
              setCurrentStep('email-verification');
            }}
            selectedAsset={selectedAsset}
            selectedChain={selectedChain}
          />
        );
      case 'email-verification':
        if (!transferDetails) {
          setCurrentStep('test-transfer');
          return null;
        }
        return <EmailVerification 
          onNext={() => setCurrentStep('link-sharing')}
          transferDetails={transferDetails}
        />;
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
      </div>
    </main>
  );
} 