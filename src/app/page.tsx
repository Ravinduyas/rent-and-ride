import HeroSection from '../components/HeroSection';
import { WorkflowSection } from '../components/FeaturesSection';
import FleetPreview from '../components/fleet/FleetPreview';
import { StatsBand } from '../components/FeaturedAndStats';
import { BenefitsBand, TestimonialsCarousel } from '../components/ExtraTestimonialsBlog';
import { CTARail } from '../components/WhyChooseAndCTARail';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WorkflowSection />
      <FleetPreview limit={3} />
      <div className="bg-white py-16">
        <StatsBand />
      </div>
      <BenefitsBand />
      <TestimonialsCarousel />
      <CTARail />
    </>
  );
}
