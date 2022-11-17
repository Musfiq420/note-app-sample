/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '0px',
      // => @media (min-width: 576px) { ... }

      'tablet': '660px',
      // => @media (min-width: 960px) { ... }

      'desktop': '1024px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {},
  },
  plugins: [],
}
