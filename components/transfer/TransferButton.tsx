'use client';

import React from 'react';
import { Send, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTransferContext } from '@/contexts/TransferContext';
import { cn } from '@/lib/utils';

export const TransferButton = () => {
  const { isLoading, isFormValid, formValues, handleFormSubmit } = useTransferContext();

  const handleSendSolButtonClick = () => {
    if (isFormValid && !isLoading) {
      handleFormSubmit(formValues);
    }
  };

  return (
    <Button
      className={cn(
        'w-full bg-[#9333ea] text-white font-semibold transition-all duration-200 cursor-pointer',
        isLoading ? 'opacity-80' : 'hover:bg-purple-400 hover:shadow-md',
        !isFormValid && !isLoading && 'opacity-70'
      )}
      onClick={handleSendSolButtonClick}
      disabled={isLoading || !isFormValid}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span className="animate-pulse">Processing Transaction...</span>
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          {isFormValid ? 'Send SOL' : 'Complete Form to Send'}
        </>
      )}
    </Button>
  );
};
