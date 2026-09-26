import { HiPlus } from "react-icons/hi";
import AnimateIn from "./AnimateIn";

export type FaqItem = { q: string; a: string };

/* Built on <details>, so it opens and closes with no client JS and stays
   keyboard accessible in the static export. */
export default function Faq({
  title,
  intro,
  items,
}: {
  title: string;
  intro?: string;
  items: FaqItem[];
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <AnimateIn variant="fadeUp">
          <h2 className="section-title text-center">{title}</h2>
          {intro && (
            <p className="section-sub mx-auto max-w-lg text-center">{intro}</p>
          )}
        </AnimateIn>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {items.map((item, i) => (
            <AnimateIn key={item.q} variant="fadeUp" delay={i * 0.06}>
              <details className="faq-item group rounded-2xl bg-white px-6 shadow-[0_10px_30px_rgba(46,42,28,0.06)]">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-[15px] font-semibold text-brand-dark">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orangeSoft text-brand-orange transition-transform duration-300 group-open:rotate-45"
                  >
                    <HiPlus size={14} />
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-sm leading-7 text-brand-muted">
                  {item.a}
                </p>
              </details>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
