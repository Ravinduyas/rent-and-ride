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

export default function TrustStrip() {
  return (
    <section className="pt-14 md:pt-16">
      <div className="container-x">
        <AnimateIn variant="fadeIn">
          <p className="text-center text-xs font-medium tracking-[0.18em] text-brand-muted">
            Every rental includes
          </p>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={0.15}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:justify-between">
            {INCLUDED.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-brand-muted"
              >
                <Icon size={18} className="shrink-0 opacity-70" />
                <span className="text-xs font-medium md:text-[13px]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </AnimateIn>
      </div>
    </section>
  );
}
