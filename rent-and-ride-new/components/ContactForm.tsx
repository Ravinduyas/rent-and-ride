"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { whatsappLink } from "@/lib/site";

/**
 * The site is a static export with no backend, so "Send Message" hands the
 * enquiry to WhatsApp, pre-filled, and moves this tab to the thank-you page.
 * Swap in a form service (Formspree, Web3Forms, etc.) here if email
 * delivery is preferred.
 */
export default function ContactForm() {
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      "Hi Rent & Ride!",
      `Name: ${data.get("name")}`,
      `WhatsApp: ${data.get("phone")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    router.push("/thank-you");
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 md:p-8">
      <h2 className="text-lg font-semibold text-ink">Send a Message</h2>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="name" className="label">Name *</label>
          <input id="name" name="name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="phone" className="label">WhatsApp Number *</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+44 7700 900123" className="field" />
        </div>
        <div>
          <label htmlFor="message" className="label">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Your dates, which vehicle, and where you're staying…"
            className="field"
          />
        </div>
      </div>

      <button type="submit" className="btn-gold mt-6 w-full">
        Send Message
      </button>
      <p className="mt-3 text-center text-xs text-ink-muted">
        Opens WhatsApp with your message ready to send.
      </p>
    </form>
  );
}
