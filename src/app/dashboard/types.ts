/**
 * Dashboard types
 */

export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'expired';
export type USDAmount = 1 | 2 | 5 | 10;

export interface Transaction {
  id: string;
  status: TransactionStatus;
  usdAmount: USDAmount;
  assetAmount: string;
  asset: string;
  chain: string;
  recipientAddress: string;
  createdAt: string;
  expiresAt: string;
  returnedAt?: string;
} 