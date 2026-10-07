import { HiOutlineUserGroup, HiOutlineShieldCheck, HiOutlineEmojiHappy } from "react-icons/hi";
import PageHero from "@/components/PageHero";
import { PalmMark } from "@/components/Logo";
import { GALLERY } from "@/data/content";
import { PHOTOS } from "@/data/photos";
import { responsive, CARD_WIDTHS } from "@/lib/img";

const VALUES = [
  { Icon: HiOutlineUserGroup, title: "Local Team", body: "Born and raised on the south coast." },
  { Icon: HiOutlineShieldCheck, title: "Reliable Vehicles", body: "Serviced and checked before every rental." },
  { Icon: HiOutlineEmojiHappy, title: "Friendly Support", body: "A real person on WhatsApp, day and night." },
];

export const metadata = {
  title: "About Us — Rent & Ride Weligama",
  description:
    "Rent & Ride is a local scooter and bike rental team in Weligama, helping travelers explore Sri Lanka's south coast with freedom, safety and comfort.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Rent & Ride"
        intro="More than just a rental — we're your local riding partner in Weligama. We're here to help travelers explore Sri Lanka with freedom, safety and comfort."
      />

      <section className="container-x py-10 md:py-16">
        <ul data-reveal-stagger className="grid gap-3 sm:grid-cols-3 sm:gap-5">
          {VALUES.map(({ Icon, title, body }) => (
            <li key={title} className="card flex flex-col items-center p-6 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold">
                <Icon size={24} />
              </span>
              <h2 className="mt-3 text-sm font-semibold text-ink">{title}</h2>
              <p className="mt-1 text-xs text-ink-muted">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-x grid items-center gap-10 pb-14 md:pb-20 lg:grid-cols-2">
        <div data-reveal="left">
          <h2 className="h-section">Our Story</h2>
          <div className="lead mt-4 space-y-4">
            <p>
              Rent &amp; Ride Weligama was created with a simple goal — to make
              your travel experience easier and more enjoyable.
            </p>
            <p>
              We&apos;re a local team who loves this island and wants to share its
              beauty with you. Whether it&apos;s a quick ride around Weligama or a
              road trip along the coast, we&apos;re here to help.
            </p>
          </div>
          <p className="mt-6 flex items-center gap-2 font-script text-3xl text-gold-deep">
            See you on the road! <PalmMark className="h-7 w-7 text-gold" />
          </p>
        </div>

        <div data-reveal="right" className="skeleton relative rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...responsive(PHOTOS.scooterCoast, [...CARD_WIDTHS, 1280], "(min-width: 1024px) 600px, 100vw")}
            loading="lazy"
            decoding="async"
            alt="A scooter on a coastal lane, green headland and sea beyond"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift"
          />
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-x">
          <h2 data-reveal className="h-section">Gallery</h2>
          <ul data-reveal-stagger className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {GALLERY.map((g, i) => (
              <li
                key={g.src}
                className={`skeleton overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2" : "aspect-square"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img {...responsive(g.src, CARD_WIDTHS, i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw")} alt={g.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
