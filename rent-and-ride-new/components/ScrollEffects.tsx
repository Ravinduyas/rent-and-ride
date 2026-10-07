"use client";

import { useEffect } from "react";

/**
 * Site-wide scroll reveal and image fade-in.
 *
 * Mark elements in the markup instead of wrapping them in client components,
 * so pages stay server components:
 *   data-reveal              fade up as it scrolls into view
 *   data-reveal="left|right|zoom"   alternative entrance directions
 *   data-reveal-stagger      reveal each direct child in turn
 *
 * The hidden starting state only applies under html[data-js] (set by an
 * inline script in the layout), so the page still reads fine without JS.
 * A MutationObserver picks up content that appears later — new routes,
 * filtered vehicle lists, FAQ search results.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    const markLoaded = (img: HTMLImageElement) => img.classList.add("is-loaded");

    // What this run has already wired up. Kept per run rather than flagged on
    // the elements: React's dev Strict Mode runs this effect, tears it down
    // and runs it again, and flags left by the first run would make the
    // second skip everything — leaving the content invisible.
    const seen = new WeakSet<Element>();

    const watch = (el: HTMLElement) => {
      if (seen.has(el) || el.classList.contains("is-visible")) return;
      seen.add(el);
      if (reduce) el.classList.add("is-visible");
      else io.observe(el);
    };

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((parent) => {
        Array.from(parent.children).forEach((child, i) => {
          const el = child as HTMLElement;
          // Cap the delay so long lists don't keep the last items waiting.
          el.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 90}ms`);
          watch(el);
        });
      });

      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(watch);

      document.querySelectorAll<HTMLImageElement>("main img:not(.is-loaded)").forEach((img) => {
        if (seen.has(img)) return;
        seen.add(img);
        if (img.complete) markLoaded(img);
        else {
          img.addEventListener("load", () => markLoaded(img), { once: true });
          // A broken image should show its alt text, not stay invisible.
          img.addEventListener("error", () => markLoaded(img), { once: true });
        }
      });
    };

    scan();
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
