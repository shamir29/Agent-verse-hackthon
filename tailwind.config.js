/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F5F6F8",
        surface: "#FFFFFF",
        border: "#E6E8EC",
        primary: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          light: "#EFF6FF",
        },
        text: {
          primary: "#0F172A",
          secondary: "#5B6472",
          tertiary: "#96A0AC",
        },
        emerald: {
          good: "#059669",
          bg: "#ECFDF5",
        },
        amber: {
          warning: "#B45309",
          bg: "#FFFBEB",
        },
        red: {
          critical: "#DC2626",
          bg: "#FEF2F2",
        },
      },
      borderRadius: {
        card: "18px",
        btn: "12px",
        chip: "8px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
