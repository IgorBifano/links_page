import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"]
      },
      colors: {
        base: "#050505",
        surface: "#0d0f10",
        card: "#131618",
        line: "#232a2f",
        accent: "#5df2c9",
        accentSoft: "#1c5f50",
        text: "#f5f7f7",
        muted: "#99a6ad"
      },
      boxShadow: {
        card: "0 24px 80px rgba(0, 0, 0, 0.34)",
        glow: "0 0 0 1px rgba(93, 242, 201, 0.2), 0 18px 50px rgba(17, 71, 60, 0.28)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
