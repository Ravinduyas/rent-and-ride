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
    <section className="relative isolate overflow-hidden bg-navy-grad">
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(11,20,38,0.95) 0%, rgba(11,20,38,0.6) 50%, rgba(11,20,38,0.25) 100%)",
            }}
          />
        </div>
      )}

      <div className="pointer-events-none absolute -left-32 -top-20 h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-brand-silver/10 blur-3xl" />

      <div className="container-x relative grid min-h-[640px] grid-cols-1 items-end pb-16 pt-32 md:min-h-[720px] md:pb-20 md:pt-40">
        <div>
          <AnimateIn variant="fadeLeft" delay={0.1}>
            <span className="mb-4 block h-8 w-[2px] bg-brand-orange" />
            <h1 className="text-3xl font-extrabold uppercase tracking-wide md:text-5xl">
              <span className="text-silver-grad">{title}</span>
            </h1>
          </AnimateIn>

          {subtitle && (
            <AnimateIn variant="fadeUp" delay={0.25}>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-brand-silver/80">
                {subtitle}
              </p>
            </AnimateIn>
          )}

          {crumbs && crumbs.length > 0 && (
            <AnimateIn variant="fadeIn" delay={0.4}>
              <nav
                aria-label="Breadcrumb"
                className="mt-8 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-silver/70"
              >
                {crumbs.map((c, i) => (
                  <span key={c.label} className="flex items-center gap-2">
                    {c.href ? (
                      <Link href={c.href} className="hover:text-brand-orange">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-white">{c.label}</span>
                    )}
                    {i < crumbs.length - 1 && <span>/</span>}
                  </span>
                ))}
              </nav>
            </AnimateIn>
          )}
        </div>
      </div>
    </section>
  );
}
