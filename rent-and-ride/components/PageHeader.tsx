import Image from "next/image";
import Link from "next/link";
import AnimateIn from "./AnimateIn";

type Crumb = { label: string; href?: string };

export default function PageHeader({
  title,
  subtitle,
  crumbs,
  image,
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  image?: string;
}) {
  return (
    /* Pinned like the home hero, so the cream body scrolls up over it.
       The desktop height is deliberately generous: at 480px this was a 2.8:1
       letterbox against 3:2 photos and threw away nearly half the image, so
       subjects came out magnified and cropped through. Mobile stays shorter —
       there the box is taller than it is wide, so extra height crops width
       instead and makes things worse. */
    /* Past 2xl a fixed 640px turns back into a letterbox (37% of the photo
       survives at 2560px), so height follows width there instead. */
    <section className="sticky top-0 isolate min-h-[420px] overflow-hidden bg-brand-ink md:min-h-[640px] 2xl:min-h-[max(720px,36vw)]">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
      )}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(38,34,20,0.6) 0%, rgba(38,34,20,0.4) 50%, rgba(38,34,20,0.6) 100%)",
        }}
      />

      {/* Bottom padding tracks the lap so the breadcrumbs clear the panel. */}
      <div
        style={{ paddingBottom: "calc(var(--panel-lap) + 2.5rem)" }}
        className="container-x flex min-h-[420px] flex-col items-center justify-center pt-32 text-center md:min-h-[640px] 2xl:min-h-[max(720px,36vw)]"
      >
        <AnimateIn variant="fadeUp" delay={0.1}>
          <h1 className="max-w-2xl text-[30px] font-bold leading-[1.2] text-white md:text-[44px] 2xl:max-w-3xl 2xl:text-[56px]">
            {title}
          </h1>
        </AnimateIn>

        {subtitle && (
          <AnimateIn variant="fadeUp" delay={0.25}>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/90 [text-shadow:0_1px_12px_rgba(38,34,20,0.55)]">
              {subtitle}
            </p>
          </AnimateIn>
        )}

        {crumbs && crumbs.length > 0 && (
          <AnimateIn variant="fadeIn" delay={0.4}>
            <nav
              aria-label="Breadcrumb"
              className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs text-white/60"
            >
              {crumbs.map((c, i) => (
                <span key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="inline-flex min-h-6 items-center hover:text-white"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
                </span>
              ))}
            </nav>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
