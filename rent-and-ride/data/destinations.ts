export type Destination = {
  name: string;
  region: string;
  blurb: string;
  ride: string;
  image: string;
};

// Placeholder photography, same arrangement as data/vehicles.ts: the Unsplash
// IDs below are verified to load, but they are stock travel shots rather than
// these specific places. Swap for real photography when it is available.
const IMG = {
  surf: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=80",
  palms: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=900&q=80",
  town: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=900&q=80",
  bay: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
  hills: "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?auto=format&fit=crop&w=900&q=80",
  backroad:
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
};

export const DESTINATIONS: Destination[] = [
  {
    name: "Mirissa Beach",
    region: "Southern Province",
    blurb:
      "Twenty minutes down the coast road — whale watching boats, a long crescent of sand and the easiest sunset on the south coast.",
    ride: "20 min · 8 km",
    image: IMG.surf,
  },
  {
    name: "Coconut Tree Hill",
    region: "Mirissa",
    blurb:
      "The island's most photographed headland, a short climb above Mirissa harbour. Go early and you'll have the palms to yourself.",
    ride: "25 min · 9 km",
    image: IMG.palms,
  },
  {
    name: "Galle Fort",
    region: "Galle",
    blurb:
      "A Dutch-era walled town of ramparts, lighthouses and coffee shops. An easy run west along the A2 with the sea beside you.",
    ride: "45 min · 30 km",
    image: IMG.town,
  },
  {
    name: "Hiriketiya Bay",
    region: "Dikwella",
    blurb:
      "A horseshoe bay made for longboards, worth the hour's ride east through paddy fields and coconut estates.",
    ride: "1 hr · 40 km",
    image: IMG.bay,
  },
  {
    name: "Ella & the Hill Country",
    region: "Uva Province",
    blurb:
      "Trade the coast for tea country — waterfalls, the Nine Arch Bridge and cool mountain air. Our most popular multi-day route.",
    ride: "3.5 hrs · 130 km",
    image: IMG.hills,
  },
  {
    name: "Yala Backroads",
    region: "Hambantota",
    blurb:
      "Quiet inland tracks toward the national park, with elephants at the roadside if you time the evening right.",
    ride: "2.5 hrs · 100 km",
    image: IMG.backroad,
  },
];
