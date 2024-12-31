/**
 * Terminal.tsx
 * Retro-modern terminal display for landing page messages
 * Features:
 * - Typewriter text effect with line breaks
 * - View transitions
 * - Blinking cursor
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
    
    const currentMessage = messages[currentMessageIndex];
    
    if (displayedText === currentMessage) {
      // Message complete - longer pause at the end
      const timer = setTimeout(() => {
        if (currentMessageIndex < messages.length - 1) {
          setCurrentMessageIndex(prev => prev + 1);
          setDisplayedText('');
        } else {
          // Add extra delay before completing menu sequence
          const completeTimer = setTimeout(() => {
            onComplete();
          }, TIMING.MESSAGE_DELAY);
          return () => clearTimeout(completeTimer);
        }
      }, TIMING.MESSAGE_DELAY * 1.5);
      return () => clearTimeout(timer);
    }

    // Type next character with variable delays
    const nextChar = currentMessage[displayedText.length];
    let delay = TIMING.TYPING_SPEED;
    
    // Add pauses for punctuation and line breaks
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
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMessageIndex}
        className="font-mono text-lg text-white bg-black/10 p-6 rounded-lg backdrop-blur-sm min-w-[300px] 
          border-[1px] border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] 
          before:content-[''] before:absolute before:inset-[1px] before:rounded-lg before:border before:border-white/5"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="relative text-white whitespace-pre-line">
          {displayedText}
          <motion.span
            className="inline-block w-2 h-4 ml-1 bg-white align-middle"
            animate={{ opacity: showCursor ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 