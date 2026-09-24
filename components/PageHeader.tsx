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
    <section className="relative isolate min-h-[420px] overflow-hidden bg-brand-ink md:min-h-[480px]">
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

      <div className="container-x flex min-h-[420px] flex-col items-center justify-center pb-24 pt-32 text-center md:min-h-[480px] md:pb-28">
        <AnimateIn variant="fadeUp" delay={0.1}>
          <h1 className="max-w-2xl text-[30px] font-bold leading-[1.2] text-white md:text-[44px]">
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
                    <Link href={c.href} className="hover:text-white">
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
