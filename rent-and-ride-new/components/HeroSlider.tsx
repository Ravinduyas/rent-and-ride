"use client";

import { useEffect, useRef, useState } from "react";
import { responsive, HERO_WIDTHS } from "@/lib/img";

type Slide = { src: string; alt: string; position: string };

/** How long each photo stays on screen, and how long the crossfade lasts. */
const HOLD_MS = 5500;

/**
 * The home hero photo: a few photos that fade into one another on their own,
 * each with a slow settle-in zoom (CSS, see .hero-slide in globals.css).
 *
 * The first photo is in the server-rendered page and shows immediately, so
 * the hero never waits on JavaScript. The other photos are only added to the
 * page once the page has finished loading, so they don't compete with the
 * first one for bandwidth, and the slideshow only moves on to a photo that
 * has actually arrived. It pauses while off screen or in a background tab,
 * and stays on the first photo for visitors who prefer reduced motion.
 */
export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [loadRest, setLoadRest] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Bring in the remaining photos after the page has loaded.
  useEffect(() => {
    if (document.readyState === "complete") {
      setLoadRest(true);
      return;
    }
    const go = () => setLoadRest(true);
    window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);

  useEffect(() => {
    if (!loadRest || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);

    const timer = window.setInterval(() => {
      if (!visible || document.hidden) return;
      setActive((cur) => {
        const next = (cur + 1) % slides.length;
        // Only advance to a photo that has finished loading.
        const img = el.querySelectorAll<HTMLImageElement>("img")[next];
        return img && img.complete && img.naturalWidth > 0 ? next : cur;
      });
    }, HOLD_MS);

    return () => {
      window.clearInterval(timer);
      io.disconnect();
    };
  }, [loadRest, slides.length]);

  return (
    <div ref={root} className="absolute inset-0">
      {slides.map((s, i) => {
        // Slide 0 is always rendered; the rest wait for the page to load.
        if (i > 0 && !loadRest) return null;
        const isActive = i === active;
        return (
          <div
            key={s.src}
            aria-hidden={!isActive || undefined}
            className={`hero-slide absolute inset-0 ${isActive ? "is-active" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...responsive(s.src, HERO_WIDTHS, "(min-width: 1024px) 62vw, 100vw")}
              alt={s.alt}
              // The first photo is the largest thing on screen: fetch it first.
              fetchPriority={i === 0 ? "high" : "auto"}
              loading="eager"
              decoding="async"
              className="hero-img h-full w-full object-cover"
              style={{ objectPosition: s.position }}
            />
          </div>
        );
      })}
    </div>
  );
}
