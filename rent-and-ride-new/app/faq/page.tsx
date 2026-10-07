import { FaWhatsapp } from "react-icons/fa";
import PageHero from "@/components/PageHero";
import FaqList from "@/components/FaqList";
import { PalmMark } from "@/components/Logo";
import { FAQS } from "@/data/content";
import { whatsappLink } from "@/lib/site";

export const metadata = {
  title: "FAQ — Rent & Ride Weligama",
  description:
    "Licences, delivery, helmets, weekly rentals, permits, payment and damage — answers to common questions about renting with Rent & Ride.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        intro="Find quick answers to the most common questions about our rental services."
      />

      <section className="container-x grid items-start gap-8 py-12 md:py-16 lg:grid-cols-[1fr_320px]">
        <FaqList items={FAQS} />

        <aside data-reveal="right" className="card flex flex-col items-center p-8 text-center lg:sticky lg:top-24">
          <PalmMark className="h-10 w-10 text-gold" />
          <h2 className="mt-3 font-semibold text-ink">Still have questions?</h2>
          <p className="mt-2 text-[13px] leading-6 text-ink-muted">
            Chat with us on WhatsApp and we&apos;ll be happy to help!
          </p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-5 w-full sm:w-auto">
            <FaWhatsapp size={18} /> WhatsApp Us
          </a>
        </aside>
      </section>
    </>
  );
}
