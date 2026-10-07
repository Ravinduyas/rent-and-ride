import Link from "next/link";
import { asset } from "@/lib/asset";

/**
 * The business logo (public/logo.svg: green roundel with the R&R monogram)
 * with the name set beside it. The roundel has the name inside it too, but
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
      className={`inline-flex items-center gap-2.5 leading-none ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/logo.svg")}
        alt=""
        width={52}
        height={52}
        className="h-12 w-12 shrink-0 rounded-full shadow-[0_2px_8px_-2px_rgba(11,38,26,0.45)] lg:h-[52px] lg:w-[52px]"
      />
      <span className="flex flex-col">
        <span className={`font-serif text-[17px] font-semibold tracking-[0.02em] ${ink}`}>
          Rent &amp; Ride
        </span>
        <span className="mt-1 text-[9.5px] font-semibold tracking-[0.32em] text-gold">
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
