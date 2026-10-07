"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { HiCheck, HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { SCOOTERS, BIKES, type Vehicle } from "@/data/vehicles";
import { whatsappLink } from "@/lib/site";
import { responsive } from "@/lib/img";
import {
  type Booking,
  EMPTY_BOOKING,
  DELIVERY_OPTIONS,
  PICKUP_TIMES,
  todayISO,
  addDaysISO,
  rentalDays,
  estimate,
  formatDate,
  deliveryText,
  permitText,
  bookingMessage,
} from "@/lib/booking";

const ALL: Vehicle[] = [...SCOOTERS, ...BIKES];
const STEPS = ["Vehicle", "Dates", "Details", "Review"] as const;
// sessionStorage, so a refresh mid-booking doesn't lose what was entered.
const DRAFT_KEY = "rr-booking-draft";

const PILL =
  "flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold";
const pillState = (on: boolean) =>
  on ? "border-gold bg-gold-soft text-gold-deep" : "border-line bg-white text-ink-soft hover:border-gold/60";

export default function BookingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [b, setB] = useState<Booking>(EMPTY_BOOKING);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
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
    setB(draft);
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

  function validate(s: number): Record<string, string> {
    const e: Record<string, string> = {};
    if (s === 0 && !vehicle) e.vehicle = "Choose a scooter or bike.";
    if (s === 1) {
      if (!b.pickupDate) e.pickupDate = "Choose a pickup date.";
      else if (b.pickupDate < today) e.pickupDate = "Pickup can't be in the past.";
      if (!b.returnDate) e.returnDate = "Choose a return date.";
      else if (b.pickupDate && b.returnDate < b.pickupDate) e.returnDate = "Return must be on or after pickup.";
      if (!b.delivery) e.delivery = "Choose pickup or delivery.";
      if (b.delivery === "other" && !b.place.trim()) e.place = "Tell us where to deliver.";
    }
    if (s === 2) {
      if (!b.name.trim()) e.name = "Please add your name.";
      if (!b.permit) e.permit = "Let us know about your driving permit.";
    }
    return e;
  }

  function go(to: number) {
    // Moving forward checks the current step; moving back never blocks.
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

  // Bring the new step into view and move focus to its heading for
  // keyboard and screen-reader users.
  useEffect(() => {
    if (!ready) return;
    headingRef.current?.focus({ preventScroll: true });
    const top = (headingRef.current?.closest("[data-flow]") as HTMLElement | null)?.getBoundingClientRect().top;
    if (top !== undefined && top < 80) window.scrollBy({ top: top - 96, behavior: "smooth" });
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

  return (
    <div data-flow className="mx-auto max-w-3xl">
      {/* Progress */}
      <ol className="grid grid-cols-4 gap-2" aria-label="Booking steps">
        {STEPS.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => i < step && go(i)}
                disabled={i > step}
                aria-current={current ? "step" : undefined}
                className="group flex w-full flex-col items-start gap-1.5 text-left disabled:cursor-default"
              >
                <span className={`h-1.5 w-full rounded-full transition-colors ${done || current ? "bg-gold" : "bg-line"}`} />
                <span className={`flex items-center gap-1 text-xs font-medium sm:text-sm ${current ? "text-ink" : done ? "text-gold-deep group-hover:underline" : "text-ink-muted"}`}>
                  {done && <HiCheck className="shrink-0" />}
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="card mt-6 p-5 sm:p-8">
        {/* Step 1: vehicle */}
        {step === 0 && (
          <section>
            <StepHeading ref={headingRef} n={1} title="Choose your ride" />
            <ErrorText msg={errors.vehicle} />
            {[
              { title: "Scooters", list: SCOOTERS },
              { title: "Bikes", list: BIKES },
            ].map(({ title, list }) => (
              <fieldset key={title} className="mt-6 first-of-type:mt-5">
                <legend className="text-sm font-semibold text-ink">{title}</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {list.map((v) => (
                    <VehicleOption key={v.slug} v={v} checked={b.vehicle === v.slug} onChange={() => set("vehicle", v.slug)} />
                  ))}
                </div>
              </fieldset>
            ))}
          </section>
        )}

        {/* Step 2: dates & delivery */}
        {step === 1 && vehicle && (
          <section>
            <StepHeading ref={headingRef} n={2} title="When and where" />
            <ChosenVehicle v={vehicle} onChange={() => go(0)} />

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Field label="Pickup date" error={errors.pickupDate}>
                <input
                  type="date"
                  min={today}
                  value={b.pickupDate}
                  onChange={(e) => {
                    const v = e.target.value;
                    set("pickupDate", v);
                    // Suggest a 3-day rental if no return date yet, or keep
                    // the return date from falling before the new pickup.
                    if (v && (!b.returnDate || b.returnDate < v)) set("returnDate", addDaysISO(v, 3));
                  }}
                  className="field"
                />
              </Field>
              <Field label="Pickup time">
                <select value={b.pickupTime} onChange={(e) => set("pickupTime", e.target.value)} className="field">
                  {PICKUP_TIMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Return date" error={errors.returnDate}>
                <input
                  type="date"
                  min={b.pickupDate || today}
                  value={b.returnDate}
                  onChange={(e) => set("returnDate", e.target.value)}
                  className="field"
                />
              </Field>
            </div>

            {days > 0 && (
              <p className="mt-3 rounded-lg bg-gold-soft px-4 py-3 text-sm text-ink" aria-live="polite">
                <strong>{days} {days === 1 ? "day" : "days"}</strong> · estimated{" "}
                <strong className="text-gold-deep">${estimate(vehicle, days)}</strong>
                <span className="text-ink-muted"> (${vehicle.perDay}/day, ${vehicle.perWeek}/week)</span>
              </p>
            )}

            <fieldset className="mt-6">
              <legend className="label">Pickup or delivery</legend>
              <ErrorText msg={errors.delivery} />
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {DELIVERY_OPTIONS.map((o) => (
                  <label key={o.value} className={`${PILL} justify-between gap-3 ${pillState(b.delivery === o.value)}`}>
                    <input
                      type="radio"
                      name="delivery"
                      value={o.value}
                      checked={b.delivery === o.value}
                      onChange={() => set("delivery", o.value)}
                      className="sr-only"
                    />
                    <span>{o.label}</span>
                    <span className="text-xs font-normal text-ink-muted">{o.note}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {b.delivery && b.delivery !== "shop" && (
              <div className="mt-4">
                <Field
                  label={b.delivery === "other" ? "Delivery address" : "Hotel or guesthouse (optional)"}
                  error={errors.place}
                >
                  <input
                    value={b.place}
                    onChange={(e) => set("place", e.target.value)}
                    placeholder={b.delivery === "other" ? "Address or Google Maps link" : "e.g. Sunset Villa"}
                    className="field"
                  />
                </Field>
              </div>
            )}

            <fieldset className="mt-6">
              <legend className="label">Helmets (free)</legend>
              <div className="mt-2 grid max-w-xs grid-cols-2 gap-2">
                {(["1", "2"] as const).map((n) => (
                  <label key={n} className={`${PILL} ${pillState(b.helmets === n)}`}>
                    <input type="radio" name="helmets" checked={b.helmets === n} onChange={() => set("helmets", n)} className="sr-only" />
                    {n === "1" ? "1 — just me" : "2 — with a passenger"}
                  </label>
                ))}
              </div>
            </fieldset>
          </section>
        )}

        {/* Step 3: details */}
        {step === 2 && (
          <section>
            <StepHeading ref={headingRef} n={3} title="About you" />
            <div className="mt-5 grid gap-4">
              <Field label="Your name" error={errors.name}>
                <input value={b.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className="field" />
              </Field>

              <fieldset>
                <legend className="label">Do you need help with a Sri Lankan driving permit?</legend>
                <ErrorText msg={errors.permit} />
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {[
                    { v: "yes", l: "Yes, please" },
                    { v: "have", l: "I already have one" },
                    { v: "no", l: "No" },
                  ].map(({ v, l }) => (
                    <label key={v} className={`${PILL} ${pillState(b.permit === v)}`}>
                      <input type="radio" name="permit" checked={b.permit === v} onChange={() => set("permit", v as Booking["permit"])} className="sr-only" />
                      {l}
                    </label>
                  ))}
                </div>
              </fieldset>

              {b.permit === "yes" && (
                <Field label="Which country is your licence from? (optional)">
                  <input value={b.licenceCountry} onChange={(e) => set("licenceCountry", e.target.value)} autoComplete="country-name" className="field" />
                </Field>
              )}

              <Field label="Anything else? (optional)">
                <textarea
                  rows={3}
                  value={b.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Flight time, a second rider, questions…"
                  className="field"
                />
              </Field>
            </div>
          </section>
        )}

        {/* Step 4: review */}
        {step === 3 && vehicle && (
          <section>
            <StepHeading ref={headingRef} n={4} title="Check your booking" />
            <dl className="mt-5 divide-y divide-line rounded-xl border border-line">
              <Row label="Vehicle" onEdit={() => go(0)}>
                {vehicle.name} <span className="text-ink-muted">· {vehicle.transmission}, {vehicle.engine}</span>
              </Row>
              <Row label="Dates" onEdit={() => go(1)}>
                {formatDate(b.pickupDate)}, {b.pickupTime} → {formatDate(b.returnDate)}
                <span className="block text-ink-muted">{days} {days === 1 ? "day" : "days"}</span>
              </Row>
              <Row label="Pickup / delivery" onEdit={() => go(1)}>{deliveryText(b)}</Row>
              <Row label="Helmets" onEdit={() => go(1)}>{b.helmets}</Row>
              <Row label="Name" onEdit={() => go(2)}>{b.name}</Row>
              <Row label="Driving permit" onEdit={() => go(2)}>{permitText(b)}</Row>
              {b.notes.trim() && <Row label="Notes" onEdit={() => go(2)}>{b.notes}</Row>}
            </dl>

            <div className="mt-5 flex items-baseline justify-between rounded-xl bg-gold-soft px-5 py-4">
              <span className="text-sm font-medium text-ink">Estimated total</span>
              <span className="text-2xl font-semibold text-gold-deep">${estimate(vehicle, days)}</span>
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              Nothing is charged now. We&apos;ll confirm availability and the final price on WhatsApp.
            </p>
          </section>
        )}

        {/* Navigation */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => go(step - 1)} className="btn-outline">
              <HiArrowLeft /> Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}
          {step < 3 ? (
            <button type="button" onClick={() => go(step + 1)} className="btn-gold min-h-12 px-8">
              Continue <HiArrowRight />
            </button>
          ) : (
            <button type="button" onClick={send} className="btn-whatsapp min-h-12 px-8">
              <FaWhatsapp size={20} /> Send booking on WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// forwardRef: in React 18 a plain function component doesn't receive `ref`.
const StepHeading = forwardRef<HTMLHeadingElement, { n: number; title: string }>(function StepHeading({ n, title }, ref) {
  return (
    // Focus is moved here on each step for screen readers; no visible ring,
    // since the user didn't tab to it.
    <h2 ref={ref} tabIndex={-1} className="text-xl font-semibold text-ink outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-2xl">
      <span className="mr-2 text-gold">{n}.</span>
      {title}
    </h2>
  );
});

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1.5 text-sm font-medium text-red-700">
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
      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-2.5 pr-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold ${
        checked ? "border-gold bg-gold-soft" : "border-line bg-white hover:border-gold/60"
      }`}
    >
      <input type="radio" name="vehicle" checked={checked} onChange={onChange} className="sr-only" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...responsive(v.image, [160, 320], "80px")} alt="" className="h-16 w-20 shrink-0 rounded-lg object-cover" />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{v.name}</span>
        <span className="block text-xs text-ink-muted">
          {v.transmission} · {v.engine}
        </span>
        <span className="mt-0.5 block text-sm">
          <span className="font-semibold text-gold-deep">${v.perDay}</span>
          <span className="text-ink-muted">/day</span>
        </span>
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

function ChosenVehicle({ v, onChange }: { v: Vehicle; onChange: () => void }) {
  return (
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-paper p-2.5 pr-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...responsive(v.image, [160, 320], "80px")} alt="" className="h-14 w-16 shrink-0 rounded-lg object-cover" />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{v.name}</span>
        <span className="block text-xs text-ink-muted">
          ${v.perDay}/day · ${v.perWeek}/week
        </span>
      </span>
      <button type="button" onClick={onChange} className="min-h-11 px-2 text-sm font-semibold text-gold-deep hover:underline">
        Change
      </button>
    </div>
  );
}

function Row({ label, onEdit, children }: { label: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <dt className="w-28 shrink-0 pt-0.5 text-xs font-medium uppercase tracking-wide text-ink-muted sm:w-36">{label}</dt>
      <dd className="min-w-0 flex-1 text-sm text-ink">{children}</dd>
      <button type="button" onClick={onEdit} className="-my-2 min-h-11 shrink-0 px-1 text-xs font-semibold text-gold-deep hover:underline">
        Edit
      </button>
    </div>
  );
}
