import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";
import AnimateIn from "./AnimateIn";

const COLUMNS = [
  {
    heading: "Menu",
    links: [
      { label: "Home", href: "/" },
      { label: "Bikes", href: "/bikes" },
      { label: "Three Wheelers", href: "/three-wheelers" },
    ],
  },
  {
    heading: "Booking",
    links: [
      { label: "Book a vehicle", href: "/contact" },
      { label: "Delivery & pickup", href: "/services" },
      { label: "Insurance & permits", href: "/services" },
    ],
  },
  {
    heading: "Further Information",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our services", href: "/services" },
      { label: "Find the garage", href: "/contact" },
    ],
  },
];

const SOCIAL = [
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaWhatsapp, href: "#", label: "WhatsApp" },
  { Icon: FaTwitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-cream">
      <div className="container-x py-16 md:py-20">
        <AnimateIn variant="fadeUp">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
            <div className="col-span-2 md:col-span-1">
              <p className="text-xl font-bold text-brand-dark">
                Rent &amp; Ride
              </p>
              <p className="mt-4 max-w-[200px] text-[13px] leading-6 text-brand-muted">
                Enjoy the south coast on two wheels — and three.
              </p>
            </div>

            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-[13px] font-semibold text-brand-dark">
                  {col.heading}
                </h3>
                {/* min-h-7 gives each link a 28px tap target; the list gap is
                    reduced to match so the column keeps its old rhythm. */}
                <ul className="mt-4 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="inline-flex min-h-7 items-center text-[13px] text-brand-muted transition hover:text-brand-orange"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>

      <div className="border-t border-brand-line">
        <div className="container-x flex flex-col items-center justify-between gap-5 py-6 sm:flex-row">
          <p className="text-xs text-brand-muted">
            © {new Date().getFullYear()} Rent &amp; Ride Weligama. All rights
            reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL.map(({ Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-creamDeep text-brand-muted transition hover:bg-brand-orange hover:text-white"
              >
                <Icon size={12} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
