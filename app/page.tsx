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

      {/* Cream body laps over the bottom of the hero photo. */}
      <div className="panel-cream">
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
