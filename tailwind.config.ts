import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Pale sage + bright orange. The key keeps its `cream` name so
          // existing markup doesn't have to change.
          orange: "#EE5B2B",
          orangeDeep: "#D2481C",
          orangeSoft: "#FBEAE1",
          amber: "#F2B33D",
          cream: "#ECEEE3",
          // Sits directly on `cream` (footer social chips), so it has to stay
          // a clear step darker than it.
          creamDeep: "#DDE1CF",
          ink: "#37321F",
          inkDeep: "#262214",
          inkSoft: "#4C4633",
          dark: "#2E2A1C",
          muted: "#8E887A",
          // Borders on white cards, but also the footer divider and the
          // carousel's inactive dots, which sit on `cream`.
          line: "#D5DAC6",

          // Legacy keys kept so older markup keeps rendering, repointed
          // from the previous navy/silver scheme onto the warm palette.
          navy: "#37321F",
          navyDeep: "#262214",
          navyLight: "#4C4633",
          silver: "#E8E2D5",
          silverLight: "#F1ECE0",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
