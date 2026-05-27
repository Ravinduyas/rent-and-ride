'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

export default function RouteProgressBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const t = window.setTimeout(() => setActive(false), 700);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {active && (
          <motion.div
            key={pathname}
            initial={{ scaleX: 0, transformOrigin: '0% 50%' }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%]"
            style={{ width: '100%' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
