import MovedTo from "@/components/MovedTo";

// The previous site's Three Wheelers page is now the Tuk-Tuks section of the
// combined Rentals page. This route stays so old links keep working.
export const metadata = { robots: { index: false } };

export default function Page() {
  return <MovedTo href="/rentals/#tuktuks" label="Tuk-Tuks" />;
}
