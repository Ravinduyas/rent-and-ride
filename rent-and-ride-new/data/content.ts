import { PHOTOS } from "./photos";

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
    text: "Best rental experience in Sri Lanka! The scooter was perfect and delivery was on time.",
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
    q: "Can you deliver the scooter?",
    a: "Yes. We deliver free to hotels and guesthouses in Weligama, Mirissa and Ahangama, and collect it again at the end of your rental.",
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

/** "Follow Our Journey" strip and the gallery on the About page. */
export const GALLERY = [
  { src: PHOTOS.scooterCoast, alt: "A scooter on a coastal lane above the sea" },
  { src: PHOTOS.scooterSunset, alt: "Scooters on a palm-lined coast road at sunset" },
  { src: PHOTOS.scooterTown, alt: "Two riders on a scooter passing a roadside building" },
  { src: PHOTOS.beachRider, alt: "A rider on a motorbike on the beach at golden hour" },
  { src: PHOTOS.scooterHelmets, alt: "Rows of scooters with helmets hung on them" },
  { src: PHOTOS.tuktukRoad, alt: "A tuktuk and a motorbike on a winding road" },
  { src: PHOTOS.talkingByBike, alt: "Two people talking beside a motorbike" },
  { src: PHOTOS.tuktukLighthouse, alt: "A tuktuk below the Galle Fort lighthouse" },
];

/** Home hero: rider on a motorbike on the beach at golden hour. */
export const HOME_HERO =
  "https://images.unsplash.com/photo-1560199887-55dcf2cc769f?auto=format&fit=crop&w=2000&q=80";

/** Inner page banners: two palms on a beach, sea along the bottom. */
export const PAGE_HERO =
  "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=2000&h=900&q=80";
