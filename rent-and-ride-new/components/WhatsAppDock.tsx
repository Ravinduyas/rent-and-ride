import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "@/lib/site";

/**
 * Floating WhatsApp button, bottom right, on every screen size.
 * Phones get just the round button (a full-width bar along the bottom
 * covered too much of a small screen); from lg up it also shows a
 * "Chat with us" label. It sits above the iPhone home indicator.
 */
export default function WhatsAppDock() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-3 lg:bottom-6 lg:right-6"
    >
      <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-lift lg:inline">
        Chat with us
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_25px_-6px_rgba(37,211,102,0.65)] transition hover:scale-105 active:scale-95">
        <FaWhatsapp size={30} />
      </span>
    </a>
  );
}
