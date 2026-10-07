import Link from "next/link";
import { FaHelmetSafety } from "react-icons/fa6";
import { HiCheckCircle } from "react-icons/hi";

/** Free-helmet banner and the three info cards below a vehicle grid. */
export default function RentalInfo({ noun = "Scooter" }: { noun?: string }) {
  return (
    <section className="container-x pb-16 md:pb-20">
      <div data-reveal="zoom" className="flex items-center gap-5 rounded-2xl border border-gold-line bg-gradient-to-r from-gold-soft to-white px-6 py-6 md:px-10">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold-line bg-white text-gold">
          <FaHelmetSafety size={26} />
        </span>
        <div>
          <p className="font-semibold text-ink">Free Helmets with Every Rental</p>
          <p className="mt-0.5 text-[13px] text-ink-muted">Your safety is our priority.</p>
        </div>
      </div>

      <div data-reveal-stagger className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <InfoCard title={`Why Rent a ${noun}?`} items={["Save time & money", "Easy to ride", "Perfect for exploring"]} />
        <InfoCard
          title="Rental Includes"
          items={["Well-maintained vehicle", "Free helmets", "24h support", "Full fuel tank (return)"]}
        />
        <div className="card p-6">
          <h3 className="font-semibold text-ink">Need a different duration?</h3>
          <p className="mt-2 text-[13px] leading-6 text-ink-muted">
            Weekly and monthly rental options are available.
          </p>
          <Link href="/contact" className="btn-gold mt-5">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card p-6">
      <h3 className="font-semibold text-ink">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2 text-[13px] text-ink-soft">
            <HiCheckCircle className="shrink-0 text-gold" size={16} />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
