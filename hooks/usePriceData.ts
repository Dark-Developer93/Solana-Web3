'use client';

import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { calculateUsdValue } from '@/lib/price';

const FIVE_MINUTES = 1000 * 60 * 5;
const CURRENCY = 'usd';
const SOL_ID = 'solana';
const SOL_PRICE_API_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${SOL_ID}&vs_currencies=${CURRENCY}`;

interface PriceData {
  solUsdPrice: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | undefined;
  refreshPrice: () => Promise<void>;
  getUsdValue: (solAmount: number) => string | undefined;
}

/**
 * Fetch the current SOL price from CoinGecko API
 * @returns The current SOL price in USD
 */
async function fetchSolPrice(): Promise<number> {
  const response = await fetch(SOL_PRICE_API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch price data: ${response.status}`);
  }

  const data = await response.json();

  if (!data.solana || !data.solana.usd) {
    throw new Error('No Price Data Found');
  }

  return data.solana.usd;
}

/**
 * Hook for handling SOL price data and USD conversions
 */
export function usePriceData(): PriceData {
  const queryClient = useQueryClient();

  const {
    data: solUsdPrice = 0,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['solPrice'],
    queryFn: fetchSolPrice,
    staleTime: FIVE_MINUTES,
    retry: 2,
  });

  const refreshPrice = useCallback(async (): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: ['solPrice'] });
  }, [queryClient]);

  const getUsdValue = useCallback(
    (solAmount: number): string | undefined => {
      return calculateUsdValue(solAmount, solUsdPrice);
    },
    [solUsdPrice]
  );

  return {
    solUsdPrice,
    isLoading,
    isError,
    error: error instanceof Error ? error : undefined,
    refreshPrice,
    getUsdValue,
  };
}
