import MovedTo from "@/components/MovedTo";

// Driving Permit is now a section at the bottom of both the Scooters & Bikes
// and Tuk-Tuks pages. This route stays so old links and bookmarks keep working.
export const metadata = { robots: { index: false } };

export default function Page() {
  return <MovedTo href="/scooters/#driving-permit" label="Driving Permit" />;
}
