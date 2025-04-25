'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { AnimatedContainer } from '@/components/AnimatedContainer';

// Nextjs hydration error fix
const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  {
    ssr: false,
    loading: () => {
      return (
        <AnimatedContainer variant="fadeIn">
          <div className="bg-primary/10 border border-primary/20 rounded-md animate-pulse flex items-center w-[173.47px] h-[48px] px-3 gap-2">
            <div className="rounded-full bg-primary/30 w-6 h-6" />
            <div className="h-4 bg-primary/10 rounded-sm w-24" />
          </div>
        </AnimatedContainer>
      );
    },
  }
);

export const WalletButton = () => {
  return (
    <AnimatedContainer variant="scale" className="inline-block">
      <WalletMultiButton className="custom-wallet-button" />
    </AnimatedContainer>
  );
};
