/**
 * TransactionList.tsx
 * Displays list of transactions with their status
 * Mobile-first design with responsive layout
 */

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Transaction, TransactionStatus } from '../types';

// Add keydown handler for search shortcut
const useSearchShortcut = (callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
};

// Add copy to clipboard function
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // Could add a toast notification here
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

// Status priority for sorting (pending first, then completed, then expired, then failed)
const STATUS_PRIORITY: Record<TransactionStatus, number> = {
  pending: 0,
  completed: 1,
  expired: 2,
  failed: 3
};

// Filter button configs
const STATUS_FILTERS: { label: string; value: TransactionStatus; color: string }[] = [
  { label: 'Pending', value: 'pending', color: 'yellow' },
  { label: 'Completed', value: 'completed', color: 'green' },
  { label: 'Expired', value: 'expired', color: 'slate' },
  { label: 'Failed', value: 'failed', color: 'red' }
];

// Dummy data for initial UI development
const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    status: 'pending',
    usdAmount: 1,
    assetAmount: '0.0005',
    asset: 'ETH',
    chain: 'Ethereum',
    recipientAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    createdAt: '2023-12-31T10:00:00Z',
    expiresAt: '2023-12-31T11:00:00Z'
  },
  {
    id: '2',
    status: 'completed',
    usdAmount: 5,
    assetAmount: '5.2',
    asset: 'USDC',
    chain: 'Polygon',
    recipientAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    createdAt: '2023-12-30T15:00:00Z',
    expiresAt: '2023-12-30T16:00:00Z',
    returnedAt: '2023-12-30T15:30:00Z'
  },
  {
    id: '3',
    status: 'failed',
    usdAmount: 2,
    assetAmount: '2.1',
    asset: 'USDT',
    chain: 'Arbitrum',
    recipientAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    createdAt: '2023-12-29T12:00:00Z',
    expiresAt: '2023-12-29T13:00:00Z'
  },
  {
    id: '4',
    status: 'completed',
    usdAmount: 10,
    assetAmount: '10.5',
    asset: 'USDC',
    chain: 'Base',
    recipientAddress: '0x3f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    createdAt: '2023-12-28T09:00:00Z',
    expiresAt: '2023-12-28T10:00:00Z',
    returnedAt: '2023-12-28T09:15:00Z'
  },
  {
    id: '5',
    status: 'expired',
    usdAmount: 2,
    assetAmount: '1.8',
    asset: 'USDT',
    chain: 'Optimism',
    recipientAddress: '0x9f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    createdAt: '2023-12-27T14:00:00Z',
    expiresAt: '2023-12-27T15:00:00Z'
  }
];

type SortField = 'date' | 'status';
type SortDirection = 'asc' | 'desc';

// Helper function for formatting dates
const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  // Get timezone abbreviation (EST, PST, etc.)
  const timeZoneAbbr = date.toLocaleTimeString('en-US', { 
    timeZoneName: 'short' 
  }).split(' ')[2];
  
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }),
    zone: timeZoneAbbr
  };
};

