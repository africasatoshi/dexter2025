/**
 * Dropdown component
 * Reusable dropdown with direct typing search and keyboard navigation
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DropdownProps, DropdownOption } from './types';
import { OptionsList } from './OptionsList';

export function Dropdown<T>({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled,
  className = '',
  variant
}: DropdownProps<T>): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter and sort options
  const filteredOptions = options.filter(option => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      option.label.toLowerCase().includes(searchLower) ||
      option.description?.toLowerCase().includes(searchLower)
    );
  });

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault();
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          onChange(filteredOptions[highlightedIndex].value);
          setIsOpen(false);
          setSearchQuery('');
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        break;
      case 'Tab':
        setIsOpen(false);
        setSearchQuery('');
        break;
      default:
        setIsOpen(true);
    }
  };

  // Get selected option details
  const selectedOption = options.find(opt => opt.value === value);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  // Focus input when clicking container
  const handleContainerClick = () => {
    if (!disabled) {
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm text-white/70 mb-2">
          {label}
        </label>
      )}

      {/* Main input */}
      <div
        onClick={handleContainerClick}
        className={`w-full px-4 py-3 bg-black/20 backdrop-blur-sm border rounded-lg
          flex items-center gap-3 cursor-text
          ${disabled 
            ? 'border-white/5 opacity-50 cursor-not-allowed' 
            : 'border-white/10 hover:border-white/20'}
          ${error ? 'border-red-500/50' : ''}
          transition-all duration-300`}
      >
        {/* Icon/color indicator */}
        {selectedOption && (
          variant === 'chain' && selectedOption.networkColor ? (
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedOption.networkColor }}
            />
          ) : selectedOption.icon ? (
            <img src={selectedOption.icon} alt="" className="w-6 h-6" />
          ) : null
        )}

        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={selectedOption ? selectedOption.label : placeholder}
          disabled={disabled}
          className="flex-grow bg-transparent text-white placeholder:text-white/30 
            focus:outline-none disabled:cursor-not-allowed"
        />

        {/* Dropdown arrow */}
        <div className={`text-white/30 transition-transform duration-200
          ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-sm text-red-400 mt-1">{error}</div>
      )}

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-black/90 backdrop-blur-sm
              border border-white/10 rounded-lg shadow-xl overflow-hidden"
          >
            {/* Options list */}
            <OptionsList
              options={filteredOptions}
              selectedValue={value}
              onSelect={(newValue) => {
                onChange(newValue);
                setIsOpen(false);
                setSearchQuery('');
              }}
              highlightedIndex={highlightedIndex}
              variant={variant}
              noOptionsMessage="No matches found"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 