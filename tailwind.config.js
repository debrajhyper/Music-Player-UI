/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '460': '28.75rem',
        '400': '25rem',
      },
    },
  },
  plugins: [],
}

