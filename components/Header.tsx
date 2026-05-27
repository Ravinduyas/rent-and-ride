"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Bikes", href: "/bikes" },
  { label: "Three Wheelers", href: "/three-wheelers" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  // Every page banner is now navy → always use silver text in the header.
  const onDark = true;
  const wordmark = "text-white";
  const wordmarkSub = "text-brand-silver/70";
  const navText = "text-brand-silver hover:text-brand-orange";

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="container-x flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-brand-navy shadow-[0_8px_22px_rgba(11,20,38,0.35)] ring-1 ring-brand-silver/40">
            <Image
              src="/logo.svg"
              alt="Rent & Ride Weligama"
              fill
              className="object-contain p-1"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className={`text-xl font-extrabold tracking-[0.18em] ${wordmark}`}>
              RENT&amp;RIDE
            </span>
            <span className={`mt-1 text-[10px] font-medium tracking-[0.5em] ${wordmarkSub}`}>
              WELIGAMA
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-xs font-semibold uppercase tracking-[0.2em] transition ${
                isActive(item.href) ? "text-brand-orange" : navText
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden rounded-full p-2 ${
            onDark
              ? "bg-white/10 text-brand-silver ring-1 ring-brand-silver/30"
              : "bg-white/70 text-brand-navy"
          }`}
        >
          {open ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="container-x flex flex-col gap-3 pb-6">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] ${
                  isActive(item.href)
                    ? "bg-brand-orange text-white"
                    : onDark
                    ? "bg-white/10 text-brand-silver ring-1 ring-brand-silver/20"
                    : "bg-white/80 text-brand-navy"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
