module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        "md-left": "-4px -4px 6px -1px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "spin-30": "spin 30s linear infinite",
      },
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-24": "span 24 / span 24",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
