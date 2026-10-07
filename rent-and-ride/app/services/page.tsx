import Link from "next/link";
import { FaTruckPickup, FaHelmetSafety } from "react-icons/fa6";
import {
  FaShieldAlt,
  FaTools,
  FaMapMarkedAlt,
  FaIdCard,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import AnimateIn from "@/components/AnimateIn";
import FeatureGrid from "@/components/FeatureGrid";
import Faq from "@/components/Faq";
import { Accent } from "@/components/SectionHead";
import { PHOTOS } from "@/data/photos";

const STAGES = [
  {
    image: PHOTOS.routeMap,
    alt: "A folded paper map",
    title: "Before you arrive",
    body: "We'll talk through what you're planning, suggest a vehicle that fits it, and sort the paperwork and any permit you need — so there's nothing left to arrange once you land.",
  },
  {
    image: PHOTOS.tuktukRoad,
    alt: "A tuktuk and a motorbike on a winding road",
    title: "While you're out riding",
    body: "Route advice when you want it and a phone line that's answered when you need it. If something goes wrong on the road, getting you moving again is our problem, not yours.",
  },
  {
    image: PHOTOS.helmetPrep,
    alt: "A helmet being cleaned in the workshop",
    title: "When you hand it back",
    body: "Drop it at the garage or have us collect it, wherever you've ended up. We check it over with you there and then, so nothing comes up afterwards.",
  },
];

const FAQS = [
  {
    q: "Do I have to come to the garage to collect a vehicle?",
    a: "Only if you'd like to. We deliver to hotels, airports and stations, and we'll collect from wherever you finish. Tell us your plans and we'll work around them.",
  },
  {
    q: "Can I drop the vehicle somewhere other than where I picked it up?",
    a: "Often, yes — one-way drops are something we arrange regularly. Mention it when you enquire so we can confirm it for the route you have in mind.",
  },
  {
    q: "What does roadside assistance actually cover?",
    a: "The usual mishaps — a flat tyre, a dead battery, a key that's gone missing. Call us and we'll get someone out to you rather than leaving you to find a mechanic yourself.",
  },
  {
    q: "Can you help with a local riding permit?",
    a: "Yes, and it's worth asking early. Bring your licence and tell us what you hold, and we'll take you through what's needed.",
  },
  {
    q: "Do you rent to people who aren't tourists?",
    a: "Of course. Plenty of our vehicles go out to people living and working locally on longer arrangements. Get in touch and tell us what you need.",
  },
];

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
    image: PHOTOS.scooterHelmets,
    alt: "Rows of scooters with helmets ready on them",
    title: "Pick a vehicle",
    body: "Browse the fleet and choose what fits your trip and your budget.",
  },
  {
    image: PHOTOS.phoneCall,
    alt: "Someone making a phone call",
    title: "Send a request",
    body: "Tell us your pickup date and location. We confirm within the hour.",
  },
  {
    image: PHOTOS.talkingByBike,
    alt: "Two people talking beside a motorbike",
    title: "Quick paperwork",
    body: "Show your ID and licence, sign the agreement, pay the deposit.",
  },
  {
    image: PHOTOS.scooterSunset,
    alt: "Riders on a palm-lined coast road at sunset",
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
        <FeatureGrid
          eyebrow="What's included"
          title={
            <>
              Everything we <Accent>take care of</Accent>
            </>
          }
          intro="Beyond handing you the keys, here's what comes with a Rent & Ride booking."
          items={SERVICES}
          cols={3}
        />

        <FeatureGrid
          eyebrow="The process"
          title={
            <>
              From enquiry to <Accent>open road</Accent>
            </>
          }
          intro="Four steps, and none of them involve queuing at a counter."
          items={STEPS}
          cols={4}
          numbered
          background="white"
        />

        <FeatureGrid
          eyebrow="Support"
          title={
            <>
              With you for <Accent>the whole trip</Accent>
            </>
          }
          intro="Not just the hour you spend picking the thing up."
          items={STAGES}
          cols={3}
          numbered
          background="dark"
        />

        <Faq
          layout="split"
          eyebrow="Questions"
          title="Common questions"
          accent="questions"
          items={FAQS}
        />

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
      </div>
    </>
  );
}
