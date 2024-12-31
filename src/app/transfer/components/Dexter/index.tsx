/**
 * Main Dexter component for transfer flow
 * Combines Mascot and Chat components
 */

'use client';

import React from 'react';
import type { TransferStep } from '@/app/transfer/types';
import Mascot from './Mascot';
import Chat from './Chat';

interface DexterProps {
  currentStep: TransferStep;
}

export default function Dexter({ currentStep }: DexterProps): React.ReactElement {
  const isScanning = currentStep === 'safety-scan';

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
      <div className="flex-shrink-0">
        <Mascot currentStep={currentStep} isScanning={isScanning} />
      </div>
      <div className="flex-grow">
        <Chat currentStep={currentStep} />
      </div>
    </div>
  );
} 