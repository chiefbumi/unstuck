// /** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors');
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx,css,scss}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css,scss}",
  ],
  plugins: [
    require('tw-elements/plugin')
  ],
  theme: {
    colors: {
      // Other Colors
      ...colors
    },
    extend: {},
  },
  plugins: [],
});