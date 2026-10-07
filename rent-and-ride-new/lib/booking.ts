import type { Vehicle } from "@/data/vehicles";

/**
 * Booking flow logic: dates, the price estimate, and the WhatsApp message.
 * No React here, so the rules are easy to read and adjust in one place.
 */

export type Delivery = "shop" | "weligama" | "mirissa" | "ahangama" | "other";
export type PermitHelp = "yes" | "no" | "have";

export type Booking = {
  vehicle: string; // Vehicle slug
  pickupDate: string; // YYYY-MM-DD, from <input type="date">
  pickupTime: string; // HH:MM
  returnDate: string; // YYYY-MM-DD
  delivery: Delivery | "";
  place: string; // Hotel / guesthouse name, or the address when "other"
  helmets: "1" | "2";
  permit: PermitHelp | "";
  licenceCountry: string;
  name: string;
  notes: string;
};

export const EMPTY_BOOKING: Booking = {
  vehicle: "",
  pickupDate: "",
  pickupTime: "09:00",
  returnDate: "",
  delivery: "",
  place: "",
  helmets: "2",
  permit: "",
  licenceCountry: "",
  name: "",
  notes: "",
};

export const DELIVERY_OPTIONS: { value: Delivery; label: string; note: string }[] = [
  { value: "shop", label: "Collect from our shop", note: "Weligama" },
  { value: "weligama", label: "Deliver in Weligama", note: "Free" },
  { value: "mirissa", label: "Deliver in Mirissa", note: "Free" },
  { value: "ahangama", label: "Deliver in Ahangama", note: "Free" },
  { value: "other", label: "Somewhere else", note: "We'll confirm" },
];

/** Opening hours are 7:00–21:00, so pickups are offered on the hour within them. */
export const PICKUP_TIMES = Array.from({ length: 15 }, (_, i) => `${String(7 + i).padStart(2, "0")}:00`);

/** Parses YYYY-MM-DD as a local date (new Date("2026-10-12") would be UTC). */
export function parseDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/** Today as YYYY-MM-DD in the visitor's own time zone. */
export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function addDaysISO(value: string, days: number): string {
  const d = parseDate(value) ?? new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Rental length in days; returning on the pickup day counts as one day. */
export function rentalDays(pickup: string, ret: string): number {
  const a = parseDate(pickup);
  const b = parseDate(ret);
  if (!a || !b) return 0;
  const diff = Math.round((b.getTime() - a.getTime()) / 86_400_000);
  return diff < 0 ? 0 : Math.max(1, diff);
}

/**
 * Estimated price in USD: whole weeks at the weekly rate, leftover days at
 * the daily rate, with the leftover never costing more than another week.
 * Only an estimate — the final price is confirmed on WhatsApp.
 */
export function estimate(v: Vehicle, days: number): number {
  if (days <= 0) return 0;
  const weeks = Math.floor(days / 7);
  const rest = days % 7;
  return weeks * v.perWeek + Math.min(rest * v.perDay, v.perWeek);
}

export function formatDate(value: string): string {
  const d = parseDate(value);
  return d
    ? d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : "";
}

export function deliveryText(b: Booking): string {
  const opt = DELIVERY_OPTIONS.find((o) => o.value === b.delivery);
  if (!opt) return "";
  if (b.delivery === "shop") return "Collect from the shop in Weligama";
  if (b.delivery === "other") return `Deliver to: ${b.place.trim()}`;
  return `${opt.label}${b.place.trim() ? ` — ${b.place.trim()}` : ""}`;
}

export function permitText(b: Booking): string {
  if (b.permit === "yes")
    return `Yes, please help${b.licenceCountry.trim() ? ` (licence from ${b.licenceCountry.trim()})` : ""}`;
  if (b.permit === "have") return "I already have one";
  return "No";
}

/** The message that lands in the business's WhatsApp. */
export function bookingMessage(b: Booking, v: Vehicle): string {
  const days = rentalDays(b.pickupDate, b.returnDate);
  const lines = [
    "Hi Rent & Ride! I'd like to book:",
    "",
    `🛵 *${v.name}* (${[v.transmission, v.engine === "Electric" ? "Electric" : v.engine].join(", ")})`,
    `📅 Pickup: ${formatDate(b.pickupDate)}, ${b.pickupTime}`,
    `📅 Return: ${formatDate(b.returnDate)}`,
    `⏱️ ${days} ${days === 1 ? "day" : "days"} · est. $${estimate(v, days)}`,
    `📍 ${deliveryText(b)}`,
    `⛑️ Helmets: ${b.helmets}`,
    `🪪 Driving permit help: ${permitText(b)}`,
    "",
    `Name: ${b.name.trim()}`,
  ];
  if (b.notes.trim()) lines.push(`Notes: ${b.notes.trim()}`);
  lines.push("", "Is it available?");
  return lines.join("\n");
}
