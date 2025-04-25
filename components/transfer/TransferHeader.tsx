'use client';

import { RefreshCw } from 'lucide-react';
import React, { useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { useTransferContext } from '@/contexts/TransferContext';
import { getNetworkConfig } from '@/lib/network';

export const TransferHeader = () => {
  const networkConfig = getNetworkConfig();
  const { solUsdPrice, isPriceError, priceError, isLoadingPrice, refreshPrice, toast } =
    useTransferContext();

  useEffect(() => {
    if (isPriceError && priceError) {
      toast.error(
        priceError instanceof Error
          ? priceError.message
          : 'An error occurred while fetching price data.'
      );
    }
  }, [isPriceError, priceError, toast]);

  return (
    <div className="space-y-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <CardTitle className="text-2xl gradient-text">SOL Transfer</CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={`${networkConfig.isTestnet ? 'bg-primary/10' : 'bg-green-500/10'}`}
          >
            {networkConfig.displayName}
          </Badge>
          {solUsdPrice > 0 && (
            <div className="flex items-center">
              <Badge variant="outline" className="bg-green-500/10 text-xs whitespace-nowrap">
                1 SOL = ${solUsdPrice.toFixed(2)} USD
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 ml-1 flex-shrink-0 cursor-pointer"
                onClick={() => refreshPrice()}
                disabled={isLoadingPrice}
                title="Refresh SOL price"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoadingPrice ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          )}
        </div>
      </div>
      <CardDescription>Fast and secure transactions on Solana</CardDescription>
    </div>
  );
};
