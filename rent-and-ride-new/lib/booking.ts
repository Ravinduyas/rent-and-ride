import type { Vehicle } from "@/data/vehicles";

/**
 * Booking flow logic: dates, the price estimate, and the WhatsApp message.
 * No React here, so the rules are easy to read and adjust in one place.
 */

export type PermitHelp = "yes" | "no" | "have";

export type Booking = {
  vehicle: string; // Vehicle slug
  pickupDate: string; // YYYY-MM-DD, from <input type="date">
  pickupTime: string; // HH:MM
  returnDate: string; // YYYY-MM-DD
  helmets: "1" | "2";
  extras: string[]; // Extra ids, see EXTRAS
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
  helmets: "2",
  extras: [],
  permit: "",
  licenceCountry: "",
  name: "",
  notes: "",
};

/**
 * Optional add-ons offered in the booking flow. PLACEHOLDERS: confirm what
 * the shop really offers and the prices before relying on them. `per` says
 * whether the price is charged once per rental or for every day of it.
 */
export type Extra = {
  id: string;
  label: string; // small caps tag above the title
  title: string;
  desc: string;
  price: number; // USD; 0 = free
  per: "rental" | "day";
  icon: "phone" | "helmet" | "bag";
};

export const EXTRAS: Extra[] = [
  { id: "phone-holder", label: "Accessory", title: "Phone holder", desc: "Handlebar mount so you can follow the map hands-free.", price: 2, per: "rental", icon: "phone" },
  { id: "child-helmet", label: "Safety", title: "Child helmet", desc: "Small-size helmet for a young passenger.", price: 0, per: "rental", icon: "helmet" },
  { id: "top-box", label: "Carry", title: "Luggage box", desc: "A lockable box on the back for bags and shopping.", price: 1, per: "day", icon: "bag" },
];

/** Cost of the chosen extras for a rental of `days` days, in USD. */
export function extrasTotal(ids: string[], days: number): number {
  return EXTRAS.filter((e) => ids.includes(e.id)).reduce((sum, e) => sum + (e.per === "day" ? e.price * days : e.price), 0);
}

export const priceText = (e: Extra) => (e.price === 0 ? "Free" : `$${e.price}${e.per === "day" ? "/day" : ""}`);

/** Every rental is collected from, and returned to, the shop — no delivery. */
export const PICKUP_TEXT = "Pickup & return at our shop in Weligama";

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

/** Short spec line, e.g. "Automatic, 125cc" or, for a tuk-tuk, "Manual, 3 seats". */
export function specs(v: Vehicle, sep = ", "): string {
  return [v.transmission, v.engine || null, v.kind === "tuktuk" ? `${v.seats} seats` : null]
    .filter(Boolean)
    .join(sep);
}

/** Tuk-tuks don't need helmets, so the flow skips that question for them. */
export const needsHelmets = (v: Vehicle) => v.kind !== "tuktuk";

export function formatDate(value: string): string {
  const d = parseDate(value);
  return d
    ? d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : "";
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
    `${v.kind === "tuktuk" ? "🛺" : "🛵"} *${v.name}* (${specs(v)})`,
    `📅 Pickup: ${formatDate(b.pickupDate)}, ${b.pickupTime}`,
    `📅 Return: ${formatDate(b.returnDate)}`,
    `⏱️ ${days} ${days === 1 ? "day" : "days"} · est. $${estimate(v, days) + extrasTotal(b.extras, days)}`,
    `📍 ${PICKUP_TEXT}`,
    ...(needsHelmets(v) ? [`⛑️ Helmets: ${b.helmets}`] : []),
    ...(b.extras.length ? [`➕ Extras: ${EXTRAS.filter((e) => b.extras.includes(e.id)).map((e) => e.title).join(", ")}`] : []),
    `🪪 Driving permit help: ${permitText(b)}`,
    "",
    `Name: ${b.name.trim()}`,
  ];
  if (b.notes.trim()) lines.push(`Notes: ${b.notes.trim()}`);
  lines.push("", "Is it available?");
  return lines.join("\n");
}
