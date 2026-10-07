import type { ReactNode } from "react";
import AnimateIn from "./AnimateIn";

/**
 * Editorial section heading: a small orange eyebrow with a rule, then a large
 * tight display line. Deliberately not the centred orange heading the rest of
 * the site uses — the point is to break that rhythm.
 *
 * "split" sets the title against the lead paragraph on a baseline, which reads
 * as a spread rather than a stack.
 */
export default function SectionHead({
  eyebrow,
  title,
  intro,
  layout = "split",
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  layout?: "split" | "stack";
  tone?: "light" | "dark";
  className?: string;
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-brand-dark";
  const introColor = tone === "dark" ? "text-white/60" : "text-brand-muted";
  const ruleColor = tone === "dark" ? "bg-white/25" : "bg-brand-orange/35";

  return (
    <AnimateIn variant="fadeUp" className={className}>
      <div
        className={
          layout === "split" && intro
            ? "grid grid-cols-1 items-end gap-6 md:grid-cols-[1.15fr_1fr] md:gap-12"
            : ""
        }
      >
        <div>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
            {eyebrow}
            <span aria-hidden="true" className={`h-px w-10 ${ruleColor}`} />
          </p>

          {/* Stepped scale rather than one jump at md: between 768 and 1023px
              this often sits in a half-width column, where 54px pushed long
              words like "handwritten" out of their box. text-balance evens
              out the line breaks at every size. */}
          <h2
            className={`mt-5 max-w-[15ch] text-balance text-[32px] font-bold leading-[1.04] tracking-[-0.02em] sm:text-[40px] lg:text-[54px] 2xl:text-[62px] ${titleColor}`}
          >
            {title}
          </h2>
        </div>

        {intro && (
          <p className={`max-w-md text-sm leading-7 md:pb-2 ${introColor}`}>
            {intro}
          </p>
        )}
      </div>
    </AnimateIn>
  );
}

/** Orange word inside a display heading. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-brand-orange">{children}</span>;
}
