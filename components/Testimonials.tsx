"use client";

import { useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import AnimateIn from "./AnimateIn";

const REVIEWS = [
  {
    name: "Marco Bianchi",
    origin: "Italy",
    rating: 5,
    text: "Picked up a scooter for two weeks and rode the entire south coast. The bike was in perfect condition, helmets included, and when I had a minor puncture they had someone at my location within forty minutes. Absolutely seamless.",
    vehicle: "Honda PCX 150",
  },
  {
    name: "Priya Nair",
    origin: "India",
    rating: 5,
    text: "I booked a three wheeler for a group trip from Weligama to Mirissa and back. Spotless vehicle, very fair pricing, and the team gave us a detailed route with fuel stops. Would not rent from anyone else on the south coast.",
    vehicle: "Bajaj Three Wheeler",
  },
  {
    name: "Tom & Sarah Webb",
    origin: "United Kingdom",
    rating: 5,
    text: "We rented two motorbikes for ten days and covered over 600 km. Every morning the bikes were ready to go. The WhatsApp support line is genuinely 24/7 — we tested it at 11 pm and got a reply in minutes.",
    vehicle: "Honda CB 150 & Yamaha FZ",
  },
  {
    name: "Léa Fontaine",
    origin: "France",
    rating: 5,
    text: "As a solo female traveller I was nervous about renting a bike abroad. The team walked me through everything, recommended the safest roads, and checked in on me twice during my trip. I felt completely taken care of.",
    vehicle: "Honda Click 125",
  },
  {
    name: "Kenji Tanaka",
    origin: "Japan",
    rating: 5,
    text: "Incredible service. The rental process was done in under ten minutes, the KTM Duke was immaculate, and drop-off at the airport was arranged at no extra cost. Best rental experience I've had anywhere in Asia.",
    vehicle: "KTM Duke 200",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  }
  function next() {
    setIndex((i) => (i + 1) % REVIEWS.length);
  }

  const review = REVIEWS[index];

  return (
    <section className="relative overflow-hidden bg-brand-silverLight py-20 md:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-brand-orange/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-brand-navy/6 blur-3xl" />

      <div className="container-x">
        <AnimateIn variant="fadeLeft" className="mb-14 flex items-end justify-between">
          <div>
            <span className="section-eyebrow" />
            <h2 className="section-title leading-tight">
              What Riders
              <br />
              Say
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-brand-dark transition hover:border-brand-orange hover:text-brand-orange"
            >
              <HiArrowLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange text-white shadow-[0_8px_18px_rgba(199,109,74,0.45)] transition hover:bg-brand-orangeDeep"
            >
              <HiArrowRight size={16} />
            </button>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Featured large card */}
          <AnimateIn variant="zoomIn" className="md:col-span-2">
            <div
              key={review.name}
              className="flex h-full flex-col justify-between rounded-3xl border border-brand-line bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-10"
            >
              <div>
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} size={13} className="text-brand-orange" />
                  ))}
                </div>
                <p className="mt-6 text-base leading-8 text-brand-dark md:text-lg">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-brand-line pt-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-dark">
                    {review.name}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-muted">
                    {review.origin}
                  </p>
                </div>
                <span className="rounded-full bg-brand-orange/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {review.vehicle}
                </span>
              </div>
            </div>
          </AnimateIn>

          {/* Side stack — next two reviews */}
          <div className="flex flex-col gap-6">
            {[1, 2].map((offset) => {
              const r = REVIEWS[(index + offset) % REVIEWS.length];
              return (
                <AnimateIn key={r.name} variant="fadeRight" delay={offset * 0.1}>
                  <div className="flex flex-col justify-between rounded-2xl border border-brand-line bg-white p-6 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
                    <div className="flex gap-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <FaStar key={i} size={11} className="text-brand-orange" />
                      ))}
                    </div>
                    <p className="mt-3 line-clamp-4 text-sm leading-7 text-brand-muted">
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div className="mt-4 border-t border-brand-line pt-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-dark">
                        {r.name}
                      </p>
                      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-muted">
                        {r.origin}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <AnimateIn variant="fadeIn" delay={0.3}>
          <div className="mt-10 flex justify-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-brand-orange"
                    : "w-2 bg-brand-line hover:bg-brand-orange/50"
                }`}
              />
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
