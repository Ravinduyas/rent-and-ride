import Image from "next/image";
import AnimateIn from "./AnimateIn";
import SectionHead, { Accent } from "./SectionHead";
import { PHOTOS } from "@/data/photos";

const STEPS = [
  {
    title: "Pick your ride",
    body: "Choose a bike, scooter or three wheeler. We cover every region along the south coast.",
    image: PHOTOS.tuktukRow,
    alt: "A row of tuktuks lined up ready to go",
  },
  {
    title: "Book in minutes",
    body: "Send us your dates and pickup point, and we confirm availability within the hour.",
    image: PHOTOS.talkingByBike,
    alt: "Two riders talking beside a motorbike",
  },
  {
    title: "Pay and explore",
    body: "Settle up at pickup, grab your helmet, and the whole coast is yours to ride.",
    image: PHOTOS.scooterSunset,
    alt: "Riders on a palm-lined coast road at sunset",
  },
];

export default function HowItWorks() {
  return (
    /* Dark band mid-page. The cream sections either side make it land as a
       deliberate pause rather than more of the same. */
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-brand-ink py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-orange/20 blur-3xl"
      />

      <div className="container-x relative">
        <SectionHead
          eyebrow="How it works"
          tone="dark"
          title={
            <>
              Three steps and <Accent>you&apos;re riding</Accent>
            </>
          }
          intro="A rental process built to be comfortable, quick and genuinely hassle free."
        />

        <ol className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <AnimateIn key={s.title} variant="fadeUp" delay={i * 0.12}>
              <li className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  {/* Scrim so the figure stays legible whatever the photo
                      is doing underneath it. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/25 to-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 left-4 text-[64px] font-bold leading-none tracking-tight text-transparent md:text-[76px]"
                    style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.75)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[32ch] text-sm leading-7 text-white/60">
                  {s.body}
                </p>
              </li>
            </AnimateIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
