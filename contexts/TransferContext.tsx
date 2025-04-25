'use client';

import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';

import { useTransferForm } from '@/hooks/useTransferForm';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { usePriceData } from '@/hooks/usePriceData';
import { useToast } from '@/hooks/useToast';
import { TransferContextValue } from '@/types/transfer.types';

const TransferContext = createContext<TransferContextValue | undefined>(undefined);

export const TransferProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    publicKey,
    connected,
    connecting,
    sendTransaction,
    disconnect: walletDisconnect,
  } = useSolanaWallet();
  const { balance, isLoadingBalance, isRefreshingBalance, refreshBalance } = useWalletBalance({
    publicKey,
    connected,
  });

  const {
    solUsdPrice,
    isLoading: isLoadingPrice,
    isError: isPriceError,
    error: priceError,
    refreshPrice,
    getUsdValue,
  } = usePriceData();

  const toast = useToast();

  // Safe wrapper for the wallet disconnect function to prevent port errors
  const disconnect = useCallback(() => {
    try {
      walletDisconnect();
    } catch (error) {
      console.debug('Error disconnecting wallet (safe to ignore):', error);
    }
  }, [walletDisconnect]);

  const {
    isLoading,
    isError,
    error,
    transactionProgress,
    formValues,
    isFormValid,
    isSubmitSuccessful,
    handleValuesChange,
    handleFormSubmit,
    setIsFormValid,
    setIsSubmitSuccessful,
  } = useTransferForm({
    publicKey,
    connected,
    balance,
    sendTransaction,
    refreshBalance,
  });

  const value: TransferContextValue = {
    // Wallet state
    publicKey,
    connected,
    connecting,
    disconnect,

    // Balance state
    balance,
    isLoadingBalance,
    isRefreshingBalance,
    refreshBalance,

    // Price data
    solUsdPrice,
    isLoadingPrice,
    isPriceError,
    priceError,
    refreshPrice,
    getUsdValue,

    // Transfer form state
    isLoading,
    isError,
    error,
    transactionProgress,
    formValues,
    isFormValid,
    isSubmitSuccessful,
    handleValuesChange,
    handleFormSubmit,
    setIsFormValid,
    setIsSubmitSuccessful,

    // Toast utility
    toast,
  };

  return <TransferContext.Provider value={value}>{children}</TransferContext.Provider>;
};

export const useTransferContext = (): TransferContextValue => {
  const context = useContext(TransferContext);
  if (context === undefined) {
    throw new Error('useTransferContext must be used within a TransferProvider');
  }
  return context;
};
