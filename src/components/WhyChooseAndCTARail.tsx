'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Shield, Zap, ShoppingBag, Globe, Phone, ArrowRight, Bike } from 'lucide-react';
import { RE_HIMALAYAN_2, fallbackGradient } from '../lib/images';

export function WhyChoose() {
  const [imgErr, setImgErr] = useState(false);
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Why Choose Us</div>
        <h2 className="text-4xl font-extrabold text-dark mb-16 italic">Special Features for You</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12 lg:gap-8">
          {/* Left Side */}
          <div className="space-y-16 lg:text-right order-2 lg:order-1">
            {[
              {
                icon: <Shield size={24} />,
                title: 'Full Insurance Included',
                desc: 'Every rental is covered. Ride confidently knowing damage and theft protection are built in.',
              },
              {
                icon: <Zap size={24} />,
                title: 'Latest-Model Fleet',
                desc: 'Brand-new bikes and electric scooters refreshed every season — never outdated, always reliable.',
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:items-end gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center lg:ml-auto">
                  {f.icon}
                </div>
                <h4 className="text-xl font-black text-dark tracking-tight">{f.title}</h4>
                <p className="text-sm text-neutral-400 font-medium leading-relaxed lg:max-w-xs">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Center Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10 scale-150" />
            {imgErr ? (
              <div
                className="mx-auto max-w-[400px] aspect-[4/5] rounded-[3rem] flex items-center justify-center text-white shadow-2xl"
                style={{ background: fallbackGradient('why-choose') }}
              >
                <Bike size={72} className="opacity-90" />
              </div>
            ) : (
              <img
                src={RE_HIMALAYAN_2}
                onError={() => setImgErr(true)}
                alt="Rider on a Royal Enfield Himalayan adventure motorbike"
                className="w-full h-auto object-cover rounded-[3rem] mx-auto max-w-[400px] drop-shadow-2xl"
              />
            )}
          </motion.div>

          {/* Right Side */}
          <div className="space-y-16 text-left order-3">
            {[
              {
                icon: <ShoppingBag size={24} />,
                title: 'Everything Included',
                desc: 'Helmets, locks, phone holders — you get everything you need at no extra cost.',
              },
              {
                icon: <Globe size={24} />,
                title: 'Modern Digital Solutions',
                desc: 'Book online in under a minute, unlock with the app, and pay securely with one tap.',
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                  {f.icon}
                </div>
                <h4 className="text-xl font-black text-dark tracking-tight">{f.title}</h4>
                <p className="text-sm text-neutral-400 font-medium leading-relaxed lg:max-w-xs">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTARail() {
  return (
    <section className="bg-white pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-secondary rounded-[3rem] p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 text-white shadow-2xl shadow-secondary/30">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <Phone size={40} className="text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-black italic">Give Us A Call!</h3>
            <p className="text-white/80 font-bold tracking-widest uppercase text-sm mt-1">+94 71 234 5678</p>
          </div>
        </div>

        <Link
          href="/contact"
          className="bg-white text-secondary px-12 py-5 rounded-full font-black uppercase text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-4"
        >
          Contact Us Now
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}

export default function WhyChooseAndCTARail() {
  return (
    <>
      <WhyChoose />
      <CTARail />
    </>
  );
}
