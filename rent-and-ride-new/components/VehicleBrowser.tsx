"use client";

import { useState } from "react";
import { MdElectricScooter, MdApps } from "react-icons/md";
import { RiEBike2Line } from "react-icons/ri";
import type { Vehicle } from "@/data/vehicles";
import VehicleCard from "./VehicleCard";
import { SECTION_OFFSET } from "@/lib/sections";

/**
 * One section of the Rentals page: heading, optional engine filter, grid.
 * The filter only appears when the vehicles span more than one group.
 */
export default function VehicleBrowser({
  id,
  title,
  intro,
  vehicles,
}: {
  id: string;
  title: string;
  intro?: string;
  vehicles: Vehicle[];
}) {
  const groups = Array.from(new Set(vehicles.map((v) => v.group)));
  const [active, setActive] = useState<string>("All");
  const shown = active === "All" ? vehicles : vehicles.filter((v) => v.group === active);

  const options = groups.length > 1 ? ["All", ...groups] : [];

  return (
    <section id={id} className={`container-x py-10 md:py-14 ${SECTION_OFFSET}`}>
      <div data-reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <h2 className="h-section">{title}</h2>
          {intro && <p className="lead mt-1">{intro}</p>}
        </div>

        {options.length > 0 && (
          <div
            role="tablist"
            aria-label={`Filter ${title.toLowerCase()} by engine`}
            className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] gap-2.5 overflow-x-auto px-4 sm:mx-0 sm:w-auto sm:gap-3 sm:px-0"
          >
            {options.map((g) => {
              const on = g === active;
              const Icon = g === "All" ? MdApps : g === "Electric" ? MdElectricScooter : RiEBike2Line;
              return (
                <button
                  key={g}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(g)}
                  className={`flex min-h-11 min-w-[76px] shrink-0 flex-col items-center justify-center rounded-xl border px-3 py-2 text-xs font-medium transition ${
                    on
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-white text-ink-soft hover:border-gold"
                  }`}
                >
                  <Icon size={18} />
                  {g}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <ul data-reveal-stagger className="mt-5 grid grid-cols-1 gap-3.5 sm:mt-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {shown.map((v) => (
          <li key={v.slug}>
            <VehicleCard vehicle={v} />
          </li>
        ))}
      </ul>
    </section>
  );
}
