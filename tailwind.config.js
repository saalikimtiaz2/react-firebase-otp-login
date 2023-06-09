/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "0px",
      xs: "250px",
      s: "350px",
      sm: "768px",
      md: "1024px",
      lg: "1200px",
      xl: "1369px",
    },
    extend: {
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
