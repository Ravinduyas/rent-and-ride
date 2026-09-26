import { HiArrowDown } from "react-icons/hi";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Destinations from "@/components/Destinations";
import FleetPreview from "@/components/FleetPreview";
import ModernRiders from "@/components/ModernRiders";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import ExploreBand from "@/components/ExploreBand";

const FAQS = [
  {
    q: "Do I need a licence to ride here?",
    a: "Yes. Bring your home licence, and an international permit too if you have one. If you don't, say so when you enquire — helping visitors sort a local riding permit is something we do regularly.",
  },
  {
    q: "Can you bring the vehicle to me?",
    a: "Usually, yes — doorstep delivery is part of what we do. Tell us where you're staying when you get in touch and we'll confirm what we can arrange for your pickup and drop-off.",
  },
  {
    q: "I've never ridden a scooter. Is that a problem?",
    a: "Not at all, and you wouldn't be the first. We'll run through the controls with you and take a short test ride together before you head off on your own.",
  },
  {
    q: "What happens if something goes wrong on the road?",
    a: "Message or call us and we'll sort it out — roadside help comes with every rental. We'd far rather hear about an odd noise early than get a call about a breakdown later.",
  },
  {
    q: "How long can I keep a vehicle?",
    a: "Anything from a single day to a long stay. Tell us your dates and we'll put together a price for the whole stretch rather than charging you day by day.",
  },
  {
    q: "Is a helmet included?",
    a: "Always, along with a lock and a basic toolkit. If you'd like a phone mount or a luggage rack as well, just ask when you book.",
  },
];

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
        <FleetPreview />
        <ModernRiders />
        <HowItWorks />
        <Testimonials />
        <Faq
          layout="split"
          eyebrow="Before you book"
          title="Questions riders ask us"
          accent="riders ask us"
          intro="The things people check before booking. Anything else, just message us — we answer every enquiry ourselves."
          items={FAQS}
        />
      </div>

      <ExploreBand />
    </>
  );
}
