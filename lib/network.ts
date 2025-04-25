/**
 * Solana network configuration utilities
 */

export type SolanaNetwork = 'mainnet-beta' | 'testnet' | 'devnet';

export interface NetworkConfig {
  name: SolanaNetwork;
  displayName: string;
  endpoint: string;
  explorerUrl: string;
  isTestnet: boolean;
}

// Network configurations
const NETWORK_CONFIGS: Record<SolanaNetwork, NetworkConfig> = {
  'mainnet-beta': {
    name: 'mainnet-beta',
    displayName: 'Mainnet',
    endpoint: 'https://api.mainnet-beta.solana.com',
    explorerUrl: 'https://explorer.solana.com',
    isTestnet: false,
  },
  testnet: {
    name: 'testnet',
    displayName: 'Testnet',
    endpoint: 'https://api.testnet.solana.com',
    explorerUrl: 'https://explorer.solana.com/?cluster=testnet',
    isTestnet: true,
  },
  devnet: {
    name: 'devnet',
    displayName: 'Devnet',
    endpoint: 'https://api.devnet.solana.com',
    explorerUrl: 'https://explorer.solana.com/?cluster=devnet',
    isTestnet: true,
  },
};

// Default network to use
const DEFAULT_NETWORK: SolanaNetwork = 'devnet';

// Current active network
let currentNetwork: SolanaNetwork = DEFAULT_NETWORK;

/**
 * Get the current network configuration
 */
export function getNetworkConfig(): NetworkConfig {
  return NETWORK_CONFIGS[currentNetwork];
}

/**
 * Set the current network
 */
export function setNetwork(network: SolanaNetwork): void {
  currentNetwork = network;
}

/**
 * Get the current active network
 */
export function getCurrentNetwork(): SolanaNetwork {
  return currentNetwork;
}
