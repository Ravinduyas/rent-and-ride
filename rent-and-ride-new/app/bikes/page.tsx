import MovedTo from "@/components/MovedTo";

// Bikes now share a page with scooters. This route stays so old links and
// bookmarks keep working.
export const metadata = { robots: { index: false } };

export default function Page() {
  return <MovedTo href="/scooters/#bikes" label="Bikes" />;
}
