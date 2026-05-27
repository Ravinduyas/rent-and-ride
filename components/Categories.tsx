"use client";

import { useState, useRef, MouseEvent } from "react";
import { FaMotorcycle, FaBicycle } from "react-icons/fa";
import { MdElectricRickshaw, MdElectricScooter } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import AnimateIn from "./AnimateIn";

const CATS = [
  {
    key: "motorbike",
    label: "Motorbike",
    Icon: FaMotorcycle,
    blurb:
      "Lightweight commuters and touring bikes for highway runs and coast roads.",
    href: "/bikes",
  },
  {
    key: "scooter",
    label: "Scooter",
    Icon: MdElectricScooter,
    blurb:
      "Easy automatics — perfect for city errands and short island hops.",
    href: "/bikes",
  },
  {
    key: "tuktuk",
    label: "Three Wheeler",
    Icon: MdElectricRickshaw,
    blurb:
      "Iconic tuktuks for groups of up to three, with luggage space and a roof.",
    href: "/three-wheelers",
  },
  {
    key: "pushbike",
    label: "Cycle",
    Icon: FaBicycle,
    blurb:
      "Geared and electric pedal bikes for short rides and beach loops.",
    href: "/bikes",
  },
];

export default function Categories() {
  const [active, setActive] = useState<string>("motorbike");
  const activeCat = CATS.find((c) => c.key === active) ?? CATS[0];
  const gridRef = useRef<HTMLDivElement>(null);

  function onGridMove(e: MouseEvent<HTMLDivElement>) {
    const el = gridRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }

  function onGridLeave() {
    if (gridRef.current) gridRef.current.style.transform = "";
  }

  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="container-x grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div
          className="relative"
          ref={gridRef}
          onMouseMove={onGridMove}
          onMouseLeave={onGridLeave}
          style={{ transition: "transform 0.25s ease", willChange: "transform" }}
        >
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-brand-line bg-brand-line">
            {CATS.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={`flex h-36 flex-col items-center justify-center gap-3 bg-white p-4 transition ${
                  active === key ? "text-brand-orange" : "text-brand-dark"
                }`}
              >
                <Icon size={28} />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  {label}
                </span>
              </button>
            ))}
          </div>

          <Link
            href={activeCat.href}
            aria-label={`Browse ${activeCat.label}`}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-orange text-white shadow-[0_10px_24px_rgba(199,109,74,0.45)]"
          >
            <HiArrowRight />
          </Link>
        </div>

        <AnimateIn variant="fadeRight" delay={0.1} className="flex flex-col items-start">
          <span className="section-eyebrow" />
          <h2 className="section-title leading-tight">
            Choose Your
            <br />
            Favourite Ride
          </h2>
          <p className="mt-6 text-sm leading-7 text-brand-muted">
            {activeCat.blurb} Pick from our maintained fleet, get free
            helmets and locks with every booking, and ride away the same
            day. Hover the tiles to switch categories.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
