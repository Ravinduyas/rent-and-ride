import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="pt-40 pb-32 min-h-[80vh] flex items-center bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-[10rem] leading-none font-black text-primary/20 select-none">404</div>
        <h1 className="text-4xl font-black text-dark mb-4 -mt-8 relative">Took a wrong turn?</h1>
        <p className="text-neutral-500 font-medium mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on the road.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
