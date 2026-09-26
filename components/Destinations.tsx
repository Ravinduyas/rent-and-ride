"use client";

import Image from "next/image";
import { useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import AnimateIn from "./AnimateIn";
import SectionHead, { Accent } from "./SectionHead";
import { DESTINATIONS } from "@/data/destinations";

const COUNT = DESTINATIONS.length;

/* Slots either side of centre that stay on screen. The rest sit behind the
   centre card at zero opacity so the track never reflows while it rotates. */
const VISIBLE = 2;

export default function Destinations() {
  const [index, setIndex] = useState(0);

  const go = (step: number) =>
    setIndex((i) => (i + step + COUNT) % COUNT);

  // Signed distance from the active card, wrapped to the shorter way round.
  const offsetOf = (i: number) => {
    const raw = (i - index + COUNT) % COUNT;
    return raw > COUNT / 2 ? raw - COUNT : raw;
  };

  const active = DESTINATIONS[index];

  return (
    /* overflow-x-clip because the reveal on the full-bleed carousel below
       animates rotateX under a perspective, which paints the element wider
       than the viewport until it settles and would otherwise put a horizontal
       scrollbar on the page at load. Clip rather than hidden: hidden would
       create a scroll container and break the sticky hero. */
    <section id="popular" className="overflow-x-clip py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Where people ride"
          title={
            <>
              Popular runs from <Accent>the garage</Accent>
            </>
          }
          intro="See the beauty of the south coast easily and safely with Rent & Ride."
        />
      </div>

      <AnimateIn variant="fadeUp" delay={0.15}>
        <div className="relative mt-12 md:mt-14">
          {/* Card stack. Cards overlap heavily so the off-centre ones show
              only as slivers, and the outermost are cropped by the section. */}
          <div className="relative mx-auto h-[280px] w-full max-w-container overflow-hidden md:h-[360px]">
            {DESTINATIONS.map((d, i) => {
              const offset = offsetOf(i);
              const distance = Math.abs(offset);
              const shown = distance <= VISIBLE;

              return (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${d.name}`}
                  aria-hidden={!shown}
                  tabIndex={shown && distance > 0 ? 0 : -1}
                  className="absolute left-1/2 top-1/2 h-[260px] w-[200px] overflow-hidden rounded-2xl md:h-[340px] md:w-[300px]"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${
                      offset * 48
                    }%) scale(${1 - distance * 0.12})`,
                    opacity: shown ? 1 : 0,
                    zIndex: 10 * (VISIBLE - distance) + 1,
                    pointerEvents: shown ? "auto" : "none",
                    transition:
                      "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease",
                  }}
                >
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 240px"
                    className="object-cover"
                  />
                  {/* Cream veil deepens with distance so the stack reads
                      as depth rather than a flat row. */}
                  {distance > 0 && (
                    <span
                      className="absolute inset-0 bg-brand-cream"
                      style={{ opacity: 0.3 + (distance - 1) * 0.28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Arrows — pinned to the outer edges of the stack */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-40 mx-auto flex max-w-[min(94%,940px)] -translate-y-1/2 items-center justify-between">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous destination"
              className="btn-circle pointer-events-auto"
            >
              <HiArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next destination"
              className="btn-circle pointer-events-auto"
            >
              <HiArrowRight size={16} />
            </button>
          </div>
        </div>
      </AnimateIn>

      {/* Caption for the centre card */}
      <div className="container-x mt-10">
        <div key={active.name} className="mx-auto max-w-md text-center">
          <p className="text-[11px] font-medium tracking-[0.2em] text-brand-orange">
            {active.region.toUpperCase()}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-brand-dark md:text-xl">
            {active.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-brand-muted">{active.blurb}</p>
          <p className="mt-3 text-xs font-medium text-brand-muted/80">
            {active.ride} from the garage
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {DESTINATIONS.map((d, i) => (
            <button
              key={d.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to ${d.name}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-7 bg-brand-orange"
                  : "w-1.5 bg-brand-line hover:bg-brand-orange/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
