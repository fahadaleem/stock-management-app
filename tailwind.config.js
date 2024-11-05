module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#ffae00",
        secondary: "#adb5bd",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
