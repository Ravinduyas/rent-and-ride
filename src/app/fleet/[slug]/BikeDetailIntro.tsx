'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function BikeDetailIntro({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Link
        href="/fleet"
        className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-primary transition-colors"
      >
        {children}
      </Link>
    </motion.div>
  );
}
