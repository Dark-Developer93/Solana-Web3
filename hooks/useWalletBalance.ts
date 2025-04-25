import { useCallback, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getConnection, lamportsToSol } from '@/lib/solana';
import { useToast } from '@/hooks/useToast';

interface UseWalletBalanceProps {
  publicKey: PublicKey | null;
  connected: boolean;
}

const FIVE_MINUTES = 1000 * 60 * 5;
const TWO_MINUTES = 1000 * 60 * 2;

export function useWalletBalance({ publicKey, connected }: UseWalletBalanceProps) {
  const [lastPublicKey, setLastPublicKey] = useState<string | undefined>(undefined);
  const toast = useToast();

  const fetchBalance = useCallback(async () => {
    if (!publicKey || !connected) {
      return undefined;
    }

    try {
      const connection = getConnection();
      const balanceInLamports = await connection.getBalance(publicKey);
      const solBalance = lamportsToSol(balanceInLamports);

      if (publicKey) {
        setLastPublicKey(publicKey.toString());
      }

      return solBalance;
    } catch (error) {
      toast.walletError.balance();
      throw error;
    }
  }, [publicKey, connected, toast.walletError]);

  const {
    data: balance,
    isLoading: isLoadingBalance,
    refetch,
  } = useQuery({
    queryKey: ['wallet-balance', publicKey?.toString()],
    queryFn: fetchBalance,
    enabled: !!publicKey && connected,
    staleTime: FIVE_MINUTES,
    refetchInterval: TWO_MINUTES,
  });

  const refreshBalanceMutation = useMutation({
    mutationFn: async () => {
      await refetch();
    },
  });

  const didWalletChange = useCallback(() => {
    if (!publicKey) return false;
    const currentKey = publicKey.toString();
    return lastPublicKey !== currentKey;
  }, [publicKey, lastPublicKey]);

  return {
    balance,
    isLoadingBalance,
    isRefreshingBalance: refreshBalanceMutation.isPending,
    fetchBalance: refetch,
    silentFetchBalance: refetch,
    refreshBalance: refreshBalanceMutation.mutate,
    didWalletChange,
  };
}
