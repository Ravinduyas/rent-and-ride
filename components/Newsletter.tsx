"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { HiArrowRight, HiCheck } from "react-icons/hi";
import AnimateIn from "./AnimateIn";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="offers" className="py-16 md:py-24">
      <div className="container-x">
        <AnimateIn variant="fadeUp">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-ink">
            {/* Warm bloom behind the copy, picking up the sunset in the photo. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-brand-orange/25 blur-3xl"
            />

            <div className="relative grid grid-cols-1 md:grid-cols-[42%_58%]">
              {/* Photo — fades into the panel so there is no hard seam. */}
              <div className="relative h-44 md:h-auto md:min-h-[380px]">
                <Image
                  src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=900&q=80"
                  alt="Sunset over the south coast"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
                {/* Explicit stops rather than a plain two-stop gradient: the
                    photo stays clean for most of its width, then falls away
                    quickly, instead of going muddy across the middle. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 md:hidden"
                  style={{
                    background:
                      "linear-gradient(to top, #37321F 0%, rgba(55,50,31,0.85) 22%, rgba(55,50,31,0.25) 60%, rgba(55,50,31,0) 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 hidden md:block"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(55,50,31,0) 0%, rgba(55,50,31,0) 45%, rgba(55,50,31,0.5) 72%, rgba(55,50,31,0.92) 90%, #37321F 100%)",
                  }}
                />
              </div>

              {/* Copy and form */}
              <div className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-14">
                <h2 className="max-w-sm text-[26px] font-bold leading-[1.2] text-white md:text-[32px]">
                  Get rental deals first
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
                  Long-stay discounts, new arrivals and the touring routes worth
                  riding as the seasons turn.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
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
                    className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/45 focus:border-brand-orange focus:bg-white/15 focus:outline-none"
                  />
                  <button type="submit" className="btn-orange shrink-0">
                    Subscribe
                    <HiArrowRight size={15} />
                  </button>
                </form>

                {/* Status is announced rather than only shown, so the
                    confirmation isn't purely visual. */}
                <p
                  aria-live="polite"
                  className={`mt-4 flex items-center gap-2 text-xs transition-opacity duration-300 ${
                    sent ? "text-brand-amber opacity-100" : "text-white/45"
                  }`}
                >
                  {sent ? (
                    <>
                      <HiCheck size={14} />
                      You&apos;re on the list — we&apos;ll be in touch.
                    </>
                  ) : (
                    "No spam, just rides."
                  )}
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
