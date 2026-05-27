'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ShieldCheck } from 'lucide-react';
import type { Bike } from '../../lib/types';
import MagneticButton from '../motion/MagneticButton';

interface Props {
  bike: Bike;
}

function daysBetween(a: string, b: string): number {
  if (!a || !b) return 1;
  const start = new Date(a).getTime();
  const end = new Date(b).getTime();
  if (isNaN(start) || isNaN(end) || end <= start) return 1;
  return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
}

export default function BikeBookingPanel({ bike }: Props) {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86400000);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  const [pickup, setPickup] = useState(fmt(today));
  const [dropoff, setDropoff] = useState(fmt(tomorrow));
  const [location, setLocation] = useState('Downtown Hub');

  const days = useMemo(() => daysBetween(pickup, dropoff), [pickup, dropoff]);
  const subtotal = bike.dailyPriceUSD * days;
  const insurance = Math.round(subtotal * 0.12);
  const total = subtotal + insurance;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:sticky lg:top-28 bg-white rounded-3xl shadow-2xl border border-neutral-100 p-6 lg:p-8 space-y-6"
    >
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-3xl font-black text-dark">${bike.dailyPriceUSD}</span>
          <span className="text-sm font-bold text-neutral-400"> / day</span>
        </div>
        {bike.popular && (
          <span className="text-[10px] font-black uppercase tracking-widest bg-secondary/10 text-secondary px-3 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-dark/60 flex items-center gap-2">
            <MapPin size={12} className="text-primary" /> Pickup Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-neutral-100 rounded-xl px-3 py-3 text-sm font-bold text-dark focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option>Downtown Hub</option>
            <option>Airport Terminal</option>
            <option>Coastal Boardwalk</option>
            <option>Old Town Plaza</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-dark/60 flex items-center gap-2">
              <Calendar size={12} className="text-primary" /> Pickup
            </label>
            <input
              type="date"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-neutral-100 rounded-xl px-3 py-3 text-sm font-bold text-dark focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-dark/60 flex items-center gap-2">
              <Calendar size={12} className="text-secondary" /> Return
            </label>
            <input
              type="date"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full bg-neutral-100 rounded-xl px-3 py-3 text-sm font-bold text-dark focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-neutral-100">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500 font-medium">
            ${bike.dailyPriceUSD} × {days} {days === 1 ? 'day' : 'days'}
          </span>
          <span className="font-bold text-dark">${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500 font-medium flex items-center gap-1">
            <ShieldCheck size={14} className="text-primary" /> Insurance &amp; protection
          </span>
          <span className="font-bold text-dark">${insurance}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-neutral-100">
          <span className="font-black text-dark uppercase text-xs tracking-widest">Total</span>
          <span className="font-black text-2xl text-primary">${total}</span>
        </div>
      </div>

      <MagneticButton
        to={`/booking?bike=${bike.slug}&pickup=${pickup}&dropoff=${dropoff}`}
        className={`block w-full text-center px-6 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl transition-all ${
          bike.available
            ? 'bg-secondary text-white shadow-secondary/20'
            : 'bg-neutral-200 text-neutral-400 pointer-events-none'
        }`}
        strength={0.4}
      >
        {bike.available ? 'Book this Bike' : 'Currently Unavailable'}
      </MagneticButton>

      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center">
        Free cancellation up to 12 h before pickup
      </p>
    </motion.div>
  );
}