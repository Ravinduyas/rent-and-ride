import AboutHero from '../../components/about/AboutHero';
import StoryTimeline from '../../components/about/StoryTimeline';
import TeamGrid from '../../components/about/TeamGrid';
import { AboutSplit } from '../../components/FeaturesSection';
import { StatsBand } from '../../components/FeaturedAndStats';
import { WhyChoose, CTARail } from '../../components/WhyChooseAndCTARail';
import { team } from '../../lib/team';

export const metadata = {
  title: 'About Us — Rent & Ride Weligama',
  description: 'Born on Sri Lanka’s south coast in 2018 — meet the team and the story behind Rent & Ride Weligama.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutSplit />
      <StoryTimeline />
      <div className="bg-white py-16">
        <StatsBand />
      </div>
      <WhyChoose />
      <TeamGrid members={team} />
      <CTARail />
    </>
  );
}
