'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Star, Gauge, Cog, Zap, ArrowRight, Bike as BikeIcon } from 'lucide-react';
import type { Bike } from '../../lib/types';
import { fallbackGradient } from '../../lib/images';

interface Props {
  bike: Bike;
  index?: number;
}

export default function BikeCard({ bike, index = 0 }: Props) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link
        href={`/fleet/${bike.slug}`}
        className="block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-neutral-100"
      >
        {/* Image */}
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={imgOk ? { background: '#F4F4F5' } : { background: fallbackGradient(bike.slug) }}
        >
          {imgOk ? (
            <motion.img
              layoutId={`bike-img-${bike.slug}`}
              src={bike.images[0]}
              onError={() => setImgOk(false)}
              alt={bike.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/80">
              <div className="text-center space-y-2">
                <BikeIcon size={48} className="mx-auto opacity-80" />
                <div className="text-xs font-black uppercase tracking-widest opacity-90">{bike.name}</div>
              </div>
            </div>
          )}
          {/* Shine sweep */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[300%] transition-all duration-700" />
          </div>
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
            {bike.popular && (
              <span className="text-[10px] font-black uppercase tracking-widest bg-secondary text-white px-3 py-1 rounded-full shadow-lg">
                Popular
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur text-dark px-3 py-1 rounded-full">
              {bike.type}
            </span>
          </div>
          {!bike.available && (
            <div className="absolute inset-0 bg-dark/60 flex items-center justify-center">
              <span className="text-white font-black uppercase tracking-widest text-sm bg-dark/70 px-4 py-2 rounded-full">
                Unavailable
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">{bike.model}</span>
              <h3 className="text-xl font-black text-dark group-hover:text-primary transition-colors leading-tight">
                {bike.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-secondary shrink-0">
              <Star size={14} fill="currentColor" />
              <span className="text-xs font-bold text-dark">{bike.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Specs row */}
          <div className="flex items-center gap-4 text-xs text-neutral-500 font-semibold">
            <div className="flex items-center gap-1">
              <Cog size={14} className="text-primary" />
              {bike.transmission}
            </div>
            <div className="flex items-center gap-1">
              {bike.engineCC === 0 ? <Zap size={14} className="text-primary" /> : <Gauge size={14} className="text-primary" />}
              {bike.engineCC === 0 ? `${bike.rangeKm} km range` : `${bike.engineCC}cc`}
            </div>
          </div>

          {/* Price + CTA */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-dark/40 uppercase">From </span>
              <span className="text-primary font-black">${bike.dailyPriceUSD}</span>
              <span className="text-xs text-dark/40"> / day</span>
            </div>
            <div className="text-sm font-bold text-dark group-hover:text-primary transition-colors flex items-center gap-1">
              View
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
