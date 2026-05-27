'use client';

import { MouseEvent, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Link from 'next/link';
import { Play, Bike, ChevronRight } from 'lucide-react';
import MagneticButton from './motion/MagneticButton';
import { useReducedMotionSafe } from '../lib/hooks/useReducedMotionSafe';
import { HERO_RIDE, HERO_RIDE_ALT, fallbackGradient } from '../lib/images';

export default function HeroSection() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const reduced = useReducedMotionSafe();
  const [imgSrc, setImgSrc] = useState(HERO_RIDE);
  const [imgFailed, setImgFailed] = useState(false);
  const handleImgError = () => {
    if (imgSrc === HERO_RIDE) setImgSrc(HERO_RIDE_ALT);
    else setImgFailed(true);
  };

  const imgX = useTransform(sx, [-1, 1], [-14, 14]);
  const imgY = useTransform(sy, [-1, 1], [-14, 14]);
  const blob1X = useTransform(sx, [-1, 1], [-30, 30]);
  const blob1Y = useTransform(sy, [-1, 1], [-30, 30]);
  const blob2X = useTransform(sx, [-1, 1], [40, -40]);
  const blob2Y = useTransform(sy, [-1, 1], [20, -20]);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !sceneRef.current) return;
    const r = sceneRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    mx.set((e.clientX - cx) / (r.width / 2));
    my.set((e.clientY - cy) / (r.height / 2));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={sceneRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative pt-32 pb-32 overflow-hidden bg-white"
    >
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 z-0" />

      {/* Drifting gradient mesh */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 20% 80%, rgba(92,179,119,0.18), transparent 45%), radial-gradient(circle at 80% 20%, rgba(255,159,67,0.18), transparent 45%)',
        }}
        animate={
          reduced
            ? undefined
            : {
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        aria-hidden
        style={{ x: blob1X, y: blob1Y }}
        className="absolute top-40 right-20 w-72 h-72 bg-secondary/15 rounded-full blur-3xl z-0"
      />
      <motion.div
        aria-hidden
        style={{ x: blob2X, y: blob2Y }}
        className="absolute -bottom-10 left-10 w-80 h-80 bg-primary/15 rounded-full blur-3xl z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold"
            >
              <Bike size={16} />
              <span>Weligama, Sri Lanka · Motorbikes from $8 / day</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-black text-dark leading-tight"
            >
              Ride The <span className="text-primary italic">Coast</span> <br />
              Of Sri Lanka
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-500 text-lg font-medium max-w-lg"
            >
              Pick a scooter from our Weligama hub and chase sunsets from Mirissa to Galle Fort. Honest prices, flawless bikes, paperwork done in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6"
            >
              <MagneticButton
                to="/fleet"
                className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/20 inline-flex items-center gap-3"
                strength={0.45}
                ariaLabel="Find a bike"
              >
                Find Now
                <ChevronRight size={20} />
              </MagneticButton>

              <Link href="/about" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={16} className="text-secondary fill-secondary" />
                </div>
                <span className="font-bold text-dark italic">How it works</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ x: imgX, y: imgY }}
              className="relative z-10"
            >
              <motion.div
                animate={reduced ? undefined : { y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {imgFailed ? (
                  <div
                    className="w-full h-[550px] rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)] ring-1 ring-neutral-100 flex items-center justify-center text-white"
                    style={{ background: fallbackGradient('hero') }}
                  >
                    <div className="text-center space-y-3">
                      <Bike size={64} className="mx-auto opacity-90" />
                      <div className="text-sm font-black uppercase tracking-widest">Rent &amp; Ride · Weligama</div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={imgSrc}
                    onError={handleImgError}
                    alt="Motorbike ride along Sri Lanka's south coast"
                    className="w-full h-[550px] object-cover rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)] ring-1 ring-neutral-100"
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Overlay Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-white">
                  <Bike size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Daily rentals from</div>
                  <div className="text-xl font-black text-dark">
                    $8 <span className="text-xs font-normal">/ day</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
