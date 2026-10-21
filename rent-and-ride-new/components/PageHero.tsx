import { PAGE_HERO } from "@/data/content";
import { responsive, HERO_WIDTHS } from "@/lib/img";

/**
 * Banner used at the top of every inner page: the photo at full colour with a
 * dark scrim on the left (not a white fade, which washes the photo out) and
 * white text over it.
 */
export default function PageHero({
  title,
  intro,
  image = PAGE_HERO,
  imagePosition = "center 75%",
  children,
}: {
  title: React.ReactNode;
  intro?: string;
  image?: string;
  /** CSS object-position, so each photo's subject stays in the band. */
  imagePosition?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...responsive(image, HERO_WIDTHS, "100vw")}
        fetchPriority="high"
        loading="eager"
        alt=""
        className="hero-img absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: imagePosition }}
      />
      {/* Phones: the text spans the whole banner, so darken it evenly. Wider
          screens: darken only the left, where the text sits. */}
      <div className="absolute inset-0 -z-10 bg-black/55 md:hidden" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-black/70 via-black/35 to-transparent md:block" />

      <div className="container-x py-12 md:py-20 lg:py-24">
        <div className="hero-intro max-w-xl">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.45)] md:text-[2.75rem]">
            {title}
          </h1>
          {intro && <p className="lead mt-4 max-w-md !text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
