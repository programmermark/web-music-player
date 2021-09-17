module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "spin-30": "spin 30s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
