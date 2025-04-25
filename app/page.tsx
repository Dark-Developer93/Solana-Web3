'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { AnimatedContainer } from '@/components/AnimatedContainer';
import { ThemeToggle } from '@/components/ThemeToggle';
import SolanaTransfer from '@/components/transfer/SolanaTransfer';
import { TransferProvider } from '@/contexts/TransferContext';

export default function Home() {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    }),
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-primary bg-grid-size -z-10" />
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        aria-hidden="true"
      />

      <div className="container mx-auto p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold gradient-text">Solana Transfer</h2>
        <ThemeToggle />
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto flex flex-col items-center justify-center px-6 py-8 md:py-12 flex-grow"
      >
        <div className="w-full max-w-md">
          <AnimatedContainer variant="scale" delay={0.3}>
            <TransferProvider>
              <SolanaTransfer />
            </TransferProvider>
          </AnimatedContainer>
        </div>
      </motion.main>

      <footer className="container mx-auto p-4 text-center text-xs md:text-sm text-muted-foreground mt-8">
        <p>Running on Solana Devnet • Built with Next.js and Shadcn UI</p>
      </footer>
    </div>
  );
}
