'use client';

import { motion } from 'motion/react';
import { Cog, Gauge, Zap, Battery, Star, Bike as BikeIcon, CheckCircle2 } from 'lucide-react';
import type { Bike } from '../../lib/types';

interface Props {
  bike: Bike;
}

export default function BikeSpecs({ bike }: Props) {
  const specs = [
    { label: 'Type', value: bike.type, icon: <BikeIcon size={18} /> },
    { label: 'Transmission', value: bike.transmission, icon: <Cog size={18} /> },
    bike.engineCC === 0
      ? { label: 'Range', value: `${bike.rangeKm} km`, icon: <Battery size={18} /> }
      : { label: 'Engine', value: `${bike.engineCC}cc`, icon: <Gauge size={18} /> },
    { label: 'Top Speed', value: `${bike.topSpeedKph} kph`, icon: <Zap size={18} /> },
  ];

  return (
    <div className="space-y-8">
      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between gap-4 flex-wrap"
      >
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{bike.model} · {bike.type}</span>
          <h1 className="text-4xl md:text-5xl font-black text-dark leading-tight">{bike.name}</h1>
        </div>
        <div className="flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full">
          <Star size={16} fill="currentColor" />
          <span className="font-black text-sm">{bike.rating.toFixed(1)}</span>
          <span className="text-xs font-bold opacity-70">({bike.reviewCount})</span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-lg text-neutral-600 font-medium leading-relaxed"
      >
        {bike.description}
      </motion.p>

      {/* Spec grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {specs.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm"
          >
            <div className="text-primary mb-2">{s.icon}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{s.label}</div>
            <div className="text-base font-black text-dark mt-1">{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h3 className="text-sm font-black uppercase tracking-widest text-dark/70">What's Included</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bike.features.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
              <span className="text-sm font-medium text-dark/80">{f}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}