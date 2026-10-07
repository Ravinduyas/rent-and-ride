"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Thin gold bar across the top while the next page loads. */
export default function RouteProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Start on clicks that will trigger a client-side navigation. Listens in
  // the capture phase and ignores defaultPrevented, because next/link calls
  // preventDefault() itself before the event would bubble up to us.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      clearTimeout(timer.current);
      setState("loading");
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Finish when the new route has rendered.
  useEffect(() => {
    setState((s) => (s === "loading" ? "done" : s));
    timer.current = setTimeout(() => setState("idle"), 450);
    return () => clearTimeout(timer.current);
  }, [pathname]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        className={`h-full origin-left bg-gradient-to-r from-gold to-[#D9B95C] shadow-[0_0_10px_rgba(166,133,46,0.7)] ${
          state === "loading"
            ? "route-bar-loading"
            : state === "done"
              ? "route-bar-done"
              : "opacity-0"
        }`}
      />
    </div>
  );
}
