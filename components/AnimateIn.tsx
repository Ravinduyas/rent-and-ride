"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 50, rotateX: 8 },
    show:   { opacity: 1, y: 0,  rotateX: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    show:   { opacity: 1, y: 0   },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    show:   { opacity: 1, x: 0   },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60  },
    show:   { opacity: 1, x: 0   },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.85 },
    show:   { opacity: 1, scale: 1    },
  },
  flipUp: {
    hidden: { opacity: 0, rotateX: 40, y: 40 },
    show:   { opacity: 1, rotateX: 0,  y: 0  },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    show:   { opacity: 1 },
  },
} as const;

type Variant = keyof typeof VARIANTS;

export default function AnimateIn({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.65,
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={VARIANTS[variant]}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
