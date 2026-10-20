"use client";

import { usePathname } from "next/navigation";

/**
 * Renders its children except on the given routes. Lets the layout drop
 * site-wide chrome (e.g. the footer) from focused pages like /book, while
 * the children themselves stay server components.
 */
export default function HideOn({ paths, children }: { paths: string[]; children: React.ReactNode }) {
  const path = (usePathname() ?? "/").replace(/\/$/, "") || "/";
  if (paths.some((p) => path === p || path.endsWith(p))) return null;
  return <>{children}</>;
}
