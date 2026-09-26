import AnimateIn from "./AnimateIn";
import FaqRow from "./FaqRow";

export type FaqItem = { q: string; a: string };

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
              <FaqRow q={item.q} a={item.a} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
