"use client";

import { useId, useState } from "react";
import { HiPlus } from "react-icons/hi";

export default function FaqRow({
  q,
  a,
  /** Rows sit on cream when the section itself is white. */
  surface = "white",
}: {
  q: string;
  a: string;
  surface?: "white" | "cream";
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div
      className={`faq-item overflow-hidden rounded-2xl ${
        surface === "cream"
          ? "bg-brand-cream"
          : "bg-white shadow-[0_10px_30px_rgba(46,42,28,0.06)]"
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[15px] font-semibold text-brand-dark"
        >
          {q}
          <span
            aria-hidden="true"
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orangeSoft text-brand-orange transition-transform duration-300 ease-out motion-reduce:transition-none ${
              open ? "rotate-45" : ""
            }`}
          >
            <HiPlus size={14} />
          </span>
        </button>
      </h3>

      {/* Animating grid-template-rows between 0fr and 1fr gives a real height
          transition without having to measure the content. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        {/* visibility, not display: it takes the collapsed answer out of the
            accessibility tree, and because it interpolates discretely it only
            flips to hidden once the close has finished playing. */}
        <div
          className="overflow-hidden transition-[visibility] duration-300 motion-reduce:transition-none"
          style={{ visibility: open ? "visible" : "hidden" }}
        >
          <p className="px-6 pb-6 pr-12 text-sm leading-7 text-brand-muted">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}
