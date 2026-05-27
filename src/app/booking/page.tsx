'use client';

import { Suspense } from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import BookingStepper from '../../components/booking/BookingStepper';

export default function BookingPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute -top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center -rotate-6">
                <Calendar size={28} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-dark mb-4">Book your ride</h1>
            <p className="text-neutral-500 font-medium text-lg">Four quick steps. No hidden fees.</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="max-w-7xl mx-auto h-[420px] animate-pulse rounded-3xl bg-white/60" />}>
          <BookingStepper />
        </Suspense>
      </section>
    </>
  );
}
