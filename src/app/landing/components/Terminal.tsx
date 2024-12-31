/**
 * Terminal.tsx
 * Classic DOS-style terminal display
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMING } from '../constants/messages';

interface TerminalProps {
  messages: string[];
  isAwake: boolean;
  onComplete: () => void;
}

export default function Terminal({ messages, isAwake, onComplete }: TerminalProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Handle typing animation
  useEffect(() => {
    if (!messages?.length || currentMessageIndex >= messages.length) return;
    
    const currentMessage = messages[currentMessageIndex].toUpperCase();
    
    if (displayedText === currentMessage) {
      const timer = setTimeout(() => {
        if (currentMessageIndex < messages.length - 1) {
          setCurrentMessageIndex(prev => prev + 1);
          setDisplayedText('');
        } else {
          const completeTimer = setTimeout(() => {
            onComplete();
          }, TIMING.MESSAGE_DELAY);
          return () => clearTimeout(completeTimer);
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
  }, [displayedText, currentMessageIndex, messages, onComplete]);

  // Blink cursor
  useEffect(() => {
    const timer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, TIMING.CURSOR_BLINK);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="relative bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg p-6 min-h-[100px]">
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