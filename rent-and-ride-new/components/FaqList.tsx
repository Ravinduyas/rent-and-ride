"use client";

import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import type { Faq } from "@/data/content";

/**
 * Accordion of questions; one answer is open at a time. Answers slide open
 * and fade in (the .faq-panel rules in globals.css), and the + turns into a ×.
 */
export default function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul data-reveal-stagger className="overflow-hidden rounded-xl border border-line bg-white">
      {items.map((f, i) => {
        const isOpen = open === f.q;
        const id = `faq-${i}`;
        return (
          <li key={f.q} className="border-b border-line last:border-0">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? null : f.q)}
                className="flex min-h-[52px] w-full items-center justify-between gap-4 px-5 py-3 text-left text-sm font-medium text-ink transition hover:bg-paper"
              >
                {f.q}
                <HiPlus
                  className={`shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            {/* Always rendered so it can animate; closed panels are
                visibility:hidden, so they're skipped by Tab and screen readers. */}
            <div id={id} role="region" aria-label={f.q} className={`faq-panel ${isOpen ? "is-open" : ""}`}>
              <div>
                <p className="px-5 pb-5 text-[0.8125rem] leading-6 text-ink-muted">{f.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
