import { FaStar } from "react-icons/fa";
import AnimateIn from "./AnimateIn";
import SectionHead, { Accent } from "./SectionHead";

type Review = {
  name: string;
  origin: string;
  text: string;
};

const REVIEWS: Review[] = [
  {
    name: "Marco Bianchi",
    origin: "Italy",
    text: "Picked up a scooter for two weeks and rode the entire south coast. The bike was in perfect condition and when I had a puncture they had someone with me within forty minutes.",
  },
  {
    name: "Priya Nair",
    origin: "India",
    text: "Booked a three wheeler for a group trip from Weligama to Mirissa. Spotless vehicle, fair pricing, and the team gave us a route with fuel stops marked.",
  },
  {
    name: "Tom & Sarah Webb",
    origin: "United Kingdom",
    text: "Two motorbikes for ten days and over 600 km covered. Every morning they were ready to go. We tested the 24/7 line at 11pm and got a reply in minutes.",
  },
  {
    name: "Léa Fontaine",
    origin: "France",
    text: "As a solo traveller I was nervous about renting abroad. They walked me through everything, recommended the safest roads and checked in during the trip.",
  },
  {
    name: "Kenji Tanaka",
    origin: "Japan",
    text: "Rental done in under ten minutes, the bike was immaculate, and airport drop-off was arranged at no extra cost. Best rental experience I've had in Asia.",
  },
];

function initials(name: string) {
  return name
    .replace(/&/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function ReviewCard({
  review,
  duplicate = false,
}: {
  review: Review;
  duplicate?: boolean;
}) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      /* Cream, not white: this section's background is white. */
      className="w-[260px] shrink-0 rounded-2xl bg-brand-cream p-6 md:w-[290px]"
    >
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} size={12} className="text-brand-amber" />
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-6 text-brand-muted">{review.text}</p>

      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orangeSoft text-[11px] font-bold text-brand-orange">
          {initials(review.name)}
        </span>
        <div>
          <p className="text-[13px] font-semibold text-brand-dark">
            {review.name}
          </p>
          <p className="text-[11px] text-brand-muted">{review.origin}</p>
        </div>
      </div>
    </li>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Riders"
          title={
            <>
              Loved by riders from <Accent>forty countries</Accent>
            </>
          }
          intro="What people tell us after they hand the keys back."
        />
      </div>

      <AnimateIn variant="fadeUp" delay={0.15}>
        {/* Scrolls on its own; pauses on hover or keyboard focus. */}
        <div className="fade-edges-x marquee no-scrollbar mt-12">
          <ul className="marquee-track flex gap-5 pb-4">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
            {/* Second copy makes the loop seamless; it repeats content that
                has already been announced, so it stays out of the a11y tree. */}
            {REVIEWS.map((r) => (
              <ReviewCard key={`${r.name}-loop`} review={r} duplicate />
            ))}
          </ul>
        </div>
      </AnimateIn>
    </section>
  );
}
