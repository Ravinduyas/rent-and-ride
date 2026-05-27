'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';
import type { TeamMember } from '../../lib/types';
import { fallbackGradient } from '../../lib/images';

interface Props {
  members: TeamMember[];
}

function TeamPhoto({ m }: { m: TeamMember }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div
        className="aspect-[4/5] flex items-center justify-center text-white"
        style={{ background: fallbackGradient(`team-${m.name}`) }}
      >
        <User size={64} className="opacity-90" />
      </div>
    );
  }
  return (
    <div className="aspect-[4/5] overflow-hidden">
      <img
        src={m.photoUrl}
        onError={() => setErr(true)}
        alt={m.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
    </div>
  );
}

export default function TeamGrid({ members }: Props) {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-3">The Team</div>
          <h2 className="text-4xl font-extrabold text-dark italic">People behind the bikes</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-100 hover:shadow-xl transition-shadow duration-500"
            >
              <TeamPhoto m={m} />
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-lg font-black text-dark">{m.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">{m.role}</p>
                </div>
                {m.bio && <p className="text-sm text-neutral-500 leading-relaxed">{m.bio}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}