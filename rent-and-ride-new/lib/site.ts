/**
 * Business details used across the site. Everything a customer can act on —
 * phone, WhatsApp, email, address, social links — lives here so it only has
 * to be corrected in one place.
 *
 * The values below were read off the redesign mockup. Check them against the
 * real business details before going live.
 */
export const SITE = {
  name: "Rent & Ride Weligama",
  tagline: "Ride More. Worry Less.",
  phoneDisplay: "+94 76 120 1675",
  phoneHref: "tel:+94761201675",
  /** International format, digits only, for wa.me links. */
  whatsapp: "94761201675",
  email: "rentandrideweligama@gmail.com",
  address: ["161, Kaldbram Watta, Polena,", "Weligama 81700, Sri Lanka"],
  hours: "7:00 AM – 9:00 PM",
  hoursNote: "Open daily",
  /** Google Maps share link for the business listing. */
  mapsUrl: "https://share.google/vUnRZFHCK86CnzJaj",
  /** From Google Maps → Share → Embed a map (the satellite view). */
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.6534585844706!2d80.4495022!3d5.969076799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae11500045c2d49%3A0x57fb73ada527d340!2sRent%20%26%20Ride%20Weligama%20%F0%9F%9B%B5!5e1!3m2!1sen!2slk!4v1791350984192!5m2!1sen!2slk",
  /** Replace "#" with the real profile URLs. */
  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
    tiktok: "#",
  },
  reviews: {
    google: "#",
    tripadvisor:
      "https://www.tripadvisor.in/Attraction_Review-g612380-d34441088-Reviews-Rent_Ride_Weligama_Bike_Scooter_TukTuk_Rental_Service-Weligama_Matara_Southern_P.html",
  },
} as const;

export function whatsappLink(message = "Hi Rent & Ride! I'd like to rent a scooter.") {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { label: "Home", href: "/" },
  // Scooters, bikes and the driving permit share one page.
  { label: "Rentals", href: "/rentals" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
