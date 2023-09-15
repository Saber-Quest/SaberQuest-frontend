/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        background: "background ease infinite",
      },
      keyframes: {
        background: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      dropShadow: {
        navBarShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        rank1Shadow: "0 0 0.5em #FFD073aa",
        rank2Shadow: "0 0 0.5em #DEDEDEaa",
        rank3Shadow: "0 0 0.5em #C97C3Daa",
        logoShadow: "0 0 0.5em #FFD073aa",
        textShadow: "0 2px 2px #00000070",
        PFPShadow: "2px 2px 1px #00000070",
      },
      boxShadow: {
        navHoverShadow: "0 18px 15px -15px #FFD073aa",
      },
      colors: {
        sqyellow: "#FFD073",
        sqsilver: "#DEDEDE",
        sqbronze: "#C97C3D",
        easyreq: "#03F46B",
        normalreq: "#FFD941",
        hardreq: "#E93B3B",
        expertreq: "#B74BF5",
        navHover: "#3A3A3A",
        navBG: "#2626264d",
        navButtonBG: "#313131",
        navButtonActive: "#464646",
      },
      screens: {
        1920: "1921px",
      },
    },
  },
};
