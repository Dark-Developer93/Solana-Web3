import { z } from 'zod';

import { isValidSolanaAddress } from '@/lib/solana';

// Define the base schema type first
export const transferFormSchema = z.object({
  recipient: z
    .string()
    .min(1, 'Recipient address is required')
    .refine(val => isValidSolanaAddress(val), {
      message: 'Invalid Solana address format',
    }),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(val => !isNaN(Number.parseFloat(val)), {
      message: 'Amount must be a number',
    })
    .refine(val => Number.parseFloat(val) > 0, {
      message: 'Amount must be greater than 0',
    }),
});

// Define the type from the base schema
export type TransferFormValues = z.infer<typeof transferFormSchema>;

// Create a function that returns a schema with additional refinements
export const createTransferFormSchema = (maxAmount: number | undefined) => {
  return transferFormSchema.extend({
    amount: transferFormSchema.shape.amount.refine(
      val => maxAmount === undefined || Number.parseFloat(val) <= maxAmount,
      {
        message: 'Amount exceeds balance',
      }
    ),
  });
};
