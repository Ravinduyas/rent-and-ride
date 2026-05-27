'use client';

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { priceTiers } from '../../lib/pricing';
import { faqs } from '../../lib/faq';
import PricingTier from '../../components/pricing/PricingTier';
import PricingComparison from '../../components/pricing/PricingComparison';
import PricingInclusionsBand from '../../components/pricing/PricingInclusionsBand';
import FAQ from '../../components/contact/FAQ';

export default function PricingPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute -top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center rotate-6">
                <Sparkles size={28} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-dark mb-4">Honest, Tourist-Friendly Pricing</h1>
            <p className="text-neutral-500 font-medium text-lg">
              Pay by the hour, day, week, or month. Insurance, helmet, lock, and 24/7 roadside support are always included. No surprises at handover.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {priceTiers.map((tier, i) => (
              <PricingTier key={tier.id} tier={tier} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-3">Compare Plans</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark">Find the right fit</h2>
          </div>
          <PricingComparison tiers={priceTiers} />
        </div>
      </section>

      <PricingInclusionsBand />

      <FAQ items={faqs} subtitle="Everything you need to know about renting with us." />
    </>
  );
}
