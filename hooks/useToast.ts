'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { formatAddress } from '@/lib/solana';

// Standard durations
const DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
};

export interface ToastOptions {
  duration?: number;
  id?: string;
}

export const useToast = () => {
  // Success toasts
  const success = useCallback((message: string, options?: ToastOptions) => {
    toast.success(message, {
      id: options?.id || 'success-toast',
      duration: options?.duration || DURATION.MEDIUM,
    });
  }, []);

  // Transaction success with explorer link
  const transactionSuccess = useCallback(
    (amount: string, recipient: string, explorerUrl: string) => {
      toast.success(`Successfully sent ${amount} SOL to ${formatAddress(recipient)}`, {
        id: 'transaction-success',
        duration: DURATION.MEDIUM,
        action: {
          label: 'View on Explorer',
          onClick: () => window.open(explorerUrl, '_blank'),
        },
      });
    },
    []
  );

  // Error toasts
  const error = useCallback((message: string, options?: ToastOptions) => {
    toast.error(message, {
      id: options?.id || 'error-toast',
      duration: options?.duration || DURATION.MEDIUM,
    });
  }, []);

  // Transaction error with explorer link
  const transactionError = useCallback((message: string, explorerUrl?: string) => {
    toast.error(message || 'Transaction may not have completed', {
      id: 'transaction-error',
      duration: DURATION.MEDIUM,
      ...(explorerUrl && {
        action: {
          label: 'View on Explorer',
          onClick: () => window.open(explorerUrl, '_blank'),
        },
      }),
    });
  }, []);

  // Wallet-specific notifications
  const walletError = {
    balance: useCallback(() => {
      error('Failed to fetch wallet balance. Please try again.', {
        id: 'balance-error',
        duration: DURATION.MEDIUM,
      });
    }, [error]),

    disconnected: useCallback(() => {
      error('Wallet disconnected during transaction', {
        id: 'wallet-disconnect-error',
        duration: DURATION.SHORT,
      });
    }, [error]),

    validation: useCallback(
      (errorMessage: string) => {
        error(errorMessage, {
          id: 'transfer-validation-error',
          duration: DURATION.MEDIUM,
        });
      },
      [error]
    ),
  };

  return {
    success,
    error,
    transactionSuccess,
    transactionError,
    walletError,
    DURATION,
  };
};
