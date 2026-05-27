import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import {
  FaShieldAlt,
  FaTools,
  FaMapMarkedAlt,
  FaHeadset,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import Newsletter from "@/components/Newsletter";
import AnimateIn from "@/components/AnimateIn";

const VALUES = [
  {
    Icon: FaShieldAlt,
    title: "Fully Insured",
    body: "Every rental is covered by third-party insurance and helmets are included free.",
  },
  {
    Icon: FaTools,
    title: "Serviced Fleet",
    body: "Each vehicle is checked and serviced between every rental — no surprises mid-trip.",
  },
  {
    Icon: FaMapMarkedAlt,
    title: "Island Delivery",
    body: "We deliver to hotels, airports and stations across the island, including one-way drops.",
  },
  {
    Icon: FaHeadset,
    title: "24/7 Support",
    body: "Roadside help, paperwork, route advice — message us anytime on WhatsApp.",
  },
];

const STATS = [
  { value: "8+", label: "Years on the road" },
  { value: "120", label: "Vehicles in fleet" },
  { value: "10k", label: "Happy riders" },
  { value: "4.9", label: "Average rating" },
];

export const metadata = {
  title: "About — Rent & Ride",
  description:
    "Meet Rent & Ride — a local rental fleet for bikes, scooters and three wheelers.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Rent & Ride"
        subtitle="A small, hands-on rental crew that keeps a well-maintained fleet on the road — so you can spend your time riding, not at the counter."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=2400&q=80"
      />

      {/* Story */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <AnimateIn variant="fadeLeft">
            <div className="group relative mx-auto aspect-square w-full max-w-[460px]">
              {/* Photo — the wheel face */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <Image
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80"
                  alt="Our garage"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              {/* Wheel SVG overlay — spokes + rim + hub */}
              <svg
                className="animate-wheel-slow absolute inset-0 h-full w-full"
                viewBox="0 0 200 200"
                aria-hidden="true"
              >
                {/* Subtle dark tint so spokes are visible */}
                <circle cx="100" cy="100" r="99" fill="rgba(0,0,0,0.22)" />

                {/* 16 spokes */}
                {Array.from({ length: 16 }, (_, i) => {
                  const angle = (i / 16) * Math.PI * 2;
                  const x2 = 100 + 84 * Math.cos(angle);
                  const y2 = 100 + 84 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="100" y1="100"
                      x2={x2} y2={y2}
                      stroke="rgba(255,255,255,0.55)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Rim — outer edge */}
                <circle cx="100" cy="100" r="93" fill="none" stroke="#C76D4A" strokeWidth="11" />
                {/* Rim — inner highlight */}
                <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                {/* Rim — outer highlight */}
                <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

                {/* Hub — layered rings */}
                <circle cx="100" cy="100" r="16" fill="#C76D4A" />
                <circle cx="100" cy="100" r="11" fill="#8B3E22" />
                <circle cx="100" cy="100" r="7"  fill="#C76D4A" />
                <circle cx="100" cy="100" r="3.5" fill="white" />
              </svg>

              {/* Glow shadow */}
              <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_0_3px_rgba(199,109,74,0.25),0_24px_60px_rgba(199,109,74,0.35)]" />
            </div>
          </AnimateIn>

          <AnimateIn variant="fadeRight" delay={0.15}>
            <div>
              <span className="section-eyebrow" />
              <h2 className="section-title leading-tight">Our Story</h2>
              <div className="mt-6 space-y-5 text-sm leading-7 text-brand-muted">
                <p>
                  We started Rent &amp; Ride in 2017 with three scooters and a
                  handwritten ledger. A lot has changed — we now run a fleet of
                  over a hundred vehicles, deliver across the island, and have
                  rented to riders from more than forty countries — but the
                  philosophy is the same.
                </p>
                <p>
                  Keep the bikes well-maintained. Keep the paperwork short.
                  Treat people the way we want to be treated when we land
                  somewhere new. That&apos;s pretty much it.
                </p>
              </div>

              <Link href="/contact" className="btn-orange mt-8">
                Talk To Us
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-orange">
                  <HiArrowRight />
                </span>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-silverLight py-20 md:py-24">
        <div className="container-x">
          <AnimateIn variant="fadeLeft" className="mb-12 flex flex-col items-start">
            <span className="section-eyebrow" />
            <h2 className="section-title">What You Get</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ Icon, title, body }, i) => (
              <AnimateIn key={title} variant="zoomIn" delay={i * 0.1}>
                <div className="rounded-2xl border border-brand-line bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-brand-dark">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {body}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="container-x grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map(({ value, label }, i) => (
            <AnimateIn key={label} variant="fadeUp" delay={i * 0.1}>
              <div className="border-l-2 border-brand-orange pl-5">
                <p className="text-3xl md:text-4xl font-extrabold text-brand-dark">
                  {value}
                </p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.25em] text-brand-muted">
                  {label}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
