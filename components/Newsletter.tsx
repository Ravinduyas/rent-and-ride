"use client";

import { FormEvent, useState } from "react";
import AnimateIn from "./AnimateIn";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <section id="offers" className="py-16 md:py-24">
      <div className="container-x">
        <AnimateIn variant="fadeUp">
          <div className="card-soft mx-auto max-w-3xl px-8 py-12 text-center md:px-14">
            <h2 className="section-title">Get rental deals first</h2>
            <p className="section-sub mx-auto max-w-md">
              Long-stay discounts, new arrivals and seasonal touring routes —
              no spam, just rides.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-full border border-brand-line bg-white px-5 py-3.5 text-sm text-brand-dark placeholder:text-brand-muted focus:border-brand-orange focus:outline-none"
              />
              <button type="submit" className="btn-orange shrink-0">
                {sent ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
