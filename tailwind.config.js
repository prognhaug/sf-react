/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "custom-red":
          "0 1px 3px rgba(255, 0, 0, 0.1), 0 1px 2px rgba(255, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
