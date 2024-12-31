/**
 * OptionsList component for dropdown
 * Displays filtered options with recent/popular sections
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DropdownOption } from './types';

interface OptionsListProps<T> {
  options: DropdownOption<T>[];
  selectedValue?: T;
  onSelect: (value: T) => void;
  highlightedIndex: number;
  variant?: 'asset' | 'chain';
  noOptionsMessage?: string;
}

export function OptionsList<T>({
  options,
  selectedValue,
  onSelect,
  highlightedIndex,
  variant = 'asset',
  noOptionsMessage = 'No options found'
}: OptionsListProps<T>): React.ReactElement {
  if (options.length === 0) {
    return (
      <div className="p-4 text-center text-white/50">
        {noOptionsMessage}
      </div>
    );
  }

  // Separate options into categories
  const recentOptions = options.filter(opt => opt.isRecent);
  const popularOptions = options.filter(opt => opt.isPopular && !opt.isRecent);
  const regularOptions = options.filter(opt => !opt.isPopular && !opt.isRecent);

  const renderOption = (option: DropdownOption<T>, index: number) => (
    <motion.button
      key={String(option.value)}
      type="button"
      onClick={() => onSelect(option.value)}
      className={`w-full px-4 py-3 flex items-center gap-3 group
        ${index === highlightedIndex ? 'bg-white/10' : 'hover:bg-white/5'}
        ${option.isCompatible === false ? 'opacity-50 cursor-not-allowed' : ''}
        transition-all duration-200`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon or network color indicator */}
      {variant === 'chain' && option.networkColor ? (
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: option.networkColor }}
        />
      ) : option.icon ? (
        <img src={option.icon} alt="" className="w-6 h-6" />
      ) : null}

      {/* Label and description */}
      <div className="flex-grow text-left">
        <div className="font-medium">{option.label}</div>
        {option.description && (
          <div className="text-sm text-white/50">{option.description}</div>
        )}
      </div>

      {/* Selection indicator */}
      {selectedValue === option.value && (
        <div className="text-cyan-400">✓</div>
      )}
    </motion.button>
  );

  return (
    <div className="max-h-[300px] overflow-y-auto">
      {/* Recent section */}
      {recentOptions.length > 0 && (
        <div className="border-b border-white/10">
          <div className="px-4 py-2 text-xs text-white/30 uppercase tracking-wider">
            Recent
          </div>
          {recentOptions.map((option, i) => renderOption(option, i))}
        </div>
      )}

      {/* Popular section */}
      {popularOptions.length > 0 && (
        <div className={recentOptions.length > 0 ? 'border-b border-white/10' : ''}>
          <div className="px-4 py-2 text-xs text-white/30 uppercase tracking-wider">
            Popular
          </div>
          {popularOptions.map((option, i) => renderOption(option, i + recentOptions.length))}
        </div>
      )}

      {/* Regular options */}
      {regularOptions.length > 0 && (
        <div>
          {(recentOptions.length > 0 || popularOptions.length > 0) && (
            <div className="px-4 py-2 text-xs text-white/30 uppercase tracking-wider">
              All Options
            </div>
          )}
          {regularOptions.map((option, i) => renderOption(
            option,
            i + recentOptions.length + popularOptions.length
          ))}
        </div>
      )}
    </div>
  );
} 