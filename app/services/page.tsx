import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { FaTruckPickup, FaHelmetSafety } from "react-icons/fa6";
import {
  FaShieldAlt,
  FaTools,
  FaMapMarkedAlt,
  FaIdCard,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import Newsletter from "@/components/Newsletter";
import AnimateIn from "@/components/AnimateIn";

const SERVICES = [
  {
    Icon: FaTruckPickup,
    title: "Doorstep Delivery",
    body: "We deliver the vehicle to your hotel, the airport, or any railway station — and pick it up when you're done.",
  },
  {
    Icon: FaShieldAlt,
    title: "Insurance Coverage",
    body: "Every rental includes third-party insurance. Full damage waivers are available as an optional add-on.",
  },
  {
    Icon: FaTools,
    title: "Roadside Assistance",
    body: "Flat tyre, dead battery, lost key — we'll get a mechanic to you island-wide, usually within an hour.",
  },
  {
    Icon: FaMapMarkedAlt,
    title: "Route Planning",
    body: "Tell us where you want to go and we'll share a tested route, fuel stops and the best places to break.",
  },
  {
    Icon: FaIdCard,
    title: "License Assistance",
    body: "We help international riders get a temporary Sri Lankan riding permit — usually the same day.",
  },
  {
    Icon: FaHelmetSafety,
    title: "Gear Included",
    body: "Helmets, locks and a basic toolkit come standard. Phone mounts and luggage racks on request.",
  },
];

const STEPS = [
  {
    title: "Pick a vehicle",
    body: "Browse the fleet and select what fits your trip and budget.",
  },
  {
    title: "Send a request",
    body: "Tell us your pickup date and location. We confirm in under an hour.",
  },
  {
    title: "Quick paperwork",
    body: "Show your ID and licence. Sign the rental agreement, pay the deposit.",
  },
  {
    title: "Ride away",
    body: "Take the bike for a quick test run with us, then you're on the road.",
  },
];

export const metadata = {
  title: "Services — Rent & Ride",
  description:
    "Delivery, insurance, roadside help, licence support — everything Rent & Ride offers beyond the rental itself.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        subtitle="Renting a vehicle is the easy bit. We also handle the boring stuff — paperwork, permits and roadside help — so the rest of the trip stays fun."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2400&q=80"
      />

      {/* Services grid */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ Icon, title, body }, i) => (
              <AnimateIn key={title} variant="zoomIn" delay={i * 0.08}>
                <div className="group rounded-2xl border border-brand-line bg-white p-8 transition hover:border-brand-orange hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-silverLight text-brand-navy transition group-hover:bg-brand-orange group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-6 text-base font-bold uppercase tracking-[0.18em] text-brand-dark">
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

      {/* How it works */}
      <section className="bg-brand-silverLight py-20 md:py-24">
        <div className="container-x">
          <AnimateIn variant="fadeLeft" className="mb-12 flex flex-col items-start">
            <span className="section-eyebrow" />
            <h2 className="section-title">How It Works</h2>
          </AnimateIn>

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <AnimateIn key={s.title} variant="fadeUp" delay={i * 0.12}>
                <li className="relative rounded-2xl border border-brand-line bg-white p-8">
                  <span className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-sm font-extrabold text-white shadow-[0_10px_18px_rgba(199,109,74,0.45)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-brand-dark">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {s.body}
                  </p>
                </li>
              </AnimateIn>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-white py-20">
        <div className="container-x">
          <AnimateIn variant="zoomIn">
            <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-brand-dark px-10 py-12 text-white md:flex-row">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-[0.1em]">
                  Ready to ride?
                </h3>
                <p className="mt-3 max-w-xl text-sm text-white/70">
                  Pick a vehicle and we&apos;ll have it ready for you within
                  the day.
                </p>
              </div>
              <Link href="/contact" className="btn-orange">
                Book A Vehicle
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-orange">
                  <HiArrowRight />
                </span>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
