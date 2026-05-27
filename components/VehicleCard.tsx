"use client";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { useRef, MouseEvent, useEffect, useState } from "react";

export type Vehicle = {
  name: string;
  type: string;
  image: string;
  pricePerDay: number;
  seats?: number;
  transmission?: string;
  highlights?: string[];
};

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function onMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${
      -y * 12
    }deg) translateZ(10px)`;
    el.style.boxShadow =
      "0 20px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.1)";
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.6s ease",
        willChange: "transform",
        opacity: visible ? 1 : 0,
        transform: visible ? undefined : "translateY(40px) scale(0.95)",
      }}
      className="group overflow-hidden rounded-2xl border border-brand-line bg-white shadow-[0_4px_18px_rgba(0,0,0,0.06)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark">
          {vehicle.type}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold uppercase tracking-[0.15em] text-brand-dark">
          {vehicle.name}
        </h3>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
          {vehicle.seats && <li>{vehicle.seats} Seats</li>}
          {vehicle.transmission && <li>{vehicle.transmission}</li>}
          {vehicle.highlights?.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-brand-orange">
              ${vehicle.pricePerDay}
            </span>
            <span className="ml-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
              / day
            </span>
          </div>

          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-brand-orange py-2 pl-4 pr-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white shadow-[0_8px_18px_rgba(199,109,74,0.45)] transition hover:bg-brand-orangeDeep active:translate-y-[2px] active:shadow-none"
          >
            Book
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-brand-orange">
              <HiArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
