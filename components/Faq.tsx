import AnimateIn from "./AnimateIn";
import FaqRow from "./FaqRow";
import SectionHead, { Accent } from "./SectionHead";

export type FaqItem = { q: string; a: string };

export default function Faq({
  title,
  intro,
  items,
  /** "split" holds the heading beside the questions instead of above them. */
  layout = "center",
  eyebrow = "FAQ",
  accent,
  background = "cream",
}: {
  title: string;
  intro?: string;
  items: FaqItem[];
  layout?: "center" | "split";
  eyebrow?: string;
  accent?: string;
  background?: "cream" | "white";
}) {
  const rows = (
    <div className="space-y-3">
      {items.map((item, i) => (
        <AnimateIn key={item.q} variant="fadeUp" delay={i * 0.06}>
          <FaqRow
            q={item.q}
            a={item.a}
            surface={background === "white" ? "cream" : "white"}
          />
        </AnimateIn>
      ))}
    </div>
  );

  if (layout === "split") {
    // Accent the trailing words of the title rather than adding a second prop
    // to every call site.
    const head = accent && title.endsWith(accent)
      ? {
          lead: title.slice(0, title.length - accent.length),
          tail: accent,
        }
      : { lead: title, tail: "" };

    return (
      <section
        className={`py-20 md:py-28 ${background === "white" ? "bg-white" : ""}`}
      >
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              eyebrow={eyebrow}
              layout="stack"
              title={
                <>
                  {head.lead}
                  {head.tail && <Accent>{head.tail}</Accent>}
                </>
              }
            />
            {intro && (
              <p className="mt-5 max-w-sm text-sm leading-7 text-brand-muted">
                {intro}
              </p>
            )}
          </div>

          {rows}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <AnimateIn variant="fadeUp">
          <h2 className="section-title text-center">{title}</h2>
          {intro && (
            <p className="section-sub mx-auto max-w-lg text-center">{intro}</p>
          )}
        </AnimateIn>

        <div className="mx-auto mt-12 max-w-3xl">{rows}</div>
      </div>
    </section>
  );
}
