import { REAL } from "./photos";

export type Vehicle = {
  slug: string;
  name: string;
  kind: "scooter" | "bike" | "tuktuk";
  transmission: "Automatic" | "Manual";
  /** Shown as "125cc"; electric models use "Electric"; empty to omit. */
  engine: string;
  /** Filter group within a Rentals section. */
  group: "110cc" | "125cc" | "150cc+" | "Electric" | "Three Wheeler";
  seats: number;
  perDay: number;
  perWeek: number;
  image: string;
  /** CSS object-position for the photo when cropped, e.g. "center 75%". */
  imagePosition?: string;
  note?: string;
};

// The fleet: the models in the business's own product photos (REAL.fleet* in
// data/photos.ts). Prices for the Dio, Ray ZR and Ntorq come from the design
// mockup. The Navi and the three bikes had no price there, so they are
// ESTIMATES matching the nearest model (Navi = other 110cc scooters; bikes =
// the old 150–180cc bike rate) — confirm them with the business.

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
    image: REAL.fleetDio,
  },
  {
    slug: "honda-navi",
    name: "Honda Navi",
    kind: "scooter",
    transmission: "Automatic",
    engine: "110cc",
    group: "110cc",
    seats: 2,
    perDay: 4,
    perWeek: 25,
    image: REAL.fleetNavi,
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
    image: REAL.fleetRayZr,
  },
  {
    slug: "tvs-ntorq-125",
    name: "TVS Ntorq 125",
    kind: "scooter",
    transmission: "Automatic",
    engine: "125cc",
    group: "125cc",
    seats: 2,
    perDay: 5,
    perWeek: 30,
    image: REAL.fleetNtorq,
    imagePosition: "center 62%",
  },
];

export const BIKES: Vehicle[] = [
  {
    slug: "tvs-apache-160",
    name: "TVS Apache 160",
    kind: "bike",
    transmission: "Manual",
    engine: "160cc",
    group: "150cc+",
    seats: 2,
    perDay: 10,
    perWeek: 60,
    image: REAL.fleetApache160,
  },
  {
    slug: "yamaha-fz-160",
    name: "Yamaha FZ 160",
    kind: "bike",
    transmission: "Manual",
    engine: "160cc",
    group: "150cc+",
    seats: 2,
    perDay: 10,
    perWeek: 60,
    image: REAL.fleetFz160,
  },
  {
    slug: "hero-hunk",
    name: "Hero Hunk",
    kind: "bike",
    transmission: "Manual",
    engine: "150cc",
    group: "150cc+",
    seats: 2,
    perDay: 10,
    perWeek: 60,
    image: REAL.fleetHunk,
  },
];

// The business rents a single tuk-tuk model, the Bajaj RE 4S. Day rate and
// photo come from the previous site / the business's own photo. The previous
// site had no weekly rate, so it is set at six days' rental (a day free) —
// confirm it with the business.
export const TUKTUKS: Vehicle[] = [
  {
    slug: "bajaj-re-4s",
    name: "Bajaj RE 4S",
    kind: "tuktuk",
    transmission: "Manual",
    engine: "",
    group: "Three Wheeler",
    seats: 3,
    perDay: 28,
    perWeek: 168,
    image: REAL.tuktukStupa,
    imagePosition: "center 78%",
  },
];

/** The five cards in the home page "Featured Vehicles" row: two scooters,
 *  two bikes and a tuk-tuk, each with a different photo. */
export const FEATURED: Vehicle[] = [
  SCOOTERS[3], // Ntorq
  BIKES[1], // Yamaha FZ 160
  TUKTUKS[0], // Bajaj RE 4S
  SCOOTERS[2], // Ray ZR
  BIKES[2], // Hero Hunk
];
