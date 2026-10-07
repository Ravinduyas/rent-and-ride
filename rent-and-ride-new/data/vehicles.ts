import { PHOTOS } from "./photos";

export type Vehicle = {
  slug: string;
  name: string;
  kind: "scooter" | "bike";
  transmission: "Automatic" | "Manual";
  /** Shown as "125cc"; electric models use "Electric". */
  engine: string;
  /** Filter group on the scooters page. */
  group: "110cc" | "125cc" | "150cc+" | "Electric";
  seats: number;
  perDay: number;
  perWeek: number;
  image: string;
  note?: string;
};

// Prices and models come from the redesign mockup. The photos are verified
// Unsplash placeholders (see data/photos.ts) — swap each for a real photo of
// that vehicle when the fleet has been shot.
const BIKE_IMG = {
  red: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80",
  dark: PHOTOS.motorbike,
  ktm: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=900&q=80",
};

export const SCOOTERS: Vehicle[] = [
  {
    slug: "honda-dio",
    name: "Honda Dio",
    kind: "scooter",
    transmission: "Automatic",
    engine: "110cc",
    group: "110cc",
    seats: 2,
    perDay: 4,
    perWeek: 25,
    image: PHOTOS.scooterLot,
  },
  {
    slug: "yamaha-ray-zr",
    name: "Yamaha Ray ZR",
    kind: "scooter",
    transmission: "Automatic",
    engine: "125cc",
    group: "125cc",
    seats: 2,
    perDay: 5,
    perWeek: 30,
    image: PHOTOS.scooterHelmets,
  },
  {
    slug: "tvs-ntorq-125",
    name: "Ntorq 125",
    kind: "scooter",
    transmission: "Automatic",
    engine: "125cc",
    group: "125cc",
    seats: 2,
    perDay: 5,
    perWeek: 30,
    image: PHOTOS.scooterTown,
  },
  {
    slug: "tvs-jupiter",
    name: "TVS Jupiter",
    kind: "scooter",
    transmission: "Automatic",
    engine: "110cc",
    group: "110cc",
    seats: 2,
    perDay: 4,
    perWeek: 25,
    image: PHOTOS.scooterCoast,
  },
  {
    slug: "honda-activa",
    name: "Honda Activa",
    kind: "scooter",
    transmission: "Automatic",
    engine: "110cc",
    group: "110cc",
    seats: 2,
    perDay: 4,
    perWeek: 25,
    image: PHOTOS.scooterSunset,
  },
  {
    slug: "electric-scooter",
    name: "Electric Scooter",
    kind: "scooter",
    transmission: "Automatic",
    engine: "Electric",
    group: "Electric",
    seats: 2,
    perDay: 6,
    perWeek: 35,
    image: PHOTOS.scooterLot,
    note: "Eco-friendly",
  },
];

export const BIKES: Vehicle[] = [
  {
    slug: "yamaha-mt-15",
    name: "Yamaha MT-15",
    kind: "bike",
    transmission: "Manual",
    engine: "155cc",
    group: "150cc+",
    seats: 2,
    perDay: 12,
    perWeek: 75,
    image: BIKE_IMG.red,
  },
  {
    slug: "bajaj-pulsar-180",
    name: "Pulsar 180",
    kind: "bike",
    transmission: "Manual",
    engine: "180cc",
    group: "150cc+",
    seats: 2,
    perDay: 10,
    perWeek: 60,
    image: BIKE_IMG.dark,
  },
  {
    slug: "royal-enfield-350",
    name: "Royal Enfield 350",
    kind: "bike",
    transmission: "Manual",
    engine: "350cc",
    group: "150cc+",
    seats: 2,
    perDay: 18,
    perWeek: 110,
    image: BIKE_IMG.ktm,
  },
];

/** The five cards in the home page "Featured Vehicles" row. */
export const FEATURED: Vehicle[] = [
  SCOOTERS[2],
  BIKES[0],
  BIKES[1],
  SCOOTERS[1],
  SCOOTERS[5],
];
