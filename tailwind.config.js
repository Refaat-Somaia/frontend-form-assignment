/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primaryColor: "var(--primary-color)",
        background: "var(--background-color)",
        text: "var(--text-color)",
        secondaryColor: "var(--secondary-color)",
        fontColor: "var(--font-color)",
        offColor: "var(--off-color)",

        gradient: "var(--grad)",
        boxShadow: {
          primary: "0 4px 6px -1px var(--primary-color)", // example with Tailwind's blue-500
        },
      },
    },
  },
  plugins: [],
};
