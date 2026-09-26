import Image from "next/image";
import type { IconType } from "react-icons";
import AnimateIn from "./AnimateIn";

export type FeatureItem = {
  Icon?: IconType;
  title: string;
  body: string;
  /** Photo for the top of the card. Supply alt whenever image is set. */
  image?: string;
  alt?: string;
};

const COLS: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/* The card grid several pages share: a heading, an optional lead-in, then
   icon-or-numbered cards. Kept in one place so the pages stay readable and
   the spacing can't drift between them. */
export default function FeatureGrid({
  title,
  intro,
  items,
  cols = 3,
  numbered = false,
  align = "center",
}: {
  title: string;
  intro?: string;
  items: FeatureItem[];
  cols?: 2 | 3 | 4;
  numbered?: boolean;
  align?: "center" | "left";
}) {
  const centred = align === "center";

  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <AnimateIn variant="fadeUp">
          <h2 className={`section-title ${centred ? "text-center" : ""}`}>
            {title}
          </h2>
          {intro && (
            <p
              className={`section-sub max-w-lg ${
                centred ? "mx-auto text-center" : ""
              }`}
            >
              {intro}
            </p>
          )}
        </AnimateIn>

        <div className={`mt-12 grid grid-cols-1 gap-6 ${COLS[cols]}`}>
          {items.map(({ Icon, title: t, body, image, alt }, i) => (
            <AnimateIn key={t} variant="fadeUp" delay={(i % cols) * 0.1}>
              <div
                className={`group h-full overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(46,42,28,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(46,42,28,0.1)] ${
                  numbered ? "relative" : ""
                } ${image ? "" : "p-7"} ${numbered ? "pt-9" : ""}`}
              >
                {image && (
                  <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={image}
                      alt={alt ?? ""}
                      fill
                      sizes={`(max-width: 640px) 100vw, ${Math.round(100 / cols)}vw`}
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className={image ? "px-6 pb-6 pt-2" : ""}>
                  {numbered ? (
                    <span className="absolute -top-4 left-7 flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white shadow-[0_8px_18px_rgba(238,91,43,0.35)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  ) : (
                    /* The photo carries the card once there is one, so the
                       icon badge would just be noise. */
                    !image &&
                    Icon && (
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orangeSoft text-brand-orange">
                        <Icon size={16} />
                      </span>
                    )
                  )}

                  <h3
                    className={`text-[15px] font-semibold text-brand-dark ${
                      !numbered && !image && Icon ? "mt-5" : ""
                    }`}
                  >
                    {t}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {body}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
