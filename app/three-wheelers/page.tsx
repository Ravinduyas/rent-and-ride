import { FaUmbrella, FaUsers, FaSuitcaseRolling, FaBoxOpen } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";
import Newsletter from "@/components/Newsletter";
import AnimateIn from "@/components/AnimateIn";
import FeatureGrid from "@/components/FeatureGrid";
import Faq from "@/components/Faq";
import SectionHead, { Accent } from "@/components/SectionHead";
import { TUKTUKS } from "@/data/vehicles";
import { PHOTOS } from "@/data/photos";

const USE_CASES = [
  {
    Icon: FaUsers,
    image: PHOTOS.tuktukRoad,
    alt: "A tuktuk and a motorbike on a winding road",
    title: "Travelling as a group",
    body: "A back seat means nobody gets left behind and nobody has to ride solo. It's the difference between one trip together and a convoy of scooters.",
  },
  {
    Icon: FaUmbrella,
    image: PHOTOS.tuktukLane,
    alt: "A tuktuk on a narrow lane after dark",
    title: "Riding through the rain",
    body: "The wet season arrives fast and leaves just as quickly. A roof turns a downpour from the end of your plans into something you sit out and carry on through.",
  },
  {
    Icon: FaSuitcaseRolling,
    image: PHOTOS.tuktukShops,
    alt: "Tuktuks parked outside shops with luggage on the roof rack",
    title: "Moving with luggage",
    body: "Backpacks, surfboard bags and a week's shopping all fit in ways they never will on two wheels. Handy on the day you change accommodation.",
  },
  {
    Icon: FaBoxOpen,
    image: PHOTOS.tuktukLighthouse,
    alt: "A tuktuk parked below the Galle Fort lighthouse",
    title: "Carrying more than people",
    body: "Our cargo models trade the back seat for a flat bed, which is what you want for a market run or moving anything awkward.",
  },
];

const FAQS = [
  {
    q: "Is a three wheeler hard to drive?",
    a: "It's closer to a motorbike than a car — handlebars, not a steering wheel — but it doesn't lean and it won't fall over. Most people have the hang of it within a few minutes. We'll take you out for a practice run before you leave.",
  },
  {
    q: "Do I need a different licence for one?",
    a: "The requirements aren't the same as for a two-wheeler. Tell us what licence you hold when you enquire and we'll let you know exactly what you need before you commit to anything.",
  },
  {
    q: "How many people can travel in one?",
    a: "The back seat is built for a small group, with the driver up front. Tell us how many of you there are and we'll point you at a model that fits everyone comfortably.",
  },
  {
    q: "Are they slower than a bike?",
    a: "Yes, and that's rather the point. They're built for pottering along the coast road with the sides open, not for covering ground quickly. Plan a little more time than you would on two wheels.",
  },
  {
    q: "Can I take one on a long trip?",
    a: "You can, and some people do exactly that. Talk to us about your route first so we can suggest a model suited to the distance and check it over properly beforehand.",
  },
];

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
        <section className="py-20 md:py-28">
          <div className="container-x">
            <SectionHead
              eyebrow="The fleet"
              title={
                <>
                  Tuktuks ready to <Accent>head out</Accent>
                </>
              }
              intro="Passenger and cargo models, by the day, the week or the month. Insurance and roadside support included."
              className="mb-12"
            />

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

        <FeatureGrid
          eyebrow="Why three wheels"
          title={
            <>
              When a tuktuk <Accent>beats a bike</Accent>
            </>
          }
          intro="Two wheels aren't always the answer. These are the trips people come back for a three wheeler for:"
          items={USE_CASES}
          cols={4}
          background="white"
          stagger
        />

        <Faq
          layout="split"
          eyebrow="Good to know"
          title="About three wheelers"
          accent="three wheelers"
          items={FAQS}
        />

        <Newsletter />
      </div>
    </>
  );
}
