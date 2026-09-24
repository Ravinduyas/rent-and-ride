import { FaStar } from "react-icons/fa";
import AnimateIn from "./AnimateIn";

const REVIEWS = [
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

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <AnimateIn variant="fadeUp">
          <h2 className="section-title text-center">
            Loved by riders from over forty countries
          </h2>
        </AnimateIn>
      </div>

      <AnimateIn variant="fadeUp" delay={0.15}>
        <div className="fade-edges-x mt-12">
          <ul className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.5rem,calc((100vw-1100px)/2))] pb-4">
            {REVIEWS.map((r) => (
              <li
                key={r.name}
                className="w-[260px] shrink-0 snap-center rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(46,42,28,0.06)] md:w-[290px]"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} size={12} className="text-brand-amber" />
                  ))}
                </div>

                <p className="mt-4 text-[13px] leading-6 text-brand-muted">
                  {r.text}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orangeSoft text-[11px] font-bold text-brand-orange">
                    {initials(r.name)}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-brand-dark">
                      {r.name}
                    </p>
                    <p className="text-[11px] text-brand-muted">{r.origin}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </AnimateIn>
    </section>
  );
}
