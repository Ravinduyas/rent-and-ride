"use client";

import { FormEvent, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import AnimateIn from "./AnimateIn";

const VEHICLE_OPTIONS = [
  "Motorbike",
  "Scooter",
  "Three Wheeler",
  "Push Bike",
  "Not sure yet",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    (e.currentTarget as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <AnimateIn variant="fadeUp" delay={0.1}>
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-brand-line bg-white p-6 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Full Name" name="name" placeholder="Jane Perera" />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@email.com"
        />
        <Field label="Phone" name="phone" placeholder="+94 77 123 4567" />
        <SelectField
          label="Vehicle Type"
          name="vehicle"
          options={VEHICLE_OPTIONS}
        />
        <Field label="Pickup Date" name="pickup" type="date" />
        <Field label="Return Date" name="return" type="date" />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-brand-dark">
          Message
        </label>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your trip — where you're going, how many riders, pickup location…"
          className="w-full rounded-lg border border-brand-line bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:border-brand-orange focus:outline-none"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-brand-muted">
          We&apos;ll confirm availability within 1 business hour.
        </p>
        <button type="submit" className="btn-orange">
          {sent ? "Request Sent" : "Send Request"}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-orange">
            <HiArrowRight />
          </span>
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
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-brand-dark"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-lg border border-brand-line bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:border-brand-orange focus:outline-none"
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
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-brand-dark"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full rounded-lg border border-brand-line bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-orange focus:outline-none"
      >
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
