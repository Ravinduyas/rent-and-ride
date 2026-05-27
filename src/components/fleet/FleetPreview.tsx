import Link from 'next/link';
import { ArrowRight, Bike as BikeIcon } from 'lucide-react';
import { bikes } from '../../lib/bikes';
import BikeCard from './BikeCard';

interface Props {
  limit?: number;
}

export default function FleetPreview({ limit = 3 }: Props) {
  const featured = bikes.filter((b) => b.popular).slice(0, limit);
  const items = featured.length >= limit ? featured : bikes.slice(0, limit);

  return (
    <section className="bg-neutral-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center -rotate-12">
              <BikeIcon size={32} />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-dark mb-4">Our Featured Fleet</h2>
          <p className="text-neutral-500 font-medium">Hand-picked rides for the south-coast roads</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {items.map((bike, i) => (
            <BikeCard key={bike.id} bike={bike} index={i} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-3 bg-dark text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
          >
            See All Bikes <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
