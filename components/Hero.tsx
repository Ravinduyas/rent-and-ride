import Image from "next/image";
import Link from "next/link";
import { HiPlay } from "react-icons/hi";
import AnimateIn from "./AnimateIn";

export default function Hero() {
  return (
    // Pinned to the top so the cream body scrolls up over it. Sticky rather
    // than fixed: it stays in flow, so no spacer is needed and it releases
    // naturally at the end of <main>.
    <section id="home" className="sticky top-0">
      {/* On large screens 720px is barely half the height, so let it grow with
          the viewport — max() keeps it from shrinking on shorter 2xl laptops. */}
      <div className="relative isolate min-h-[620px] overflow-hidden md:min-h-[720px] 2xl:min-h-[max(720px,78vh)]">
        <Image
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2400&q=80"
          alt="Rider on the coast road near Weligama"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(38,34,20,0.68) 0%, rgba(38,34,20,0.45) 45%, rgba(38,34,20,0.62) 100%)",
          }}
        />

        {/* Bottom padding tracks the lap so the CTAs always clear the panel. */}
        <div
          style={{ paddingBottom: "calc(var(--panel-lap) + 3.5rem)" }}
          className="container-x flex min-h-[620px] flex-col items-center justify-center pt-32 text-center md:min-h-[720px] 2xl:min-h-[max(720px,78vh)]"
        >
          <AnimateIn variant="fadeUp" delay={0.1}>
            <h1 className="max-w-4xl text-[30px] font-bold leading-[1.18] text-white min-[380px]:text-[32px] md:text-[50px] 2xl:max-w-6xl 2xl:text-[62px]">
              Find the next ride to explore
              <br className="hidden sm:block" /> the beauty of the south coast
            </h1>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.25}>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/90 [text-shadow:0_1px_12px_rgba(38,34,20,0.55)] md:text-base 2xl:max-w-2xl 2xl:text-lg 2xl:leading-8">
              Bikes, scooters and three wheelers for hire in Weligama. Book
              anytime, ride anywhere — we deliver to your door.
            </p>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.4}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href="/bikes" className="btn-orange">
                Let&apos;s Explore
              </Link>
              <Link href="#how-it-works" className="btn-ghost">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-orange">
                  <HiPlay size={16} />
                </span>
                How it works
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>

    </section>
  );
}
