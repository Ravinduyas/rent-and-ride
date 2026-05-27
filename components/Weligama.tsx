import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import AnimateIn from "./AnimateIn";

const STATS = [
  { value: "5min", label: "From Weligama beach" },
  { value: "120+", label: "Vehicles in fleet" },
  { value: "24/7", label: "Roadside support" },
];

export default function Weligama() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-grad text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-brand-silver/10 blur-3xl" />

      <div className="relative grid min-h-[660px] grid-cols-1 md:grid-cols-[55%_45%]">

        {/* Left — full-bleed photo */}
        <AnimateIn variant="fadeLeft" className="relative min-h-[340px]">
          <Image
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80"
            alt="Rider on the south coast road near Weligama"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(11,20,38,0) 35%, rgba(11,20,38,0.65) 72%, rgba(11,20,38,1) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B1426] to-transparent md:hidden" />
        </AnimateIn>

        {/* Right — copy */}
        <div className="flex flex-col justify-center px-8 py-16 md:py-24 lg:px-14">
          <AnimateIn variant="fadeRight" delay={0.1}>
            <span className="mb-4 block h-8 w-[2px] bg-brand-orange" />
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-silver">
              Based in Weligama · South Coast
            </p>
            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-[1.05] tracking-wide md:text-5xl">
              <span className="text-silver-grad">Ride The South</span>
              <br />
              <span className="text-white">Coast With Us</span>
            </h2>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.25}>
            <p className="mt-6 max-w-md text-sm leading-7 text-brand-silver/80">
              We&apos;re a short walk from Weligama bay — drop in, pick a
              vehicle, and you can be on the road to Mirissa, Hiriketiya or
              the Yala backroads within the hour. Helmets, locks and local
              route advice come standard.
            </p>
          </AnimateIn>

          <div className="mt-8 grid grid-cols-3 gap-6">
            {STATS.map((s, i) => (
              <AnimateIn key={s.label} variant="zoomIn" delay={0.35 + i * 0.12}>
                <div
                  className="animate-float border-l-2 border-brand-orange pl-4"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <p className="text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-silver/70">
                    {s.label}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn variant="fadeUp" delay={0.6}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/bikes" className="btn-orange">
                See The Fleet
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-orange">
                  <HiArrowRight />
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-brand-silver/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-silver transition hover:border-brand-orange hover:text-brand-orange"
              >
                Find The Garage
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
