import { FaCompass, FaTicketAlt, FaRoad } from "react-icons/fa";
import AnimateIn from "./AnimateIn";

const STEPS = [
  {
    Icon: FaCompass,
    title: "Pick your ride",
    body: "Choose a bike, scooter or three wheeler. We cover every region along the south coast.",
  },
  {
    Icon: FaTicketAlt,
    title: "Book in minutes",
    body: "Send us your dates and pickup point, and we confirm availability within the hour.",
  },
  {
    Icon: FaRoad,
    title: "Pay and explore",
    body: "Settle up at pickup, grab your helmet, and the whole coast is yours to ride.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container-x">
        <AnimateIn variant="fadeUp">
          <h2 className="section-title text-center">
            How we can help your journey
          </h2>
          <p className="section-sub mx-auto max-w-md text-center">
            A rental process built to be comfortable, quick and genuinely
            hassle free.
          </p>
        </AnimateIn>

        <div className="relative mt-16">
          {/* Dashed path threading the three icons together */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-7 hidden h-16 w-full md:block"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 170 22 Q 330 92 500 22 T 830 22"
              fill="none"
              stroke="#D8CFBC"
              strokeWidth="2"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
            {STEPS.map(({ Icon, title, body }, i) => (
              <AnimateIn key={title} variant="fadeUp" delay={i * 0.12}>
                <div className="flex flex-col items-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-orange shadow-[0_8px_24px_rgba(46,42,28,0.08)]">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-6 text-[15px] font-semibold text-brand-dark">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-[260px] text-sm leading-7 text-brand-muted">
                    {body}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
