/**
 * Photos used in the content sections.
 *
 * Every entry below has been opened and looked at, and the comment says what
 * is actually in the frame. An Unsplash ID that merely loads is not enough —
 * the search results for "tuk tuk sri lanka" include plenty of photos that
 * are neither. Check the image before adding to this list.
 */

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PHOTOS = {
  /** Black tuktuk parked below the Galle Fort lighthouse, palms behind. */
  tuktukLighthouse: u("photo-1704797390325-b057758d8c3d"),
  /** Green tuktuk and a motorbike on a winding road, Buddhist flag roadside. */
  tuktukRoad: u("photo-1776331246147-2ddb249b92ec"),
  /** Two tuktuks outside shops with Sinhala signage, luggage on the roof rack. */
  tuktukShops: u("photo-1583155381750-1c5d2634bd3f"),
  /** Green tuktuk on a narrow lane at night, Sri Lankan plate. */
  tuktukLane: u("photo-1744330589495-2b3c5a3060d9"),

  /** Two riders on a scooter passing a red-roofed roadside building. */
  scooterTown: u("photo-1785227987935-28a01aeb5a51"),
  /** Scooters on a palm-lined coast road at golden hour. */
  scooterSunset: u("photo-1770242214397-3ae822393e4e"),
  /** Scooter on a coastal lane, green headland and sea beyond. */
  scooterCoast: u("photo-1769192403325-57d75e6582df"),

  /** Mechanic crouched over a motorbike with a tool roll spread out. */
  mechanic: u("photo-1636761358757-0a616eb9e17e"),

  /** Workshop interior: tool board, workbench, a bike under warm red light. */
  workshop: u("photo-1649399337655-95831ce49281"),
  /** Someone sat in a workshop cleaning a helmet, bike alongside. */
  helmetPrep: u("photo-1578474005126-89909099fed6"),

  /** Rows of scooters with helmets hung on them, in a lot under trees. */
  scooterHelmets: u("photo-1734313519842-bab001a0cf00"),
  /** Big lot of parked scooters under tropical trees, white one in front. */
  scooterLot: u("photo-1716253871008-3ca31dbe93a0"),
  /** Rider in a black full-face helmet with an orange visor, dark ground. */
  riderHelmet: u("photo-1611004061856-ccc3cbe944b2"),
  /** Someone on a phone call, low sun behind, water in the distance. */
  phoneCall: u("photo-1516055619834-586f8c75d1de"),
  /** Close-up of a folded paper map, shallow focus. */
  routeMap: u("photo-1532154066703-3973764c81fe"),

  /** Rider sat on a motorbike on the beach at golden hour, surf behind. */
  beachRider: u("photo-1560199887-55dcf2cc769f", 1200),

  /** Row of red and green tuktuks nose-on, local plate visible. */
  tuktukRow: u("photo-1668515977101-61f7abd7a122"),
  /** Two people talking beside a red motorbike at golden hour. */
  talkingByBike: u("photo-1764605514179-dcf0c4d69634"),

  /** Dark motorbike in a garage — also used by the vehicle listings. */
  motorbike: u("photo-1558981403-c5f9899a28bc"),
  /** White pedal bike against a dark wall. */
  pedalBike: u("photo-1485965120184-e220f721d03e"),
} as const;

/**
 * The business's own photos (public/photos/), made from the originals in
 * photos-original/ as WebP at 480/800/1200/1600/2000px wide. Reference them
 * by path without size or extension; lib/img.ts builds the srcset.
 *
 * REAL_WIDTHS records each original's width so the srcset never claims a
 * size bigger than the photo really is.
 */
