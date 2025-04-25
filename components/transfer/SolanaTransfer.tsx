'use client';

import React from 'react';

import { TransferButton } from '@/components/transfer/TransferButton';
import { TransferHeader } from '@/components/transfer/TransferHeader';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import WalletContent from '@/components/wallet/WalletContent';
import { useTransferContext } from '@/contexts/TransferContext';

const SolanaTransfer = () => {
  const { connected } = useTransferContext();
  return (
    <Card className="border-border/40 shadow-lg bg-background/60 backdrop-blur-sm">
      <CardHeader>
        <TransferHeader />
      </CardHeader>
      <CardContent className="space-y-4">
        <WalletContent />
      </CardContent>
      <CardFooter>{connected ? <TransferButton /> : null}</CardFooter>
    </Card>
  );
};

export default SolanaTransfer;
