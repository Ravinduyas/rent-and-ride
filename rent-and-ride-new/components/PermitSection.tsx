import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineIdentification, HiOutlineDocumentText, HiOutlineBadgeCheck } from "react-icons/hi";
import { whatsappLink } from "@/lib/site";
import { SECTION_OFFSET } from "@/lib/sections";

const STEPS = [
  {
    Icon: HiOutlineIdentification,
    title: "Send your documents",
    body: "WhatsApp us a photo of your home driving licence (with a motorcycle category) and your passport.",
  },
  {
    Icon: HiOutlineDocumentText,
    title: "We handle the paperwork",
    body: "We prepare and submit the application for your Sri Lankan recognition permit and keep you updated on WhatsApp.",
  },
  {
    Icon: HiOutlineBadgeCheck,
    title: "Ride legally",
    body: "Carry the permit with your licence whenever you ride. We'll hand it over with your scooter or bike.",
  },
];

/** Driving permit section of the Rentals page. */
export default function PermitSection({ id }: { id: string }) {
  return (
    <section id={id} className={`bg-white py-12 md:py-20 ${SECTION_OFFSET}`}>
      <div className="container-x">
        <div data-reveal>
          <h2 className="h-section">Driving Permit Assistance</h2>
          <p className="lead mt-1 max-w-xl">
            To ride in Sri Lanka you need your home licence plus a local permit.
            We sort it out for you.
          </p>
        </div>

        <ol data-reveal-stagger className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-3 md:gap-5">
          {STEPS.map(({ Icon, title, body }, i) => (
            <li key={title} className="card relative p-6">
              <span className="absolute right-5 top-5 text-3xl font-semibold text-gold-soft">0{i + 1}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold">
                <Icon size={24} />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-ink-muted">{body}</p>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-gold-line bg-gold-soft px-6 py-8 sm:mt-10 md:flex-row md:items-center md:px-10">
          <div>
            <p className="text-lg font-semibold text-ink">Not sure what you need?</p>
            <p className="mt-1 text-sm text-ink-muted">
              Tell us which country your licence is from and we&apos;ll explain the options.
            </p>
          </div>
          <a
            href={whatsappLink("Hi Rent & Ride! I need help with a driving permit. My licence is from: ")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full shrink-0 md:w-auto"
          >
            <FaWhatsapp size={18} /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
