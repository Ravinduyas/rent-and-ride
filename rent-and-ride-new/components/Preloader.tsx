"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

/**
 * Logo splash on the first full page load only — client-side navigation
 * never remounts the layout, so it doesn't show again.
 *
 * It's server-rendered so it covers the very first paint, and it fades out
 * on a fixed CSS timer (~0.8s, see `.preloader` in globals.css) rather than
 * waiting for the page to finish loading: on a slow phone connection that
 * wait used to hide the hero for several seconds. This component only
 * removes the faded overlay from the DOM afterwards.
 */
export default function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      // Lets the scroll reveals start (see globals.css).
      document.documentElement.dataset.ready = "";
      setGone(true);
    }, 850);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="preloader pointer-events-none fixed inset-0 z-[70] flex flex-col items-center justify-center bg-white"
    >
      {/* Big enough here for the roundel's own lettering to be read. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/logo.svg")}
        alt=""
        width={112}
        height={112}
        className="preloader-logo h-28 w-28 rounded-full shadow-[0_10px_30px_-10px_rgba(11,38,26,0.55)]"
      />
      <span className="mt-6 h-[3px] w-28 overflow-hidden rounded-full bg-gold-soft">
        <span className="preloader-bar block h-full w-1/2 rounded-full bg-gold" />
      </span>
    </div>
  );
}
