import { getRelatedBikes } from '../../lib/bikes';
import BikeCard from './BikeCard';

interface Props {
  currentSlug: string;
  limit?: number;
}

export default function RelatedBikes({ currentSlug, limit = 3 }: Props) {
  const related = getRelatedBikes(currentSlug, limit);

  return (
    <section className="bg-neutral-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-dark mb-12 italic">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {related.map((bike, i) => (
            <BikeCard key={bike.id} bike={bike} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
