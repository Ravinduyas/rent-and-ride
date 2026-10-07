import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { FaHelmetSafety } from "react-icons/fa6";
import { HiArrowRight, HiOutlineCog, HiOutlineSupport } from "react-icons/hi";
import { MdOutlineTwoWheeler } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { SiTripadvisor } from "react-icons/si";
import VehicleCard from "@/components/VehicleCard";
import ReviewCard, { Stars } from "@/components/ReviewCard";
import Social from "@/components/Social";
import { FEATURED } from "@/data/vehicles";
import { REVIEWS, GALLERY, HOME_HERO } from "@/data/content";
import { PHOTOS } from "@/data/photos";
import { SITE } from "@/lib/site";
import { responsive, HERO_WIDTHS, CARD_WIDTHS } from "@/lib/img";

const FEATURES = [
  { Icon: MdOutlineTwoWheeler, title: "Wide Range", sub: "of Vehicles" },
  { Icon: FaHelmetSafety, title: "Free Helmets", sub: "With every rental" },
  { Icon: RiFileList3Line, title: "Driving Permit", sub: "Assistance" },
  { Icon: HiOutlineCog, title: "Well Maintained", sub: "Checked before every ride" },
  { Icon: HiOutlineSupport, title: "24/7 Support", sub: "Day or night on WhatsApp" },
];

