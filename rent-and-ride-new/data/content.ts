import { REAL } from "./photos";
import { SCOOTERS, BIKES, TUKTUKS } from "./vehicles";

export type Review = {
  name: string;
  origin?: string;
  source: "Google" | "Tripadvisor";
  when?: string;
  text: string;
};

// Genuine guest reviews. Origin and date aren't recorded, so they're optional.
export const REVIEWS: Review[] = [
  {
    name: "Matilda O'Neill",
    source: "Google",
    text: "Fantastic!! We could not recommend this business more!! The service was fast and reliable and they went above and beyond to accommodate me and my husband renting a tuk tuk. It was also the best condition tuk tuk of our trip. We even ended up having dinner with their lovely family. We felt very lucky to have decided to use this business as it was an absolute highlight of our trip.",
  },
  {
    name: "Marion Portal",
    source: "Google",
    text: "We rented a Tuktuk for 5 days and I was a dreammmm! The family running the business is so lovely and very helpful, we could contact them at any given moment if there was a problem. They gave me a quick lesson to explain how the Tuktuk works, and then off we went! I 100% recommend this place. Thank you again !!!",
  },
  {
    name: "Mohammed Pitolwala",
    source: "Google",
    text: "The scooter is great and the owner is so kind and friendly. We will definitely come back to rent from her. We highly recommend her to anyone.",
  },
  {
    name: "Tommi Lampila",
    source: "Google",
    text: "Very good bike rental and good condition bike. Price is very reasonable. Owner is very good and friendly. Super service. Highly recommended!",
  },
  {
    name: "Gary Siva",
    source: "Google",
    text: "Kanishka was incredibly helpful and reliable when providing a scooter. The scooter was excellent and ran well also very reasonably priced. She and her husband were very friendly trustworthy. I’d highly recommend their service.",
  },
];

export type Faq = { q: string; a: string };

const cheapest = (list: { perDay: number }[]) => Math.min(...list.map((v) => v.perDay));

export const FAQS: Faq[] = [
  {
    q: "Do I need a driving license?",
    a: "Yes. You need a valid licence from your home country that covers motorcycles, plus a Sri Lankan recognition permit. We can arrange the permit for you — see our Driving Permit page.",
  },
  {
    q: "Which vehicles can I rent, and what do they cost?",
    a: `Scooters start at $${cheapest(SCOOTERS)} a day, bikes at $${cheapest(BIKES)} a day, and our tuk-tuk is $${TUKTUKS[0].perDay} a day. Renting by the week is cheaper than paying day by day. See the Rentals page for every model and price.`,
  },
  {
    q: "How do I book?",
    a: "Press Book Now, choose your vehicle and dates, and send the booking to us on WhatsApp. We reply to confirm availability and the final price. Nothing is charged online.",
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
    q: "Can I rent a tuk-tuk?",
    a: "Yes. Our Bajaj RE 4S seats three people and is a great way to see the south coast with friends or family. Message us on WhatsApp and we'll tell you what licence you need and arrange a time to collect it.",
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

/** Home "Follow Our Journey" grid: the gallery plus four more, so wide screens
 *  fill six columns by two rows. */
export const HOME_GALLERY = [
  ...GALLERY,
  { src: REAL.tuktukBeachFriends, alt: "Three friends posing with a blue tuk-tuk on the beach" },
  { src: REAL.coastSelfie, alt: "A rider's selfie with a red scooter on a coastal path" },
  { src: REAL.ntorqRiders, alt: "Two riders on scooters, a grey TVS Ntorq in front" },
  { src: REAL.scooterByTheSea, alt: "A red scooter parked under a tree by the sea" },
];

/**
 * Home hero slideshow, shown in this order, each for a few seconds.
 * `position` is the CSS object-position that keeps the people and the shop
 * sign in frame when the photo is cropped to the hero's shape.
 * (The old hero photo, REAL.ridersRedScooters, is still in public/photos but
 * no longer used here.)
 */
export const HERO_SLIDES = [
  { src: REAL.heroFriendsTuktuk, alt: "Three friends beside a blue tuk-tuk and the Rent & Ride sign", position: "center 30%" },
  { src: REAL.heroRidersNtorq, alt: "Two riders on scooters at the roadside outside the Rent & Ride shop", position: "center 50%" },
  { src: REAL.heroCoupleScooter, alt: "A couple with a red scooter in front of the Rent & Ride sign", position: "center 45%" },
];

/** Default inner-page banner; pages pass their own where it fits. */
export const PAGE_HERO = REAL.scooterByTheSea;
