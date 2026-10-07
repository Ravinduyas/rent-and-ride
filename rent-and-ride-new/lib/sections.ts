/**
 * Shared by the Rentals page sections and its pinned SectionTabs. Kept out
 * of SectionTabs.tsx because that's a client module, and a server component
 * importing a plain value from one gets a client reference, not the value.
 */

/** Space a jump-linked section leaves above itself: header (72px) + the
 *  pinned section tabs (~65px) + breathing room. */
export const SECTION_OFFSET = "scroll-mt-[150px]";

export type SectionIcon = "scooter" | "bike" | "permit";

/** Icons are named rather than passed as components, because functions
 *  can't cross from a server component into a client one. */
export type SectionLink = {
  id: string;
  label: string;
  /** Shown instead of `label` on phones, so every tab fits on screen. */
  short?: string;
  icon: SectionIcon;
};
