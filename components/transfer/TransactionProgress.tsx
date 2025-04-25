import { useMemo } from 'react';
import { motion } from 'framer-motion';

import { AnimatedContainer } from '@/components/AnimatedContainer';
import { Progress } from '@/components/ui/progress';
import { useTransferContext } from '@/contexts/TransferContext';

export const TransactionProgress = () => {
  const { transactionProgress, isLoading } = useTransferContext();

  const finalProgress = transactionProgress !== undefined ? transactionProgress : 0;

  const progressAnimation = useMemo(
    () => ({
      initial: { scale: 1.2, opacity: 0.7 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.2 },
    }),
    []
  );

  if (!isLoading) return undefined;

  return (
    <AnimatedContainer variant="slideUp" className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Processing transaction...</span>
        <motion.span className="text-sm font-medium" key={finalProgress} {...progressAnimation}>
          {finalProgress}%
        </motion.span>
      </div>
      <Progress value={finalProgress} className="h-2 w-full" />
    </AnimatedContainer>
  );
};
