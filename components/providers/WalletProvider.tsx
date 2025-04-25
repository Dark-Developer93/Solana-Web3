'use client';

import React, { ReactNode, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider as WalletProviderBase,
  useWallet,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import the wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletEventsListener = () => {
  const { wallet } = useWallet();

  useEffect(() => {
    if (!wallet) return;

    const onDisconnect = () => {
      try {
        toast.info('Wallet disconnected', {
          id: 'wallet-disconnect',
          duration: 3000,
        });
      } catch (error) {
        // Silent catch to prevent "disconnected port" errors from bubbling up
        console.debug('Error in disconnect handler (safe to ignore):', error);
      }
    };

    const onError = (error: WalletError) => {
      try {
        toast.error(`Wallet error: ${error.message}`, {
          id: 'wallet-error',
          duration: 5000,
        });
      } catch (e) {
        // Silent catch to prevent "disconnected port" errors from bubbling up
        console.debug('Error in error handler (safe to ignore):', e);
      }
    };

    // Add event listeners
    wallet.adapter.on('disconnect', onDisconnect);
    wallet.adapter.on('error', onError);

    // Remove event listeners on cleanup
    return () => {
      try {
        wallet.adapter.off('disconnect', onDisconnect);
        wallet.adapter.off('error', onError);
      } catch (error) {
        // Silent catch to prevent "disconnected port" errors from bubbling up
        console.debug('Error removing event listeners (safe to ignore):', error);
      }
    };
  }, [wallet]);

  return undefined;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // No need to specify wallets - this allows auto-detection of all compatible wallets
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProviderBase wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletEventsListener />
          {children}
        </WalletModalProvider>
      </WalletProviderBase>
    </ConnectionProvider>
  );
};

export default WalletProvider;
