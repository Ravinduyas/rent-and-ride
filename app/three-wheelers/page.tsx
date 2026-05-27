import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";
import Newsletter from "@/components/Newsletter";
import AnimateIn from "@/components/AnimateIn";
import { TUKTUKS } from "@/data/vehicles";

export const metadata = {
  title: "Three Wheelers — Rent & Ride",
  description:
    "Tuktuks and three wheelers for hire — passenger and cargo, by day, week or month.",
};

const FILTERS = ["All", "Three Wheeler", "Cargo Tuktuk"];

export default function ThreeWheelersPage() {
  return (
    <>
      <PageHeader
        title="Three Wheelers"
        subtitle="The iconic tuktuk — perfect for small groups, market runs and unforgettable road trips. All vehicles include insurance and roadside support."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Three Wheelers" },
        ]}
        image="https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=2400&q=80"
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-x">
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
            {TUKTUKS.map((v) => (
              <VehicleCard key={v.name} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
