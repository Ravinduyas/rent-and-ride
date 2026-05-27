'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

export default function FleetHeroIntro({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto"
    >
      {children}
    </motion.div>
  );
}
