import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { FaMotorcycle, FaBicycle } from "react-icons/fa";
import { MdElectricRickshaw, MdElectricScooter } from "react-icons/md";
import AnimateIn from "./AnimateIn";

const CATEGORIES = [
  {
    Icon: MdElectricScooter,
    label: "Scooters",
    body: "Twist-and-go automatics. The easiest thing to ride if you're new to two wheels, and light enough for narrow lanes.",
    href: "/bikes",
  },
  {
    Icon: FaMotorcycle,
    label: "Motorbikes",
    body: "Geared commuters and tourers with the legs for long coastal runs and the hill country beyond.",
    href: "/bikes",
  },
  {
    Icon: MdElectricRickshaw,
    label: "Three wheelers",
    body: "A roof, a back seat and room for luggage. The one to take when you're travelling as a group.",
    href: "/three-wheelers",
  },
  {
    Icon: FaBicycle,
    label: "Pedal bikes",
    body: "For beach loops and short hops around town when you'd rather not deal with an engine at all.",
    href: "/bikes",
  },
];

export default function FleetPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <AnimateIn variant="fadeUp">
          <h2 className="section-title text-center">
            Something for every kind of trip
          </h2>
          <p className="section-sub mx-auto max-w-lg text-center">
            Four ways to get around the south coast. Not sure which suits you?
            Tell us where you're headed and we'll point you at the right one.
          </p>
        </AnimateIn>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map(({ Icon, label, body, href }, i) => (
            <AnimateIn key={label} variant="fadeUp" delay={(i % 4) * 0.1}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_10px_30px_rgba(46,42,28,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(46,42,28,0.1)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orangeSoft text-brand-orange transition group-hover:bg-brand-orange group-hover:text-white">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-[15px] font-semibold text-brand-dark">
                  {label}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-brand-muted">
                  {body}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-orange">
                  See these
                  <HiArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
