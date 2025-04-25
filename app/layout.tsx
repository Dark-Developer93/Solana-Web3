import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';

import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { WalletProvider } from '@/components/providers/WalletProvider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solana Wallet dApp',
  description: 'Transfer SOL to any address',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <WalletProvider>{children}</WalletProvider>
          </QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
