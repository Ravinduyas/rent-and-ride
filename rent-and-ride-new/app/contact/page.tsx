import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Social from "@/components/Social";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Contact — Rent & Ride Weligama",
  description: "WhatsApp, call, email or visit Rent & Ride in Weligama. Open daily 7am – 9pm.",
};

export default function ContactPage() {
  const details = [
    { Icon: FaPhoneAlt, lines: [SITE.phoneDisplay, "(WhatsApp)"], href: SITE.phoneHref },
    { Icon: FaMapMarkerAlt, lines: [...SITE.address], href: SITE.mapsUrl },
    { Icon: FaClock, lines: [SITE.hours, `(${SITE.hoursNote})`] },
    { Icon: FaEnvelope, lines: [SITE.email], href: `mailto:${SITE.email}` },
  ];

  return (
    <>
      <PageHero title="Get in Touch" intro="We're here to help you plan your ride." />

      <section className="container-x grid gap-8 py-10 md:py-16 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <ul data-reveal-stagger className="space-y-5">
            {details.map(({ Icon, lines, href }) => {
              const body = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
                    <Icon size={15} />
                  </span>
                  <span className="text-sm leading-6 text-ink-soft">
                    {lines.map((l) => (
                      <span key={l} className="block break-all first:font-medium first:text-ink">{l}</span>
                    ))}
                  </span>
                </>
              );
              return (
                <li key={lines[0]}>
                  {href ? (
                    <a
                      href={href}
                      // The map link opens Google Maps in a new tab; tel: and
                      // mailto: hand off to the phone/mail app as usual.
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex min-h-11 gap-4 transition hover:opacity-80"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex gap-4">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div data-reveal>
            <h2 className="mt-10 text-sm font-semibold text-ink">Follow Us</h2>
            <Social className="mt-3" />
          </div>
        </div>

        <div data-reveal="right" className="space-y-6">
          <ContactForm />
          <div className="skeleton overflow-hidden rounded-xl border border-line">
            <iframe
              src={SITE.mapsEmbed}
              title="Rent & Ride Weligama on Google Maps"
              className="h-64 w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>
    </>
  );
}
