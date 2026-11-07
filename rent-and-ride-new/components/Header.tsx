"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineStar,
  HiOutlineQuestionMarkCircle,
  HiOutlinePhone,
  HiOutlineChevronRight,
  HiOutlineClock,
} from "react-icons/hi";
import { MdTwoWheeler, MdElectricRickshaw } from "react-icons/md";
import Logo from "./Logo";
import { NAV, SITE, whatsappLink } from "@/lib/site";

// Icons for the phone menu, by link.
const NAV_ICONS: Record<string, typeof HiOutlineHome> = {
  "/": HiOutlineHome,
  "/scooters": MdTwoWheeler,
  "/three-wheelers": MdElectricRickshaw,
  "/about": HiOutlineInformationCircle,
  "/reviews": HiOutlineStar,
  "/faq": HiOutlineQuestionMarkCircle,
  "/contact": HiOutlinePhone,
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  const [scrolled, setScrolled] = useState(false);

  // Close the menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: the page behind doesn't scroll, the floating
  // WhatsApp button steps aside (globals.css), and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.dataset.menuOpen = "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      delete root.dataset.menuOpen;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const isActive = (href: string) => {
    const path = pathname.replace(/\/$/, "") || "/";
    return href === "/" ? path === "/" : path.startsWith(href);
  };

  return (
    <>
    {/* Fixed rather than sticky, so it stays pinned in every browser whatever
        its parents do; this spacer keeps its 4.5rem in the page flow. */}
    <div aria-hidden className="h-[4.5rem]" />
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled || open ? "border-line shadow-[0_6px_24px_-12px_rgba(20,23,26,0.25)]" : "border-line/70"
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-3">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-[0.8125rem] transition ${
                isActive(item.href)
                  ? "font-semibold text-gold-deep underline decoration-gold decoration-2 underline-offset-[10px]"
                  : "text-ink-soft hover:text-gold-deep"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* On every screen size, except on the booking page itself. */}
          {!isActive("/book") && (
            <Link
              href="/book"
              className="btn-gold min-h-10 px-3.5 text-[0.8125rem] min-[400px]:px-4 sm:text-sm"
            >
              Book Now
            </Link>
          )}

          {/* Three lines that fold into an × when the menu is open. */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition lg:hidden ${
              open ? "bg-ink text-white" : "bg-gold-soft text-gold-deep hover:bg-gold/20"
            }`}
          >
            <span aria-hidden className="relative block h-3.5 w-[18px]">
              <span className={`burger-line top-0 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`burger-line top-[6px] ${open ? "scale-x-0 opacity-0" : ""}`} />
              <span className={`burger-line top-[12px] ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <>
          {/* Dims the page below; tapping it closes the menu. (Absolute, not
              fixed: the header's backdrop blur makes it the containing block
              for fixed children.) */}
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="mobile-nav-backdrop absolute inset-x-0 top-full h-[100dvh] bg-ink/40 lg:hidden"
          />
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="mobile-nav absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto rounded-b-3xl border-t border-line bg-white shadow-[0_24px_48px_-24px_rgba(20,23,26,0.45)] lg:hidden"
          >
            <ul className="container-x py-2 sm:grid sm:grid-cols-2 sm:gap-x-3">
              {NAV.map((item, i) => {
                const Icon = NAV_ICONS[item.href] ?? HiOutlineChevronRight;
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="mobile-nav-item" style={{ animationDelay: `${i * 30}ms` }}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-[3.25rem] items-center gap-3.5 rounded-xl px-3 transition ${
                        active ? "bg-gold-soft font-semibold text-gold-deep" : "text-ink hover:bg-paper"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          active ? "bg-gold text-white" : "bg-paper text-gold-deep"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <span className="flex-1 text-[0.9375rem]">{item.label}</span>
                      <HiOutlineChevronRight className={active ? "text-gold-deep" : "text-ink-muted/60"} size={16} />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Quick ways to get in touch, and the opening hours. */}
            <div className="container-x border-t border-line pb-5 pt-4">
              <div className="grid grid-cols-2 gap-2">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp min-h-12">
                  <FaWhatsapp size={18} /> WhatsApp
                </a>
                <a href={SITE.phoneHref} className="btn-outline min-h-12">
                  <HiOutlinePhone size={18} /> Call us
                </a>
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
                <HiOutlineClock className="text-gold" size={14} />
                {SITE.hoursNote}, {SITE.hours}
              </p>
            </div>
          </nav>
        </>
      )}
    </header>
    </>
  );
}
