/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      ...colors,
      slate: {
        50: '#f5f9fa',
        100: '#eaf2f5',
        200: '#cbe0e7',
        300: '#abcdd9',
        400: '#6da7bc',
        500: '#2e819f',
        600: '#29748f',
        700: '#236177',
        800: '#1c4d5f',
        900: '#173f4e',
      },
      red: {
        50: '#fef6f4',
        100: '#fdede9',
        200: '#fbd1c9',
        300: '#f9b5a9',
        400: '#f47e68',
        500: '#ef4627',
        600: '#d73f23',
        700: '#b3351d',
        800: '#8f2a17',
        900: '#752213',
      },
      green: {
        50: '#fdfdf7',
        100: '#fbfcef',
        200: '#f4f7d6',
        300: '#edf3bd',
        400: '#e0e98c',
        500: '#d2e05b',
        600: '#bdca52',
        700: '#9ea844',
        800: '#7e8637',
        900: '#676e2d',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
