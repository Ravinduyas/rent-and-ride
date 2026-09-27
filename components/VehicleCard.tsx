import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { FaUserFriends, FaCog } from "react-icons/fa";

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
  // Carry the choice through to the enquiry form so nobody has to retype
  // which vehicle they were looking at.
  const bookHref =
    `/contact/?vehicle=${encodeURIComponent(vehicle.name)}` +
    `&type=${encodeURIComponent(vehicle.type)}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(46,42,28,0.14)]">
      {/* Photo runs to the card edges rather than sitting inset, and carries
          the two things people scan for: what it is, and what it costs.
          16:10 rather than 4:3 — the taller crop made the card bulky without
          showing more of the vehicle. */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.07]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-medium text-brand-dark backdrop-blur-sm">
          {vehicle.type}
        </span>

        <p className="absolute bottom-3 left-3 flex items-baseline gap-1 rounded-full bg-brand-orange px-3 py-1 text-white shadow-[0_6px_16px_rgba(238,91,43,0.4)]">
          <span className="text-[15px] font-bold">${vehicle.pricePerDay}</span>
          <span className="text-[10px] font-medium opacity-90">/ day</span>
        </p>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="text-[15px] font-semibold leading-tight text-brand-dark">
          {vehicle.name}
        </h3>

        <dl className="mt-2.5 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[11px] text-brand-muted">
          {vehicle.seats && (
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Seats</dt>
              <FaUserFriends size={12} aria-hidden="true" className="opacity-60" />
              <dd>{vehicle.seats} seats</dd>
            </div>
          )}
          {vehicle.transmission && (
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Transmission</dt>
              <FaCog size={12} aria-hidden="true" className="opacity-60" />
              <dd>{vehicle.transmission}</dd>
            </div>
          )}
        </dl>

        {vehicle.highlights && vehicle.highlights.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {vehicle.highlights.map((h, i) => (
              <li
                key={`${h}-${i}`}
                className="rounded-full bg-brand-cream px-2 py-0.5 text-[10px] text-brand-muted"
              >
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* The ::after stretches this link over the whole card, so the card is
            clickable without nesting a second link inside it. */}
        <Link
          href={bookHref}
          aria-label={`Book the ${vehicle.name}`}
          className="mt-auto flex items-center justify-between gap-3 border-t border-brand-line pt-4 text-[12px] font-semibold text-brand-dark transition after:absolute after:inset-0 after:content-[''] group-hover:text-brand-orange"
        >
          Book this one
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-cream text-brand-orange transition duration-300 group-hover:bg-brand-orange group-hover:text-white">
            <HiArrowRight size={12} />
          </span>
        </Link>
      </div>
    </article>
  );
}
