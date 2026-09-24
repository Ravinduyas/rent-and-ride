import Image from "next/image";
import Link from "next/link";

export type Vehicle = {
  name: string;
  type: string;
  image: string;
  pricePerDay: number;
  seats?: number;
  transmission?: string;
  highlights?: string[];
};

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    vehicle.seats ? `${vehicle.seats} seats` : null,
    vehicle.transmission,
    ...(vehicle.highlights ?? []),
  ].filter(Boolean) as string[];

  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(46,42,28,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(46,42,28,0.12)]">
      <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-brand-dark backdrop-blur-sm">
          {vehicle.type}
        </span>
      </div>

      <div className="px-6 pb-6 pt-2">
        <h3 className="text-[15px] font-semibold text-brand-dark">
          {vehicle.name}
        </h3>

        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-xs text-brand-muted">
          {specs.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-brand-line">
                  ·
                </span>
              )}
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-brand-dark">
            <span className="text-xl font-bold text-brand-orange">
              ${vehicle.pricePerDay}
            </span>
            <span className="ml-1 text-xs text-brand-muted">/ day</span>
          </p>

          <Link
            href="/contact"
            className="rounded-full bg-brand-orange px-5 py-2 text-xs font-semibold text-white transition hover:bg-brand-orangeDeep"
          >
            Book
          </Link>
        </div>
      </div>
    </article>
  );
}
