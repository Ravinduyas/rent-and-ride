import Link from "next/link";
import type { Vehicle } from "@/data/vehicles";
import { responsive, CARD_WIDTHS } from "@/lib/img";

export default function VehicleCard({
  vehicle,
  compact = false,
}: {
  vehicle: Vehicle;
  /** Home page row: day price only, smaller type, always stacked. */
  compact?: boolean;
}) {
  const v = vehicle;
  const specs = [
    v.note ?? v.transmission,
    v.engine === "Electric" ? null : v.engine,
    `${v.seats} People`,
  ].filter(Boolean);

  // Grid cards sit photo-left on phones (a full-width photo per vehicle made
  // the list very long) and stack from the sm breakpoint up.
  const row = !compact;

  return (
    <article
      className={`card group flex h-full overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lift ${
        row ? "flex-row sm:flex-col" : "flex-col"
      }`}
    >
      <div
        className={`skeleton overflow-hidden ${
          row ? "w-[40%] shrink-0 sm:w-auto sm:aspect-[4/3]" : "aspect-[4/3]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...responsive(
            v.image,
            CARD_WIDTHS,
            compact
              ? "(min-width: 1024px) 230px, 220px"
              : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 40vw"
          )}
          alt={v.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className={`flex min-w-0 flex-1 flex-col ${compact ? "p-3.5" : "p-4 sm:p-5"}`}>
        <h3 className={`font-semibold text-ink ${compact ? "text-sm" : "text-base"}`}>
          {v.name}
        </h3>
        <p className="mt-1 text-xs text-ink-muted">{specs.join(" • ")}</p>

        <p
          className={`mt-2.5 flex flex-wrap items-baseline gap-x-4 gap-y-0.5 sm:mt-3 ${
            compact ? "text-sm" : "text-[15px]"
          }`}
        >
          <span>
            <span className="font-semibold text-gold-deep">${v.perDay}</span>
            <span className="text-ink-muted">/day</span>
          </span>
          {!compact && (
            <span>
              <span className="font-semibold text-ink">${v.perWeek}</span>
              <span className="text-ink-muted">/week</span>
            </span>
          )}
        </p>

        <div className={`mt-auto ${compact ? "pt-3.5" : "pt-3 sm:pt-5"}`}>
          {/* Opens the booking flow with this vehicle already chosen. */}
          <Link
            href={`/book/?vehicle=${v.slug}`}
            className={`btn-gold w-full ${compact ? "text-xs" : ""}`}
            aria-label={`Book the ${v.name}`}
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
