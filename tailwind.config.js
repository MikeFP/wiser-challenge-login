const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "400px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: {
          500: "#989FDB",
          550: "#9D25B0",
          600: "#693999",
          700: "#383E71",
          900: "#130525",
          "600-opacity-0": "#69399900",
        },
        danger: "#FF377F",
        gray: {
          "flat-100": "#FAF5FF",
        },
      },
      fontSize: {
        "4xl": "2.5rem",
      },
      maxWidth: {
        xs: "16rem",
      },
      lineHeight: {
        12: "3rem",
      },
      margin: {
        34: "8.5rem",
      },
      boxShadow: {
        "3xl": "0px 10px 25px #CF99DB",
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ['hover'],
    },
  },
  plugins: [],
};
