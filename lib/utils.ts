import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ErrorType =
  | 'disconnected'
  | 'not_connected'
  | 'transaction_error'
  | 'validation_error'
  | 'unknown';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getErrorType = (error: string, hasSignature: boolean): ErrorType => {
  if (error.includes('disconnected')) return 'disconnected';
  if (error.includes('not connected')) return 'not_connected';
  if (hasSignature) return 'transaction_error';
  return 'validation_error';
};
