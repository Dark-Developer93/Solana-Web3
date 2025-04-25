'use client';

import React from 'react';
import { Loader2, Wallet } from 'lucide-react';

import { WalletButton } from '@/components/wallet/WalletButton';
import { useTransferContext } from '@/contexts/TransferContext';

export const WalletConnectionSection: React.FC = () => {
  const { connecting } = useTransferContext();

  if (connecting) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-center text-sm text-muted-foreground">Connecting to wallet...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-5 py-8">
      <div className="rounded-full bg-gradient-to-r from-primary/20 to-purple-400/20 p-4">
        <Wallet className="h-8 w-8 text-primary" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium mb-1">Connect Your Wallet</h3>
        <p className="text-sm text-muted-foreground">
          Connect to manage your wallet and initiate transfers
        </p>
      </div>
      <div className="wallet-adapter-button-container">
        <WalletButton />
      </div>
    </div>
  );
};
