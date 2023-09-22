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
        sqyellowfaint: "rgba(255, 208, 115, 0.1)",
        sqsilver: "#DEDEDE",
        sqbronze: "#C97C3D",
        normalreq: "#FFD941",
        hardreq: "#E93B3B",
        expertreq: "#B74BF5",
        normalreqfaint: "rgba(255, 217, 65, 0.1)",
        hardreqfaint: "rgba(233, 59, 59, 0.1)",
        expertreqfaint: "rgba(183, 75, 245, 0.1)",
        navHover: "#3A3A3A",
        navBG: "#2626264d",
        navButtonBG: "#313131",
        navButtonActive: "#464646",
        commonItem: "#7A7A7A",
        uncommonItem: "#5CD722",
        rareItem: "#2594FA",
        epicItem: "#AD00FF",
        legendaryItem: "#FFD600",
        commonItemfaint: "rgba(122, 122, 122, 0.1)",
        uncommonItemfaint: "rgba(92, 215, 34, 0.1)",
        rareItemfaint: "rgba(37, 148, 250, 0.1)",
        epicItemfaint: "rgba(173, 0, 255, 0.1)",
        legendaryItemfaint: "rgba(255, 214, 0, 0.1)",
        blColor: "#e50477",
        blColorfaint: "rgba(230, 20, 116, 0.1)",
        ssColor: "#ffde18",
        ssColorfaint: "rgba(255, 220, 63, 0.1)",
      },
      screens: {
        1920: "1921px",
      },
    },
  },
};
