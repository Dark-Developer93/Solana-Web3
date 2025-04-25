import { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LogOut, RefreshCw } from 'lucide-react';

import { AnimatedContainer } from '@/components/AnimatedContainer';
import { Button } from '@/components/ui/button';
import { useTransferContext } from '@/contexts/TransferContext';
import { formatAddress } from '@/lib/solana';

// Animation presets
const ANIMATIONS = {
  address: {
    initial: { opacity: 0, x: -5 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3 },
  },
  balance: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
  badge: {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2, duration: 0.3 },
  },
};

export const WalletStatus = () => {
  const {
    publicKey,
    balance,
    refreshBalance,
    isLoadingBalance,
    isRefreshingBalance,
    getUsdValue,
    disconnect,
  } = useTransferContext();

  const balanceKey = useMemo(
    () => (balance !== undefined ? balance.toString() : 'no-balance'),
    [balance]
  );

  const usdValue = balance ? getUsdValue(balance) : null;
  const isBalanceLoading = isLoadingBalance || isRefreshingBalance;

  // Handle disconnect with error catching to prevent port disconnection errors
  const handleDisconnect = useCallback(() => {
    try {
      disconnect();
    } catch (error) {
      // Silent catch to prevent "disconnected port" errors from bubbling up
      console.debug('Error disconnecting wallet (safe to ignore):', error);
    }
  }, [disconnect]);

  return (
    <AnimatedContainer variant="slideUp" className="rounded-lg bg-muted p-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Connected Wallet</p>
          {publicKey?.toString() && (
            <motion.div className="flex flex-col" {...ANIMATIONS.address}>
              <div className="flex items-center justify-between">
                <p className="font-medium">{formatAddress(publicKey.toString())}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-1 h-7 w-fit p-2 text-xs text-muted-foreground cursor-pointer group hover:text-red-500/80"
                  onClick={handleDisconnect}
                  title="Disconnect wallet"
                >
                  <LogOut className="h-3.5 w-3.5 mr-1 transition-colors" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
        <div className="text-left sm:text-right">
          <div className="flex items-center justify-between sm:justify-start">
            <p className="text-sm font-medium text-muted-foreground">Balance</p>
          </div>
          <div className="flex items-center space-x-1 sm:justify-end min-h-[24px] min-w-[140px]">
            <motion.div
              className="flex items-center space-x-1 sm:justify-end"
              {...ANIMATIONS.balance}
              key={balanceKey}
            >
              <p key="balance-text" className="font-medium">
                {balance !== undefined ? balance.toFixed(4) : '0.0000'} SOL
              </p>
              {balance !== undefined && balance > 0 && usdValue && (
                <motion.div key="usd-badge" {...ANIMATIONS.badge} className="flex items-center">
                  <div className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground bg-green-500/10 text-xs whitespace-nowrap">
                    ≈ {usdValue}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {refreshBalance && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 cursor-pointer ml-1 flex-shrink-0"
                onClick={() => refreshBalance()}
                disabled={isBalanceLoading}
                title="Refresh balance"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isBalanceLoading ? 'animate-spin' : ''}`} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};
