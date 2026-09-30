/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/js/**/*.js"
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

