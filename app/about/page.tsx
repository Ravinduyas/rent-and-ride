import Image from "next/image";
import Link from "next/link";
import {
  FaShieldAlt,
  FaTools,
  FaMapMarkedAlt,
  FaHeadset,
} from "react-icons/fa";
import { FaWrench, FaHandshake, FaCommentDots, FaTruck } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import Newsletter from "@/components/Newsletter";
import AnimateIn from "@/components/AnimateIn";
import FeatureGrid from "@/components/FeatureGrid";

const PRINCIPLES = [
  {
    title: "Fix it before it's a problem",
    body: "A bike that's nearly due a service goes into the workshop, not back out on hire. It costs us a day and saves someone a breakdown a long way from anywhere.",
  },
  {
    title: "Keep the counter short",
    body: "Nobody flies halfway around the world to read a rental agreement. We keep the paperwork to what's genuinely needed and explain the rest in plain language.",
  },
  {
    title: "Say so when we can't",
    body: "If a vehicle isn't right for your route, or we haven't got what you asked for, you'll hear that from us rather than discovering it on the road.",
  },
];

const PEOPLE = [
  {
    Icon: FaCommentDots,
    title: "Whoever answers the phone",
    body: "Your enquiry doesn't go to a call centre. It reaches the same small team that hands over the keys, which is why the answers tend to be specific.",
  },
  {
    Icon: FaWrench,
    title: "The mechanics",
    body: "They see every vehicle between rentals and sign it off before it goes out. They're also the ones who come to you if something needs fixing on the road.",
  },
  {
    Icon: FaTruck,
    title: "The delivery riders",
    body: "They bring the vehicle to you and collect it afterwards, which means they know the coast road, the shortcuts and which stretches to avoid after dark.",
  },
  {
    Icon: FaHandshake,
    title: "The handover",
    body: "Whoever gives you the keys walks you round the vehicle, runs through the controls and rides out with you if you'd like the company.",
  },
];

const VALUES = [
  {
    Icon: FaShieldAlt,
    title: "Fully insured",
    body: "Every rental is covered by third-party insurance and helmets are included free.",
  },
  {
    Icon: FaTools,
    title: "Serviced fleet",
    body: "Each vehicle is checked and serviced between rentals — no surprises mid-trip.",
  },
  {
    Icon: FaMapMarkedAlt,
    title: "Island delivery",
    body: "We deliver to hotels, airports and stations across the island, including one-way drops.",
  },
  {
    Icon: FaHeadset,
    title: "24/7 support",
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
        subtitle="A small, hands-on rental crew that keeps a well-maintained fleet on the road — so you spend your time riding, not at a counter."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=2400&q=80"
      />

      <div className="panel-cream">
        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="container-x grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
            <AnimateIn variant="fadeLeft">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80"
                  alt="Our garage in Weligama"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </AnimateIn>

            <AnimateIn variant="fadeRight" delay={0.1}>
              <div>
                <h2 className="section-title max-w-md">Our story</h2>
                <div className="mt-5 max-w-md space-y-5 text-sm leading-7 text-brand-muted">
                  <p>
                    We started Rent &amp; Ride in 2017 with three scooters and a
                    handwritten ledger. A lot has changed — a fleet of over a
                    hundred vehicles, island-wide delivery, riders from more
                    than forty countries — but the philosophy has not.
                  </p>
                  <p>
                    Keep the bikes well maintained. Keep the paperwork short.
                    Treat people the way we&apos;d want to be treated when we
                    land somewhere new. That&apos;s pretty much it.
                  </p>
                </div>

                <Link href="/contact" className="btn-orange mt-8">
                  Talk to us
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20">
          <div className="container-x">
            <AnimateIn variant="fadeUp">
              <h2 className="section-title text-center">What you get</h2>
              <p className="section-sub mx-auto max-w-md text-center">
                The things we include as standard, on every single rental.
              </p>
            </AnimateIn>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map(({ Icon, title, body }, i) => (
                <AnimateIn key={title} variant="fadeUp" delay={i * 0.1}>
                  <div className="h-full rounded-3xl bg-white p-7 shadow-[0_10px_30px_rgba(46,42,28,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(46,42,28,0.1)]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orangeSoft text-brand-orange">
                      <Icon size={16} />
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

        <FeatureGrid
          title="How we work"
          intro="Three habits that shape most of what we do."
          items={PRINCIPLES}
          cols={3}
          numbered
        />

        <FeatureGrid
          title="Who you'll actually deal with"
          intro="It's a small operation, so the people below are usually the same handful of faces."
          items={PEOPLE}
          cols={4}
        />

        {/* Stats */}
        <section className="pb-8">
          <div className="container-x grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map(({ value, label }, i) => (
              <AnimateIn key={label} variant="fadeUp" delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-orange md:text-4xl">
                    {value}
                  </p>
                  <p className="mt-2 text-xs text-brand-muted">{label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </section>

        <Newsletter />
      </div>
    </>
  );
}
