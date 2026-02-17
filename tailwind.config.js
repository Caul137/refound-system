/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#b89e49',
        'dark-bg': '#19181b',
        'card-bg': '#282829',
      }
    },
  },
  plugins: [],
}