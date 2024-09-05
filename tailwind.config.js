/** @type {import('tailwindcss/types').Config} */
const nativewind = require("nativewind/tailwind/native");
module.exports = {
  content: [
    "./App.js",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./assets/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grass: "#9bcc50",
      },
    },
  },
  plugins: [nativewind()],
};
