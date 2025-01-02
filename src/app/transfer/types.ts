/**
 * Transfer flow types
 */

export type TransferStep = 
  | 'asset-selection'
  | 'safety-scan'
  | 'test-transfer'
  | 'email-verification'
  | 'link-sharing';

export type Asset = 'BTC' | 'ETH' | 'USDC' | 'USDT';
export type Chain = 'Bitcoin' | 'Ethereum' | 'Polygon' | 'Arbitrum' | 'Optimism' | 'Base';

export interface AddressRules {
  prefix?: string;
  length?: number;
  minLength?: number;
  maxLength?: number;
  regex: RegExp;
}

export interface AssetConfig {
  symbol: Asset;
  name: string;
  chains: Chain[];
  icon?: string;
  isPopular?: boolean;
  description?: string;
  addressRules: AddressRules;
}

export interface TransferDetails {
  testAmount: number;
  sendGasFee: number;
  returnGasFee: number;
  totalAmount: number;
  recipientAddress: string;
  asset: Asset;
  chain: Chain;
  transactionHash?: string;
}

export interface TransferState {
  asset?: Asset;
  chain?: Chain;
  recipientAddress?: string;
  usdAmount?: 1 | 2 | 5 | 10;
  transferDetails?: TransferDetails;
}

export type GasFees = Record<Chain, {
  sendGas: number;
  returnGas: number;
}>;

export type CryptoConversion = Record<Asset, {
  usdPrice: number;
  symbol: string;
}>;

// Mock conversion rates and gas fees
export const CRYPTO_RATES: CryptoConversion = {
  'ETH': { usdPrice: 2000, symbol: 'ETH' },
  'BTC': { usdPrice: 40000, symbol: 'BTC' },
  'USDC': { usdPrice: 1, symbol: 'USDC' },
  'USDT': { usdPrice: 1, symbol: 'USDT' }
};

export const GAS_FEES: GasFees = {
  'Ethereum': { sendGas: 0.25, returnGas: 0.25 },
  'Bitcoin': { sendGas: 0.15, returnGas: 0.15 },
  'Polygon': { sendGas: 0.05, returnGas: 0.05 },
  'Arbitrum': { sendGas: 0.10, returnGas: 0.10 },
  'Optimism': { sendGas: 0.08, returnGas: 0.08 },
  'Base': { sendGas: 0.07, returnGas: 0.07 }
}; 