import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        jetBrainsMono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        accent: "#1A51DB",
        secondary: "#EF4723",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
