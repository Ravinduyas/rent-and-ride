import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import AnimateIn from "@/components/AnimateIn";

const DETAILS = [
  {
    Icon: FaMapMarkerAlt,
    title: "Visit",
    lines: ["Weligama Bay Road", "Weligama 81700, Sri Lanka"],
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
        title="Get in touch"
        subtitle="Tell us about your trip and we'll match you with the right vehicle. Most requests get a reply within an hour during opening times."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=2400&q=80"
      />

      <div className="panel-cream">
        <section className="py-16 md:py-24">
          <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Details */}
            <div className="lg:col-span-2">
              <AnimateIn variant="fadeLeft">
                <h2 className="section-title">Reach us directly</h2>
                <p className="section-sub max-w-md">
                  Prefer to chat? Send a WhatsApp message, drop by the garage,
                  or call the front desk — we answer every enquiry the same day.
                </p>
              </AnimateIn>

              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {DETAILS.map(({ Icon, title, lines }, i) => (
                  <AnimateIn key={title} variant="fadeUp" delay={i * 0.1}>
                    <div className="h-full rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(46,42,28,0.06)]">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orangeSoft text-brand-orange">
                        <Icon size={14} />
                      </span>
                      <h3 className="mt-4 text-[13px] font-semibold text-brand-dark">
                        {title}
                      </h3>
                      {lines.map((l) => (
                        <p key={l} className="mt-1 text-xs leading-6 text-brand-muted">
                          {l}
                        </p>
                      ))}
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

        {/* Map */}
        <section className="pb-16 md:pb-24">
          <div className="container-x">
            <AnimateIn variant="fadeUp">
              <div className="aspect-[16/7] overflow-hidden rounded-[2rem] shadow-[0_10px_30px_rgba(46,42,28,0.08)]">
                <iframe
                  title="Rent & Ride Weligama location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.186148125993!2d80.44692727551238!3d5.969082129356663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae11500045c2d49%3A0x57fb73ada527d340!2sRent%20%26%20Ride%20Weligama%F0%9F%9B%B5!5e0!3m2!1sen!2slk!4v1780003161696!5m2!1sen!2slk"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </AnimateIn>
          </div>
        </section>
      </div>
    </>
  );
}
