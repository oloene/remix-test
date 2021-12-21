const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "white-alpha": "rgba(255,255,255,0.4)",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        progress: "80px 1fr 80px",
      },
      flex: {
        full: "1 1 100%",
      },
      keyframes: {
        ripple: {
          "0%": {
            transform: "scale(0)",
            opacity: 1,
          },
          "100%": { transform: "scale(4)", opacity: 0 },
        },
      },
      animation: {
        ripple: "ripple 1000ms linear forwards",
      },
    },
  },
  plugins: [],
};
