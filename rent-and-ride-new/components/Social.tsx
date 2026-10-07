import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";
import { SITE } from "@/lib/site";

const LINKS = [
  { label: "Instagram", href: SITE.social.instagram, Icon: FaInstagram, bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]" },
  { label: "Facebook", href: SITE.social.facebook, Icon: FaFacebookF, bg: "bg-[#1877F2]" },
  { label: "YouTube", href: SITE.social.youtube, Icon: FaYoutube, bg: "bg-[#FF0000]" },
  { label: "TikTok", href: SITE.social.tiktok, Icon: FaTiktok, bg: "bg-black" },
];

/** Brand-coloured round social buttons, as in the mockup. */
export default function Social({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  // "sm" only shrinks on desktop; on touch screens every button stays 44px.
  const box = size === "sm" ? "h-11 w-11 lg:h-8 lg:w-8" : "h-11 w-11";
  const icon = size === "sm" ? 16 : 18;

  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {LINKS.map(({ label, href, Icon, bg }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`flex ${box} items-center justify-center rounded-full text-white transition hover:scale-105 ${bg}`}
          >
            <Icon size={icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
