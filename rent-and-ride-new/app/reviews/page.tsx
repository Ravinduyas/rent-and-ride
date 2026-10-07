import { HiArrowRight } from "react-icons/hi";
import { SiGoogle, SiTripadvisor } from "react-icons/si";
import PageHero from "@/components/PageHero";
import ReviewCard, { Stars } from "@/components/ReviewCard";
import { REVIEWS, GALLERY } from "@/data/content";
import { SITE } from "@/lib/site";
import { responsive, CARD_WIDTHS } from "@/lib/img";

export const metadata = {
  title: "Reviews — Rent & Ride Weligama",
  description: "What travelers say about renting scooters and bikes with Rent & Ride Weligama.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        title={<>Real Reviews<br />from Real Travelers</>}
        intro="See what our guests say about their experience with Rent & Ride Weligama."
      />

      <section className="container-x grid gap-6 py-12 md:py-16 lg:grid-cols-[1.4fr_1fr]">
        <div data-reveal="left" className="card p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="flex items-center gap-2 font-semibold text-ink">
              <SiGoogle className="text-[#4285F4]" /> Google Reviews
            </h2>
            <Stars />
          </div>
          <div data-reveal-stagger className="mt-2">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} review={r} layout="row" />
            ))}
          </div>
          <a href={SITE.reviews.google} target="_blank" rel="noopener noreferrer" className="btn-gold mt-4 w-full sm:w-auto">
            View All Google Reviews <HiArrowRight />
          </a>
        </div>

        <div data-reveal="right" className="card p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="flex items-center gap-2 font-semibold text-ink">
              <SiTripadvisor className="text-[#00AF87]" size={20} /> Tripadvisor
            </h2>
            <Stars />
          </div>
          <p className="mt-2 text-[13px] text-ink-muted">Traveler photos from the road.</p>
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {GALLERY.slice(0, 4).map((g) => (
              <li key={g.src} className="skeleton aspect-[4/3] overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img {...responsive(g.src, CARD_WIDTHS, "(min-width: 1024px) 200px, 50vw")} alt={g.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </li>
            ))}
          </ul>
          <a href={SITE.reviews.tripadvisor} target="_blank" rel="noopener noreferrer" className="btn-gold mt-6 w-full sm:w-auto">
            View All Tripadvisor Reviews <HiArrowRight />
          </a>
        </div>
      </section>
    </>
  );
}
