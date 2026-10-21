"use client";

import { useEffect, useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { Review } from "@/data/content";
import ReviewCard from "./ReviewCard";

/** Drift speed, in CSS pixels per second. */
const SPEED = 36;
/** After a touch, swipe or arrow click, wait this long before drifting again. */
const RESUME_AFTER_MS = 3500;

/**
 * Home page reviews as a row that drifts to the right on its own and loops
 * forever, the same way as the YouTube Shorts row (components/YouTubeShorts):
 * a real scrolling row, so people can still swipe or scroll it by hand, with
 * the cards rendered twice. When the first set has scrolled out of view the
 * position jumps back by one set's width, which looks identical, so the loop
 * is seamless. It keeps moving under the mouse, pauses only while a card has
 * keyboard focus, holds briefly after a touch, swipe or arrow click, stops while off
 * screen or in a background tab, and doesn't move for visitors who prefer
 * reduced motion.
 */
export default function ReviewSlider({ reviews }: { reviews: Review[] }) {
  const track = useRef<HTMLUListElement>(null);
  const holdRef = useRef<() => void>(() => {});

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Drifts right (the cards travel left to right), so start at the second
    // copy and scroll back towards the first.
    el.scrollLeft = el.scrollLeft || (el.querySelector<HTMLElement>("li[data-clone]")?.offsetLeft ?? 0) - (el.firstElementChild as HTMLElement).offsetLeft;
    let pos = el.scrollLeft; // fractional position; scrollLeft may round
    let last = 0;
    let frame = 0;
    let focused = false;
    let holdUntil = 0;
    let expected = -1; // the scrollLeft we last set ourselves

    // Width of one full set of cards = where the second copy starts.
    const setWidth = () => {
      const firstClone = el.querySelector<HTMLElement>("li[data-clone]");
      const first = el.firstElementChild as HTMLElement | null;
      return firstClone && first ? firstClone.offsetLeft - first.offsetLeft : 0;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) / 1000 : 0;
      last = now;
      const paused = focused || now < holdUntil || document.hidden;
      if (!paused && dt) {
        const w = setWidth();
        pos -= SPEED * dt;
        if (w && pos <= 0) pos += w;
        el.scrollLeft = pos;
        expected = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame) return;
      last = 0;
      pos = el.scrollLeft;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const hold = () => {
      holdUntil = performance.now() + RESUME_AFTER_MS;
    };
    holdRef.current = hold;

    // Someone scrolled it themselves: follow them, keep the loop seamless in
    // both directions, and hold for a moment.
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - expected) < 1.5) return; // our own move
      const w = setWidth();
      if (w) {
        if (el.scrollLeft >= w) el.scrollLeft -= w;
        else if (el.scrollLeft <= 0) el.scrollLeft += w;
      }
      pos = el.scrollLeft;
      expected = pos;
      hold();
    };

    // Keyboard focus only: a tap also focuses, and that would linger.
    const onFocusIn = (e: FocusEvent) => {
      focused = (e.target as Element).matches(":focus-visible");
    };
    const onFocusOut = () => {
      const active = document.activeElement;
      focused = !!active && el.contains(active) && active.matches(":focus-visible");
    };
    // Touch and pen presses hold the row; a mouse never does.
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") hold();
    };

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(el);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      stop();
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // Arrow buttons: jump about one screen of cards; the row resumes after.
  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    holdRef.current();
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // Two copies for the seamless loop; the second is hidden from screen
  // readers so nothing is announced twice.
  const slides = [...reviews.map((r) => ({ r, clone: false })), ...reviews.map((r) => ({ r, clone: true }))];

  return (
    <div className="relative mt-6 sm:mt-8" role="region" aria-label="Guest reviews">
      <ul ref={track} className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 md:gap-5 lg:mx-0 lg:px-0">
        {slides.map(({ r, clone }, i) => (
          <li
            key={`${r.name}-${clone ? "b" : "a"}`}
            // Marks where the second copy begins, for the loop maths.
            data-clone={i === reviews.length ? "" : undefined}
            aria-hidden={clone || undefined}
            className="flex w-[82%] shrink-0 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label="Scroll reviews left"
        className="absolute -left-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lift transition hover:bg-gold-soft lg:flex"
      >
        <HiChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label="Scroll reviews right"
        className="absolute -right-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lift transition hover:bg-gold-soft lg:flex"
      >
        <HiChevronRight size={22} />
      </button>
    </div>
  );
}
