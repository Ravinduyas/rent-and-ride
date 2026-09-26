import type { CSSProperties } from "react";
import {
  FaShieldAlt,
  FaTruckPickup,
  FaHeadset,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { FaHelmetSafety } from "react-icons/fa6";
import AnimateIn from "./AnimateIn";

/* The design places a press logo strip here. Rent & Ride has no press
   coverage to show, so the slot carries what every rental actually
   includes — same rhythm, nothing invented. */
const INCLUDED = [
  { Icon: FaShieldAlt, label: "Third-party insurance" },
  { Icon: FaHelmetSafety, label: "Helmets & locks" },
  { Icon: FaTruckPickup, label: "Doorstep delivery" },
  { Icon: FaHeadset, label: "24/7 roadside help" },
  { Icon: FaRegCalendarCheck, label: "Free cancellation" },
];

/* Sets per copy. The marquee shifts by exactly one copy, so a copy has to be
   wider than the viewport or a gap appears at the wrap. Five short items fall
   well short of that on their own: two sets measure ~1960px, which only just
   clears a 1920px screen, so three keeps ultrawide displays covered too. */
const SETS_PER_COPY = 3;

const TRACK = Array.from({ length: SETS_PER_COPY * 2 }).flatMap(() => INCLUDED);

export default function TrustStrip() {
  return (
    <section className="pt-14 md:pt-16">
      <div className="container-x">
        <AnimateIn variant="fadeIn">
          <p className="text-center text-xs font-medium tracking-[0.18em] text-brand-muted">
            Every rental includes
          </p>
        </AnimateIn>
      </div>

      <AnimateIn variant="fadeUp" delay={0.15}>
        <div className="fade-edges-x marquee mt-8">
          <ul
            className="marquee-track flex items-center gap-12"
            style={
              {
                "--marquee-gap": "3rem",
                // Duration is distance/speed: one copy is ~2900px, so this
                // works out at a readable ~45px/s.
                "--marquee-duration": "65s",
              } as CSSProperties
            }
          >
            {TRACK.map(({ Icon, label }, i) => (
              <li
                key={`${label}-${i}`}
                /* Only the first set is announced; the rest exist to make
                   the loop seamless. */
                aria-hidden={i >= INCLUDED.length || undefined}
                className="flex shrink-0 items-center gap-2.5 text-brand-muted"
              >
                <Icon size={18} className="shrink-0 opacity-70" />
                <span className="whitespace-nowrap text-xs font-medium md:text-[13px]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </AnimateIn>
    </section>
  );
}
