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
        title="Bikes & Scooters"
        subtitle="From easy automatics for city errands to tourers built for the coast road — pick the bike that fits your trip."
        crumbs={[{ label: "Home", href: "/" }, { label: "Bikes" }]}
        image="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=2400&q=80"
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-x">
          {/* Filters (presentational) */}
          <AnimateIn variant="fadeDown" className="mb-10 flex flex-wrap items-center gap-3">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                type="button"
                className={`rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.25em] transition ${
                  i === 0
                    ? "bg-brand-orange text-white shadow-[0_8px_18px_rgba(199,109,74,0.45)]"
                    : "border border-brand-line text-brand-dark hover:border-brand-orange hover:text-brand-orange"
                }`}
              >
                {f}
              </button>
            ))}
          </AnimateIn>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BIKES.map((v) => (
              <VehicleCard key={v.name} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
