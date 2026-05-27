import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import AnimateIn from "./AnimateIn";

export default function About() {
  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <AnimateIn variant="fadeLeft">
          <div className="mb-12 flex flex-col items-start">
            <span className="section-eyebrow" />
            <h2 className="section-title">About Us</h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-2">
          <div className="space-y-6 text-sm leading-7 text-brand-muted">
            <AnimateIn variant="fadeUp" delay={0.1}>
              <p>
                Rent &amp; Ride is a local rental fleet built for travellers,
                commuters and weekend explorers. We hire out well-maintained
                motorbikes, scooters and three wheelers (tuktuks) by the day,
                week or month — with paperwork that takes minutes, not hours.
              </p>
            </AnimateIn>
            <AnimateIn variant="fadeUp" delay={0.2}>
              <p>
                Every vehicle is serviced before pickup, comes with helmets and
                a basic toolkit, and is covered by third-party insurance. Need
                it dropped at your hotel, the airport or a railway station?
                We&apos;ll get it to you. Want to drop it in another city? Just
                ask.
              </p>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.3}>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-dark hover:text-brand-orange"
              >
                Learn More
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white">
                  <HiArrowRight />
                </span>
              </Link>
            </AnimateIn>
          </div>

          <AnimateIn variant="fadeRight" delay={0.15} className="h-full">
            <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-3xl">
              <Image
                src="/about-illustration.png"
                alt="Rider illustration"
                fill
                className="object-contain"
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
