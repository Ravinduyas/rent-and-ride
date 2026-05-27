'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { useReducedMotionSafe } from '../../lib/hooks/useReducedMotionSafe';

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.6,
  format,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => setDisplay(n),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  const formatted = format ? format(display) : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className={className} aria-live="polite">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}