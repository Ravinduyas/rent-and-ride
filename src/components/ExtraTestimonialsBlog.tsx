'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Clock, Bike } from 'lucide-react';
import { CRUISER_1, CRUISER_2, SPORT_2, fallbackGradient } from '../lib/images';

const testimonials = [
  {
    text: "Picked up a Royal Enfield in Weligama and rode it all the way to Ella and back. The bike was spotless, the handover took five minutes, and the south-coast roads are everything people say they are.",
    author: 'Elena Sorokin',
    role: 'Visiting from Berlin',
  },
  {
    text: 'Honestly the easiest bike rental I have ever done — anywhere. They sorted insurance, handed me a Honda Dio with a full tank, and even called to check in halfway through the week.',
    author: 'Marcello V.',
    role: 'Visiting from Milan',
  },
  {
    text: "We rented two scooters for a week to explore from Mirissa down to Tangalle. Loved every second of it. Would book with Rent & Ride again in a heartbeat.",
    author: 'Priya & Rohan N.',
    role: 'Visiting from Mumbai',
  },
];

const blogPosts = [
  {
    title: "The South Coast Loop: Weligama to Tangalle by Royal Enfield",
    cat: 'Routes',
    date: 'May 12, 2026',
    img: CRUISER_1,
  },
  {
    title: 'Renting in Sri Lanka: Licenses, Insurance & What to Pack',
    cat: 'Tips & Tricks',
    date: 'April 28, 2026',
    img: CRUISER_2,
  },
  {
    title: 'Inland by Bike: Weligama to Ella, in One Long Weekend',
    cat: 'Adventure',
    date: 'April 15, 2026',
    img: SPORT_2,
  },
];

export function BenefitsBand() {
  return (
    <section className="bg-neutral-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 skew-x-12 -translate-x-1/2 pointer-events-none" />

          <div className="lg:w-1/2 space-y-8 relative z-10">
            <div className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">Why Travellers Trust Us</div>
            <h2 className="text-4xl md:text-5xl font-black italic leading-tight">
              Safety Comes <br /> First. Always.
            </h2>
            <p className="text-white/70 font-medium">
              Every bike is fully inspected before each rental. You get a quality helmet, U-lock, and a 24/7 number that actually picks up — wherever you are on the south coast.
            </p>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all"
            >
              <ShieldCheck size={32} className="mb-4" />
              <h4 className="text-xl font-bold mb-2">High Security</h4>
              <p className="text-sm text-white/60">Every bike is locked with high-quality components.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all"
            >
              <Clock size={32} className="mb-4" />
              <h4 className="text-xl font-bold mb-2">24/7 Support</h4>
              <p className="text-sm text-white/60">We're always here to help you on your journey.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-neutral-50 py-32 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Quote size={64} className="text-primary/20 mx-auto mb-6" />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-dark leading-relaxed italic">
              "{testimonials[active].text}"
            </h3>
            <div className="space-y-1">
              <p className="text-xl font-black text-primary uppercase">{testimonials[active].author}</p>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{testimonials[active].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={() => setActive(active === 0 ? testimonials.length - 1 : active - 1)}
            className="w-12 h-12 rounded-full border-2 border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-primary hover:text-white hover:border-primary transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setActive(active === testimonials.length - 1 ? 0 : active + 1)}
            className="w-12 h-12 rounded-full border-2 border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-primary hover:text-white hover:border-primary transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, i }: { post: typeof blogPosts[number]; i: number }) {
  const [err, setErr] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-100">
        <div
          className="aspect-[4/3] overflow-hidden"
          style={err ? { background: fallbackGradient(`blog-${i}`) } : undefined}
        >
          {err ? (
            <div className="w-full h-full flex items-center justify-center text-white">
              <Bike size={56} className="opacity-90" />
            </div>
          ) : (
            <img
              src={post.img}
              onError={() => setErr(true)}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
          )}
        </div>
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{post.cat}</span>
            <span className="text-neutral-400">{post.date}</span>
          </div>
          <h4 className="text-xl font-bold text-dark group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h4>
          <div className="flex items-center gap-2 text-dark font-bold text-xs uppercase tracking-widest">
            Read More <ArrowRight size={14} className="text-secondary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BlogGrid() {
  return (
    <section className="bg-neutral-50 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="text-sm font-bold text-secondary uppercase tracking-[0.3em] mb-4">Travel Journal</div>
            <h2 className="text-4xl font-extrabold text-dark italic">Routes &amp; Riding Guides</h2>
          </div>
          <button className="flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all text-sm uppercase tracking-widest">
            View All Posts <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.title} post={post} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ExtraTestimonialsBlog() {
  return (
    <>
      <BenefitsBand />
      <TestimonialsCarousel />
      <BlogGrid />
    </>
  );
}