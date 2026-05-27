import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import AnimateIn from "./AnimateIn";

type Item = {
  label: string;
  src: string;
};

const ITEMS: Item[] = [
  {
    label: "Scooter",
    src: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Motorbike",
    src: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Touring",
    src: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Pedal Bike",
    src: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Services() {
  return (
    <section id="fleet" className="bg-white">
      <div className="container-x pt-4 pb-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <AnimateIn variant="fadeLeft">
            <div>
              <span className="section-eyebrow" />
              <h2 className="section-title">Our Fleet</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-brand-muted">
                A snapshot of what&apos;s rolling out of our garage this week.
                Three wheelers and cargo tuktuks are listed separately.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn variant="fadeRight" delay={0.1}>
            <Link
              href="/bikes"
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-navy hover:text-brand-orange"
            >
              View All
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white">
                <HiArrowRight />
              </span>
            </Link>
          </AnimateIn>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ label, src }, i) => (
            <AnimateIn key={label} variant="zoomIn" delay={i * 0.1}>
              <div className="group relative aspect-[4/3] overflow-hidden transition-all duration-300 hover:z-10 hover:scale-[1.03] hover:shadow-[0_24px_50px_rgba(0,0,0,0.3)]">
                <Image
                  src={src}
                  alt={label}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute bottom-6 left-6 text-lg font-bold uppercase tracking-[0.3em] text-white">
                  {label}
                </span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
