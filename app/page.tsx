import { HiArrowDown } from "react-icons/hi";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Destinations from "@/components/Destinations";
import ModernRiders from "@/components/ModernRiders";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import ExploreBand from "@/components/ExploreBand";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Cream body scrolls up over the pinned hero. */}
      <div className="panel-cream">
        {/* Centred on the panel's rounded top edge (half of its own height).
            It lives here rather than in the hero because the hero is sticky,
            and a sticky element's stacking context would paint it underneath
            this panel. */}
        <a
          href="#popular"
          aria-label="Skip to popular rides"
          className="absolute -top-7 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-brand-amber text-brand-ink shadow-[0_12px_28px_rgba(242,179,61,0.45)] transition hover:bg-[#e8a92f] md:right-16"
        >
          <HiArrowDown size={20} />
        </a>

        <TrustStrip />
        <Destinations />
        <ModernRiders />
        <HowItWorks />
        <Testimonials />
      </div>

      <ExploreBand />
    </>
  );
}
