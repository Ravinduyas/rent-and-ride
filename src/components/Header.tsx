'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

function isActiveLink(pathname: string, target: string) {
  if (target === '/') return pathname === '/';
  return pathname === target || pathname.startsWith(`${target}/`);
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <Logo size={48} variant="dark" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActiveLink(pathname, item.to);
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`relative px-4 py-2 text-sm font-bold transition-colors ${
                    active ? 'text-primary' : 'text-dark/70 hover:text-primary'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-[3px] bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              className="text-dark/60 hover:text-primary transition-colors relative hidden sm:block"
              id="cart-button"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            <Link
              href="/booking"
              className="hidden md:inline-flex px-6 py-3 bg-secondary text-white rounded-full text-sm font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-all"
              id="rent-now-button"
            >
              Rent Now
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-dark hover:text-primary transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-white border-t border-black/5"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => {
                const active = isActiveLink(pathname, item.to);
                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-dark/70 hover:bg-neutral-50 hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="mt-3 mx-4 px-6 py-3 bg-secondary text-white rounded-full text-sm font-bold shadow-lg shadow-secondary/20 text-center"
              >
                Rent Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
