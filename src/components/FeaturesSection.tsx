'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Bike, Sparkles, Navigation, CheckCircle2 } from 'lucide-react';
import { RE_CLASSIC_1, HONDA_SCOOTER_1, fallbackGradient } from '../lib/images';

export function WorkflowSection() {
  const steps = [
    { title: 'Pick your motorbike online', icon: <Bike size={48} />, step: '1', bg: 'bg-primary/5' },
    { title: 'Quick handover at our Weligama hub', icon: <Sparkles size={48} />, step: '2', bg: 'bg-blue-50' },
    { title: 'Ride the south coast — your way', icon: <Navigation size={48} />, step: '3', bg: 'bg-secondary/5' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center rotate-12">
            <Bike size={32} />
          </div>
        </div>
        <h2 className="text-4xl font-extrabold text-dark mb-4">Renting a Motorbike, The Easy Way</h2>
        <p className="text-neutral-500 font-medium mb-16">Three simple steps — and you're on the south-coast road in under an hour.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative p-12 rounded-[2rem] ${item.bg} text-center group cursor-pointer hover:shadow-xl transition-all duration-500`}
            >
              <div className="relative z-10">
                <div className="mb-8 text-dark/80 group-hover:scale-110 transition-transform duration-500 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-dark max-w-[180px] mx-auto leading-tight">{item.title}</h3>
              </div>
              <span className="absolute bottom-4 right-8 text-8xl font-black text-dark/5 select-none">{item.step}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/fleet"
            className="inline-flex bg-secondary text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-secondary/20 hover:scale-105 transition-all"
          >
            Start Your Search →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AboutSplit() {
  const [mainErr, setMainErr] = useState(false);
  const [avatarErr, setAvatarErr] = useState(false);
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity" />
          {mainErr ? (
            <div
              className="relative rounded-[3rem] w-full h-[600px] shadow-2xl flex items-center justify-center text-white"
              style={{ background: fallbackGradient('about-split') }}
            >
              <Bike size={72} className="opacity-90" />
            </div>
          ) : (
            <img
              src={RE_CLASSIC_1}
              onError={() => setMainErr(true)}
              alt="Royal Enfield Classic 350 on a Sri Lanka coastal road at sunset"
              className="relative rounded-[3rem] w-full h-[600px] object-cover shadow-2xl"
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-dark leading-tight">
              The easiest way <br />
              to explore Sri Lanka's <br />
              south coast on two wheels.
            </h2>
            <div className="flex items-center gap-4">
              {avatarErr ? (
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                  style={{ background: fallbackGradient('about-split-avatar') }}
                >
                  <Bike size={24} className="opacity-90" />
                </div>
              ) : (
                <img
                  src={HONDA_SCOOTER_1}
                  onError={() => setAvatarErr(true)}
                  alt="Honda scooter in action"
                  className="w-16 h-16 rounded-2xl object-cover"
                />
              )}
              <div>
                <h4 className="font-bold text-dark text-lg">Built for travellers</h4>
                <p className="text-neutral-400 text-sm font-medium">
                  Transparent USD pricing, fully insured rides, and 24/7 roadside support — so you focus on the coast, not the paperwork.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              'Free booking cancellation up to 15 hours',
              '24/7 roadside rental assistance',
              'More than 350,000 satisfied riders',
              'Fleet of 8,000+ brand-new scooters & bikes',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-secondary bg-secondary/10 p-1 rounded-full">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-sm font-bold text-dark/70 tracking-tight">{feature}</span>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="inline-flex bg-primary text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all"
          >
            Read More About Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function FeaturesSection() {
  return (
    <>
      <WorkflowSection />
      <AboutSplit />
    </>
  );
}
