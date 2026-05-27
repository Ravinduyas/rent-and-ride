import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import AnimateIn from "@/components/AnimateIn";

const DETAILS = [
  {
    Icon: FaMapMarkerAlt,
    title: "Visit",
    lines: ["No. 42 Galle Road", "Colombo 03, Sri Lanka"],
  },
  {
    Icon: FaPhone,
    title: "Call",
    lines: ["+94 77 123 4567", "+94 11 234 5678"],
  },
  {
    Icon: FaEnvelope,
    title: "Email",
    lines: ["hello@rentandride.lk", "support@rentandride.lk"],
  },
  {
    Icon: FaClock,
    title: "Open",
    lines: ["Mon – Sat · 8am – 8pm", "Sun · 9am – 4pm"],
  },
];

export const metadata = {
  title: "Contact — Rent & Ride",
  description:
    "Get in touch with Rent & Ride to book a bike or three wheeler. Doorstep delivery available across the island.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get In Touch"
        subtitle="Tell us about your trip and we'll match you with the right vehicle. Most requests get a reply within an hour during opening times."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=2400&q=80"
      />

      <section className="bg-white py-20 md:py-24">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Details */}
          <div className="lg:col-span-2">
            <AnimateIn variant="fadeLeft">
              <span className="section-eyebrow" />
              <h2 className="section-title leading-tight">
                Reach Us
                <br />
                Directly
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-brand-muted">
                Prefer to chat? Send us a WhatsApp message, pop by the
                garage, or call our front desk. We answer all enquiries
                the same day.
              </p>
            </AnimateIn>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {DETAILS.map(({ Icon, title, lines }, i) => (
                <AnimateIn key={title} variant="fadeUp" delay={i * 0.1}>
                  <div className="flex items-start gap-4 rounded-xl border border-brand-line p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                      <Icon size={16} />
                    </span>
                    <div>
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-dark">
                        {title}
                      </h3>
                      {lines.map((l) => (
                        <p
                          key={l}
                          className="mt-1 text-xs leading-6 text-brand-muted"
                        >
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-20">
        <div className="container-x">
          <AnimateIn variant="fadeUp">
            <div className="aspect-[16/7] overflow-hidden rounded-3xl border border-brand-line">
              <iframe
                title="Rent & Ride location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=79.8410%2C6.9100%2C79.8710%2C6.9320&layer=mapnik"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
