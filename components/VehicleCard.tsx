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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(46,42,28,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(46,42,28,0.12)]">
      <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-brand-dark backdrop-blur-sm">
          {vehicle.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        <h3 className="text-[15px] font-semibold text-brand-dark">
          {vehicle.name}
        </h3>

        {/* Seats and gearbox are structured fields, so they get icons.
            Everything else is a free-form tag and reads better as a chip. */}
        <dl className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brand-muted">
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
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {vehicle.highlights.map((h, i) => (
              <li
                key={`${h}-${i}`}
                className="rounded-full bg-brand-cream px-2.5 py-1 text-[11px] text-brand-muted"
              >
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-brand-line pt-5">
          <p className="text-brand-dark">
            <span className="text-xl font-bold text-brand-orange">
              ${vehicle.pricePerDay}
            </span>
            <span className="ml-1 text-xs text-brand-muted">/ day</span>
          </p>

          <Link
            href={bookHref}
            /* Every card's link says "Book", so name the vehicle for anyone
               listening to the links rather than looking at them. */
            aria-label={`Book the ${vehicle.name}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-5 py-2 text-xs font-semibold text-white transition hover:bg-brand-orangeDeep"
          >
            Book
            <HiArrowRight
              size={12}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