export default function Home() {
  return (
    <>
      {/* Hero: one screen tall on every device (.hero-screen in globals.css),
          with the feature strip below peeking up from the bottom edge. */}
      <section className="hero-screen relative isolate flex flex-col overflow-hidden bg-white">
        {/* Phones/tablets: the photo is its own strip at the top, fading into
            white, with the text below it — text laid over a busy photo on a
            narrow screen was hard to read and hid the photo anyway.
            The strip grows to fill whatever height the text leaves, so the
            hero fits the screen exactly.
            Desktop: the photo fills the right ~62% behind the layout and
            dissolves into the white behind the heading. Masks: globals.css. */}
        <div className="hero-photo relative min-h-[160px] flex-1 overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:-z-20 lg:min-h-0 lg:w-[62%] lg:flex-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...responsive(HOME_HERO, HERO_WIDTHS, "(min-width: 1024px) 62vw, 100vw")}
            alt="A rider on a motorbike on the beach at golden hour"
            // The largest thing on screen: fetch it before anything else.
            fetchPriority="high"
            loading="eager"
            // Absolutely positioned so the (square) photo can't set the
            // strip's height — the strip takes the leftover space instead.
            className="hero-img absolute inset-0 h-full w-full object-cover object-[center_32%] lg:object-[center_30%]"
          />
          <p
            aria-hidden
            // Top right is open sky in this photo, clear of the rider.
            className="pointer-events-none absolute right-4 top-4 rotate-[-6deg] text-right font-script text-[24px] leading-[0.95] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] sm:right-8 sm:top-6 sm:text-3xl lg:hidden"
          >
            Your next adventure
            <br />
            starts here
          </p>
        </div>

        {/* Desktop: this block takes the full height and centres the text,
            leaving room at the bottom for the overlapping feature strip. */}
        <div className="container-x relative pb-16 pt-1 sm:pt-4 md:pb-28 lg:flex lg:flex-1 lg:items-center lg:pb-24 lg:pt-10">
          <div data-reveal="right" style={{ "--reveal-delay": "600ms" } as React.CSSProperties} className="pointer-events-none absolute right-8 top-10 hidden lg:block">
            <p className="rotate-[-6deg] font-script text-4xl leading-none text-white drop-shadow-md">
              Your next
              <br />
              adventure
              <br />
              starts here
            </p>
          </div>

          {/* CSS-only entrance (see .hero-intro): the headline must not wait
              for JavaScript to download before it can appear. */}
          <div className="hero-intro max-w-xl">
            <p className="eyebrow">Bike &amp; Scooter Rental in Weligama</p>
            <h1 className="mt-3 text-[40px] font-semibold md:mt-4 leading-[1.08] tracking-tight text-ink md:text-6xl">
              Ride More.
              <br />
              <span className="text-gold">Worry Less.</span>
            </h1>
            <p className="lead mt-4 max-w-md text-ink-soft sm:mt-5">
              Explore Weligama, Mirissa &amp; Ahangama with our reliable bikes and
              scooters. Easy booking, local support, and unforgettable journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Feature strip, overlapping the hero */}
      <section className="container-x relative z-10 -mt-10 md:-mt-16">
        <ul data-reveal-stagger className="card grid grid-cols-2 gap-y-1 py-2 sm:grid-cols-3 sm:gap-y-0 sm:py-0 lg:grid-cols-5 lg:divide-x lg:divide-line">
          {FEATURES.map(({ Icon, title, sub }, i) => (
            <li
              key={title}
              className={`flex items-center gap-3 px-3.5 py-2.5 text-left sm:flex-col sm:gap-0 sm:px-4 sm:py-6 sm:text-center ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold sm:h-12 sm:w-12">
                <Icon size={22} />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold leading-snug text-ink sm:mt-3">{title}</span>
                <span className="block text-xs leading-snug text-ink-muted">{sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured vehicles */}
      <section className="container-x py-12 md:py-20">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="h-section">Featured Vehicles</h2>
            <p className="lead mt-1">
              Choose from our popular scooters and bikes — perfect for exploring the South Coast.
            </p>
          </div>
          <Link href="/rentals" className="flex min-h-11 items-center gap-1 text-sm font-semibold text-gold-deep hover:underline">
            View All Vehicles <HiArrowRight />
          </Link>
        </div>

        <ul data-reveal-stagger className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3.5 sm:mt-8 sm:gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {FEATURED.map((v) => (
            <li key={v.slug} className="w-[62%] max-w-[240px] shrink-0 snap-start lg:w-auto lg:max-w-none">
              <VehicleCard vehicle={v} compact />
            </li>
          ))}
        </ul>
      </section>

      {/* Explore band + video */}
      <section className="container-x grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div data-reveal="left" className="skeleton relative isolate flex min-h-[230px] sm:min-h-[260px] items-center overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...responsive(PHOTOS.scooterSunset, [...CARD_WIDTHS, 1280], "(min-width: 1024px) 800px, 100vw")} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/50 to-transparent" />
          <div className="max-w-md p-6 text-white sm:p-8 md:p-10">
            <h2 className="text-2xl font-semibold md:text-3xl">Explore the South Coast</h2>
            <p className="mt-3 text-sm leading-7 text-white/85">
              From hidden beaches to surf spots, our bikes and scooters help you
              experience the real Sri Lanka.
            </p>
            <Link href="/about" className="btn-gold mt-6">
              Explore Routes <HiArrowRight />
            </Link>
          </div>
        </div>

        <a
          href={SITE.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal="right"
          className="skeleton group relative isolate flex min-h-[200px] items-center sm:min-h-[260px] justify-center overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...responsive(PHOTOS.scooterTown, CARD_WIDTHS, "(min-width: 1024px) 400px, 100vw")} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 -z-10 bg-ink/35" />
          <span className="flex items-center gap-3 font-semibold text-white">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-gold shadow-lift">
              <FaPlay className="ml-1" />
            </span>
            Watch Our Video
          </span>
        </a>
      </section>

      {/* Reviews */}
      <section className="container-x py-12 md:py-20">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="h-section">What Our Guests Say</h2>
            <p className="lead mt-1">Real reviews from travelers who rode with us.</p>
          </div>
          <a href={SITE.reviews.tripadvisor} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 text-sm font-medium text-ink">
            <SiTripadvisor className="text-[#00AF87]" size={20} /> Tripadvisor <Stars />
          </a>
        </div>

        <ul data-reveal-stagger className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-3 md:gap-5">
          {REVIEWS.map((r) => (
            <li key={r.name}>
              <ReviewCard review={r} />
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-6 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
          <Link href="/reviews" className="btn-gold">
            See More Reviews <HiArrowRight />
          </Link>
          <a href={SITE.reviews.tripadvisor} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <SiTripadvisor className="text-[#00AF87]" size={18} /> Tripadvisor
          </a>
        </div>
      </section>

      {/* Follow our journey */}
      <section className="bg-white py-12 md:py-20">
        <div className="container-x">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="h-section">Follow Our Journey</h2>
              <p className="lead mt-1">See real moments, travelers, and more.</p>
            </div>
            <Social />
          </div>

          <ul data-reveal-stagger className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:grid-cols-4 sm:gap-3 lg:grid-cols-8">
            {GALLERY.map((g, i) => (
              // Six on phones (two even rows of three), all eight from sm up.
              <li key={g.src} className={`skeleton aspect-square overflow-hidden rounded-lg sm:rounded-xl ${i >= 6 ? "hidden sm:block" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img {...responsive(g.src, [240, 400, 600], "(min-width: 1024px) 150px, (min-width: 640px) 25vw, 33vw")} alt={g.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