export default function TransactionList(): React.ReactElement {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<TransactionStatus>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Add search shortcut
  useSearchShortcut(() => {
    searchInputRef.current?.focus();
  });

  // Enhanced copy function with feedback
  const handleCopy = async (text: string, id: string) => {
    await copyToClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
  };

  const toggleFilter = (status: TransactionStatus) => {
    const newFilters = new Set(activeFilters);
    if (newFilters.has(status)) {
      newFilters.delete(status);
    } else {
      newFilters.add(status);
    }
    setActiveFilters(newFilters);
  };

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    // First, filter based on search query and status filters
    const filtered = DUMMY_TRANSACTIONS.filter(tx => {
      // Apply search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          tx.recipientAddress.toLowerCase().includes(searchLower) ||
          tx.asset.toLowerCase().includes(searchLower) ||
          tx.chain.toLowerCase().includes(searchLower) ||
          tx.assetAmount.includes(searchQuery) ||
          tx.usdAmount.toString().includes(searchQuery);
        
        if (!matchesSearch) return false;
      }

      // Apply status filters
      if (activeFilters.size > 0) {
        return activeFilters.has(tx.status);
      }

      return true;
    });

    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'desc' 
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        const priorityDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
        return sortDirection === 'desc' ? -priorityDiff : priorityDiff;
      }
    });
  }, [searchQuery, sortField, sortDirection, activeFilters]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-4">
      {/* Search bar with keyboard shortcut hint */}
      <div className="relative">
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by address, asset, or chain..."
          className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3
            text-white placeholder:text-white/30 focus:outline-none focus:border-white/20
            transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.3)]
            hover:border-white/20"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 
              hover:text-white/50 transition-colors duration-200"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map(({ label, value, color }) => (
          <button
            key={value}
            onClick={() => toggleFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm border transition-all duration-300
              backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.2)]
              ${activeFilters.has(value)
                ? `bg-${color}-500/10 border-${color}-500/40 text-${color}-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]`
                : 'bg-black/20 border-white/10 text-white/50 hover:border-white/30 hover:text-white'
              }`}
          >
            {label}
          </button>
        ))}
        {activeFilters.size > 0 && (
          <button
            onClick={() => setActiveFilters(new Set())}
            className="px-3 py-1 rounded-lg text-sm border border-white/10 
              text-white/50 hover:border-white/20 hover:text-white/70
              transition-all duration-200"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Column headers - Hidden on mobile, shown on md+ */}
      <div className="hidden md:flex items-center px-4 py-2 text-white/50 text-sm">
        <div className="flex-1">DETAILS</div>
        <div className="flex items-center gap-8">
          <button 
            onClick={() => toggleSort('date')}
            className={`w-32 text-left flex items-center gap-2 hover:text-white
              ${sortField === 'date' ? 'text-white' : ''}`}
          >
            DATE
            {sortField === 'date' && (
              <span>{sortDirection === 'desc' ? '↓' : '↑'}</span>
            )}
          </button>
          <button 
            onClick={() => toggleSort('status')}
            className={`w-28 text-left flex items-center gap-2 hover:text-white
              ${sortField === 'status' ? 'text-white' : ''}`}
          >
            STATUS
            {sortField === 'status' && (
              <span>{sortDirection === 'desc' ? '↓' : '↑'}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile sort buttons */}
      <div className="flex md:hidden items-center justify-end gap-4 px-4 py-2">
        <button 
          onClick={() => toggleSort('date')}
          className={`text-sm flex items-center gap-1 hover:text-white
            ${sortField === 'date' ? 'text-white' : 'text-white/50'}`}
        >
          DATE {sortField === 'date' && (
            <span>{sortDirection === 'desc' ? '↓' : '↑'}</span>
          )}
        </button>
        <button 
          onClick={() => toggleSort('status')}
          className={`text-sm flex items-center gap-1 hover:text-white
            ${sortField === 'status' ? 'text-white' : 'text-white/50'}`}
        >
          STATUS {sortField === 'status' && (
            <span>{sortDirection === 'desc' ? '↓' : '↑'}</span>
          )}
        </button>
      </div>

      {/* Transaction list with enhanced cards */}
      <div className="space-y-2">
        {filteredAndSortedTransactions.length === 0 ? (
          <div className="text-center py-8 text-white/50">
            No transactions found
          </div>
        ) : (
          filteredAndSortedTransactions.map((tx) => (
            <div 
              key={tx.id}
              className="bg-black/20 backdrop-blur-sm rounded-lg 
                border border-white/10 p-5 
                hover:bg-black/30 hover:border-white/20
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]
                hover:shadow-white/5
                transition-all duration-300 cursor-pointer"
            >
              {/* Mobile layout */}
              <div className="flex flex-col md:hidden gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium font-mono tracking-[-0.02em]">
                    ${tx.usdAmount}
                  </span>
                  <div className={`w-[120px] px-3 py-1.5 rounded-full text-sm flex items-center justify-center backdrop-blur-sm
                    font-medium tracking-wide transition-all duration-300
                    ${tx.status === 'completed' ? 'bg-green-500/10 text-green-300 border border-green-500/20' : ''}
                    ${tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 animate-pulse' : ''}
                    ${tx.status === 'failed' ? 'bg-red-500/10 text-red-300 border border-red-500/20' : ''}
                    ${tx.status === 'expired' ? 'bg-slate-500/10 text-slate-300 border border-slate-500/20' : ''}
                  `}>
                    {tx.status.toUpperCase()}
                  </div>
                </div>
                <div className="text-white/50">
                  ({tx.assetAmount} {tx.asset} on {tx.chain})
                </div>
                <button
                  onClick={() => handleCopy(tx.recipientAddress, tx.id)}
                  className="text-sm text-white/50 font-mono tracking-tight hover:text-white/70 
                    transition-colors duration-200 text-left group"
                  title="Click to copy address"
                >
                  {tx.recipientAddress}
                  <span className={`ml-2 transition-all duration-200 font-mono text-xs
                    ${copiedId === tx.id 
                      ? 'text-green-400/70' 
                      : 'text-white/30 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {copiedId === tx.id ? '[copied]' : '[copy]'}
                  </span>
                </button>
                <div className="w-32 text-sm space-y-1">
                  <div className="font-medium group relative">
                    {formatDateTime(tx.createdAt).date}
                    <div className="absolute bottom-full left-0 mb-1 opacity-0 group-hover:opacity-100
                      transition-opacity duration-200 text-xs bg-black/90 text-white/70 px-2 py-1 rounded">
                      {new Date(tx.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-white/40">
                    {formatDateTime(tx.createdAt).time} {formatDateTime(tx.createdAt).zone}
                  </div>
                </div>
              </div>

              {/* Desktop layout with same enhancements */}
              <div className="hidden md:flex items-center justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium font-mono tracking-[-0.02em]">
                      ${tx.usdAmount}
                    </span>
                    <span className="text-white/50">
                      ({tx.assetAmount} {tx.asset} on {tx.chain})
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(tx.recipientAddress, tx.id)}
                    className="text-sm text-white/50 font-mono tracking-tight hover:text-white/70 
                      transition-colors duration-200 text-left group"
                    title="Click to copy address"
                  >
                    {tx.recipientAddress}
                    <span className={`ml-2 transition-all duration-200 font-mono text-xs
                      ${copiedId === tx.id 
                        ? 'text-green-400/70' 
                        : 'text-white/30 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {copiedId === tx.id ? '[copied]' : '[copy]'}
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-8">
                  <div className="w-32 text-sm space-y-1">
                    <div className="font-medium group relative">
                      {formatDateTime(tx.createdAt).date}
                      <div className="absolute bottom-full left-0 mb-1 opacity-0 group-hover:opacity-100
                        transition-opacity duration-200 text-xs bg-black/90 text-white/70 px-2 py-1 rounded">
                        {new Date(tx.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-white/40">
                      {formatDateTime(tx.createdAt).time} {formatDateTime(tx.createdAt).zone}
                    </div>
                  </div>
                  <div className={`w-[120px] px-3 py-1.5 rounded-full text-sm flex items-center justify-center backdrop-blur-sm
                    font-medium tracking-wide transition-all duration-300
                    ${tx.status === 'completed' ? 'bg-green-500/10 text-green-300 border border-green-500/20' : ''}
                    ${tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 animate-pulse' : ''}
                    ${tx.status === 'failed' ? 'bg-red-500/10 text-red-300 border border-red-500/20' : ''}
                    ${tx.status === 'expired' ? 'bg-slate-500/10 text-slate-300 border border-slate-500/20' : ''}
                  `}>
                    {tx.status.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 