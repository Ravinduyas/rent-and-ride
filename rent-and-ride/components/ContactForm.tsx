"use client";

import { FormEvent, useEffect, useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";
import AnimateIn from "./AnimateIn";

const VEHICLE_OPTIONS = [
  "Motorbike",
  "Scooter",
  "Three Wheeler",
  "Push Bike",
  "Not sure yet",
];

/* Listing types are finer grained than the dropdown, so fold the extra ones
   onto the option they belong to. */
const TYPE_ALIASES: Record<string, string> = {
  Cruiser: "Motorbike",
  "Cargo Tuktuk": "Three Wheeler",
  "Push Bike": "Push Bike",
};

const FIELD =
  "w-full rounded-xl border border-brand-line bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:border-brand-orange focus:outline-none";

const LABEL = "mb-2 block text-[13px] font-medium text-brand-dark";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [vehicleType, setVehicleType] = useState("");
  const [message, setMessage] = useState("");
  const [pickedVehicle, setPickedVehicle] = useState<string | null>(null);

  /* Arriving from a Book button on a listing. Read the query directly rather
     than via useSearchParams, which would force this whole page into a
     Suspense boundary under `output: export`. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("vehicle");
    const type = params.get("type");
    if (!name) return;

    setPickedVehicle(name);
    const option = type ? TYPE_ALIASES[type] ?? type : "";
    if (VEHICLE_OPTIONS.includes(option)) setVehicleType(option);
    setMessage(`I'd like to book the ${name}. `);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    setVehicleType("");
    setMessage("");
    setPickedVehicle(null);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <AnimateIn variant="fadeUp" delay={0.1}>
      <form onSubmit={handleSubmit} className="card-soft p-6 md:p-10">
        {pickedVehicle && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-xl bg-brand-orangeSoft px-4 py-3">
            <p className="text-[13px] text-brand-dark">
              Enquiring about{" "}
              <span className="font-semibold">{pickedVehicle}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                setPickedVehicle(null);
                setVehicleType("");
                setMessage("");
              }}
              aria-label={`Clear ${pickedVehicle} from this enquiry`}
              className="shrink-0 rounded-full p-1 text-brand-orange transition hover:bg-white/60"
            >
              <HiX size={14} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Full name" name="name" placeholder="Jane Perera" />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="you@email.com"
          />
          <Field label="Phone" name="phone" placeholder="+94 77 123 4567" />

          <div>
            <label htmlFor="vehicle" className={LABEL}>
              Vehicle type
            </label>
            <select
              id="vehicle"
              name="vehicle"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className={FIELD}
            >
              <option value="" disabled>
                Select a vehicle
              </option>
              {VEHICLE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <Field label="Pickup date" name="pickup" type="date" />
          <Field label="Return date" name="return" type="date" />
        </div>

        <div className="mt-5">
          <label htmlFor="message" className={LABEL}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your trip — where you're going, how many riders, pickup location…"
            className={FIELD}
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p
            aria-live="polite"
            className={`flex items-center gap-2 text-xs ${
              sent ? "font-medium text-brand-orange" : "text-brand-muted"
            }`}
          >
            {sent ? (
              <>
                <HiCheck size={14} />
                Request sent — we&apos;ll be in touch.
              </>
            ) : (
              "We'll confirm availability within 1 business hour."
            )}
          </p>
          <button type="submit" className="btn-orange">
            Send request
          </button>
        </div>
      </form>
    </AnimateIn>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={LABEL}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className={FIELD}
      />
    </div>
  );
}
