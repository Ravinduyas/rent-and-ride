'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Bike, Plus, Download, Users, Package } from 'lucide-react';
import AnimatedCounter from './motion/AnimatedCounter';
import { RE_CLASSIC_2, fallbackGradient } from '../lib/images';

export function StatsBand() {
  return (
    <section className="bg-dark py-20 rounded-[4rem] mx-4 sm:mx-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          { label: 'Bikes in our fleet', value: 80, icon: <Bike size={32} /> },
          { label: 'Travellers served', value: 9400, icon: <Users size={32} /> },
          { label: 'Countries visited from', value: 62, icon: <Package size={32} /> },
          { label: '5-star reviews', value: 2100, icon: <Download size={32} /> },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className="flex flex-col items-center text-center gap-4"
          >
            <div className="text-primary mb-2 drop-shadow-[0_0_15px_rgba(92,179,119,0.3)]">{stat.icon}</div>
            <div className="text-4xl font-black text-white mb-1">
              <AnimatedCounter value={stat.value} suffix="+" />
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function FeaturedAndStats() {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="py-24 bg-white overflow-hidden">
      {/* Featured Bike Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center rotate-6">
              <Bike size={32} />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-dark mb-4">Our Hero Bike — Royal Enfield 350</h2>
          <p className="text-neutral-500 font-medium tracking-wide italic">
            The classic that every visitor pictures riding through Sri Lanka
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

          {imgErr ? (
            <div
              className="w-full max-w-4xl mx-auto aspect-[4/3] rounded-[3rem] flex items-center justify-center text-white shadow-2xl"
              style={{ background: fallbackGradient('featured-hero') }}
            >
              <Bike size={96} className="opacity-90" />
            </div>
          ) : (
            <img
              src={RE_CLASSIC_2}
              onError={() => setImgErr(true)}
              alt="Royal Enfield Classic 350"
              className="w-full max-w-4xl mx-auto rounded-[3rem] object-cover aspect-[16/10] shadow-2xl drop-shadow-2xl"
            />
          )}

          {/* Hotspots */}
          {[
            { top: '30%', left: '42%', title: '349cc thump' },
            { top: '65%', left: '18%', title: 'Tripper navigation' },
            { top: '75%', left: '52%', title: 'Dual-channel ABS' },
            { top: '55%', left: '82%', title: 'Touring seat' },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ top: pos.top, left: pos.left }}
              className="absolute z-10 group"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center shadow-xl cursor-help animate-pulse overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 animate-ping rounded-full" />
                  <Plus size={16} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-32 bg-dark rounded-xl py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest text-center">{pos.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Made for the coast', desc: 'Plenty of torque for the rolling Galle–Mirissa road and the climb up to Ella.' },
            { title: 'Tourist-friendly', desc: 'Smooth, predictable power delivery — newcomers feel at home within an hour.' },
            { title: 'That sound', desc: 'The unmistakable Royal Enfield thump that turns every ride into a soundtrack.' },
          ].map((spec, i) => (
            <div key={i} className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 hover:bg-white hover:shadow-xl transition-all duration-500">
              <h4 className="text-xl font-bold text-dark mb-3 italic">{spec.title}</h4>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed">{spec.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <StatsBand />
    </div>
  );
}