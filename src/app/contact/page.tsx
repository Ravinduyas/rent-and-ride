'use client';

import { motion } from 'motion/react';
import { MessageSquare, Mail, Phone } from 'lucide-react';
import ContactForm from '../../components/contact/ContactForm';
import MapPlaceholder from '../../components/contact/MapPlaceholder';
import LocationCards from '../../components/contact/LocationCards';
import FAQ from '../../components/contact/FAQ';
import { CTARail } from '../../components/WhyChooseAndCTARail';
import { faqs } from '../../lib/faq';

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center -rotate-6">
                <MessageSquare size={28} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-dark mb-4">Let&apos;s talk</h1>
            <p className="text-neutral-500 font-medium text-lg">
              Questions about our fleet, a booking, or partnerships? We&apos;re here for it. Drop us a line.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.a
            href="mailto:hello@rentandride.lk"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-neutral-50 rounded-3xl p-8 flex items-center gap-5 hover:bg-primary hover:text-white transition-colors group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary text-white group-hover:bg-white group-hover:text-primary flex items-center justify-center shrink-0 transition-colors">
              <Mail size={24} />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Email Us</div>
              <div className="text-lg font-black">hello@rentandride.lk</div>
              <div className="text-xs font-medium opacity-70">Replies within 24 hours</div>
            </div>
          </motion.a>
          <motion.a
            href="tel:+94712345678"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="bg-neutral-50 rounded-3xl p-8 flex items-center gap-5 hover:bg-secondary hover:text-white transition-colors group"
          >
            <div className="w-14 h-14 rounded-2xl bg-secondary text-white group-hover:bg-white group-hover:text-secondary flex items-center justify-center shrink-0 transition-colors">
              <Phone size={24} />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Call / WhatsApp</div>
              <div className="text-lg font-black">+94 71 234 5678</div>
              <div className="text-xs font-medium opacity-70">24/7 roadside support</div>
            </div>
          </motion.a>
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <ContactForm />
          <MapPlaceholder />
        </div>
      </section>

      <LocationCards />
      <FAQ items={faqs.slice(0, 5)} />
      <CTARail />
    </>
  );
}
