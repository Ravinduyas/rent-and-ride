"use client";

import { useEffect, useRef } from "react";
import { FaPlay, FaYoutube } from "react-icons/fa";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { type Short, shortThumbLocal, shortThumbRemote, shortUrl, YOUTUBE_SHORTS } from "@/data/shorts";
import { asset } from "@/lib/asset";

/** Auto-scroll speed, in CSS pixels per second. */
const SPEED = 32;
/** After a touch, swipe or arrow click, wait this long before drifting again. */
const RESUME_AFTER_MS = 3500;

/**
 * The channel's Shorts as a row of vertical thumbnails that drifts sideways
 * on its own and loops forever. Each card opens its Short on YouTube in a new
 * tab, so no YouTube player or tracking loads on the site.
 *
 * It's a real scrolling row (not a CSS animation), so people can still swipe
 * or scroll it by hand. The cards are rendered twice; when the first set has
 * scrolled fully out of view the position jumps back by one set's width,
 * which looks identical, so the loop is seamless. It keeps moving under the
 * mouse, pauses briefly after a touch, swipe or arrow click and while a card
 * has keyboard focus, stops while off screen or in a background tab, and
 * doesn't move at all for visitors who prefer reduced motion.
 */
export default function YouTubeShorts({ shorts }: { shorts: Short[] }) {
  const track = useRef<HTMLUListElement>(null);
  const holdRef = useRef<() => void>(() => {});

  // A thumbnail that failed before React attached onError (e.g. a new Short
  // with no local copy yet) gets the same fallback to YouTube's image.
  useEffect(() => {
    track.current?.querySelectorAll<HTMLImageElement>("img[data-short]").forEach((img) => {
      if (img.complete && img.naturalWidth === 0) swapToRemote(img);
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pos = el.scrollLeft; // fractional position; scrollLeft may round
    let last = 0;
    let frame = 0;
    let focused = false;
    let holdUntil = 0; // paused after touch/swipe until this time
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
        pos += SPEED * dt;
        if (w && pos >= w) pos -= w;
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

    // Someone scrolled it themselves (swipe, trackpad, arrows): follow them,
    // keep the loop seamless in both directions, and hold for a moment.
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

    // Pause for keyboard focus only. A tap also focuses the card it lands on,
    // and that focus lingers (e.g. after coming back from YouTube), which
    // would otherwise leave the row paused indefinitely on phones.
    const onFocusIn = (e: FocusEvent) => {
      focused = (e.target as Element).matches(":focus-visible");
    };
    const onFocusOut = () => {
      const active = document.activeElement;
      focused = !!active && el.contains(active) && active.matches(":focus-visible");
    };

    // Touch and pen presses hold the row; a mouse click on a card doesn't.
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
  // readers and the keyboard so nothing is announced or focused twice.
  const slides = [...shorts.map((s) => ({ s, clone: false })), ...shorts.map((s) => ({ s, clone: true }))];

  return (
    <div>
      <div className="relative">
        <ul
          ref={track}
          aria-label="Our YouTube Shorts"
          className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:gap-4 lg:mx-0 lg:px-0"
        >
          {slides.map(({ s, clone }, i) => (
            <li
              key={`${s.id}-${clone ? "b" : "a"}`}
              // Marks where the second copy begins, for the loop maths.
              data-clone={i === shorts.length ? "" : undefined}
              aria-hidden={clone || undefined}
              className="w-[44%] max-w-[220px] shrink-0 sm:w-[30%] lg:w-[calc((100%-5*1rem)/6)]"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-ink shadow-card">
                <a
                  href={shortUrl(s.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={clone ? -1 : undefined}
                  aria-label={`Watch on YouTube (opens in a new tab): ${s.title}`}
                  className="group absolute inset-0 block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(shortThumbLocal(s.id, 360))}
                    srcSet={`${asset(shortThumbLocal(s.id, 360))} 360w, ${asset(shortThumbLocal(s.id, 540))} 540w`}
                    sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 44vw"
                    // No local copy yet (a newly added Short): use YouTube's.
                    onError={(e) => swapToRemote(e.currentTarget)}
                    alt=""
                    data-short={s.id}
                    loading="lazy"
                    decoding="async"
                    width={360}
                    height={640}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/20" />
                  <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-white backdrop-blur">
                    <FaYoutube className="text-[#FF0000]" size={12} /> Shorts
                  </span>
                  <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-lift transition group-hover:scale-110">
                    <FaPlay className="ml-0.5" size={16} />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 line-clamp-3 p-3 text-[0.8125rem] font-medium leading-snug text-white">
                    {s.title}
                  </span>
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Desktop arrows over the row's edges. */}
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Scroll Shorts left"
          className="absolute -left-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lift transition hover:bg-gold-soft lg:flex"
        >
          <HiChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Scroll Shorts right"
          className="absolute -right-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lift transition hover:bg-gold-soft lg:flex"
        >
          <HiChevronRight size={22} />
        </button>
      </div>

      <div className="mt-5 flex justify-center">
        <a href={YOUTUBE_SHORTS} target="_blank" rel="noopener noreferrer" className="btn-outline">
          <FaYoutube className="text-[#FF0000]" size={18} /> More on our YouTube <HiArrowRight />
        </a>
      </div>
    </div>
  );
}

/** Swap a missing local thumbnail for YouTube's own, once. */
function swapToRemote(img: HTMLImageElement) {
  if (img.dataset.fallback || !img.dataset.short) return;
  img.dataset.fallback = "1";
  img.removeAttribute("srcset");
  img.src = shortThumbRemote(img.dataset.short);
}
