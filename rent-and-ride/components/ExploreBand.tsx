import Image from "next/image";
import Link from "next/link";
import AnimateIn from "./AnimateIn";

const SHOTS = [
  {
    src: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=600&q=80",
    alt: "Riders on the coast road",
  },
  {
    src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80",
    alt: "A temple stop along the route",
  },
  {
    src: "https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&w=600&q=80",
    alt: "Packed up for a long ride",
  },
  {
    src: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=600&q=80",
    alt: "Palms along the bay road",
  },
];

export default function ExploreBand() {
  return (
    <section className="relative overflow-hidden bg-brand-ink">
      <div className="container-x grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-2 md:gap-8 md:py-20">
        <AnimateIn variant="fadeLeft">
          <div>
            <h2 className="max-w-sm text-[26px] font-bold leading-[1.25] text-white md:text-[34px]">
              Let&apos;s explore the beauty of the south coast
            </h2>
            <Link href="/contact" className="btn-orange mt-8">
              Get started
            </Link>
          </div>
        </AnimateIn>

        <AnimateIn variant="fadeRight" delay={0.1}>
          <div className="md:pl-6">
            <p className="max-w-sm text-sm leading-7 text-white/65">
              Don&apos;t miss our long-stay rates — book a bike for a week or
              more and explore the whole coast for less.
            </p>

            {/* Runs past the container so the last card is cropped by the
                section edge, as in the design. */}
            <div className="mt-8 flex gap-4 md:-mr-52 lg:-mr-80">
              {SHOTS.map((s) => (
                <div
                  key={s.src}
                  className="relative h-36 w-32 shrink-0 overflow-hidden rounded-2xl md:h-44 md:w-40"
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
