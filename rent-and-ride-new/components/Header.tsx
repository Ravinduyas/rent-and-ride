"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import Logo from "./Logo";
import { NAV, whatsappLink } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  const [scrolled, setScrolled] = useState(false);

  // Close the drawer after navigating.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const path = pathname.replace(/\/$/, "") || "/";
    return href === "/" ? path === "/" : path.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-line shadow-[0_6px_24px_-12px_rgba(20,23,26,0.25)]" : "border-line/70"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-[13px] transition ${
                isActive(item.href)
                  ? "font-semibold text-gold-deep underline decoration-gold decoration-2 underline-offset-[10px]"
                  : "text-ink-soft hover:text-gold-deep"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop only: on phones the floating button covers WhatsApp. */}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn hidden min-h-10 border border-whatsapp/50 px-4 text-[#128C4B] hover:bg-whatsapp/10 lg:inline-flex"
          >
            <FaWhatsapp size={16} />
            WhatsApp
          </a>
          {/* From 360px up; narrower phones get it at the top of the menu. */}
          <Link
            href="/book"
            className="btn-gold hidden min-h-10 px-4 min-[360px]:inline-flex"
          >
            Book Now
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          >
            {open ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="mobile-nav border-t border-line bg-white lg:hidden"
        >
          <ul className="container-x grid grid-cols-2 gap-2 py-4">
            <li className="col-span-2">
              <Link href="/book" className="btn-gold min-h-12 w-full">
                Book Now
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex min-h-11 items-center rounded-lg px-4 text-sm ${
                    isActive(item.href)
                      ? "bg-gold-soft font-semibold text-gold-deep"
                      : "bg-paper text-ink-soft"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
