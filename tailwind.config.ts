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
          orange: "#C76D4A",
          orangeDeep: "#A85332",
          dark: "#0B261A",
          navy: "#0B261A",
          navyDeep: "#06160F",
          navyLight: "#15462E",
          silver: "#C7CBD3",
          silverLight: "#E8EBF0",
          muted: "#7A7A85",
          line: "#E6E6E6",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
