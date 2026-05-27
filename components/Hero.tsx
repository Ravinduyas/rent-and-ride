import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import AnimateIn from "./AnimateIn";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-brand-navy"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2400&q=80"
          alt="Rider on a motorbike"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to bottom, transparent 60%, rgba(7,13,26,0.55) 100%)",
              "linear-gradient(95deg, #0B1426 0%, #0B1426 38%, rgba(11,20,38,0.92) 48%, rgba(11,20,38,0.55) 60%, rgba(11,20,38,0.18) 75%, rgba(11,20,38,0) 88%)",
            ].join(", "),
          }}
        />
      </div>

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-orange/20 blur-3xl" />
      <div className="pointer-events-none absolute left-[42%] top-24 hidden h-3 w-3 rounded-full bg-brand-orange md:block" />

      {/* Floating 3-D stats card */}
      <AnimateIn
        variant="zoomIn"
        delay={0.9}
        className="animate-float pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 lg:block"
      >
        <div className="glass shadow-3d rounded-2xl px-7 py-6">
          <div className="flex flex-col gap-6">
            {[
              { v: "120+", l: "Vehicles" },
              { v: "24/7", l: "Support"  },
              { v: "4.9★", l: "Rating"   },
            ].map(({ v, l }) => (
              <div key={l} className="border-l-2 border-brand-orange pl-3">
                <p className="text-2xl font-extrabold text-white">{v}</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-brand-silver/70">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimateIn>

      <div className="container-x relative grid min-h-[640px] grid-cols-1 items-end gap-12 pt-32 pb-16 md:min-h-[720px] md:pt-40 md:pb-20">
        <div className="relative z-10 max-w-xl">
          <AnimateIn variant="fadeDown" delay={0.1}>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-silver/30 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.35em] text-brand-silver backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
              Weligama · South Coast
            </p>
          </AnimateIn>

          <AnimateIn variant="flipUp" delay={0.25}>
            <h1 className="mt-8 text-4xl md:text-6xl font-extrabold uppercase tracking-wide leading-[1.05]">
              <span className="text-silver-grad">Ride The</span>
              <br />
              <span className="text-brand-orange">South Coast</span>
            </h1>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.4}>
            <p className="mt-6 max-w-md text-[12px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-brand-silver/80">
              Rent bikes, scooters and three wheelers near you.
              <br />
              Daily, weekly &amp; monthly rates.
            </p>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.55}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/bikes" className="btn-orange">
                Browse Fleet
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-orange">
                  <HiArrowRight />
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-brand-silver/40 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-silver backdrop-blur-sm transition hover:border-brand-orange hover:text-brand-orange"
              >
                Book Now
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-white">
                  <HiArrowRight />
                </span>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
