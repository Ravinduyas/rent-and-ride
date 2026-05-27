"use client";

import { FormEvent, useState } from "react";
import { HiArrowRight, HiOutlinePaperAirplane } from "react-icons/hi";
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
    <section id="offers" className="relative overflow-hidden bg-white py-20 md:py-28">
      <HiOutlinePaperAirplane
        className="pointer-events-none absolute right-6 top-12 hidden text-brand-line md:block"
        size={220}
      />

      <div className="container-x relative grid grid-cols-1 gap-10 md:grid-cols-2">
        <AnimateIn variant="fadeLeft">
          <div>
            <span className="section-eyebrow" />
            <h2 className="section-title leading-tight">
              Get Rental
              <br />
              Deals First
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn variant="fadeRight" delay={0.15} className="flex flex-col justify-center">
          <p className="mb-6 max-w-md text-sm leading-7 text-brand-muted">
            Drop your email and we&apos;ll send you long-term rental
            discounts, new arrivals and seasonal touring routes — no
            spam, just rides.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-lg items-center gap-3 border-t border-b border-brand-line/80 py-2"
          >
            <span className="block h-6 w-[2px] bg-brand-orange" />
            <input
              type="email"
              required
              placeholder="Enter Your Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-2 py-2 text-sm text-brand-dark placeholder:text-brand-muted focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-3 rounded-full bg-brand-orange py-2 pl-5 pr-2 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-[0_10px_24px_rgba(199,109,74,0.45)]"
            >
              {sent ? "Sent" : "Send"}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-orange">
                <HiArrowRight />
              </span>
            </button>
          </form>
        </AnimateIn>
      </div>
    </section>
  );
}
