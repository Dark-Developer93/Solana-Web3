/**
 * Utilities for price calculations and formatting
 */

/**
 * Calculate USD value from SOL amount
 * @param solAmount Amount in SOL
 * @param solUsdPrice Current SOL price in USD
 * @returns Formatted USD value string or undefined if inputs are invalid
 */
export function calculateUsdValue(
  solAmount: number | undefined | undefined,
  solUsdPrice: number | undefined | undefined
): string | undefined {
  if (!solAmount || !solUsdPrice || solUsdPrice <= 0) {
    return undefined;
  }

  const usdValue = solAmount * solUsdPrice;

  if (usdValue < 0.01 && usdValue > 0) {
    return '<$0.01';
  }

  if (usdValue >= 1000) {
    return usdValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  }

  return usdValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: usdValue < 1 ? 2 : 0,
    maximumFractionDigits: usdValue < 10 ? 2 : usdValue < 100 ? 1 : 0,
  });
}
