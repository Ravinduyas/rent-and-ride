import { FaRoute, FaCity, FaMountain } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";
import Newsletter from "@/components/Newsletter";
import AnimateIn from "@/components/AnimateIn";
import FeatureGrid from "@/components/FeatureGrid";
import Faq from "@/components/Faq";
import { BIKES } from "@/data/vehicles";
import { PHOTOS } from "@/data/photos";

const PROFILES = [
  {
    Icon: FaCity,
    image: PHOTOS.scooterTown,
    alt: "Two riders on a scooter passing a roadside building",
    title: "Short hops around town",
    body: "Beach, market, dinner and back. An automatic scooter is the least effort here — light to park, easy in traffic, and nothing to think about but the throttle.",
  },
  {
    Icon: FaRoute,
    image: PHOTOS.scooterSunset,
    alt: "Scooters on a palm-lined coast road at sunset",
    title: "Days out along the coast",
    body: "Once you're covering real distance, a geared bike earns its keep. Steadier at speed on the main road, and far more comfortable after an hour in the saddle.",
  },
  {
    Icon: FaMountain,
    image: PHOTOS.scooterCoast,
    alt: "A scooter on a coastal lane with a green headland beyond",
    title: "Heading inland and uphill",
    body: "The climbs into tea country ask more of a bike than the flat coast road does. Take something with torque to spare, and tell us your route so we can check it over first.",
  },
];

const FAQS = [
  {
    q: "What's the difference between a scooter and a motorbike here?",
    a: "Scooters are automatic — twist and go, nothing to change. Motorbikes are geared, which takes a little practice but gives you more control on hills and at speed. If you're unsure, start on a scooter.",
  },
  {
    q: "Can two people ride on one bike?",
    a: "On most of them, yes. Say so when you book and we'll make sure you get a bike with a comfortable pillion seat and a second helmet.",
  },
  {
    q: "Is the bike I pick the exact one I get?",
    a: "We'll match you to the model you've chosen wherever we can. If it's already out, we'll offer you the closest thing we have and check you're happy before anything is confirmed.",
  },
  {
    q: "What condition are the bikes in?",
    a: "Every vehicle is checked over and serviced between rentals. If anything doesn't feel right when you take it out, bring it straight back and we'll swap it.",
  },
  {
    q: "Can I take a bike to the other side of the island?",
    a: "Plenty of riders do. Let us know roughly where you're headed so we can talk through the route with you and make sure the bike is up to it.",
  },
];

export const metadata = {
  title: "Bikes — Rent & Ride",
  description:
    "Browse motorbikes, scooters and pedal bikes available for daily, weekly and monthly rental.",
};

const FILTERS = ["All", "Motorbike", "Scooter", "Cruiser", "Push Bike"];

export default function BikesPage() {
  return (
    <>
      <PageHeader
        title="Bikes & scooters"
        subtitle="From easy automatics for town errands to tourers built for the coast road — pick the bike that fits your trip."
        crumbs={[{ label: "Home", href: "/" }, { label: "Bikes" }]}
        image="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=2400&q=80"
      />

      <div className="panel-cream">
        <section className="py-14 md:py-20">
          <div className="container-x">
            {/* Presentational only — the full fleet is listed below. */}
            <AnimateIn
              variant="fadeDown"
              className="mb-10 flex flex-wrap items-center gap-3"
            >
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  className={`rounded-full px-5 py-2 text-[13px] font-medium transition ${
                    i === 0
                      ? "bg-brand-orange text-white shadow-[0_8px_18px_rgba(238,91,43,0.3)]"
                      : "border border-brand-line bg-white text-brand-dark hover:border-brand-orange hover:text-brand-orange"
                  }`}
                >
                  {f}
                </button>
              ))}
            </AnimateIn>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BIKES.map((v, i) => (
                <AnimateIn key={v.name} variant="fadeUp" delay={(i % 3) * 0.08}>
                  <VehicleCard vehicle={v} />
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        <FeatureGrid
          title="Which one suits your trip?"
          intro="The right bike depends less on the badge than on where you're taking it. A rough guide:"
          items={PROFILES}
          cols={3}
        />

        <Faq
          title="About the bikes"
          items={FAQS}
        />

        <Newsletter />
      </div>
    </>
  );
}
