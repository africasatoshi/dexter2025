/**
 * SearchInput component for dropdown
 * Handles search input with keyboard navigation support
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onFocus?: () => void;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  onKeyDown,
  onFocus
}: SearchInputProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when search shortcut (⌘K) is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder={placeholder}
        className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3
          text-white placeholder:text-white/30 focus:outline-none focus:border-white/20
          transition-all duration-300"
      />
      {/* Keyboard shortcut hint */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <kbd className="hidden md:flex items-center gap-1 px-2 py-1 text-xs text-white/30 
          bg-white/5 border border-white/10 rounded">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </div>
    </div>
  );
} 