module.exports = {
  purge: {
    content: ["./pages/**/*.js", "./components/**/*.js"],
    options: {},
  },
  darkMode: false, // or 'media' or 'class'
  theme: {},
  plugins: [require("@tailwindcss/forms")],
};
