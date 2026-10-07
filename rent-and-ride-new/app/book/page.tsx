import BookingFlow from "@/components/BookingFlow";

export const metadata = {
  title: "Book a Scooter or Bike — Rent & Ride Weligama",
  description:
    "Choose your scooter or bike, pick your dates and delivery, and send your booking to us on WhatsApp in under a minute.",
};

export default function BookPage() {
  return (
    <section className="container-x py-8 sm:py-14">
      <div className="mx-auto mb-6 max-w-3xl sm:mb-8">
        <p className="eyebrow">Booking</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">Book your ride</h1>
        <p className="lead mt-2">
          Four quick steps. Your booking arrives on our WhatsApp, and we reply to
          confirm availability and the final price.
        </p>
      </div>
      <BookingFlow />
    </section>
  );
}
