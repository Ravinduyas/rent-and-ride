'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Bike as BikeIcon } from 'lucide-react';
import { fallbackGradient } from '../../lib/images';

interface Props {
  images: string[];
  slug: string;
  alt: string;
}

export default function BikeGallery({ images, slug, alt }: Props) {
  const [active, setActive] = useState(0);
  const [errored, setErrored] = useState<Set<number>>(new Set());
  const isErr = errored.has(active);

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl"
        style={isErr ? { background: fallbackGradient(slug) } : { background: '#F4F4F5' }}
      >
        {isErr ? (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center space-y-3">
              <BikeIcon size={64} className="mx-auto opacity-90" />
              <div className="text-sm font-black uppercase tracking-widest opacity-90">{alt}</div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              layoutId={active === 0 ? `bike-img-${slug}` : undefined}
              src={images[active]}
              onError={() => setErrored((prev) => new Set(prev).add(active))}
              alt={alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        )}

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => {
          const thumbErr = errored.has(i);
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={thumbErr ? { background: fallbackGradient(`${slug}-${i}`) } : undefined}
              className={`aspect-[4/3] overflow-hidden rounded-2xl ring-2 transition-all ${
                i === active ? 'ring-primary scale-95' : 'ring-transparent hover:ring-primary/40'
              } ${thumbErr ? '' : 'bg-neutral-100'}`}
            >
              {thumbErr ? (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <BikeIcon size={20} className="opacity-80" />
                </div>
              ) : (
                <img
                  src={img}
                  onError={() => setErrored((prev) => new Set(prev).add(i))}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}