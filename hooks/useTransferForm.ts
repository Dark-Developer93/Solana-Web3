'use client';

import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import { TransferFormValues } from '@/schemas/transfer-form';
import { useToast } from '@/hooks/useToast';
import { useWalletTransfer } from '@/hooks/useWalletTransfer';
import { isValidSolanaAddress } from '@/lib/solana';

interface UseTransferFormProps {
  publicKey: any;
  connected: boolean;
  balance: number | undefined;
  sendTransaction: any;
  refreshBalance?: () => void;
}

export function useTransferForm({
  publicKey,
  connected,
  balance,
  sendTransaction,
  refreshBalance,
}: UseTransferFormProps) {
  const toast = useToast();
  const [transactionProgress, setTransactionProgress] = useState(0);
  const [formValues, setFormValues] = useState<TransferFormValues>({
    recipient: '',
    amount: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const lastPublicKeyRef = useRef<string | null>(null);

  const { transferSol, isTransferring, transferError } = useWalletTransfer({
    publicKey,
    connected,
    balance,
    sendTransaction,
  });

  const transferMutation = useMutation({
    mutationFn: async (values: TransferFormValues) => {
      return transferSol({
        recipient: values.recipient,
        amount: Number(values.amount),
        onProgress: progress => setTransactionProgress(progress),
      });
    },
    onSuccess: (result, values) => {
      if (result.success) {
        setIsSubmitSuccessful(true);
        setFormValues({ recipient: '', amount: '' });
        setIsFormValid(false);

        if (refreshBalance) {
          refreshBalance();
        }

        if (result.explorerUrl) {
          toast.transactionSuccess(values.amount, values.recipient, result.explorerUrl);
        } else {
          toast.success('Transfer completed successfully');
        }
      } else {
        toast.error(result.error || 'Transaction failed');
      }
    },
    onError: err => {
      toast.error(err instanceof Error ? err.message : 'An unexpected error occurred');
    },
  });

  useEffect(() => {
    const currentPublicKey = publicKey?.toString() || null;
    if (lastPublicKeyRef.current && currentPublicKey !== lastPublicKeyRef.current) {
      setIsSubmitSuccessful(true);
      setFormValues({ recipient: '', amount: '' });
      setIsFormValid(false);
    }
    lastPublicKeyRef.current = currentPublicKey;
  }, [publicKey]);

  useEffect(() => {
    if (transferError) {
      toast.error(
        transferError instanceof Error
          ? transferError.message
          : 'An error occurred during the transfer'
      );
    }
  }, [transferError, toast]);

  const handleValuesChange = (values: TransferFormValues) => {
    setFormValues(values);

    // Enhanced validation to check if amount is valid
    const isRecipientValid =
      values.recipient.trim() !== '' && isValidSolanaAddress(values.recipient);
    const amountValue = parseFloat(values.amount);
    const isAmountValid =
      values.amount.trim() !== '' &&
      !isNaN(amountValue) &&
      amountValue > 0 &&
      (balance === undefined || amountValue <= balance);

    setIsFormValid(isRecipientValid && isAmountValid);

    if (isSubmitSuccessful) {
      setIsSubmitSuccessful(false);
    }
  };

  const handleFormSubmit = async (values: TransferFormValues) => {
    transferMutation.mutate(values);
  };

  return {
    isLoading: isTransferring || transferMutation.isPending,
    isError: transferMutation.isError,
    error: transferMutation.error
      ? transferMutation.error instanceof Error
        ? transferMutation.error.message
        : 'An unexpected error occurred'
      : null,
    transactionProgress,
    formValues,
    isFormValid,
    isSubmitSuccessful,
    handleValuesChange,
    handleFormSubmit,
    setIsFormValid,
    setIsSubmitSuccessful,
  };
}
