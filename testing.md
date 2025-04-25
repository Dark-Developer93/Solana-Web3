### Running and Testing the Solana Wallet App

To fully run and test the app, you'll need a few additional things and follow specific steps. Here's what's missing and how to test the application:

## What's Missing

### 1. Package Dependencies

You need to install the required Solana packages. Add these to your project:

```shellscript
pnpm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets
```

### 2. DevNet SOL for Testing

You'll need some DevNet SOL to test transactions. DevNet SOL has no real value and is used specifically for testing.

### 3. A Solana Wallet Browser Extension

You need to have at least one of these wallet extensions installed in your browser:

- [Phantom](https://phantom.app/)
- [Solflare](https://solflare.com/)

## How to Run the App

1. Install dependencies:

```shellscript
pnpm install
```

2. Run the development server:

```shellscript
pnpm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Test the App

### Step 1: Connect Your Wallet

1. Make sure you have a Solana wallet extension installed (Phantom or Solflare recommended)
2. Click the "Connect Wallet" button on the app
3. Select your wallet from the modal
4. Approve the connection in your wallet extension

### Step 2: Get DevNet SOL

Before testing transactions, you need some DevNet SOL:

1. Switch your wallet to Devnet:

1. In Phantom: Settings → Developer Settings → Change Network → Devnet
1. In Solflare: Settings → Network → Devnet

1. Get free DevNet SOL from a faucet:

1. Visit [Solana Faucet](https://faucet.solana.com/)
1. Enter your wallet address and request SOL
1. Or use the Solana CLI: `solana airdrop 2 YOUR_WALLET_ADDRESS --url devnet`

### Step 3: Test Sending SOL

1. Enter a recipient address:

1. You can use another wallet address you own
1. Or create a new wallet for testing

1. Enter an amount to send (less than your balance)
1. Click "Send SOL"
1. Approve the transaction in your wallet extension
1. Wait for the transaction to complete

1. You should see a progress indicator
1. After completion, you'll see a success toast with a link to the transaction on Solana Explorer

### Step 4: Verify the Transaction

1. Click the "View on Solana Explorer" link in the success toast
2. Confirm the transaction details on Solana Explorer
3. Check your wallet balance to see that it has decreased by the sent amount (plus a small transaction fee)

## Common Testing Issues and Solutions

1. **Wallet Connection Issues**:

   - Make sure your wallet extension is up to date
   - Try refreshing the page
   - Check if your wallet is on the Devnet network

1. **Transaction Failures**:

   - Ensure you have enough SOL for the transaction plus fees
   - Check that the recipient address is valid
   - Verify your wallet is on Devnet, not Mainnet or Testnet

1. **Balance Not Updating**:

   - The balance should update automatically after a transaction
   - If not, try refreshing the page
   - Check the transaction on Solana Explorer to confirm it was successful

1. **Slow Transactions**:
   - DevNet can sometimes be slower than Mainnet
   - Wait for the transaction to complete before attempting another one

## Testing on Mobile

To test on mobile devices:

1. Run your development server with the local network exposed:

```shellscript
pnpm run dev -- --host
```

2. Find your computer's local IP address
3. On your mobile device, connect to the same network and visit:
   `http://YOUR_LOCAL_IP:3000`
4. Use a mobile wallet app like Phantom or Solflare

By following these steps, you should be able to fully run and test the Solana wallet application. The app is designed to work on both desktop and mobile devices, so you can test the responsive design as well.
