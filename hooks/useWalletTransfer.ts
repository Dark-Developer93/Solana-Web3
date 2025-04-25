'use client';

import { PublicKey } from '@solana/web3.js';
import { type WalletAdapterProps } from '@solana/wallet-adapter-base';
import { useMutation } from '@tanstack/react-query';

import { DEFAULT_NETWORK, getConnection, getExplorerUrl } from '@/lib/solana';
import { createTransferTransaction } from '@/lib/solana';

interface TransferSolParams {
  recipient: string;
  amount: number;
  onProgress?: (progress: number) => void;
}

interface TransferResult {
  success: boolean;
  error?: string;
  signature?: string;
  explorerUrl?: string;
}

interface UseWalletTransferProps {
  publicKey: PublicKey | null;
  connected: boolean;
  balance: number | undefined;
  sendTransaction: WalletAdapterProps['sendTransaction'];
}

export function useWalletTransfer({
  publicKey,
  connected,
  balance,
  sendTransaction,
}: UseWalletTransferProps) {
  const transferMutation = useMutation({
    mutationFn: async ({
      recipient,
      amount,
      onProgress,
    }: TransferSolParams): Promise<TransferResult> => {
      onProgress?.(0);

      try {
        if (!connected || !publicKey) {
          return { success: false, error: 'Wallet not connected' };
        }

        if (!balance || balance < amount) {
          return { success: false, error: 'Insufficient balance' };
        }

        onProgress?.(10);

        const { transaction } = await createTransferTransaction({
          senderPublicKey: publicKey,
          recipientAddress: recipient,
          amount,
        });

        onProgress?.(40);

        if (!connected) {
          onProgress?.(0);
          return { success: false, error: 'Wallet disconnected' };
        }

        const connection = getConnection();
        const signature = await sendTransaction(transaction, connection);

        onProgress?.(70);

        if (!connected) {
          onProgress?.(0);
          return {
            success: false,
            error: 'Wallet disconnected during transaction',
            signature,
            explorerUrl: getExplorerUrl(signature, DEFAULT_NETWORK),
          };
        }

        await connection.confirmTransaction(signature, 'confirmed');

        onProgress?.(100);

        return {
          success: true,
          signature,
          explorerUrl: getExplorerUrl(signature, DEFAULT_NETWORK),
        };
      } catch (error) {
        onProgress?.(0);

        if (!connected) {
          return { success: false, error: 'Wallet disconnected during transaction' };
        }

        return {
          success: false,
          error: error instanceof Error ? error.message : 'Transaction failed',
        };
      }
    },
  });

  const transferSol = async (params: TransferSolParams): Promise<TransferResult> => {
    return transferMutation.mutateAsync(params);
  };

  return {
    transferSol,
    isTransferring: transferMutation.isPending,
    transferError: transferMutation.error,
    transferReset: transferMutation.reset,
  };
}
