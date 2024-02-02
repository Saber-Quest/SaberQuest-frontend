/** @type {import('tailwindcss').Config} */
const purgecss = require("@fullhuman/postcss-purgecss");
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{html,woff2}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "slide-in": "slide-in 1s ease-out",
      },
      keyframes: {
        "slide-in": {
          "0%": { opacity: 0, transform: "translateX(-25%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      colors: {
        sky: colors.sky,
        teal: colors.teal,
        rose: colors.rose,
      },
    },
    fontFamily: {
      hikou: ["Hikou", "sans-serif", "ui-sans-serif", "system-ui"],
      bebas: ["Bebas Neue", "sans-serif", "ui-sans-serif", "system-ui"],
      poppins: ["Poppins", "sans-serif", "ui-sans-serif", "system-ui"],
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    purgecss({
      content: ["./**/*.html"],
    }),
  ],
  presets: [require("./tailwind.preset.js")],
  variants: {
    scrollbar: ["rounded"],
  },
};
