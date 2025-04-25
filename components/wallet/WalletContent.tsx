'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

import { TransactionProgress } from '@/components/transfer/TransactionProgress';
import { TransferForm } from '@/components/transfer/TransferForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { WalletConnectionSection } from '@/components/wallet/WalletConnectionSection';
import { WalletStatus } from '@/components/wallet/WalletStatus';
import { useTransferContext } from '@/contexts/TransferContext';

const WalletContent = () => {
  const { connected, isError, error } = useTransferContext();

  if (!connected) {
    return <WalletConnectionSection />;
  }

  return (
    <>
      <WalletStatus />

      <Separator />

      {isError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || 'An error occurred while processing your transaction.'}
          </AlertDescription>
        </Alert>
      )}

      <TransferForm />

      <TransactionProgress />
    </>
  );
};

export default WalletContent;
