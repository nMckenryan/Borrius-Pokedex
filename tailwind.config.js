/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./assets/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        normal: "#A8A77A",
        grass: "#9bcc50",
        fire: "#ff7b00",
        water: "#0097e6",
        electric: "#f7dc5c",
        grass: "#8bc34a",
        ice: "#66d9ef",
        fighting: "#e53935",
        poison: "#9c27b0",
        ground: "#757575",
        flying: "#66d9ef",
        psychic: "#ff5722",
        bug: "#8bc34a",
        rock: "#455a64",
        ghost: "#4db6ac",
        steel: "#90a4ae",
        dragon: "#0097e6",
        dark: "#212121",
        fairy: "#e1bee7",
      },
    },
  },
  plugins: [],
};
