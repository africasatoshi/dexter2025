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

export interface TransferState {
  asset?: Asset;
  chain?: Chain;
  recipientAddress?: string;
  usdAmount?: 1 | 2 | 5 | 10;
} 