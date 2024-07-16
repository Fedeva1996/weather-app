module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: { extend: {} },
  plugins: [],
  darkMode: "class",
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
      // otros estilos que necesites
    },
  },
};
