/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./assets/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        normal: "rgb(159, 161, 159)",
        grass: "rgb(63, 161, 41)",
        fire: "rgb(230, 40, 41)",
        water: "rgb(41, 128, 239)",
        electric: "rgb(250, 192, 0)",
        ice: "rgb(61, 206, 243)",
        fighting: "rgb(255, 128, 0)",
        poison: "rgb(145, 65, 203)",
        ground: "rgb(145, 81, 33)",
        flying: "rgb(129, 185, 239)",
        psychic: "rgb(239, 65, 121)",
        bug: "rgb(145, 161, 25)",
        rock: "rgb(175, 169, 129)",
        ghost: "rgb(112, 65, 112)",
        steel: "rgb(96, 161, 184)",
        dragon: "rgb(80, 96, 225)",
        dark: "rgb(98, 77, 78)",
        fairy: "rgb(239, 112, 239)",
        pokeDexRed: "#DE1537",
        pokeDexBlack: "#fffff",
        pokeDexWhite: "#F5F5F5",
        pokeDexBlue: "##27A4F3",
        unboundPurple: "#641e8c",
      },
    },
  },
  plugins: [],
};
