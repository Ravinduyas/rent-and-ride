import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { FaMapMarkerAlt, FaPhone, FaClock, FaWhatsapp } from "react-icons/fa";
import AnimateIn from "./AnimateIn";

const DETAILS = [
  {
    Icon: FaMapMarkerAlt,
    label: "Address",
    value: "Weligama Bay Road, Weligama 81700, Sri Lanka",
  },
  {
    Icon: FaPhone,
    label: "Phone",
    value: "+94 77 123 4567",
  },
  {
    Icon: FaClock,
    label: "Hours",
    value: "Mon – Sat 8am – 8pm · Sun 9am – 4pm",
  },
  {
    Icon: FaWhatsapp,
    label: "WhatsApp",
    value: "Message us anytime",
  },
];

export default function Location() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <AnimateIn variant="fadeLeft">
            <div>
              <span className="section-eyebrow" />
              <h2 className="section-title leading-tight">
                Find
                <br />
                The Garage
              </h2>
            </div>
          </AnimateIn>
          <AnimateIn variant="fadeRight" delay={0.1}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-navy hover:text-brand-orange"
            >
              Get Directions
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white">
                <HiArrowRight />
              </span>
            </Link>
          </AnimateIn>
        </div>

        {/* Detail chips */}
        <AnimateIn variant="fadeUp" delay={0.15}>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {DETAILS.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-2xl border border-brand-line bg-brand-silverLight p-5"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                  <Icon size={14} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-muted">
                    {label}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-brand-dark">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Map */}
        <AnimateIn variant="zoomIn" delay={0.2}>
          <div className="overflow-hidden rounded-3xl border border-brand-line shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <div className="aspect-[16/6]">
              <iframe
                title="Rent & Ride Weligama location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.186148125993!2d80.44692727551238!3d5.969082129356663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae11500045c2d49%3A0x57fb73ada527d340!2sRent%20%26%20Ride%20Weligama%F0%9F%9B%B5!5e0!3m2!1sen!2slk!4v1780003161696!5m2!1sen!2slk"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
