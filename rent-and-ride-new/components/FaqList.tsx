"use client";

import { useState } from "react";
import { HiPlus, HiMinus, HiSearch } from "react-icons/hi";
import type { Faq } from "@/data/content";

/** Search box + accordion. The search filters on question and answer text. */
export default function FaqList({ items }: { items: Faq[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const shown = q
    ? items.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q))
    : items;

  return (
    <div>
      <label className="relative block max-w-md">
        <span className="sr-only">Search questions</span>
        <HiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your question..."
          className="field rounded-full pl-11"
        />
      </label>

      <ul data-reveal-stagger className="mt-6 overflow-hidden rounded-xl border border-line bg-white">
        {shown.map((f, i) => {
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
                  {isOpen ? (
                    <HiMinus className="shrink-0 text-gold" />
                  ) : (
                    <HiPlus className="shrink-0 text-gold" />
                  )}
                </button>
              </h3>
              <div id={id} hidden={!isOpen} className="px-5 pb-5 text-[13px] leading-6 text-ink-muted">
                {f.a}
              </div>
            </li>
          );
        })}
        {shown.length === 0 && (
          <li className="px-5 py-6 text-sm text-ink-muted">
            No questions match &ldquo;{query}&rdquo;. Ask us on WhatsApp instead.
          </li>
        )}
      </ul>
    </div>
  );
}
