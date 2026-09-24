import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";
import Newsletter from "@/components/Newsletter";
import AnimateIn from "@/components/AnimateIn";
import { BIKES } from "@/data/vehicles";

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

        <Newsletter />
      </div>
    </>
  );
}
