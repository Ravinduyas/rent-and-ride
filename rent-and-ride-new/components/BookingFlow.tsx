"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { HiCheck, HiArrowLeft, HiArrowRight, HiOutlineLocationMarker } from "react-icons/hi";
import { SCOOTERS, BIKES, TUKTUKS, type Vehicle } from "@/data/vehicles";
import { SITE, whatsappLink } from "@/lib/site";
import { responsive } from "@/lib/img";
import RangeCalendar from "./RangeCalendar";
import {
  type Booking,
  EMPTY_BOOKING,
  PICKUP_TEXT,
  PICKUP_TIMES,
  todayISO,
  rentalDays,
  estimate,
  formatDate,
  permitText,
  bookingMessage,
  specs,
  needsHelmets,
} from "@/lib/booking";

const GROUPS = [
  { id: "scooter", label: "Scooters", list: SCOOTERS },
  { id: "bike", label: "Bikes", list: BIKES },
  { id: "tuktuk", label: "Tuk-Tuks", list: TUKTUKS },
] as const;
const ALL: Vehicle[] = [...SCOOTERS, ...BIKES, ...TUKTUKS];
const STEPS = ["Vehicle", "Dates", "Details", "Review"] as const;
// sessionStorage, so a refresh mid-booking doesn't lose what was entered.
const DRAFT_KEY = "rr-booking-draft";

const PILL =
  "flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold";
const pillState = (on: boolean) =>
  on ? "border-gold bg-gold-soft text-gold-deep" : "border-line bg-white text-ink-soft hover:border-gold/60";

