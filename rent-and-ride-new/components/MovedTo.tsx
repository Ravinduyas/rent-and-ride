import Link from "next/link";
import { basePath } from "@/lib/asset";

/**
 * Forwards an old address to where its content lives now.
 *
 * The site is a static export with no server, so it can't send a real
 * redirect, and next/navigation's redirect() only takes effect once the
 * JavaScript has loaded (and leaves out the GitHub Pages base path). A meta
 * refresh is acted on by the browser as soon as it's parsed — the HTML spec
 * applies it wherever in the document it appears — so this forwards
 * instantly, with or without JavaScript. The link is a last resort.
 */
export default function MovedTo({ href, label }: { href: string; label: string }) {
  return (
    <section className="container-x py-24 text-center">
      <meta httpEquiv="refresh" content={`0;url=${basePath}${href}`} />
      <p className="lead">
        {label} has moved.{" "}
        <Link href={href} className="font-semibold text-gold-deep underline">
          Continue to {label}
        </Link>
      </p>
    </section>
  );
}
