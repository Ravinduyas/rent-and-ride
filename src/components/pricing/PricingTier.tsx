'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import type { PriceTier } from '../../lib/types';
import TiltCard from '../motion/TiltCard';
import MagneticButton from '../motion/MagneticButton';

interface Props {
  tier: PriceTier;
  index?: number;
}

export default function PricingTier({ tier, index = 0 }: Props) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`relative h-full p-8 lg:p-10 rounded-3xl border ${
        tier.popular
          ? 'bg-dark text-white border-primary/30 shadow-2xl'
          : 'bg-white text-dark border-neutral-100 shadow-sm hover:shadow-xl'
      } transition-shadow duration-500`}
    >
      {tier.popular && (
        <motion.div
          aria-hidden
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(92,179,119,0.0)',
              '0 0 60px 6px rgba(92,179,119,0.35)',
              '0 0 0 0 rgba(92,179,119,0.0)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
        />
      )}

      {tier.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest bg-primary text-white px-4 py-1.5 rounded-full shadow-xl">
          Most Popular
        </span>
      )}

      <div className="relative z-10 space-y-6">
        <div>
          <h3 className={`text-2xl font-black ${tier.popular ? 'text-white' : 'text-dark'} mb-1`}>{tier.name}</h3>
          <p className={`text-xs font-medium ${tier.popular ? 'text-white/60' : 'text-neutral-500'}`}>{tier.tagline}</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className={`text-5xl font-black ${tier.popular ? 'text-primary' : 'text-dark'}`}>${tier.priceUSD}</span>
          <span className={`text-sm font-bold ${tier.popular ? 'text-white/50' : 'text-neutral-400'}`}>{tier.unit}</span>
        </div>

        <ul className="space-y-3">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <CheckCircle2 size={18} className={tier.popular ? 'text-primary mt-0.5 shrink-0' : 'text-primary mt-0.5 shrink-0'} />
              <span className={`text-sm ${tier.popular ? 'text-white/85' : 'text-dark/80'}`}>{f}</span>
            </li>
          ))}
        </ul>

        <div className="pt-4">
          {tier.popular ? (
            <MagneticButton
              to="/booking"
              className="block w-full text-center bg-primary text-white px-6 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/30"
            >
              {tier.cta}
            </MagneticButton>
          ) : (
            <Link
              href="/booking"
              className="block w-full text-center bg-dark text-white px-6 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform"
            >
              {tier.cta}
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (tier.popular) {
    return <TiltCard className="rounded-3xl h-full" max={4}>{inner}</TiltCard>;
  }
  return inner;
}