export const REAL = {
  /** Two riders on red scooters on a palm-lined road (AI-recreated from the original to remove a building and a rough wall). */
  ridersRedScooters: "/photos/riders-red-scooters",
  /** Red scooter parked under a tree by the sea, rocks and surf behind. */
  scooterByTheSea: "/photos/scooter-by-the-sea",
  /** Blue tuk-tuk on a hill road, a rider posing beside it. */
  tuktukHillRoad: "/photos/tuktuk-hill-road",
  /** Couple with a red scooter by the Rent & Ride sign at the shop. */
  shopSignScooter: "/photos/shop-sign-scooter",
  /** Three customers inside the shop with the scooters. */
  customersInShop: "/photos/customers-in-shop",
  /** The shop floor: scooters and a motorbike lined up, Rent & Ride sign. */
  shopFleet: "/photos/shop-fleet",
  /** The shop entrance from the road, red Rent & Ride sign on the left. */
  shopEntrance: "/photos/shop-entrance",
  /** Three friends posing with a blue tuk-tuk on the beach. */
  tuktukBeachFriends: "/photos/tuktuk-beach-friends",
  /** Rider's selfie with a red scooter on a coastal path. */
  coastSelfie: "/photos/coast-selfie",
  /** Two riders on scooters, a grey TVS Ntorq in front. */
  ntorqRiders: "/photos/ntorq-riders",
  /** Blue Bajaj RE tuk-tuk in front of a white stupa. */
  tuktukStupa: "/photos/tuktuk-stupa",
  /** Couple in open-face helmets, selfie at sunset. */
  sunsetHelmets: "/photos/sunset-helmets",
  /** Three friends with a blue tuk-tuk on a sandy beach. */
  tuktukBeachTrio: "/photos/tuktuk-beach-trio",
  /** Rider on a black motorbike by the sea, palm trees behind. */
  riderPalms: "/photos/rider-palms",
  /** Two riders at a roadside café, scooter parked beside them. */
  cafeStop: "/photos/cafe-stop",
  /** Two riders in a red tuk-tuk at the roadside. */
  redTuktuk: "/photos/red-tuktuk",
  /** Two friends with a blue tuk-tuk on a garden lawn. */
  tuktukGarden: "/photos/tuktuk-garden",
  /** Black motorbike with a helmet on it, parked by the sea. */
  motorbikeByTheSea: "/photos/motorbike-by-the-sea",
  /** Two friends by a blue tuk-tuk outside the shop sign. */
  shopTuktukFriends: "/photos/shop-tuktuk-friends",

  // Fleet product photos (supplied by the business; low resolution, so they
  // are shown small and never enlarged).
  /** TVS Apache 160, black, studio shot padded to 4:3 on white. */
  fleetApache160: "/photos/tvs-apache-160",
  /** Yamaha FZ 160, black, parked on a paved lot. */
  fleetFz160: "/photos/yamaha-fz-160",
  /** Hero Hunk, red, on a paved forecourt. */
  fleetHunk: "/photos/hero-hunk",
  /** Honda Dio, black and yellow, against a shutter. */
  fleetDio: "/photos/honda-dio",
  /** Honda Navi 110cc, red, rider in a red jacket. */
  fleetNavi: "/photos/honda-navi",
  /** TVS Ntorq, grey and black, on a road with pedestrian crossing. */
  fleetNtorq: "/photos/tvs-ntorq",
  /** Yamaha Ray ZR, black and red, on a dirt lane. */
  fleetRayZr: "/photos/yamaha-ray-zr",
} as const;

export const REAL_WIDTHS: Record<string, number> = {
  "/photos/riders-red-scooters": 1254,
  "/photos/scooter-by-the-sea": 3120,
  "/photos/tuktuk-hill-road": 1536,
  "/photos/shop-sign-scooter": 3056,
  "/photos/customers-in-shop": 3056,
  "/photos/shop-fleet": 1200,
  "/photos/shop-entrance": 1200,
  "/photos/tuktuk-beach-friends": 2048,
  "/photos/coast-selfie": 3024,
  "/photos/ntorq-riders": 3056,
  "/photos/tuktuk-stupa": 900,
  "/photos/sunset-helmets": 1200,
  "/photos/tuktuk-beach-trio": 3024,
  "/photos/rider-palms": 704,
  "/photos/cafe-stop": 3056,
  "/photos/red-tuktuk": 3056,
  "/photos/tuktuk-garden": 2048,
  "/photos/motorbike-by-the-sea": 719,
  "/photos/shop-tuktuk-friends": 3056,
  "/photos/tvs-apache-160": 594,
  "/photos/yamaha-fz-160": 513,
  "/photos/hero-hunk": 1024,
  "/photos/honda-dio": 515,
  "/photos/honda-navi": 678,
  "/photos/tvs-ntorq": 400,
  "/photos/yamaha-ray-zr": 522,
};
