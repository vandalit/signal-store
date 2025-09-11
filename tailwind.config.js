/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          400: '#FF7F7F',
          500: '#FF6B6B',
          600: '#FF5252',
        }
      }
    },
  },
  plugins: [],
  darkMode: "class"
}
