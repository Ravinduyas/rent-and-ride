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
  HiOutlineIdentification,
} from "react-icons/hi";
import { MdTwoWheeler, MdElectricRickshaw } from "react-icons/md";
import Logo from "./Logo";
import { NAV, SITE, whatsappLink } from "@/lib/site";

// Icons for the phone menu, by link.
const NAV_ICONS: Record<string, typeof HiOutlineHome> = {
  "/": HiOutlineHome,
  "/scooters": MdTwoWheeler,
  "/three-wheelers": MdElectricRickshaw,
  "/driving-permit": HiOutlineIdentification,
  "/about": HiOutlineInformationCircle,
  "/reviews": HiOutlineStar,
  "/faq": HiOutlineQuestionMarkCircle,
  "/contact": HiOutlinePhone,
};

// Pages that open with a photo banner: there the header starts out
// see-through over the photo and turns solid white once the page scrolls.
// "/" is the home hero; the rest use PageHero (dark photo, white text).
const OVER_PHOTO = ["/", "/about", "/contact", "/faq", "/reviews", "/scooters", "/three-wheelers", "/driving-permit"];

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

  const path = pathname.replace(/\/$/, "") || "/";
  const overPhoto = OVER_PHOTO.includes(path);
  const isHome = path === "/";
  // See-through only at the very top of a photo page, and never with the menu open.
  const clear = overPhoto && !scrolled && !open;
  // While clear, text is white over the photo, except on the desktop home
  // page, whose header sits over the white left half of the hero.
  const whiteText = clear && !isHome;

  return (
    <>
    {/* Fixed rather than sticky, so it stays pinned in every browser whatever
        its parents do. Photo pages slide their banner up under it; every other
        page gets this spacer to keep its 4.5rem in the page flow. */}
    {!overPhoto && <div aria-hidden className="h-[4.5rem]" />}
    <header
      data-clear={clear || undefined}
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        clear
          ? // Frosted glass over the photo: it blurs what is behind, so the links
          // stay readable. Lighter glass on the desktop home page (dark text).
          isHome
            ? "glass-bar border-white/25 bg-white/10 lg:border-white/50 lg:bg-white/45"
            : "glass-bar border-white/20 bg-white/10"
          : `bg-white/95 backdrop-blur ${scrolled || open ? "border-line shadow-[0_6px_24px_-12px_rgba(20,23,26,0.25)]" : "border-line/70"}`
      }`}
    >
      {/* A soft shade at the top of the photo keeps the header readable. */}
      {overPhoto && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b to-transparent transition-opacity duration-300 ${
            isHome ? "from-black/45 lg:from-white/80" : "from-black/50"
          } ${clear ? "opacity-100" : "opacity-0"}`}
        />
      )}
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-3">
        <Logo tone={clear ? (isHome ? "light-until-lg" : "light") : "dark"} />

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`whitespace-nowrap rounded-md px-2 py-2 text-[0.8125rem] transition xl:px-3 ${
                isActive(item.href)
                  ? `font-semibold underline decoration-gold decoration-2 underline-offset-[10px] ${whiteText ? "text-white" : "text-gold-deep"}`
                  : whiteText
                    ? "text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.35)] hover:text-white"
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
              open
                ? "bg-ink text-white"
                : clear
                  ? "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  : "bg-gold-soft text-gold-deep hover:bg-gold/20"
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
