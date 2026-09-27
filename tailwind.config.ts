import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./data/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        base: "#010103",
        surface: "#06070c",
        line: "#1E2637",
        text: "#F1F5F9",
        muted: "#94A3B8",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
