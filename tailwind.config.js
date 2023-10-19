const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Presicav", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: {
          10: "#011582",
          100: "#000321",
        },
        purple: {
          0: "#A500FB",
          1: "#2C0049",
        },
        pink: {
          0: "#F124AD",
        },
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(18rem, 1fr))",
      },
      animation: {
        slider: "scroll 120s linear infinite",
        color: "colors 1s alternate infinite",
        loader: "sliding 2s alternate infinite",
      },
      keyframes: {
        scroll: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-594px * 7))",
          },
        },
        colors: {
          from: {
            color: "#A429E4",
          },
          to: {
            color: "#F124AD",
          },
        },
        'sliding': {
          '0%': {
            left: '1px',
            color: "#A429E4",
            right: '174px',
          },
          '100%': {
            right: '1px',
            color: "#F124AD",
            left: '174px',
          },
        },
      },
      screens: {
        web: "1620px",
      },
    },
  },
  plugins: [],
};
