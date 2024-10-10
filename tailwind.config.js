module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#00509d",
        secondary: "#adb5bd",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
