import Image from "next/image";
import Link from "next/link";
import { HiPlay, HiArrowDown } from "react-icons/hi";
import AnimateIn from "./AnimateIn";

export default function Hero() {
  return (
    <section id="home" className="relative">
      <div className="relative isolate min-h-[620px] overflow-hidden md:min-h-[720px]">
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

        <div className="container-x flex min-h-[620px] flex-col items-center justify-center pb-28 pt-32 text-center md:min-h-[720px] md:pb-36">
          <AnimateIn variant="fadeUp" delay={0.1}>
            <h1 className="max-w-4xl text-[32px] font-bold leading-[1.18] text-white md:text-[50px]">
              Find the next ride to explore
              <br className="hidden sm:block" /> the beauty of the south coast
            </h1>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.25}>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/90 [text-shadow:0_1px_12px_rgba(38,34,20,0.55)] md:text-base">
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

      {/* Straddles the cream panel's rounded top edge, as in the design. */}
      <a
        href="#popular"
        aria-label="Skip to popular rides"
        className="absolute bottom-0 right-6 z-20 flex h-14 w-14 translate-y-1/2 items-center justify-center rounded-full bg-brand-amber text-brand-ink shadow-[0_12px_28px_rgba(242,179,61,0.45)] transition hover:bg-[#e8a92f] md:right-16"
      >
        <HiArrowDown size={20} />
      </a>
    </section>
  );
}
