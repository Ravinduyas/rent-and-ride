"use client";

import { useEffect, useState } from "react";
import { MdElectricScooter, MdTwoWheeler } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import type { SectionIcon, SectionLink } from "@/lib/sections";

const ICONS: Record<SectionIcon, React.ComponentType<{ size?: number }>> = {
  scooter: MdElectricScooter,
  bike: MdTwoWheeler,
  permit: RiFileList3Line,
};

/**
 * Jump links pinned under the header, highlighting the section currently on
 * screen. Each target section needs SECTION_OFFSET (lib/sections.ts) so its
 * heading doesn't land underneath these tabs.
 */
export default function SectionTabs({ sections }: { sections: SectionLink[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    // A section counts as current while it crosses a band ~35–40% down the
    // screen.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur"
    >
      {/* Phones: equal-width tabs that always fit on screen (no hidden third
          tab). Wider screens: natural-width pills. */}
      <ul
        className="container-x grid gap-1.5 py-2.5 sm:flex sm:gap-2"
        style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}
      >
        {sections.map(({ id, label, short, icon }) => {
          const Icon = ICONS[icon];
          const on = id === active;
          return (
            <li key={id} className="min-w-0 sm:shrink-0">
              <a
                href={`#${id}`}
                aria-current={on ? "true" : undefined}
                onClick={() => setActive(id)}
                className={`flex min-h-11 items-center justify-center gap-1.5 rounded-full border px-2 text-[13px] font-medium transition sm:gap-2 sm:px-4 sm:text-sm ${
                  on
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-ink-soft hover:border-gold hover:text-gold-deep"
                }`}
              >
                <Icon size={17} />
                {short ? (
                  <>
                    <span className="sm:hidden">{short}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </>
                ) : (
                  label
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
