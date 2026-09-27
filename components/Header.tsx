"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { asset } from "@/lib/asset";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Bikes", href: "/bikes" },
  { label: "Three Wheelers", href: "/three-wheelers" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : Boolean(pathname?.startsWith(href));

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="container-x flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/15 ring-1 ring-white/30">
            <Image
              src={asset("/logo.svg")}
              alt=""
              fill
              className="object-contain p-1"
              priority
            />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            Rent &amp; Ride
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`py-2 text-sm transition ${
                isActive(item.href)
                  ? "font-semibold text-white underline decoration-2 underline-offset-[10px]"
                  : "font-normal text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(238,91,43,0.35)] transition hover:bg-brand-orangeDeep lg:inline-flex"
        >
          Get Started
        </Link>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full bg-white/15 p-2 text-white ring-1 ring-white/25 lg:hidden"
        >
          {open ? <HiX size={20} /> : <HiMenu size={20} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="container-x flex flex-col gap-2 pb-6">
            {[...NAV, { label: "Contact", href: "/contact" }].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium backdrop-blur-sm ${
                  isActive(item.href)
                    ? "bg-brand-orange text-white"
                    : "bg-white/15 text-white ring-1 ring-white/20"
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
