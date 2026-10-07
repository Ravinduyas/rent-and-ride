import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";
import { asset } from "@/lib/asset";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppDock from "@/components/WhatsAppDock";
import Preloader from "@/components/Preloader";
import RouteProgress from "@/components/RouteProgress";
import ScrollEffects from "@/components/ScrollEffects";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rent & Ride Weligama — Scooter & Bike Rental",
  description:
    "Scooter and bike rental in Weligama, Mirissa and Ahangama. Free helmets, free delivery, driving permit help and 24/7 WhatsApp support.",
  icons: { icon: asset("/logo.svg"), apple: asset("/logo.svg") },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the page run under the iPhone home indicator; the sticky WhatsApp
  // bar pads itself with env(safe-area-inset-bottom) to stay clear of it.
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds data attributes
    // to <html> before React hydrates.
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Every photo comes from Unsplash: open that connection (DNS, TLS)
            while the HTML is still parsing, ahead of the hero image. */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* Enables the motion CSS only when scripts run; the timeout matches
            the splash (~0.8s) in case the preloader component is slow to
            hydrate. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.dataset.js='';setTimeout(function(){document.documentElement.dataset.ready=''},850)",
          }}
        />
      </head>
      <body>
        <Preloader />
        <RouteProgress />
        <ScrollEffects />
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <WhatsAppDock />
      </body>
    </html>
  );
}
