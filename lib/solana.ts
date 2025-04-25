import {
  PublicKey,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
} from '@solana/web3.js';

type TransferTransactionParams = {
  senderPublicKey: PublicKey;
  recipientAddress: string;
  amount: number;
};

type SolanaNetwork = 'mainnet-beta' | 'testnet' | 'devnet';

const SOLANA_NETWORKS = {
  MAINNET: 'mainnet-beta' as SolanaNetwork,
  TESTNET: 'testnet' as SolanaNetwork,
  DEVNET: 'devnet' as SolanaNetwork,
};

export const DEFAULT_NETWORK = SOLANA_NETWORKS.DEVNET;

export const getConnection = (network: SolanaNetwork = DEFAULT_NETWORK): Connection => {
  return new Connection(clusterApiUrl(network), 'confirmed');
};

export const isValidSolanaAddress = (address: string): boolean => {
  try {
    if (address.length !== 44) return false;
    new PublicKey(address);
    return true;
  } catch (error) {
    console.error('Error validating Solana address:', error);
    return false;
  }
};

export const formatAddress = (address: string, startChars = 4, endChars = 4): string => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

export const lamportsToSol = (lamports: number): number => {
  return lamports / LAMPORTS_PER_SOL;
};

export const solToLamports = (sol: number): number => {
  return sol * LAMPORTS_PER_SOL;
};

export const getExplorerUrl = (
  signature: string,
  network: SolanaNetwork = DEFAULT_NETWORK
): string => {
  const baseUrl = 'https://explorer.solana.com';
  return `${baseUrl}/tx/${signature}?cluster=${network}`;
};

/**
 * Creates a SOL transfer transaction
 *
 * @param params Parameters for the transaction
 * @returns The prepared transaction and blockhash
 */
export const createTransferTransaction = async ({
  senderPublicKey,
  recipientAddress,
  amount,
}: TransferTransactionParams): Promise<{
  transaction: Transaction;
  blockhash: string;
}> => {
  const connection = getConnection();
  const recipientPubKey = new PublicKey(recipientAddress);
  const lamports = solToLamports(amount);
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: recipientPubKey,
      lamports,
    })
  );

  const { blockhash } = await connection.getLatestBlockhash();

  transaction.recentBlockhash = blockhash;
  transaction.feePayer = senderPublicKey;

  return { transaction, blockhash };
};
