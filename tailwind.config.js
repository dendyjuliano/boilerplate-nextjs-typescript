/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: {
        main: "#43936C",
        surface: "#F1FFF7",
        border: "#B8DBCA",
        hover: "#367A59",
        pressed: "#20573D",
      },
      danger: {
        main: "#CB3B31",
        surface: "#FFF4F2",
        border: "#EEB4B0",
        hover: "#BD251C",
        pressed: "#731912",
      },
      warning: {
        main: "#CD7B2E",
        surface: "#FFF9F2",
        border: "#EECEB0",
        hover: "#BF6919",
        pressed: "#734011",
      },
      info: {
        main: "#3267E3",
        surface: "#F0F3FF",
        border: "#B1C5F6",
        hover: "#114CD6",
        pressed: "#11317D",
      },
      neutral: {
        10: "#FFFFFF",
        20: "#F6F6F6",
        30: "#F0F0F0",
        40: "#E5E5E5",
        50: "#CBCBCB",
        60: "#ADADAD",
        70: "#939393",
        80: "#7A7A7A",
        90: "#757575",
        100: "#282828",
      },
    },
    fontSize: {
      s: "8px",
      m: "12px",
      l: "14px",
      xl: "16px",
      hs: "20px",
      hm: "28px",
      hl: "36px",
    },
    extend: {
      spacing: {
        s: "4px",
        m: "8px",
        l: "16px",
        xl: "32px",
        xl: "48px",
      },
      boxShadow: {
        sm: "0px 1px 2px 0px rgba(16, 24, 40, 0.12)",
        md: "0px 4px 8px 0px rgba(16, 24, 40, 0.10)",
        lg: "1px 2px 2px 0px rgba(16, 24, 40, 0.08) inset",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      borderRadius: {
        xs: "4px",
        s: "8px",
        m: "16px",
        l: "18px",
        rounded: "50%",
      },
    },
  },
  plugins: [],
};
