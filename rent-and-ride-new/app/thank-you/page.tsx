import Link from "next/link";
import { HiCheck } from "react-icons/hi";
import Logo, { PalmMark } from "@/components/Logo";

export const metadata = {
  title: "Thank You — Rent & Ride Weligama",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section data-reveal-stagger className="container-x flex flex-col items-center py-16 text-center md:py-24">
      <Logo />
      <span className="mt-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-gold-soft text-gold">
        <HiCheck size={40} />
      </span>
      <h1 className="mt-6 text-3xl font-semibold text-ink">Thank You!</h1>
      <p className="lead mt-3 max-w-sm">
        Your message is ready in WhatsApp — just press send. We&apos;ll get back
        to you as soon as possible.
      </p>
      <Link href="/" className="btn-gold mt-8 px-8">
        Back to Home
      </Link>
      <p className="mt-14 flex items-end gap-2 font-script text-3xl leading-tight text-ink-soft">
        <span>
          Ride More.
          <br />
          Worry Less.
        </span>
        <PalmMark className="h-9 w-9 text-gold" />
      </p>
    </section>
  );
}
