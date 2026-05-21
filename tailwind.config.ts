import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pitchBlack: "#060606",
        stadiumOrange: "#ff7a18",
        luxuryGold: "#D4AF37"
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #8f6b29, #f5d27f 45%, #8f6b29)",
        "stadium-glow": "radial-gradient(circle at 50% -10%, rgba(255,122,24,0.35), transparent 55%)"
      },
      boxShadow: {
        glow: "0 0 40px rgba(212,175,55,0.22)",
        orange: "0 0 80px rgba(255,122,24,0.18)"
      }
    }
  },
  plugins: []
};

export default config;
