'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Bike } from 'lucide-react';
import { CRUISER_1, CRUISER_2, SCOOTER_3, fallbackGradient } from '../../lib/images';

interface Location {
  name: string;
  address: string;
  phone: string;
  hours: string;
  imageUrl: string;
}

const locations: Location[] = [
  {
    name: 'Weligama Beach Road',
    address: '142 Beach Road, Weligama 81700',
    phone: '+94 71 234 5678',
    hours: '7:00 AM – 9:00 PM',
    imageUrl: CRUISER_1,
  },
  {
    name: 'Mirissa Coconut Hill',
    address: 'Galle–Matara Hwy, Mirissa 81740',
    phone: '+94 71 234 5679',
    hours: '7:00 AM – 8:00 PM',
    imageUrl: SCOOTER_3,
  },
  {
    name: 'Galle Fort Hub',
    address: '32 Church Street, Galle Fort 80000',
    phone: '+94 71 234 5680',
    hours: '8:00 AM – 8:00 PM',
    imageUrl: CRUISER_2,
  },
];

function LocationImage({ loc, i }: { loc: Location; i: number }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div
        className="aspect-[5/3] flex items-center justify-center text-white"
        style={{ background: fallbackGradient(`loc-${i}`) }}
      >
        <Bike size={48} className="opacity-90" />
      </div>
    );
  }
  return (
    <div className="aspect-[5/3] overflow-hidden">
      <img
        src={loc.imageUrl}
        onError={() => setErr(true)}
        alt={loc.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

export default function LocationCards() {
  return (
    <section className="bg-neutral-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-3">Our Locations</div>
          <h2 className="text-4xl font-extrabold text-dark italic">Find a hub near you</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-shadow"
            >
              <LocationImage loc={loc} i={i} />
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-black text-dark">{loc.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-neutral-600 font-medium">{loc.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-neutral-600 font-medium">{loc.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-neutral-600 font-medium">{loc.hours}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}