'use client';

import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export default function MapPlaceholder() {
  return (
    <div className="relative h-[420px] lg:h-full min-h-[420px] rounded-3xl overflow-hidden border border-neutral-100 shadow-xl bg-neutral-100">
      {/* Decorative grid */}
      <svg className="absolute inset-0 w-full h-full text-neutral-200" aria-hidden>
        <defs>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <pattern id="map-grid-major" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
        <rect width="100%" height="100%" fill="url(#map-grid-major)" />

        {/* Roads */}
        <path d="M -20 220 Q 200 180 420 240 T 820 220" stroke="#5CB377" strokeWidth="6" fill="none" opacity="0.45" />
        <path d="M 80 -20 Q 120 200 240 320 T 380 600" stroke="#2F7A4D" strokeWidth="5" fill="none" opacity="0.45" />
        <path d="M 500 -20 L 480 600" stroke="#1A1C1E" strokeWidth="3" fill="none" opacity="0.15" />
      </svg>

      {/* Pulsing pin */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <motion.span
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          />
          <div className="relative w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl">
            <MapPin size={26} />
          </div>
        </div>
      </motion.div>

      {/* Info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute bottom-6 left-6 right-6 lg:right-auto bg-white rounded-2xl shadow-2xl p-5 max-w-sm"
      >
        <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Headquarters</div>
        <h4 className="text-lg font-black text-dark mb-1">Weligama Beach Hub</h4>
        <p className="text-xs text-neutral-500 font-medium">
          142 Beach Road, Weligama 81700, Sri Lanka
          <br />
          Open daily · 7 AM – 9 PM
        </p>
      </motion.div>
    </div>
  );
}