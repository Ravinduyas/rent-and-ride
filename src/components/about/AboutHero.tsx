'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Bike } from 'lucide-react';
import { VESPA_1, fallbackGradient } from '../../lib/images';

export default function AboutHero() {
  const [imgErr, setImgErr] = useState(false);
  return (
    <section className="pt-32 pb-16 bg-white relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
              <Bike size={16} /> Our Story
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-dark leading-tight">
              Born on the <span className="text-primary italic">south coast</span>
              <br />
              of Sri Lanka.
            </h1>
            <p className="text-neutral-500 text-lg font-medium leading-relaxed max-w-lg">
              Rent &amp; Ride started in Weligama in 2018 with one Vespa, a beach-front garage, and a hunch that surfers, backpackers and locals all deserved a better way to explore the coast. Seven years later, we're still chasing that feeling — every spotless handover, every smooth unlock, every "see you next time."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-3xl" />
            {imgErr ? (
              <div
                className="relative rounded-[3rem] w-full h-[500px] shadow-2xl flex items-center justify-center text-white"
                style={{ background: fallbackGradient('about-hero') }}
              >
                <div className="text-center space-y-3">
                  <Bike size={64} className="mx-auto opacity-90" />
                  <div className="text-sm font-black uppercase tracking-widest opacity-90">Weligama, Sri Lanka</div>
                </div>
              </div>
            ) : (
              <img
                src={VESPA_1}
                onError={() => setImgErr(true)}
                alt="Vintage Vespa scooter — where Rent & Ride started in 2018"
                className="relative rounded-[3rem] w-full h-[500px] object-cover shadow-2xl"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}