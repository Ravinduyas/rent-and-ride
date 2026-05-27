'use client';

import { motion } from 'motion/react';

interface TimelineEvent {
  year: string;
  title: string;
  body: string;
}

const events: TimelineEvent[] = [
  {
    year: '2018',
    title: 'A garage on Beach Road',
    body: 'Founded by Nimal in a converted garage just off Weligama beach with one Vespa and a hand-painted sign. The first customer was a German surfer.',
  },
  {
    year: '2020',
    title: 'First proper hub opens',
    body: 'Moved into a proper storefront on Beach Road with 12 motorbikes and our first full-time mechanic, Tharindu.',
  },
  {
    year: '2022',
    title: 'The Rent & Ride app launches',
    body: 'Self-service unlock, real-time hub map, and one-tap booking. Bookings doubled in three months as travellers came back to Sri Lanka.',
  },
  {
    year: '2024',
    title: 'Mirissa & Galle hubs open',
    body: 'Added two new locations along the coast so travellers can pick up and drop off wherever the trip ends.',
  },
  {
    year: '2026',
    title: '80+ bikes, three hubs, 9,400 travellers served',
    body: 'Today we serve riders from 60+ countries with a hand-picked fleet of Royal Enfields, Hondas, Yamahas, KTMs, and Vespas.',
  },
];

export default function StoryTimeline() {
  return (
    <section className="bg-neutral-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-3">Our Journey</div>
          <h2 className="text-4xl font-extrabold text-dark italic">From one bike to many</h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary md:-translate-x-1/2" />

          <div className="space-y-12">
            {events.map((e, i) => {
              const onLeft = i % 2 === 0;
              return (
                <motion.div
                  key={e.year}
                  initial={{ opacity: 0, x: onLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative md:grid md:grid-cols-2 md:gap-8 ${onLeft ? '' : 'md:[direction:rtl]'}`}
                >
                  <div className={`pl-12 md:pl-0 md:pr-8 ${onLeft ? 'md:text-right' : 'md:[direction:ltr]'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-neutral-100">
                      <div className="text-xs font-black uppercase tracking-widest text-secondary mb-2">{e.year}</div>
                      <h3 className="text-xl font-black text-dark mb-2">{e.title}</h3>
                      <p className="text-sm text-neutral-500 leading-relaxed">{e.body}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 -translate-x-1/2 rounded-full bg-primary ring-4 ring-white shadow-lg" />
                  <div className="hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}