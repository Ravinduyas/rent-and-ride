'use client';

import { ReactNode, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Link from 'next/link';
import { useReducedMotionSafe } from '../../lib/hooks/useReducedMotionSafe';

interface MagneticButtonProps {
  children: ReactNode;
  /** Internal route — passed to next/link as `href`. Kept as `to` for callsite stability. */
  to?: string;
  /** External URL — rendered as a plain `<a>`. */
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  className,
  strength = 0.4,
  type = 'button',
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });
  const reduced = useReducedMotionSafe();

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {to ? (
        <Link href={to} className={className} aria-label={ariaLabel}>
          {children}
        </Link>
      ) : href ? (
        <a href={href} className={className} aria-label={ariaLabel}>
          {children}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={className} aria-label={ariaLabel}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
