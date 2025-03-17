/** @type {import('tailwindcss').Config} */

const typography = require("@tailwindcss/typography");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./theme.config.tsx"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: "#148f76",
        "primary-light": "#1fab89",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - .5rem))",
          },
        },
      },
    },
  },
  plugins: [typography],
  darkMode: ["class", 'html[class~="dark"]'],
};
