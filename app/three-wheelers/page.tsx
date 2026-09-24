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
        title="Three wheelers"
        subtitle="The iconic tuktuk — made for small groups, market runs and unforgettable road trips. Every vehicle includes insurance and roadside support."
        crumbs={[{ label: "Home", href: "/" }, { label: "Three Wheelers" }]}
        image="https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=2400&q=80"
      />

      <div className="panel-cream">
        <section className="py-14 md:py-20">
          <div className="container-x">
            {/* Presentational only — the full range is listed below. */}
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
              {TUKTUKS.map((v, i) => (
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
