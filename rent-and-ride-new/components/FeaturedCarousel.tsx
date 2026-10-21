"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import type { Vehicle } from "@/data/vehicles";
import { responsive } from "@/lib/img";
import { specs } from "@/lib/booking";

const KIND: Record<Vehicle["kind"], string> = { scooter: "Scooter", bike: "Bike", tuktuk: "Tuk-Tuk" };

/**
 * Phone version of Featured Vehicles: tall, photo-led cards in a row that
 * snaps one card at a time, with dots showing the position. The whole card
 * opens the booking flow with that vehicle chosen.
 */
export default function FeaturedCarousel({ vehicles }: { vehicles: Vehicle[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // Dot follows whichever card is mostly in view.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { root: el, threshold: 0.6 }
    );
    el.querySelectorAll("li").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const li = track.current?.children[i] as HTMLElement | undefined;
    li?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div>
      <ul
        ref={track}
        data-reveal-stagger
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1"
      >
        {vehicles.map((v, i) => (
          <li key={v.slug} data-index={i} className="w-[76%] max-w-[300px] shrink-0 snap-start">
            <Link
              href={`/book/?vehicle=${v.slug}`}
              aria-label={`Book the ${v.name}, $${v.perDay} per day`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink shadow-lift"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...responsive(v.image, [480, 640, 900], "(min-width: 640px) 300px, 76vw")}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-active:scale-105"
                style={v.imagePosition ? { objectPosition: v.imagePosition } : undefined}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />

              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-ink backdrop-blur">
                {KIND[v.kind]}
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-sm font-semibold text-white shadow">
                ${v.perDay}
                <span className="text-xs font-normal text-white/85">/day</span>
              </span>

              <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                <span className="block text-xl font-semibold leading-tight">{v.name}</span>
                <span className="mt-0.5 block text-xs text-white/75">
                  {specs(v, " · ")} · {v.seats} people
                </span>
                <span className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-ink transition group-hover:bg-gold-soft">
                  Book now <HiArrowRight />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-center gap-1.5" role="tablist" aria-label="Featured vehicles">
        {vehicles.map((v, i) => (
          <button
            key={v.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show ${v.name}`}
            onClick={() => goTo(i)}
            // 44px tall tap area around a small dot.
            className="flex h-11 items-center px-2"
          >
            <span className={`block h-2 rounded-full transition-all ${i === active ? "w-6 bg-gold" : "w-2 bg-line"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
