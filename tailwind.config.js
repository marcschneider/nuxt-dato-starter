/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Haptik', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        ph: { max: '767px' },
        ta: { min: '768px', max: '1279px' },
        la: { min: '1280px', max: '1919px' },
        sc: { min: '1920px' },
      },
    },
  },
  plugins: [],
}
