import { PublicKey } from '@solana/web3.js';

import { TransferFormValues } from '@/schemas/transfer-form';
import { useToast } from '@/hooks/useToast';

export interface TransferContextValue {
  // Wallet state
  publicKey: PublicKey | null;
  connected: boolean;
  connecting: boolean;
  disconnect: () => void;

  // Balance state
  balance: number | undefined;
  isLoadingBalance: boolean;
  isRefreshingBalance: boolean;
  refreshBalance: () => void;

  // Price data
  solUsdPrice: number;
  isLoadingPrice: boolean;
  isPriceError: boolean;
  priceError: Error | undefined;
  refreshPrice: () => Promise<void>;
  getUsdValue: (solAmount: number) => string | undefined;

  // Transfer form state
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  transactionProgress: number;
  formValues: TransferFormValues;
  isFormValid: boolean;
  isSubmitSuccessful: boolean;
  handleValuesChange: (values: TransferFormValues) => void;
  handleFormSubmit: (values: TransferFormValues) => void;
  setIsFormValid: (isValid: boolean) => void;
  setIsSubmitSuccessful: (isSuccessful: boolean) => void;

  // Toast utility
  toast: ReturnType<typeof useToast>;
}
