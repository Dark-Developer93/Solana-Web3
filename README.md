# AlphaNeural Frontend Challenge

A Next.js application that allows users to connect their Solana wallet and transfer SOL to another address.

## Project Overview

This project implements:

- Wallet connection using Solana wallet adapter
- SOL transfer functionality
- Transaction validation and notifications

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How to Test the App

### Prerequisites

1. Install a Solana wallet extension:

   - [Phantom](https://phantom.app/)
   - [Solflare](https://solflare.com/)

2. Get DevNet SOL:
   - Switch your wallet to Devnet in wallet settings
   - Visit [Solana Faucet](https://faucet.solana.com/) to request SOL
   - Or use CLI: `solana airdrop 2 YOUR_WALLET_ADDRESS --url devnet`

### Testing Steps

1. **Connect Your Wallet**

   - Click "Connect Wallet" button
   - Select your wallet from the modal
   - Approve the connection

2. **Send SOL**
   - Enter a recipient wallet address
   - Enter the amount to send
   - Click "Send SOL"
   - Approve the transaction in your wallet
3. **Verify Transaction**
   - Check the success notification
   - Click the link to view transaction on Solana Explorer
   - Verify your wallet balance has updated

## Troubleshooting

- **Wallet Connection Issues**: Ensure wallet extension is up-to-date and set to Devnet
- **Transaction Failures**: Verify you have enough SOL for transaction plus fees
- **Balance Not Updating**: Try refreshing the page

## Technologies Used

- Next.js latest version with app router
- Solana Web3.js
- Solana Wallet Adapter
- TailwindCSS v4
- Shadcn UI
- framer-motion
- sonner
- react-hook-form
- React Query
- zod
- next-themes
- TypeScript

## Learn More

- [Solana Documentation](https://docs.solana.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Solana Web3.js](https://github.com/solana-foundation/solana-web3.js)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [Zod](https://zod.dev/)
- [Next Themes](https://github.com/pacocoursey/next-themes)
