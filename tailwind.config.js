/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography'

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./theme.config.tsx"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        "primary": "#148f76",
      }
    },
  },
  plugins: [typography],
}

