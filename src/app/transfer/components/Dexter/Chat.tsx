/**
 * Dexter Chat component for transfer flow
 * Displays Dexter's messages with a DOS-style terminal interface
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TransferStep } from '../../types';

interface ChatProps {
  currentStep: TransferStep;
}

// Messages for each step
const STEP_MESSAGES: Record<TransferStep, string[]> = {
  'asset-selection': [
    "WELCOME TO THE TEST TRANSFER SETUP!\n",
    "I'LL HELP YOU SEND A SMALL TEST AMOUNT FIRST.\n",
    "LET'S START BY SELECTING AN ASSET AND ENTERING THE RECIPIENT'S ADDRESS."
  ],
  'safety-scan': [
    "GREAT! NOW I'LL SCAN THIS ADDRESS FOR ANY POTENTIAL RISKS.\n",
    "I CHECK MULTIPLE SECURITY DATABASES.\n",
    "THIS HELPS ENSURE YOUR FUNDS WILL BE SAFE."
  ],
  'test-transfer': [
    "THE SAFETY SCAN IS COMPLETE!\n",
    "NOW, CHOOSE A SMALL TEST AMOUNT TO SEND.\n",
    "THIS VERIFIES THE ADDRESS WORKS AS EXPECTED."
  ],
  'email-verification': [
    "PERFECT! THE TEST TRANSFER IS ON ITS WAY.\n",
    "LET'S VERIFY YOUR EMAIL SO I CAN NOTIFY YOU WHEN IT'S RETURNED.\n",
    "THIS ALSO LETS YOU TRACK THE TRANSFER STATUS."
  ],
  'link-sharing': [
    "EMAIL VERIFIED! HERE'S YOUR UNIQUE LINK.\n",
    "SHARE THIS WITH THE RECIPIENT SO THEY CAN EASILY RETURN THE TEST.\n",
    "THEY'LL SEE STEP-BY-STEP INSTRUCTIONS."
  ]
};

// Timing constants (in milliseconds)
const TIMING = {
  TYPING_SPEED: 70,
  MESSAGE_DELAY: 800,
  CURSOR_BLINK: 530
} as const;

export default function Chat({ currentStep }: ChatProps): React.ReactElement {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const messages = STEP_MESSAGES[currentStep];
  const currentMessage = messages[messageIndex];

  // Handle typing animation
  useEffect(() => {
    if (!currentMessage) return;

    if (displayedText === currentMessage) {
      const timer = setTimeout(() => {
        if (messageIndex < messages.length - 1) {
          setMessageIndex(prev => prev + 1);
          setDisplayedText('');
        }
      }, TIMING.MESSAGE_DELAY * 1.5);
      return () => clearTimeout(timer);
    }

    const nextChar = currentMessage[displayedText.length];
    let delay = TIMING.TYPING_SPEED;
    
    if (nextChar === '.') delay *= 4;
    if (nextChar === ',') delay *= 2;
    if (nextChar === '\n') delay *= 3;
    
    const timer = setTimeout(() => {
      setDisplayedText(prev => currentMessage.slice(0, prev.length + 1));
    }, delay);
    
    return () => clearTimeout(timer);
  }, [displayedText, messageIndex, messages.length, currentMessage]);

  // Blink cursor
  useEffect(() => {
    const timer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, TIMING.CURSOR_BLINK);
    return () => clearInterval(timer);
  }, []);

  // Reset message index when step changes
  useEffect(() => {
    setMessageIndex(0);
    setDisplayedText('');
  }, [currentStep]);

  return (
    <div className="relative">
      <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 
        rounded-lg p-6 min-h-[120px]"
      >
        <div className="terminal-text text-white whitespace-pre-line">
          {displayedText}
          <motion.span
            className="inline-block w-[0.6em] h-[1.2em] ml-[2px] bg-white align-middle"
            animate={{ opacity: showCursor ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>
    </div>
  );
} 