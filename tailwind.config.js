/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "screen-minus-header": "calc(100vh-73px)",
      },
    },
  },
  plugins: [],
};
