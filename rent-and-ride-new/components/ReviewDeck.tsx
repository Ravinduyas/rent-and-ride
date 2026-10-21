"use client";

import { useEffect, useRef, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { SiGoogle, SiTripadvisor } from "react-icons/si";
import type { Review } from "@/data/content";
import { Stars } from "./ReviewCard";

const AUTO_MS = 6500;
const SWIPE_PX = 70;

/**
 * Phone version of the home page reviews: a deck of cards. The top review is
 * in front with the next two peeking out behind it. Swipe it (or tap the
 * arrows or dots) and it drops to the back of the deck to reveal the next;
 * left alone it turns over by itself. All the cards share one grid cell, so
 * the deck is as tall as the longest review and nothing jumps.
 */
export default function ReviewDeck({ reviews }: { reviews: Review[] }) {
  const n = reviews.length;
  const [top, setTop] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ x: number; y: number; locked: boolean } | null>(null);
  const held = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const go = (to: number) => setTop(((to % n) + n) % n);

  // Turn over by itself while on screen, unless it's being touched.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (rootRef.current) io.observe(rootRef.current);
    const id = window.setInterval(() => {
      if (visible && !held.current && !document.hidden) setTop((t) => (t + 1) % n);
    }, AUTO_MS);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [n]);

  const onDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY, locked: false };
    held.current = true;
    setDragging(true);
  };
  const onMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s) return;
    const dx = e.clientX - s.x;
    // Follow the finger sideways only; a mostly vertical move is the page
    // scrolling (touch-action: pan-y lets the browser take it).
    if (!s.locked && Math.abs(dx) > 8) s.locked = true;
    if (s.locked) setDrag(dx);
  };
  const onUp = () => {
    const dx = drag;
    start.current = null;
    setDragging(false);
    setDrag(0);
    // Resume the auto-turn a little after the last touch.
    window.setTimeout(() => (held.current = false), 2500);
    if (dx <= -SWIPE_PX) go(top + 1);
    else if (dx >= SWIPE_PX) go(top - 1);
  };

  return (
    <div ref={rootRef} className="mt-6" role="region" aria-roledescription="carousel" aria-label="Guest reviews">
      <div
        className="relative mx-auto grid max-w-[19.5rem] touch-pan-y select-none pb-6 pt-1"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {reviews.map((r, i) => {
          const pos = (i - top + n) % n; // 0 = front
          const front = pos === 0;
          const behind = pos === 1 || pos === 2;
          const SourceIcon = r.source === "Google" ? SiGoogle : SiTripadvisor;
          const style: React.CSSProperties = front
            ? {
                transform: `translateX(${drag}px) rotate(${drag / 22}deg)`,
                transition: dragging ? "none" : "transform 0.45s cubic-bezier(0.2,0.7,0.2,1), opacity 0.45s",
                zIndex: 10,
              }
            : {
                transform: `translateY(${behind ? pos * 14 : 28}px) scale(${behind ? 1 - pos * 0.05 : 0.9})`,
                opacity: behind ? 1 - pos * 0.25 : 0,
                transition: "transform 0.45s cubic-bezier(0.2,0.7,0.2,1), opacity 0.45s",
                zIndex: 10 - pos,
              };
          return (
            <article
              key={r.name}
              aria-hidden={!front || undefined}
              style={{ ...style, gridArea: "1 / 1" }}
              className="flex flex-col rounded-2xl border border-line bg-white p-4 shadow-lift"
            >
              <FaQuoteLeft className="text-gold/40" size={20} aria-hidden />
              <p className="mt-2 flex-1 text-[0.8125rem] leading-6 text-ink-soft">{r.text}</p>
              <div className="mt-3 flex items-center gap-2.5 border-t border-line pt-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-soft text-sm font-semibold text-gold-deep">
                  {r.name[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{r.name}</p>
                  <Stars className="mt-0.5" />
                </div>
                <SourceIcon className={r.source === "Google" ? "text-[#4285F4]" : "text-[#00AF87]"} size={16} aria-label={r.source} />
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-1">
        {reviews.map((r, i) => (
          <button
            key={r.name}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show review ${i + 1} of ${n}`}
            aria-current={i === top ? "true" : undefined}
            className="flex h-11 items-center px-1.5"
          >
            <span className={`block h-2 rounded-full transition-all ${i === top ? "w-6 bg-gold" : "w-2 bg-line"}`} />
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-ink-muted">Swipe the card for the next review</p>
    </div>
  );
}
