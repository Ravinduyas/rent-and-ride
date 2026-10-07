import Image from "next/image";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import AnimateIn from "./AnimateIn";
import SectionHead from "./SectionHead";

export type FeatureItem = {
  Icon?: IconType;
  title: string;
  body: string;
  /** Photo for the top of the card. Supply alt whenever image is set. */
  image?: string;
  alt?: string;
};

export type Background = "cream" | "white" | "dark";

const COLS: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/* Cards have to contrast with whatever the section sits on, so the surface is
   chosen from the background rather than hard-coded white. */
const SURFACE: Record<Background, string> = {
  cream: "bg-white shadow-[0_10px_30px_rgba(46,42,28,0.06)]",
  white: "bg-brand-cream",
  dark: "bg-white/[0.06] ring-1 ring-inset ring-white/10",
};

const SECTION: Record<Background, string> = {
  cream: "",
  white: "bg-white",
  dark: "bg-brand-ink",
};

export default function FeatureGrid({
  eyebrow,
  title,
  intro,
  items,
  cols = 3,
  numbered = false,
  background = "cream",
  stagger = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  items: FeatureItem[];
  cols?: 2 | 3 | 4;
  numbered?: boolean;
  background?: Background;
  /** Steps alternate columns down a notch, as on the home page. */
  stagger?: boolean;
}) {
  const dark = background === "dark";

  return (
    <section className={`py-20 md:py-28 ${SECTION[background]}`}>
      <div className="container-x">
        <SectionHead
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          tone={dark ? "dark" : "light"}
        />

        <div className={`mt-14 grid grid-cols-1 gap-6 ${COLS[cols]}`}>
          {items.map(({ Icon, title: t, body, image, alt }, i) => (
            <AnimateIn
              key={t}
              variant="fadeUp"
              delay={(i % cols) * 0.1}
              className={stagger && i % 2 === 1 ? "lg:mt-14" : ""}
            >
              {/* No overflow-hidden on the card: the step badge deliberately
                  hangs above its top edge, and clipping cut it to a half
                  circle. The photo clips itself. */}
              <div
                className={`group relative h-full rounded-3xl transition hover:-translate-y-1 ${
                  SURFACE[background]
                } ${image ? "" : "p-7"} ${numbered && !image ? "pt-9" : ""}`}
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
                    {/* With a photo, the step number sits on it instead. */}
                    {numbered && (
                      <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white shadow-[0_8px_18px_rgba(238,91,43,0.35)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>
                )}

                <div className={image ? "px-6 pb-6 pt-2" : ""}>
                  {numbered ? (
                    !image && (
                      <span className="absolute -top-4 left-7 flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white shadow-[0_8px_18px_rgba(238,91,43,0.35)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )
                  ) : (
                    /* The photo carries the card once there is one, so the
                       icon badge would just be noise. */
                    !image &&
                    Icon && (
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full text-brand-orange ${
                          dark ? "bg-white/10" : "bg-brand-orangeSoft"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                    )
                  )}

                  <h3
                    className={`text-[15px] font-semibold ${
                      dark ? "text-white" : "text-brand-dark"
                    } ${!numbered && !image && Icon ? "mt-5" : ""}`}
                  >
                    {t}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-7 ${
                      dark ? "text-white/60" : "text-brand-muted"
                    }`}
                  >
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
