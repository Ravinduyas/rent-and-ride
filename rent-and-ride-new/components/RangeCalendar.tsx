"use client";

import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { parseDate } from "@/lib/booking";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

/**
 * One-month calendar for picking a date range: the first tap sets pickup,
 * the second sets return (the same day twice is a one-day rental). Tapping
 * again after both are set starts a new range. Weeks start on Monday and
 * the grid is always six rows, so the height never jumps between months.
 */
export default function RangeCalendar({
  start,
  end,
  min,
  onChange,
}: {
  start: string;
  end: string;
  /** Earliest selectable day, YYYY-MM-DD. */
  min: string;
  onChange: (start: string, end: string) => void;
}) {
  const first = parseDate(start || min) ?? new Date();
  const [view, setView] = useState({ y: first.getFullYear(), m: first.getMonth() });
  const minDate = parseDate(min)!;
  const atMinMonth = view.y === minDate.getFullYear() && view.m === minDate.getMonth();

  const lead = (new Date(view.y, view.m, 1).getDay() + 6) % 7; // Monday-first offset
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (string | null)[] = Array.from({ length: 42 }, (_, i) => {
    const d = i - lead + 1;
    return d >= 1 && d <= daysInMonth ? iso(view.y, view.m, d) : null;
  });

  const step = (delta: number) =>
    setView(({ y, m }) => {
      const d = new Date(y, m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  function pick(day: string) {
    if (!start || end || day < start) onChange(day, "");
    else onChange(start, day);
  }

  const monthLabel = new Date(view.y, view.m, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <div className="select-none">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atMinMonth}
          aria-label="Previous month"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-paper disabled:opacity-25 [@media(max-height:700px)]:h-9"
        >
          <HiChevronLeft size={20} />
        </button>
        <p className="font-semibold text-ink" aria-live="polite">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next month"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-paper [@media(max-height:700px)]:h-9"
        >
          <HiChevronRight size={20} />
        </button>
      </div>

      <div className="mt-1 grid grid-cols-7 text-center text-[0.6875rem] font-medium uppercase tracking-wide text-ink-muted">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1.5">
            {w}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <span key={i} className="h-10 sm:h-11 [@media(max-height:700px)]:h-8" />;
          const past = day < min;
          const isStart = day === start;
          const isEnd = day === end;
          const inRange = !!start && !!end && day > start && day < end;
          // The band behind the dates runs from pickup to return.
          const band =
            start && end && start !== end && (isStart || isEnd || inRange)
              ? `bg-gold-soft ${isStart ? "rounded-l-full" : ""} ${isEnd ? "rounded-r-full" : ""}`
              : "";
          const label = parseDate(day)!.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
          return (
            <div key={day} className={`flex h-10 items-center justify-center sm:h-11 [@media(max-height:700px)]:h-8 ${band}`}>
              <button
                type="button"
                disabled={past}
                onClick={() => pick(day)}
                aria-label={`${label}${isStart ? ", pickup" : ""}${isEnd ? ", return" : ""}`}
                aria-pressed={isStart || isEnd}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm transition sm:h-11 sm:w-11 [@media(max-height:700px)]:h-8 [@media(max-height:700px)]:w-8 ${
                  isStart || isEnd
                    ? "bg-gold font-semibold text-white"
                    : past
                      ? "text-ink-muted/40"
                      : day === min
                        ? "font-semibold text-gold-deep ring-1 ring-inset ring-gold/50 hover:bg-gold-soft"
                        : "text-ink hover:bg-gold-soft"
                }`}
              >
                {Number(day.slice(8))}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
