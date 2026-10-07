import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";
import { SiTripadvisor, SiGoogle } from "react-icons/si";
import Logo from "./Logo";
import Social from "./Social";
import { SITE } from "@/lib/site";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "Rentals", href: "/rentals" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { label: "Bike Rental", href: "/rentals/#bikes" },
  { label: "Scooter Rental", href: "/rentals/#scooters" },
  { label: "Driving Permit Assistance", href: "/rentals/#driving-permit" },
  { label: "Delivery & Pickup", href: "/contact" },
  { label: "24/7 Support", href: "/contact" },
  { label: "Free Helmets", href: "/rentals" },
];

const HEAD = "text-sm font-semibold text-white";
// 44px tall on touch screens, tighter where there's a mouse.
const LINK = "inline-flex min-h-11 items-center text-sm text-white/60 transition hover:text-gold lg:min-h-8 lg:text-[13px]";

export default function Footer() {
  // Bottom padding on phones keeps the last line clear of the floating
  // WhatsApp button.
  return (
    <footer className="bg-night pb-[calc(4rem+env(safe-area-inset-bottom))] text-white lg:pb-0">
      <div data-reveal-stagger className="container-x grid grid-cols-2 gap-10 py-14 md:grid-cols-4 lg:grid-cols-[1.1fr_0.8fr_1fr_1.4fr_1.3fr]">
        <div className="col-span-2 md:col-span-4 lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-5 max-w-[230px] text-[13px] leading-6 text-white/60">
            Scooter and bike rentals in Weligama, Mirissa and Ahangama.
          </p>
          <Social size="sm" className="mt-5" />
        </div>

        <div>
          <h3 className={HEAD}>Quick Links</h3>
          <ul className="mt-3">
            {QUICK.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={LINK}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={HEAD}>Our Services</h3>
          <ul className="mt-3">
            {SERVICES.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={LINK}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h3 className={HEAD}>Contact Info</h3>
          <ul className="mt-4 space-y-3 text-[13px] text-white/60">
            <li className="flex gap-3">
              <FaPhoneAlt className="mt-1 shrink-0 text-gold" size={12} />
              <a href={SITE.phoneHref} className="-my-3 inline-block py-3 hover:text-gold lg:my-0 lg:py-0">
                {SITE.phoneDisplay} (WhatsApp)
              </a>
            </li>
            <li className="flex gap-3">
              <FaEnvelope className="mt-1 shrink-0 text-gold" size={12} />
              <a href={`mailto:${SITE.email}`} className="-my-3 inline-block break-all py-3 hover:text-gold lg:my-0 lg:py-0">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-gold" size={12} />
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-3 inline-block py-3 hover:text-gold lg:my-0 lg:py-0"
              >
                {SITE.address.join(" ")}
              </a>
            </li>
            <li className="flex gap-3">
              <FaClock className="mt-1 shrink-0 text-gold" size={12} />
              <span>{SITE.hours} · {SITE.hoursNote}</span>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-4 lg:col-span-1">
          <h3 className={HEAD}>Find Us on Google Maps</h3>
          <div className="mt-4 overflow-hidden rounded-lg ring-1 ring-white/10">
            <iframe
              src={SITE.mapsEmbed}
              title="Rent & Ride Weligama on Google Maps"
              className="h-36 w-full grayscale-[30%]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/70">
            <a href={SITE.reviews.google} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 hover:text-white lg:min-h-0">
              <SiGoogle className="text-white" /> Google
              <Stars />
            </a>
            <a href={SITE.reviews.tripadvisor} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 hover:text-white lg:min-h-0">
              <SiTripadvisor className="text-[#34E0A1]" size={16} /> Tripadvisor
              <Stars />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Rent &amp; Ride Weligama. All rights reserved.</p>
          <p className="flex gap-5">
            <Link href="/faq" className="inline-flex min-h-11 items-center hover:text-white lg:min-h-0">Rental Terms</Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center hover:text-white lg:min-h-0">Contact</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function Stars() {
  return (
    <span className="flex text-[#F5B301]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} size={10} />
      ))}
    </span>
  );
}
