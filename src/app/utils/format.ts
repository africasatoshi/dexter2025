import type { Asset } from '@/app/transfer/types';
import { CRYPTO_RATES } from '@/app/transfer/types';

export const formatUSD = (amount: number) => `$${amount.toFixed(2)}`;

export const formatCrypto = (usdAmount: number, asset: Asset) => {
  const rate = CRYPTO_RATES[asset];
  const cryptoAmount = usdAmount / rate.usdPrice;
  return `(${cryptoAmount.toFixed(6)} ${rate.symbol})`;
}; 