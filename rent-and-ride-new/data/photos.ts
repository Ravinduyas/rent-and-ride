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
