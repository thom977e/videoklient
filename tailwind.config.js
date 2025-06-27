/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Til React + Vite
  ],
  theme: {
    extend: {
      dropShadow: {
        glow: '0 0 6px #0ff',
      },
    },
  plugins: [],
}
}
