/**
 * page.tsx
 * Main landing page component
 */

'use client';

import React, { useState } from 'react';
import Fox from './landing/components/Fox';
import Terminal from './landing/components/Terminal';
import SafetyButton from './landing/components/SafetyButton';
import { 
  INTRO_SEQUENCE, 
  SLEEP_MESSAGE,
  BOOT_SEQUENCE,
  MENU_SEQUENCE 
} from './landing/constants/messages';
import { AnimatePresence } from 'framer-motion';

type TerminalState = 'intro' | 'sleeping' | 'booting' | 'menu';

export default function LandingPage() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isAwake, setIsAwake] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [terminalState, setTerminalState] = useState<TerminalState>('intro');

  // Handle fox wake up
  const handleWake = () => {
    setIsAwake(true);
    setTerminalState('booting');
  };

  // Handle message sequence transitions
  const handleSequenceComplete = () => {
    switch (terminalState) {
      case 'intro':
        setTerminalState('sleeping');
        setIsIntroComplete(true);
        break;
      case 'booting':
        setTerminalState('menu');
        break;
      case 'menu':
        setShowButton(true);
        break;
    }
  };

  // Get current message sequence
  const getCurrentMessages = () => {
    switch (terminalState) {
      case 'intro':
        return INTRO_SEQUENCE;
      case 'sleeping':
        return SLEEP_MESSAGE;
      case 'booting':
        return BOOT_SEQUENCE;
      case 'menu':
        return MENU_SEQUENCE;
      default:
        return [];
    }
  };

  // Handle entering safety zone
  const handleEnterSafetyZone = () => {
    // TODO: Implement transition to main app
    console.log('Entering safety zone...');
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-12">
          <Fox 
            onWake={handleWake}
            isIntroComplete={isIntroComplete}
            isAwake={isAwake}
          />
          <AnimatePresence mode="wait">
            {!showButton ? (
              <Terminal
                messages={getCurrentMessages()}
                isAwake={isAwake}
                onComplete={handleSequenceComplete}
              />
            ) : (
              <SafetyButton show={showButton} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
