const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{html,woff2}",
    "./src/**/*.css",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif", "ui-sans-serif", "system-ui"],
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      dropShadow: {
        navBarShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        logoShadow: "0 0 0.5em #FFD073aa",
      },
      boxShadow: {
        navHoverShadow: "0 18px 15px -15px #FFD073aa",
      },
      colors: {
        sqyellow: "#FFD073",
        easyreq: "#03F46B",
        mediumreq: "#FFD941",
        hardreq: "#E93B3B",
        extremereq: "#B74BF5",
        navHover: "#3A3A3A",
        navBG: "#2626264d",
        navButtonBG: "#313131",
        navButtonActive: "#464646",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
