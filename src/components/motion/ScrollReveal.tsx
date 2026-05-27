'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useReducedMotionSafe } from '../../lib/hooks/useReducedMotionSafe';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  stagger?: number;
  as?: 'div' | 'section' | 'article' | 'header' | 'aside';
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className,
  stagger,
  as = 'div',
  once = true,
}: ScrollRevealProps) {
  const reduced = useReducedMotionSafe();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    const Static = as as 'div';
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay,
        ...(stagger ? { staggerChildren: stagger, delayChildren: delay } : {}),
      }}
    >
      {children}
    </Tag>
  );
}

export const revealItem = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};