const shortDate = (v: string) =>
  v ? new Date(`${v}T00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "";

/**
 * Four clean screens — vehicle, dates, details, review — with a slim
 * progress row at the top and the next action pinned to the bottom of the
 * screen. The last step hands the booking to WhatsApp.
 */
export default function BookingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [b, setB] = useState<Booking>(EMPTY_BOOKING);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [group, setGroup] = useState<(typeof GROUPS)[number]["id"]>("scooter");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const today = todayISO();

  const set = <K extends keyof Booking>(key: K, value: Booking[K]) => {
    setB((prev) => ({ ...prev, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  // Restore a draft, then apply ?vehicle= from a "Book Now" button. Read
  // from window.location rather than useSearchParams, which would need a
  // Suspense boundary under the static export.
  useEffect(() => {
    let draft: Booking = EMPTY_BOOKING;
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (saved) draft = { ...EMPTY_BOOKING, ...JSON.parse(saved) };
    } catch {}
    const slug = new URLSearchParams(window.location.search).get("vehicle");
    const picked = slug && ALL.some((v) => v.slug === slug) ? slug : null;
    if (picked) draft = { ...draft, vehicle: picked };
    // Dates left over from an old visit may now be in the past.
    if (draft.pickupDate && draft.pickupDate < todayISO()) draft = { ...draft, pickupDate: "", returnDate: "" };
    setB(draft);
    const chosen = ALL.find((v) => v.slug === draft.vehicle);
    if (chosen) setGroup(chosen.kind);
    if (picked) setStep(1);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(b));
    } catch {}
  }, [b, ready]);

  const vehicle = ALL.find((v) => v.slug === b.vehicle);
  const days = rentalDays(b.pickupDate, b.returnDate);
  const total = vehicle && days ? estimate(vehicle, days) : 0;

  function validate(s: number): Record<string, string> {
    const e: Record<string, string> = {};
    if (s === 0 && !vehicle) e.vehicle = "Choose a scooter, bike or tuk-tuk.";
    if (s === 1) {
      if (!b.pickupDate) e.dates = "Tap your pickup day on the calendar.";
      else if (!b.returnDate) e.dates = "Now tap your return day.";
    }
    if (s === 2) {
      if (!b.name.trim()) e.name = "Please add your name.";
      if (!b.permit) e.permit = "Let us know about your driving permit.";
    }
    return e;
  }

  function go(to: number) {
    // Moving forward checks each step on the way; moving back never blocks.
    if (to > step) {
      for (let s = step; s < to; s++) {
        const e = validate(s);
        if (Object.keys(e).length) {
          setErrors(e);
          setStep(s);
          return;
        }
      }
    }
    setErrors({});
    setStep(to);
  }

  // Each step starts at the top of the screen, with focus on its heading for
  // keyboard and screen-reader users.
  useEffect(() => {
    if (!ready) return;
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function send() {
    if (!vehicle) return;
    for (let s = 0; s < 3; s++) {
      const e = validate(s);
      if (Object.keys(e).length) {
        setErrors(e);
        setStep(s);
        return;
      }
    }
    window.open(whatsappLink(bookingMessage(b, vehicle)), "_blank", "noopener,noreferrer");
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {}
    router.push("/thank-you");
  }

  // What the bottom bar shows next to its button.
  const summary =
    step === 0
      ? vehicle
        ? { main: vehicle.name, sub: `$${vehicle.perDay}/day` }
        : { main: "Choose a vehicle", sub: "" }
      : days && vehicle
        ? {
            main: `$${total}`,
            sub: `${shortDate(b.pickupDate)} → ${shortDate(b.returnDate)} · ${days} ${days === 1 ? "day" : "days"}`,
          }
        : b.pickupDate
          ? { main: `Pickup ${shortDate(b.pickupDate)}`, sub: "Now tap your return day" }
          : { main: vehicle?.name ?? "", sub: "Tap your pickup day" };

  return (
    <div data-flow className="mx-auto max-w-2xl pb-28">
      {/* Top row: back, step count, progress */}
      <div className="flex min-h-11 items-center justify-between">
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className="-ml-2 flex min-h-11 items-center gap-1 px-2 text-sm font-medium text-ink-soft hover:text-ink">
            <HiArrowLeft /> Back
          </button>
        ) : (
          <span className="text-sm font-medium text-ink-soft">Book your ride</span>
        )}
        <span className="text-xs font-medium text-ink-muted">
          Step {step + 1} of {STEPS.length} · {STEPS[step]}
        </span>
      </div>
      <div className="mt-1 grid grid-cols-4 gap-1.5" aria-hidden>
        {STEPS.map((s, i) => (
          <span key={s} className={`h-1 rounded-full transition-colors ${i <= step ? "bg-gold" : "bg-line"}`} />
        ))}
      </div>

      <div className="mt-5 [@media(max-height:700px)]:mt-3">
        {/* 1. Vehicle */}
        {step === 0 && (
          <section>
            <StepHeading ref={headingRef} title="Choose your ride" />
            <div role="tablist" aria-label="Vehicle type" className="mt-4 grid grid-cols-3 gap-1 rounded-xl bg-line/60 p-1">
              {GROUPS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  aria-selected={group === g.id}
                  onClick={() => setGroup(g.id)}
                  className={`min-h-10 rounded-lg text-sm font-medium transition ${group === g.id ? "bg-white text-ink shadow-card" : "text-ink-muted hover:text-ink"}`}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <ErrorText msg={errors.vehicle} />
            <div className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-2.5">
              {GROUPS.find((g) => g.id === group)!.list.map((v) => (
                <VehicleOption key={v.slug} v={v} checked={b.vehicle === v.slug} onChange={() => set("vehicle", v.slug)} />
              ))}
            </div>
          </section>
        )}

        {/* 2. Dates — everything on one screen */}
        {step === 1 && vehicle && (
          <section>
            <StepHeading ref={headingRef} title="When do you need it?" />
            <div className="mt-4 rounded-2xl border border-line bg-white p-3 sm:p-4 [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:p-2">
              <RangeCalendar
                start={b.pickupDate}
                end={b.returnDate}
                min={today}
                onChange={(s, e) => {
                  setB((prev) => ({ ...prev, pickupDate: s, returnDate: e }));
                  setErrors({});
                }}
              />
            </div>

            <ErrorText msg={errors.dates} />

            {/* Time and the (only) pickup place share one row; the chosen
                dates and day count show in the bottom bar. */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-ink">
                Pickup at
                <select
                  value={b.pickupTime}
                  onChange={(e) => set("pickupTime", e.target.value)}
                  className="field w-auto py-1.5"
                >
                  {PICKUP_TIMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-1.5 text-xs text-ink-muted hover:text-gold-deep"
              >
                <HiOutlineLocationMarker className="shrink-0 text-gold" size={16} />
                Our shop, Weligama · <span className="font-semibold text-gold-deep underline">Map</span>
              </a>
            </div>
          </section>
        )}

        {/* 3. Details */}
        {step === 2 && vehicle && (
          <section>
            <StepHeading ref={headingRef} title="A few details" />
            <div className="mt-4 grid gap-5">
              <Field label="Your name" error={errors.name}>
                <input value={b.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className="field" />
              </Field>

              <fieldset>
                <legend className="label">Sri Lankan driving permit</legend>
                <div className="mt-1 grid grid-cols-3 gap-2">
                  {[
                    { v: "yes", l: "Need help" },
                    { v: "have", l: "Have one" },
                    { v: "no", l: "Not needed" },
                  ].map(({ v, l }) => (
                    <label key={v} className={`${PILL} text-center ${pillState(b.permit === v)}`}>
                      <input type="radio" name="permit" checked={b.permit === v} onChange={() => set("permit", v as Booking["permit"])} className="sr-only" />
                      {l}
                    </label>
                  ))}
                </div>
                <ErrorText msg={errors.permit} />
              </fieldset>

              {b.permit === "yes" && (
                <Field label="Licence country (optional)">
                  <input value={b.licenceCountry} onChange={(e) => set("licenceCountry", e.target.value)} autoComplete="country-name" className="field" />
                </Field>
              )}

              {needsHelmets(vehicle) && (
                <fieldset>
                  <legend className="label">Helmets (free)</legend>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {(["1", "2"] as const).map((n) => (
                      <label key={n} className={`${PILL} ${pillState(b.helmets === n)}`}>
                        <input type="radio" name="helmets" checked={b.helmets === n} onChange={() => set("helmets", n)} className="sr-only" />
                        {n === "1" ? "1 · just me" : "2 · with passenger"}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <Field label="Notes (optional)">
                <textarea
                  rows={2}
                  value={b.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Flight time, questions…"
                  className="field"
                />
              </Field>
            </div>
          </section>
        )}

        {/* 4. Review */}
        {step === 3 && vehicle && (
          <section>
            <StepHeading ref={headingRef} title="Check your booking" />
            <div className="mt-4 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img {...responsive(vehicle.image, [160, 320], "72px")} alt="" className="h-14 w-[72px] shrink-0 rounded-lg object-cover" style={vehicle.imagePosition ? { objectPosition: vehicle.imagePosition } : undefined} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">{vehicle.name}</p>
                <p className="text-xs text-ink-muted">{specs(vehicle)}</p>
              </div>
              <button type="button" onClick={() => go(0)} className="min-h-11 px-1 text-xs font-semibold text-gold-deep hover:underline">
                Change
              </button>
            </div>
            <dl className="mt-4 divide-y divide-line rounded-xl border border-line bg-white">
              <Row label="Dates" onEdit={() => go(1)}>
                {formatDate(b.pickupDate)}, {b.pickupTime}
                <br />→ {formatDate(b.returnDate)}
                <span className="block text-ink-muted">{days} {days === 1 ? "day" : "days"}</span>
              </Row>
              <Row label="Pickup">{PICKUP_TEXT}</Row>
              <Row label="Name" onEdit={() => go(2)}>{b.name}</Row>
              <Row label="Permit" onEdit={() => go(2)}>{permitText(b)}</Row>
              {needsHelmets(vehicle) && <Row label="Helmets" onEdit={() => go(2)}>{b.helmets}</Row>}
              {b.notes.trim() && <Row label="Notes" onEdit={() => go(2)}>{b.notes}</Row>}
            </dl>
            <p className="mt-3 text-xs text-ink-muted">
              Nothing is charged now. We&apos;ll confirm availability and the final price on WhatsApp.
            </p>
          </section>
        )}
      </div>

      {/* Bottom action bar, pinned to the screen. Portalled to <body>: the
          page-enter wrapper animates transform, and a transformed ancestor
          would turn "fixed" into "scroll with the page". */}
      {ready && createPortal(
      <div data-booking-bar className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0" aria-live="polite">
            <p className="truncate font-semibold text-ink">{summary.main}</p>
            {summary.sub && <p className="truncate text-xs text-ink-muted">{summary.sub}</p>}
          </div>
          {step < 3 ? (
            <button type="button" onClick={() => go(step + 1)} className="btn-gold min-h-12 shrink-0 px-6">
              Continue <HiArrowRight />
            </button>
          ) : (
            <button type="button" onClick={send} className="btn-whatsapp min-h-12 shrink-0 px-5">
              <FaWhatsapp size={20} /> Send on WhatsApp
            </button>
          )}
        </div>
      </div>,
      document.body
      )}
    </div>
  );
}

// forwardRef: in React 18 a plain function component doesn't receive `ref`.
const StepHeading = forwardRef<HTMLHeadingElement, { title: string }>(function StepHeading({ title }, ref) {
  return (
    // Focus is moved here on each step for screen readers; no visible ring,
    // since the user didn't tab to it.
    <h1 ref={ref} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-ink outline-none [@media(max-height:700px)]:text-xl focus-visible:ring-0 focus-visible:ring-offset-0">
      {title}
    </h1>
  );
});

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-2 text-sm font-medium text-red-700">
      {msg}
    </p>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      <ErrorText msg={error} />
    </label>
  );
}

function VehicleOption({ v, checked, onChange }: { v: Vehicle; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-2 pr-3 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold ${
        checked ? "border-gold bg-gold-soft" : "border-line bg-white hover:border-gold/60"
      }`}
    >
      <input type="radio" name="vehicle" checked={checked} onChange={onChange} className="sr-only" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...responsive(v.image, [160, 320], "72px")} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" style={v.imagePosition ? { objectPosition: v.imagePosition } : undefined} />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{v.name}</span>
        <span className="block text-xs text-ink-muted">{specs(v, " · ")}</span>
      </span>
      <span className="shrink-0 text-right text-sm">
        <span className="font-semibold text-gold-deep">${v.perDay}</span>
        <span className="text-ink-muted">/day</span>
      </span>
      <span
        aria-hidden
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${checked ? "border-gold bg-gold text-white" : "border-line"}`}
      >
        {checked && <HiCheck size={14} />}
      </span>
    </label>
  );
}

function Row({ label, onEdit, children }: { label: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <dt className="w-16 shrink-0 pt-0.5 text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</dt>
      <dd className="min-w-0 flex-1 text-sm text-ink">{children}</dd>
      {onEdit ? (
        <button type="button" onClick={onEdit} className="-my-2 min-h-11 shrink-0 px-1 text-xs font-semibold text-gold-deep hover:underline">
          Edit
        </button>
      ) : (
        // Keeps the column aligned with rows that have an Edit button.
        <span aria-hidden className="w-[29px] shrink-0" />
      )}
    </div>
  );
}
