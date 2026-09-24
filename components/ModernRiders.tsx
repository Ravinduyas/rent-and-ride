import Image from "next/image";
import Link from "next/link";
import {
  FaMotorcycle,
  FaMapMarkedAlt,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";
import AnimateIn from "./AnimateIn";

const FEATURES = [
  { Icon: FaMotorcycle, label: "Browse our fleet" },
  { Icon: FaMapMarkedAlt, label: "Plan your route" },
  { Icon: FaHeadset, label: "Talk to a local" },
  { Icon: FaShieldAlt, label: "Ride insured" },
];

export default function ModernRiders() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
        {/* Photo with the overlapping quote card */}
        <AnimateIn variant="fadeLeft">
          <div className="relative pb-14 pr-6 md:pb-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80"
                alt="Riders planning a route together"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-6 max-w-[280px] rounded-2xl bg-white p-5 shadow-[0_16px_40px_rgba(46,42,28,0.12)]">
              <p className="text-sm font-semibold leading-6 text-brand-dark">
                Exceptional rides, every time. Start planning your trip today.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Copy */}
        <AnimateIn variant="fadeRight" delay={0.1}>
          <div>
            <h2 className="section-title max-w-md">
              Rent &amp; Ride for modern riders
            </h2>
            <p className="section-sub max-w-md">
              Our local crew keeps every bike serviced, insured and ready to go
              — so you can build the trip you actually want, backed by people
              who ride these roads daily.
            </p>

            <ul className="mt-8 grid max-w-md grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {FEATURES.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-line bg-white text-brand-orange">
                    <Icon size={14} />
                  </span>
                  <span className="text-[13px] font-medium text-brand-dark">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/bikes" className="btn-orange mt-9">
              Explore all rides
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
