'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Bike as BikeIcon, Calendar, MapPin } from 'lucide-react';
import type { Bike, BookingState } from '../../lib/types';

interface Props {
  bike: Bike | null;
  state: BookingState;
  total: number;
  reference: string;
}

export default function BookingConfirmation({ bike, state, total, reference }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-neutral-100 p-8 lg:p-12 text-center space-y-8">
      <div className="flex justify-center">
        <motion.svg
          width={96}
          height={96}
          viewBox="0 0 96 96"
          initial="hidden"
          animate="visible"
          className="text-primary"
        >
          <motion.circle
            cx={48}
            cy={48}
            r={44}
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { pathLength: 1, opacity: 1 },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M28 50 L44 64 L70 36"
            fill="none"
            stroke="currentColor"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1 },
            }}
            transition={{ duration: 0.45, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.svg>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-black text-dark">You're all set, {state.fullName.split(' ')[0]}!</h2>
        <p className="text-neutral-500 font-medium max-w-md mx-auto">
          We've reserved your bike. A confirmation has been sent to{' '}
          <span className="font-bold text-dark">{state.email}</span>.
        </p>
      </div>

      <div className="bg-neutral-50 rounded-2xl p-6 max-w-md mx-auto text-left space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Reference</span>
          <span className="font-black text-dark font-mono">{reference}</span>
        </div>
        {bike && (
          <div className="flex items-center gap-2 text-sm">
            <BikeIcon size={16} className="text-primary" />
            <span className="font-bold text-dark">{bike.name}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} className="text-primary" />
          <span className="font-bold text-dark">{state.pickupLocation}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar size={16} className="text-primary" />
          <span className="font-bold text-dark">
            {state.pickupDate} → {state.returnDate}
          </span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
          <span className="text-xs font-black uppercase tracking-widest text-neutral-500">Total Charged</span>
          <span className="text-2xl font-black text-primary">${total}</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Link
          href="/fleet"
          className="bg-dark text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-transform"
        >
          Browse More Bikes
        </Link>
        <Link
          href="/"
          className="bg-primary/10 text-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
