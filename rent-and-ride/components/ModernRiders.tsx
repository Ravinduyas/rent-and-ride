import Image from "next/image";
import Link from "next/link";
import {
  FaMotorcycle,
  FaMapMarkedAlt,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";
import AnimateIn from "./AnimateIn";
import SectionHead, { Accent } from "./SectionHead";
import { PHOTOS } from "@/data/photos";

const FEATURES = [
  { Icon: FaMotorcycle, label: "Browse our fleet" },
  { Icon: FaMapMarkedAlt, label: "Plan your route" },
  { Icon: FaHeadset, label: "Talk to a local" },
  { Icon: FaShieldAlt, label: "Ride insured" },
];

export default function ModernRiders() {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="container-x grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
        <AnimateIn variant="fadeLeft">
          <div className="relative pb-14 md:pb-16">
            {/* Only the photo bleeds off the left edge. The negative margin used
                to sit on this wrapper, which dragged the quote card off-screen
                with it. */}
            <div className="bleed-left relative aspect-[5/4] overflow-hidden rounded-3xl lg:rounded-l-none">
              <Image
                src={PHOTOS.beachRider}
                alt="A rider on a motorbike on the beach at golden hour"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-[center_55%]"
              />
            </div>

            <div className="absolute bottom-0 left-6 max-w-[min(280px,calc(100%-3rem))] rounded-2xl bg-white p-5 shadow-[0_16px_40px_rgba(46,42,28,0.12)]">
              <p className="text-sm font-semibold leading-6 text-brand-dark">
                Exceptional rides, every time. Start planning your trip today.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Copy */}
        <AnimateIn variant="fadeRight" delay={0.1}>
          <div>
            <SectionHead
              eyebrow="Why us"
              layout="stack"
              title={
                <>
                  Built for <Accent>modern riders</Accent>
                </>
              }
            />
            <p className="mt-5 max-w-md text-sm leading-7 text-brand-muted">
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
