import PageHero from "@/components/PageHero";
import PermitSection from "@/components/PermitSection";
import FaqList from "@/components/FaqList";
import { FAQS } from "@/data/content";
import { REAL } from "@/data/photos";

export const metadata = {
  title: "Sri Lankan Driving Permit Help in Weligama — Rent & Ride",
  description:
    "Riding a scooter, bike or tuk-tuk in Sri Lanka needs your home licence plus a local recognition permit. Send us your documents and we handle the paperwork.",
};

// The questions about licences and permits, from the main FAQ list.
const PERMIT_FAQS = FAQS.filter((f) => /licen|permit/i.test(f.q));

export default function DrivingPermitPage() {
  return (
    <>
      <PageHero
        title={<>Driving Permit<br />Assistance</>}
        intro="To ride in Sri Lanka you need your home licence plus a local permit. Send us your documents and we'll sort out the rest."
        image={REAL.customersInShop}
        imagePosition="center 22%"
      />
      <PermitSection id="how-it-works" />
      {PERMIT_FAQS.length > 0 && (
        <section className="py-12 md:py-20">
          <div className="container-x max-w-3xl">
            <h2 data-reveal className="h-section">Permit questions</h2>
            <div className="mt-6">
              <FaqList items={PERMIT_FAQS} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
