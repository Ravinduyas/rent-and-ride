"use client";

import { FormEvent, useState } from "react";
import AnimateIn from "./AnimateIn";

const VEHICLE_OPTIONS = [
  "Motorbike",
  "Scooter",
  "Three Wheeler",
  "Push Bike",
  "Not sure yet",
];

const FIELD =
  "w-full rounded-xl border border-brand-line bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:border-brand-orange focus:outline-none";

const LABEL = "mb-2 block text-[13px] font-medium text-brand-dark";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <AnimateIn variant="fadeUp" delay={0.1}>
      <form onSubmit={handleSubmit} className="card-soft p-6 md:p-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Full name" name="name" placeholder="Jane Perera" />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="you@email.com"
          />
          <Field label="Phone" name="phone" placeholder="+94 77 123 4567" />
          <SelectField
            label="Vehicle type"
            name="vehicle"
            options={VEHICLE_OPTIONS}
          />
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
            placeholder="Tell us about your trip — where you're going, how many riders, pickup location…"
            className={FIELD}
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            We&apos;ll confirm availability within 1 business hour.
          </p>
          <button type="submit" className="btn-orange">
            {sent ? "Request sent" : "Send request"}
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

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className={LABEL}>
        {label}
      </label>
      <select id={name} name={name} defaultValue="" className={FIELD}>
        <option value="" disabled>
          Select a vehicle
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
