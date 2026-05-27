import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import AnimateIn from "./AnimateIn";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Bikes", href: "/bikes" },
  { label: "Three Wheelers", href: "/three-wheelers" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL = [
  { Icon: FaFacebookF, href: "#" },
  { Icon: FaTwitter, href: "#" },
  { Icon: FaPinterestP, href: "#" },
  { Icon: FaWhatsapp, href: "#" },
  { Icon: FaInstagram, href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-grad text-brand-silver">
      <div className="border-t-2 border-brand-orange/80">
        <div className="container-x py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            {/* Brand */}
            <AnimateIn variant="fadeLeft" className="md:col-span-1">
              <div className="flex items-center gap-3">
                <span className="relative h-14 w-14 overflow-hidden rounded-full bg-brand-navyDeep ring-1 ring-brand-silver/30">
                  <Image
                    src="/logo.svg"
                    alt="Rent & Ride Weligama"
                    fill
                    className="object-contain p-1"
                  />
                </span>
                <div className="leading-tight">
                  <p className="text-base font-extrabold tracking-[0.18em] text-white">
                    RENT&amp;RIDE
                  </p>
                  <p className="mt-1 text-[9px] font-medium tracking-[0.5em] text-brand-silver/70">
                    WELIGAMA
                  </p>
                </div>
              </div>
              <p className="mt-6 max-w-xs text-xs leading-6 text-brand-silver/70">
                Bikes, scooters and three wheelers for hire on
                Sri Lanka&apos;s south coast. Daily, weekly, monthly —
                doorstep delivery available.
              </p>
            </AnimateIn>

            {/* Links */}
            <AnimateIn variant="fadeUp" delay={0.1}>
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.3em] text-white">
                Quick Links
              </h3>
              <ul className="grid grid-cols-1 gap-2 text-xs text-brand-silver/80">
                {LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="transition hover:text-brand-orange"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimateIn>

            {/* Contact */}
            <AnimateIn variant="fadeUp" delay={0.2}>
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.3em] text-white">
                Visit Us
              </h3>
              <ul className="space-y-3 text-xs leading-6 text-brand-silver/80">
                <li>
                  Weligama Bay Road,
                  <br />
                  Weligama 81700, Sri Lanka
                </li>
                <li>hello@rentandride.lk</li>
                <li>+94 77 123 4567</li>
              </ul>
            </AnimateIn>

            {/* Social */}
            <AnimateIn variant="fadeRight" delay={0.3}>
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.3em] text-white">
                Follow Us
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                {SOCIAL.map(({ Icon, href }, i) => (
                  <Link
                    key={i}
                    href={href}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-silver/30 text-brand-silver transition hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                  >
                    <Icon size={13} />
                  </Link>
                ))}
              </div>
              <p className="mt-6 text-xs leading-6 text-brand-silver/70">
                Open Mon – Sat · 8am – 8pm
                <br />
                Sundays · 9am – 4pm
              </p>
            </AnimateIn>
          </div>
        </div>
      </div>

      <AnimateIn variant="fadeIn" delay={0.4}>
        <div className="border-t border-brand-silver/10">
          <div className="container-x py-5">
            <p className="text-center text-[11px] tracking-[0.3em] text-brand-silver/60">
              © {new Date().getFullYear()} RENT &amp; RIDE WELIGAMA — ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </AnimateIn>
    </footer>
  );
}
