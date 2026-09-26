import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { FaMotorcycle, FaBicycle } from "react-icons/fa";
import { MdElectricRickshaw, MdElectricScooter } from "react-icons/md";
import AnimateIn from "./AnimateIn";
import { PHOTOS } from "@/data/photos";

const CATEGORIES = [
  {
    Icon: MdElectricScooter,
    image: PHOTOS.scooterTown,
    alt: "Riders on a scooter on a town road",
    label: "Scooters",
    body: "Twist-and-go automatics. The easiest thing to ride if you're new to two wheels, and light enough for narrow lanes.",
    href: "/bikes",
  },
  {
    Icon: FaMotorcycle,
    image: PHOTOS.motorbike,
    alt: "A motorbike in a garage",
    label: "Motorbikes",
    body: "Geared commuters and tourers with the legs for long coastal runs and the hill country beyond.",
    href: "/bikes",
  },
  {
    Icon: MdElectricRickshaw,
    image: PHOTOS.tuktukLighthouse,
    alt: "A tuktuk parked below the Galle Fort lighthouse",
    label: "Three wheelers",
    body: "A roof, a back seat and room for luggage. The one to take when you're travelling as a group.",
    href: "/three-wheelers",
  },
  {
    Icon: FaBicycle,
    image: PHOTOS.pedalBike,
    alt: "A pedal bike against a wall",
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
          {CATEGORIES.map(({ Icon, image, alt, label, body, href }, i) => (
            <AnimateIn key={label} variant="fadeUp" delay={(i % 4) * 0.1}>
              <Link
                href={href}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(46,42,28,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(46,42,28,0.1)]"
              >
                <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-orange backdrop-blur-sm">
                    <Icon size={16} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
                  <h3 className="text-[15px] font-semibold text-brand-dark">
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
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
