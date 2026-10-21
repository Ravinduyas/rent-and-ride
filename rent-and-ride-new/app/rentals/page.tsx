import MovedTo from "@/components/MovedTo";

// Scooters, bikes and tuk-tuks now each have their own page. This route stays
// so old links and bookmarks keep working.
export const metadata = { robots: { index: false } };

export default function Page() {
  return <MovedTo href="/scooters/" label="Rentals" />;
}
