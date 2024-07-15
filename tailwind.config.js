/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 'primary-color': '#072AC8',
        'primary-color':'#3458D9',
        'custom-gradient': 'linear-gradient(90deg, #5A78FF 0%, #072AC8 100%)',
      }
    },
  },
  plugins: [],
}