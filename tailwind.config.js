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
      },
      backgroundImage: {
        "ai-flow": "repeating-linear-gradient(90deg, rgba(34, 211, 238, 0.12) 0%, rgba(167, 139, 250, 0.2) 16.67%, rgba(232, 121, 249, 0.18) 33.33%, rgba(34, 211, 238, 0.12) 50%)",
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
          "0%": { backgroundPosition: "100% 50%", borderColor: "rgba(34, 211, 238, 0.7)" },
          "33%": { backgroundPosition: "67% 50%", borderColor: "rgba(167, 139, 250, 0.7)" },
          "66%": { backgroundPosition: "34% 50%", borderColor: "rgba(232, 121, 249, 0.7)" },
          "100%": { backgroundPosition: "0% 50%", borderColor: "rgba(34, 211, 238, 0.7)" },
        },
      },
    },
  },
  plugins: [typography],
  darkMode: ["class", 'html[class~="dark"]'],
};
