/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.js",
    "./*.php"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#ff0000',
          darkred: '#dc2626'
        }
      }
    },
  },
  plugins: [],
}
