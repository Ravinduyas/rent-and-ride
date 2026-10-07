import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // lib/ holds shared class names too (e.g. SECTION_OFFSET in sections.ts);
    // without this they're silently missing from the production CSS.
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm white + antique gold, after the 2026 redesign mockup.
        gold: {
          DEFAULT: "#A6852E",
          deep: "#8A6D22",
          soft: "#F5EFDF",
          line: "#E6D9B5",
        },
        ink: {
          DEFAULT: "#1E2226",
          soft: "#3A3F45",
          muted: "#6B7078",
        },
        paper: "#FAF8F3",
        line: "#E8E4DA",
        night: "#14171A",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      maxWidth: {
        container: "1240px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,23,26,0.04), 0 8px 24px -12px rgba(20,23,26,0.12)",
        lift: "0 2px 4px rgba(20,23,26,0.05), 0 18px 40px -16px rgba(20,23,26,0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
