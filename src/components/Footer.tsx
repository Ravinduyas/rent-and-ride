'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Send, MapPin, Phone, Mail, Instagram, ChevronUp } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative wave */}
      <svg
        aria-hidden
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 right-0 w-full h-12 text-white"
      >
        <path
          d="M0,40 C300,80 600,0 900,40 C1050,60 1150,30 1200,40 L1200,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/10 pb-20">

          {/* Brand & Social */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <Logo size={56} variant="light" />
            </Link>
            <p className="text-sm text-silver/70 font-medium leading-relaxed">
              Premium scooter and motorbike rentals in Weligama — explore Sri Lanka's south coast on our hand-picked fleet.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Send].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-silver hover:bg-primary hover:text-white transition-all"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-8 lg:pl-8">
            <h4 className="text-lg font-bold">Our Locations</h4>
            <div className="space-y-6">
              {[
                { name: 'Weligama Beach Road', addr: '142 Beach Road, Weligama 81700, Sri Lanka', phone: '+94 71 234 5678' },
                { name: 'Mirissa Coconut Tree Hill', addr: 'Galle–Matara Hwy, Mirissa 81740, Sri Lanka', phone: '+94 71 234 5679' },
                { name: 'Galle Fort Hub', addr: '32 Church Street, Galle Fort 80000, Sri Lanka', phone: '+94 71 234 5680' },
              ].map((loc, i) => (
                <div key={i} className="space-y-1">
                  <h5 className="text-sm font-bold text-white">{loc.name}</h5>
                  <p className="text-[10px] uppercase font-bold text-silver/60 tracking-wider leading-relaxed">
                    {loc.addr} <br /> {loc.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-8 lg:pl-8">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'Contact us', to: '/contact' },
                { label: 'Our Fleet', to: '/fleet' },
                { label: 'Pricing', to: '/pricing' },
                { label: 'Book a Ride', to: '/booking' },
                { label: 'About Us', to: '/about' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="text-sm text-silver/70 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 border border-primary rounded-full group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-8">
            <h4 className="text-lg font-bold">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-primary mt-1 shrink-0" />
                <p className="text-xs text-silver/70 font-medium">
                  142 Beach Road, Weligama <br /> 81700, Sri Lanka
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={18} className="text-primary mt-1 shrink-0" />
                <p className="text-xs text-silver/70 font-medium">hello@rentandride.lk</p>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={18} className="text-primary mt-1 shrink-0" />
                <p className="text-xs text-silver/70 font-medium">
                  Phone: <span className="font-bold text-white">+94 71 234 5678</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h5 className="text-sm font-bold">Subscribe Newsletter</h5>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 text-sm focus:outline-none focus:border-primary transition-colors text-white placeholder:text-silver/40"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform" aria-label="Subscribe">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-silver/50 tracking-widest uppercase">
            © 2026 Rent &amp; Ride Weligama. Crafted on the south coast.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/booking"
              className="px-8 py-3 bg-primary/15 text-primary border border-primary/30 rounded-lg flex items-center justify-center font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-primary hover:text-white transition-colors"
            >
              Book now
            </Link>
            <button
              onClick={scrollToTop}
              className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-2xl hover:-translate-y-1 transition-transform"
              aria-label="Back to top"
            >
              <ChevronUp size={24} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
