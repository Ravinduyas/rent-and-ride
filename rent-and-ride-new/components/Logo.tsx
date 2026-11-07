import Link from "next/link";
import { asset } from "@/lib/asset";

/**
 * The business logo with the name set beside it. The artwork has no background
 * of its own: logo-dark.png (dark line art) for light backgrounds and
 * logo-light.png (white line art) for dark ones. public/logo.png, the solid
 * black roundel, is kept for the browser-tab icon. The roundel has the name inside it too, but
 * at header size that lettering is too small to read, so the wordmark next
 * to it carries the name.
 */
export default function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const ink = tone === "dark" ? "text-ink" : "text-white";

  return (
    <Link
      href="/"
      aria-label="Rent & Ride Weligama — home"
      className={`inline-flex min-w-0 items-center gap-2 leading-none min-[360px]:gap-2.5 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(tone === "dark" ? "/logo-dark.png" : "/logo-light.png")}
        alt=""
        width={56}
        height={56}
        className="h-11 w-11 shrink-0 min-[360px]:h-[3.25rem] min-[360px]:w-[3.25rem] lg:h-14 lg:w-14"
      />
      <span className="flex flex-col">
        <span className={`whitespace-nowrap font-serif text-[0.9375rem] font-semibold min-[360px]:text-[1.0625rem] tracking-[0.02em] ${ink}`}>
          Rent &amp; Ride
        </span>
        <span className="mt-1 text-[0.59375rem] font-semibold tracking-[0.32em] text-gold">
          WELIGAMA
        </span>
      </span>
    </Link>
  );
}

export function PalmMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M12 22c0-6 .6-10 1.4-13" />
      <path d="M13.4 9C11 6.6 7.6 6.4 5 8" />
      <path d="M13.4 9c.4-3 2.6-5 6-5" />
      <path d="M13.4 9c2.4-1.2 5.4-.6 7 1.6" />
      <path d="M13.4 9c-1-2.6-3.4-4.6-6-5" />
      <path d="M13.4 9c-2.6.2-5 2-5.8 4.6" />
    </svg>
  );
}
