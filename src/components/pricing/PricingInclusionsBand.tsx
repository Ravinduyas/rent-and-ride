'use client';

import { motion } from 'motion/react';
import { Zap, Users, Shield, ArrowRight, Sparkles, MapPin } from 'lucide-react';

const items = [
  { label: 'Helmets', icon: <Zap size={24} className="rotate-12" />, color: 'bg-primary' },
  { label: 'Assistance', icon: <Users size={24} />, color: 'bg-secondary' },
  { label: 'Insurance', icon: <Shield size={24} />, color: 'bg-primary/80' },
  { label: 'Cancellation', icon: <ArrowRight size={24} className="rotate-45" />, color: 'bg-secondary/80' },
  { label: 'Discounts', icon: <Sparkles size={24} />, color: 'bg-primary' },
  { label: 'Routes', icon: <MapPin size={24} />, color: 'bg-secondary' },
];

export default function PricingInclusionsBand() {
  return (
    <section className="relative h-[500px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop"
        alt="Pricing background"
        className="w-full h-full object-cover grayscale opacity-60 contrast-125"
      />
      <div className="absolute inset-0 bg-neutral-900/80" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-3">All Plans Include</div>
        <h2 className="text-4xl font-extrabold text-white mb-4">No Hidden Fees</h2>
        <p className="text-white/60 font-medium mb-12 max-w-xl">
          Every Rent &amp; Ride plan ships with everything you need to ride safely and confidently — at no extra cost.
        </p>

        <div className="max-w-4xl w-full grid grid-cols-3 md:grid-cols-6 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3 group"
            >
              <div
                className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform cursor-pointer`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}