import { REAL } from "./photos";

export type Review = {
  name: string;
  origin: string;
  source: "Google" | "Tripadvisor";
  when: string;
  text: string;
};

// PLACEHOLDER REVIEWS taken from the redesign mockup. Replace these with
// genuine reviews copied from the Google and Tripadvisor listings before the
// site goes live — publishing invented reviews is not allowed by either
// platform and is misleading to customers.
export const REVIEWS: Review[] = [
  {
    name: "Sarah",
    origin: "United Kingdom",
    source: "Google",
    when: "2 weeks ago",
    text: "Amazing service! The bikes were in great condition and the staff were super friendly. Highly recommend!",
  },
  {
    name: "Rohan",
    origin: "India",
    source: "Google",
    when: "3 weeks ago",
    text: "Best rental experience in Sri Lanka! The scooter was perfect and pickup was quick and easy.",
  },
  {
    name: "Lukas",
    origin: "Germany",
    source: "Google",
    when: "1 month ago",
    text: "Very professional and helpful. Got our driving permit sorted quickly. Will definitely rent again!",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Do I need a driving license?",
    a: "Yes. You need a valid licence from your home country that covers motorcycles, plus a Sri Lankan recognition permit. We can arrange the permit for you — see the Driving Permit section of our Rentals page.",
  },
  {
    q: "Where do I collect the vehicle?",
    a: "From our shop in Weligama — every rental is picked up and returned there. We're open daily, 7:00 AM to 9:00 PM. Message us on WhatsApp if you need directions.",
  },
  {
    q: "Do you provide helmets?",
    a: "Every rental comes with free helmets — two if you're riding with a passenger.",
  },
  {
    q: "Can I rent for a week or longer?",
    a: "Of course. Weekly rates are cheaper than paying day by day, and we offer monthly prices too. Message us with your dates.",
  },
  {
    q: "Do you provide driving permit assistance?",
    a: "Yes. Send us a copy of your licence and passport and we'll handle the paperwork for the Sri Lankan permit.",
  },
  {
    q: "What are the payment options?",
    a: "Cash in LKR, USD or EUR, or bank transfer. A refundable deposit is taken when you collect the vehicle.",
  },
  {
    q: "What happens if the bike gets damaged?",
    a: "Call or WhatsApp us straight away. For breakdowns we'll come to you; for damage we'll assess it together with you, honestly and on the spot.",
  },
];

/** "Follow Our Journey" strip, the About gallery and (first four) the
 *  Reviews page: real customers and rides from the business's own photos. */
export const GALLERY = [
  { src: REAL.sunsetHelmets, alt: "Two riders in helmets, smiling at sunset" },
  { src: REAL.tuktukBeachTrio, alt: "Three friends with a blue tuk-tuk on the beach" },
  { src: REAL.riderPalms, alt: "A rider on a black motorbike by the sea, palm trees behind" },
  { src: REAL.cafeStop, alt: "Two riders at a roadside café with their scooter" },
  { src: REAL.redTuktuk, alt: "Two riders in a red tuk-tuk" },
  { src: REAL.tuktukGarden, alt: "Two friends with a blue tuk-tuk on a garden lawn" },
  { src: REAL.motorbikeByTheSea, alt: "A black motorbike parked by the sea" },
  { src: REAL.shopTuktukFriends, alt: "Two friends with a tuk-tuk outside the Rent & Ride shop" },
];

/** Home hero: two riders on red scooters on a palm-lined road. */
export const HOME_HERO = REAL.ridersRedScooters;

/** Default inner-page banner; pages pass their own where it fits. */
export const PAGE_HERO = REAL.scooterByTheSea;
