import MovedTo from "@/components/MovedTo";

// Driving Permit is now a section of the combined Rentals page. This route stays
// so old links and bookmarks keep working.
export const metadata = { robots: { index: false } };

export default function Page() {
  return <MovedTo href="/rentals/#driving-permit" label="Driving Permit" />;
}
