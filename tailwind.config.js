/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-pink-100",
    "bg-yellow-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-purple-100",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Comfortaa", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },

  plugins: [],
};