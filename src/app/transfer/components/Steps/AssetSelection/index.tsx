/**
 * AssetSelection step component
 * Handles asset selection, chain selection (if applicable), and recipient address input
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Asset, Chain, AssetConfig } from '@/app/transfer/types';
import { Dropdown } from '@/app/transfer/components/common/Dropdown';
import { ErrorPopover } from './ErrorPopover';

interface AssetSelectionProps {
  onNext: () => void;
}

// Asset configurations with popularity flags and address validation rules
const ASSETS: AssetConfig[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    chains: ['Ethereum'],
    isPopular: true,
    icon: 'https://ethereum.org/static/4f10d2777b2d14759feb01c65b2765f7/69ce7/eth-glyph-colored.png',
    addressRules: {
      prefix: '0x',
      length: 42,
      regex: /^0x[a-fA-F0-9]{40}$/
    }
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    chains: ['Bitcoin'],
    isPopular: true,
    icon: 'https://bitcoin.org/img/icons/opengraph.png',
    addressRules: {
      minLength: 26,
      maxLength: 35,
      regex: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/
    }
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    chains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base'],
    isPopular: true,
    icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    addressRules: {
      prefix: '0x',
      length: 42,
      regex: /^0x[a-fA-F0-9]{40}$/
    }
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    chains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'],
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    addressRules: {
      prefix: '0x',
      length: 42,
      regex: /^0x[a-fA-F0-9]{40}$/
    }
  }
];

// Chain configurations with colors
const CHAINS: Record<Chain, { color: string; isPopular?: boolean }> = {
  'Bitcoin': { color: '#F7931A', isPopular: true },
  'Ethereum': { color: '#627EEA', isPopular: true },
  'Polygon': { color: '#8247E5', isPopular: true },
  'Arbitrum': { color: '#28A0F0' },
  'Optimism': { color: '#FF0420' },
  'Base': { color: '#0052FF' }
};

export default function AssetSelection({ onNext }: AssetSelectionProps): React.ReactElement {
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [selectedChain, setSelectedChain] = useState<Chain>();
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  // Get available chains for selected asset
  const availableChains = selectedAsset 
    ? ASSETS.find(a => a.symbol === selectedAsset)?.chains 
    : [];

  // Convert chains to dropdown options
  const chainOptions = availableChains?.map(chain => ({
    value: chain,
    label: chain,
    networkColor: CHAINS[chain].color,
    isPopular: CHAINS[chain].isPopular,
    isCompatible: true
  })) || [];

  // Convert assets to dropdown options
  const assetOptions = ASSETS.map(asset => ({
    value: asset.symbol,
    label: asset.symbol,
    description: asset.name,
    icon: asset.icon,
    isPopular: asset.isPopular,
    chains: asset.chains
  }));

  // Validate address based on selected asset
  const validateAddress = (address: string): string[] => {
    const errors: string[] = [];
    if (!address.trim()) {
      errors.push('Please enter a recipient address');
      return errors;
    }

    const asset = ASSETS.find(a => a.symbol === selectedAsset);
    if (!asset) return errors;

    const { addressRules } = asset;

    if (addressRules.prefix && !address.startsWith(addressRules.prefix)) {
      errors.push(`Address must start with ${addressRules.prefix}`);
    }

    if (addressRules.length && address.length !== addressRules.length) {
      errors.push(`Address must be exactly ${addressRules.length} characters`);
    }

    if (addressRules.minLength && address.length < addressRules.minLength) {
      errors.push(`Address must be at least ${addressRules.minLength} characters`);
    }

    if (addressRules.maxLength && address.length > addressRules.maxLength) {
      errors.push(`Address must be no more than ${addressRules.maxLength} characters`);
    }

    if (addressRules.regex && !addressRules.regex.test(address)) {
      errors.push('Invalid address format');
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];
    
    if (!selectedAsset) {
      newErrors.push('Please select an asset');
    }

    if (availableChains && availableChains.length > 1 && !selectedChain) {
      newErrors.push('Please select a chain');
    }

    const addressErrors = validateAddress(address);
    newErrors.push(...addressErrors);

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setShowErrors(true);
      return;
    }

    // If all validation passes, proceed to next step
    onNext();
  };

  // Clear errors when inputs change
  useEffect(() => {
    setErrors([]);
    setShowErrors(false);
  }, [selectedAsset, selectedChain, address]);

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6">
      {/* Asset selection */}
      <Dropdown
        options={assetOptions}
        value={selectedAsset}
        onChange={(asset: Asset) => {
          setSelectedAsset(asset);
          setSelectedChain(undefined);
        }}
        label="Select Asset"
        placeholder="Type to search assets..."
        variant="asset"
      />

      {/* Chain selection - only show if selected asset has multiple chains */}
      {selectedAsset && availableChains && availableChains.length > 1 && (
        <Dropdown
          options={chainOptions}
          value={selectedChain}
          onChange={(chain: Chain) => {
            setSelectedChain(chain);
          }}
          label="Select Chain"
          placeholder="Type to search networks..."
          variant="chain"
        />
      )}

      {/* Address input */}
      <div className="space-y-2">
        <label className="block text-sm text-white/70">Recipient Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={selectedAsset === 'BTC' ? 'Enter Bitcoin address' : 'Enter wallet address (0x...)'}
          className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3
            text-white placeholder:text-white/30 focus:outline-none focus:border-white/20
            transition-all duration-300"
        />
      </div>

      {/* Error popover */}
      <ErrorPopover 
        errors={errors} 
        show={showErrors} 
        onClose={() => setShowErrors(false)} 
      />

      {/* Submit button */}
      <motion.button
        type="submit"
        className="w-full px-6 py-3 bg-white/10 rounded-lg border border-white/20
          hover:bg-white/20 hover:border-white/30 transition-all duration-300
          active:scale-95 backdrop-blur-sm"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        SAFETY SCAN
      </motion.button>
    </form>
  );
} 