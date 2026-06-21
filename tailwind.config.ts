import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yakbangBlack: "#1a1a1a",
        yakbangGold: "#d4af37",
        yakbangPaper: "#f5e6c8"
      },
      fontFamily: {
        script: ["var(--font-script)", "serif"],
        serif: ["var(--font-script)", "serif"]
      },
      boxShadow: {
        royal: "0 0 28px rgba(212, 175, 55, 0.72)"
      }
    }
  },
  plugins: []
};

export default config;
