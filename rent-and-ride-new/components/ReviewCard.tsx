import { FaStar } from "react-icons/fa";
import { SiGoogle, SiTripadvisor } from "react-icons/si";
import type { Review } from "@/data/content";

export default function ReviewCard({
  review,
  layout = "card",
}: {
  review: Review;
  /** "row" is the avatar-left list style used on the Reviews page. */
  layout?: "card" | "row";
}) {
  const r = review;
  const SourceIcon = r.source === "Google" ? SiGoogle : SiTripadvisor;

  if (layout === "row") {
    return (
      <article className="flex gap-4 border-b border-line py-5 last:border-0">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-soft font-semibold text-gold-deep">
          {r.name[0]}
        </span>
        <div>
          <p className="flex flex-wrap items-center gap-x-2 text-sm">
            <span className="font-semibold text-ink">{r.name}</span>
            <span className="text-xs text-ink-muted">{r.origin} · {r.when}</span>
          </p>
          <Stars className="mt-1" />
          <p className="mt-2 text-[13px] leading-6 text-ink-soft">{r.text}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="card flex h-full flex-col p-5">
      <p className="flex items-center gap-2 text-sm font-medium text-ink">
        <SourceIcon className={r.source === "Google" ? "text-[#4285F4]" : "text-[#00AF87]"} />
        {r.source}
      </p>
      <Stars className="mt-2" />
      <p className="mt-3 flex-1 text-[13px] leading-6 text-ink-soft">{r.text}</p>
      <p className="mt-4 text-[13px] font-medium text-ink">
        – {r.name}, {r.origin}
      </p>
    </article>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 text-[#F5B301] ${className}`} role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} size={13} />
      ))}
    </span>
  );
}
