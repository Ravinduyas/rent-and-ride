import Link from "next/link";
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
    title: "Doorstep delivery",
    body: "We bring the vehicle to your hotel, the airport or any railway station — and collect it when you're done.",
  },
  {
    Icon: FaShieldAlt,
    title: "Insurance coverage",
    body: "Every rental includes third-party insurance. Full damage waivers are available as an optional add-on.",
  },
  {
    Icon: FaTools,
    title: "Roadside assistance",
    body: "Flat tyre, dead battery, lost key — we'll get a mechanic to you island-wide, usually within the hour.",
  },
  {
    Icon: FaMapMarkedAlt,
    title: "Route planning",
    body: "Tell us where you want to go and we'll share a tested route, fuel stops and the best places to break.",
  },
  {
    Icon: FaIdCard,
    title: "Licence assistance",
    body: "We help international riders get a temporary Sri Lankan riding permit — usually the same day.",
  },
  {
    Icon: FaHelmetSafety,
    title: "Gear included",
    body: "Helmets, locks and a basic toolkit come as standard. Phone mounts and luggage racks on request.",
  },
];

const STEPS = [
  {
    title: "Pick a vehicle",
    body: "Browse the fleet and choose what fits your trip and your budget.",
  },
  {
    title: "Send a request",
    body: "Tell us your pickup date and location. We confirm within the hour.",
  },
  {
    title: "Quick paperwork",
    body: "Show your ID and licence, sign the agreement, pay the deposit.",
  },
  {
    title: "Ride away",
    body: "Take a short test run with us, then the road is yours.",
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
        subtitle="Renting the vehicle is the easy bit. We handle the boring parts too — paperwork, permits and roadside help — so the rest of the trip stays fun."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2400&q=80"
      />

      <div className="panel-cream">
        {/* Services grid */}
        <section className="py-16 md:py-24">
          <div className="container-x">
            <AnimateIn variant="fadeUp">
              <h2 className="section-title text-center">
                Everything we take care of
              </h2>
              <p className="section-sub mx-auto max-w-md text-center">
                Beyond handing you the keys, here&apos;s what comes with a Rent
                &amp; Ride booking.
              </p>
            </AnimateIn>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(({ Icon, title, body }, i) => (
                <AnimateIn key={title} variant="fadeUp" delay={(i % 3) * 0.1}>
                  <div className="h-full rounded-3xl bg-white p-7 shadow-[0_10px_30px_rgba(46,42,28,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(46,42,28,0.1)]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orangeSoft text-brand-orange">
                      <Icon size={18} />
                    </span>
                    <h3 className="mt-5 text-[15px] font-semibold text-brand-dark">
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
        <section className="pb-16 md:pb-24">
          <div className="container-x">
            <AnimateIn variant="fadeUp">
              <h2 className="section-title text-center">How it works</h2>
            </AnimateIn>

            <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <AnimateIn key={s.title} variant="fadeUp" delay={i * 0.12}>
                  <li className="relative h-full rounded-3xl bg-white p-7 pt-9 shadow-[0_10px_30px_rgba(46,42,28,0.06)]">
                    <span className="absolute -top-4 left-7 flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white shadow-[0_8px_18px_rgba(238,91,43,0.35)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[15px] font-semibold text-brand-dark">
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
        <section className="pb-16 md:pb-20">
          <div className="container-x">
            <AnimateIn variant="fadeUp">
              <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-brand-ink px-8 py-12 text-center md:flex-row md:px-12 md:text-left">
                <div>
                  <h3 className="text-2xl font-bold text-white md:text-[28px]">
                    Ready to ride?
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/65">
                    Pick a vehicle and we&apos;ll have it ready for you within
                    the day.
                  </p>
                </div>
                <Link href="/contact" className="btn-orange shrink-0">
                  Book a vehicle
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>

        <Newsletter />
      </div>
    </>
  );
}
