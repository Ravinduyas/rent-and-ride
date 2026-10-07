import { PAGE_HERO } from "@/data/content";
import { responsive, HERO_WIDTHS } from "@/lib/img";

/**
 * Banner used at the top of every inner page: a beach photo that fades to
 * white on the left, where the heading sits.
 */
export default function PageHero({
  title,
  intro,
  image = PAGE_HERO,
  children,
}: {
  title: React.ReactNode;
  intro?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...responsive(image, HERO_WIDTHS, "100vw")}
        fetchPriority="high"
        loading="eager"
        alt=""
        className="hero-img absolute inset-0 -z-20 h-full w-full object-cover object-[center_75%]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/85 to-white/10 md:via-white/70 md:to-transparent" />

      <div className="container-x py-10 md:py-20">
        <div className="hero-intro max-w-xl">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-[44px]">
            {title}
          </h1>
          {intro && <p className="lead mt-4 max-w-md text-ink-soft">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
