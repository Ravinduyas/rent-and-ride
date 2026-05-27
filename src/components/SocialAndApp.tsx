'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Download, Apple, Instagram, Facebook, Twitter, Bike } from 'lucide-react';
import {
  CRUISER_1,
  CRUISER_2,
  CRUISER_3,
  SCOOTER_1,
  SCOOTER_3,
  SCOOTER_4,
  SPORT_2,
  fallbackGradient,
} from '../lib/images';

const socialImages = [CRUISER_1, SCOOTER_3, CRUISER_2, SCOOTER_1, SPORT_2, SCOOTER_4];

function SocialTile({ img, i }: { img: string; i: number }) {
  const [err, setErr] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      className="aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-lg group relative"
      style={err ? { background: fallbackGradient(`social-${i}`) } : undefined}
    >
      {err ? (
        <div className="w-full h-full flex items-center justify-center text-white">
          <Bike size={36} className="opacity-90" />
        </div>
      ) : (
        <img
          src={img}
          onError={() => setErr(true)}
          alt={`Tourist ride ${i + 1}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
        <Instagram size={32} />
      </div>
    </motion.div>
  );
}

export function InstagramGrid() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-sm font-bold text-secondary uppercase tracking-[0.3em] mb-4">Social Media</div>
        <h2 className="text-4xl font-extrabold text-dark mb-16">Follow Us On Instagram</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-20">
          {socialImages.map((img, i) => (
            <SocialTile key={i} img={img} i={i} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-12">
          <a href="#" className="flex items-center gap-3 text-dark font-bold hover:text-primary transition-colors">
            <Facebook size={20} className="text-primary" />
            <span>Facebook</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-dark font-bold hover:text-primary transition-colors">
            <Instagram size={20} className="text-primary" />
            <span>Instagram</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-dark font-bold hover:text-primary transition-colors">
            <Twitter size={20} className="text-primary" />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div
        className="w-72 h-[600px] rounded-t-[3rem] border-8 border-dark shadow-2xl relative z-10 flex items-center justify-center text-white"
        style={{ background: fallbackGradient('phone-mockup') }}
      >
        <Bike size={80} className="opacity-90" />
      </div>
    );
  }
  return (
    <img
      src={CRUISER_3}
      onError={() => setErr(true)}
      alt="Phone mockup"
      className="w-72 h-[600px] object-cover rounded-t-[3rem] border-8 border-dark shadow-2xl relative z-10"
      loading="lazy"
    />
  );
}

export function AppDownloadBand() {
  return (
    <section className="bg-white pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-primary rounded-[3rem] overflow-hidden relative min-h-[600px] flex flex-col lg:flex-row shadow-2xl shadow-primary/30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4 pointer-events-none" />

        <div className="p-12 lg:p-20 flex flex-col justify-center space-y-12 relative z-10 lg:w-3/5 text-white">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest">
              <Smartphone size={16} />
              <span>Download Our App</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight italic">
              Get Our App <br />&amp; Save 10% Off
            </h2>
            <p className="text-white/70 font-medium max-w-lg">
              Track our south-coast hubs in real time, book in 30 seconds, and unlock your bike straight from your phone — even when you're off-grid in Mirissa.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { title: 'Find Nearby Vehicles', desc: 'Locate the closest scooter or bike in real time.' },
              { title: 'Unlock with Phone', desc: 'No keys needed. Just scan and ride away.' },
              { title: 'Secure Payment', desc: 'Automated billing with end-to-end encrypted payments.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4 group"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-primary transition-all">
                  <span className="font-bold">{i + 1}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-white/60 text-sm font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-dark text-white px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 hover:scale-105 transition-all">
              <Download size={18} />
              Google Play
            </button>
            <button className="bg-white text-primary px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 hover:scale-105 transition-all">
              <Apple size={18} />
              Apple Store
            </button>
          </div>
        </div>

        <div className="lg:w-2/5 flex items-end justify-center relative px-8 pt-12 lg:pt-0">
          <PhoneMockup />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0" />
        </div>
      </div>
    </section>
  );
}

export default function SocialAndApp() {
  return (
    <>
      <InstagramGrid />
      <AppDownloadBand />
    </>
  );
}