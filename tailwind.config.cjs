/** @type {import('tailwindcss').Config} */
const typography = require("@tailwindcss/typography");

module.exports = {
  darkMode: "class",
  content: [
    "./docs/**/*.{md,mdx}",
    "./src/**/*.{ts,tsx}",
    "./theme/**/*.{ts,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: "#2B937C",
        "primary-deep": "#238C76",
        "primary-pressed": "#1D7562",
        "brand-dark": "#1A5C4E",
        "brand-light": "#5FD3B8",
        "brand-soft": "#D4EDE7",
        canvas: "#FFFFFF",
        surface: "#F9FBFA",
        "surface-soft": "#F4F7F6",
        "surface-feature": "#E8F5F1",
        "teal-deep": "#0F2E29",
        "teal-mid": "#1A4A42",
        ink: "#0F2E29",
        charcoal: "#1C2D38",
        slate: "#3D4F5B",
        steel: "#5C6C7A",
        stone: "#7C8C9A",
        muted: "#A8B3BC",
        hairline: "#E1E5E8",
        "hairline-soft": "#ECEFF1",
        "hairline-strong": "#C1CCD6",
        "accent-blue": "#3D4F9F",
        "accent-orange": "#FA6E39",
        "accent-purple": "#7B3FF2",
        "accent-pink": "#F06BB8",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Inter Fallback",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "ai-flow":
          "repeating-linear-gradient(90deg, rgba(34, 211, 238, 0.12) 0%, rgba(167, 139, 250, 0.2) 16.67%, rgba(232, 121, 249, 0.18) 33.33%, rgba(34, 211, 238, 0.12) 50%)",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "ai-colors": "ai-colors 6s linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - .5rem))",
          },
        },
        "ai-colors": {
          "0%": {
            backgroundPosition: "100% 50%",
            borderColor: "rgba(34, 211, 238, 0.7)",
          },
          "33%": {
            backgroundPosition: "67% 50%",
            borderColor: "rgba(167, 139, 250, 0.7)",
          },
          "66%": {
            backgroundPosition: "34% 50%",
            borderColor: "rgba(232, 121, 249, 0.7)",
          },
          "100%": {
            backgroundPosition: "0% 50%",
            borderColor: "rgba(34, 211, 238, 0.7)",
          },
        },
      },
    },
  },
  plugins: [typography],
};
