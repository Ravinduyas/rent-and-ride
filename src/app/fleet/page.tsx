import { Bike as BikeIcon } from 'lucide-react';
import { bikes } from '../../lib/bikes';
import BikeGrid from '../../components/fleet/BikeGrid';
import FleetHeroIntro from './FleetHeroIntro';

const sorted = [...bikes].sort((a, b) => {
  if (a.popular && !b.popular) return -1;
  if (!a.popular && b.popular) return 1;
  return b.rating - a.rating;
});

export const metadata = {
  title: 'Our Fleet — Rent & Ride Weligama',
  description: 'Browse our hand-picked fleet of motorbikes and scooters available for rent on Sri Lanka’s south coast.',
};

export default function FleetPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FleetHeroIntro>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center -rotate-6">
                <BikeIcon size={28} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-dark mb-4">Our Fleet</h1>
            <p className="text-neutral-500 font-medium text-lg">
              Browse {bikes.length} bikes &amp; scooters — coastal cruisers, sport bikes, and long-distance tourers, all hand-checked at our Weligama hub.
            </p>
          </FleetHeroIntro>
        </div>
      </section>

      <section className="bg-neutral-50 py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BikeGrid bikes={sorted} />
        </div>
      </section>
    </>
  );
}
