import AnimateIn from "./AnimateIn";
import SectionHead, { Accent } from "./SectionHead";

const STEPS = [
  {
    title: "Pick your ride",
    body: "Choose a bike, scooter or three wheeler. We cover every region along the south coast.",
  },
  {
    title: "Book in minutes",
    body: "Send us your dates and pickup point, and we confirm availability within the hour.",
  },
  {
    title: "Pay and explore",
    body: "Settle up at pickup, grab your helmet, and the whole coast is yours to ride.",
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

        <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <AnimateIn key={s.title} variant="fadeUp" delay={i * 0.12}>
              <li className="relative">
                {/* Oversized outlined figure — carries the step without an
                    icon badge, and gives the band some scale. */}
                <span
                  aria-hidden="true"
                  className="block text-[76px] font-bold leading-none tracking-tight text-transparent md:text-[96px]"
                  style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.34)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[30ch] text-sm leading-7 text-white/60">
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
