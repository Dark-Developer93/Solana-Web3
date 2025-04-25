import React, { forwardRef } from 'react';
import { motion, MotionProps, Variants } from 'framer-motion';

import { cn } from '@/lib/utils';

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const scale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

type AnimationVariant = 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scale';

interface AnimatedContainerProps extends MotionProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  className?: string;
  delay?: number;
  duration?: number;
}

export const variantMap: Record<AnimationVariant, Variants> = {
  fadeIn,
  slideUp,
  slideInLeft,
  slideInRight,
  scale,
};

export const AnimatedContainer = forwardRef<HTMLDivElement, AnimatedContainerProps>(
  ({ children, variant = 'fadeIn', className, delay = 0, duration = 0.3, ...rest }, ref) => {
    const selectedVariant = variantMap[variant];

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={selectedVariant}
        transition={{
          duration,
          delay,
          ease: 'easeOut',
        }}
        className={cn(className)}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedContainer.displayName = 'AnimatedContainer';
