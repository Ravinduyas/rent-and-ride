import BookingFlow from "@/components/BookingFlow";

export const metadata = {
  title: "Book a Scooter, Bike or Tuk-Tuk — Rent & Ride Weligama",
  description:
    "Choose your scooter, bike or tuk-tuk, pick your dates, and send your booking to us on WhatsApp in under a minute.",
};

// Each step of the flow carries its own heading, so the page is just the flow.
export default function BookPage() {
  return (
    <section className="container-x py-4 sm:py-8">
      <BookingFlow />
    </section>
  );
}
