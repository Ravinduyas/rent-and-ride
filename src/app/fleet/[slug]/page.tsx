import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { bikes, findBikeBySlug } from '../../../lib/bikes';
import BikeGallery from '../../../components/fleet/BikeGallery';
import BikeSpecs from '../../../components/fleet/BikeSpecs';
import BikeBookingPanel from '../../../components/fleet/BikeBookingPanel';
import RelatedBikes from '../../../components/fleet/RelatedBikes';
import { CTARail } from '../../../components/WhyChooseAndCTARail';
import BikeDetailIntro from './BikeDetailIntro';

export function generateStaticParams() {
  return bikes.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bike = findBikeBySlug(slug);
  if (!bike) return { title: 'Bike — Rent & Ride Weligama' };
  return {
    title: `${bike.name} — Rent & Ride Weligama`,
    description: bike.description,
  };
}

export default async function BikeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bike = findBikeBySlug(slug);
  if (!bike) notFound();

  return (
    <>
      <section className="pt-28 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BikeDetailIntro>
            <ChevronLeft size={16} /> Back to Fleet
          </BikeDetailIntro>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16">
            <div className="space-y-12">
              <BikeGallery images={bike.images} slug={bike.slug} alt={bike.name} />
              <BikeSpecs bike={bike} />
            </div>
            <BikeBookingPanel bike={bike} />
          </div>
        </div>
      </section>

      <RelatedBikes currentSlug={bike.slug} />
      <CTARail />
    </>
  );
}
