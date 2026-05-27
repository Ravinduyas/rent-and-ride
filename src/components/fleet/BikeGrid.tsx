'use client';

import { motion } from 'motion/react';
import { Bike as BikeIcon } from 'lucide-react';
import type { Bike } from '../../lib/types';
import BikeCard from './BikeCard';

interface Props {
  bikes: Bike[];
}

export default function BikeGrid({ bikes }: Props) {
  if (bikes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-24 bg-white rounded-3xl border border-dashed border-neutral-200"
      >
        <BikeIcon size={48} className="mx-auto text-neutral-300 mb-4" />
        <h3 className="text-xl font-black text-dark mb-2">No bikes match your filters</h3>
        <p className="text-sm text-neutral-500 font-medium">Try widening your price range or clearing transmission/type filters.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {bikes.map((bike, i) => (
        <BikeCard key={bike.id} bike={bike} index={i} />
      ))}
    </div>
  );
}