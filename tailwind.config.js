/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        haptik: ['GT Haptik', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        phone: { max: '767px' },
        tablet: { min: '768px', max: '1279px' },
        laptop: { min: '1280px', max: '1919px' },
        desktop: { min: '1920px' },
      },
    },
  },
  plugins: [],
}
