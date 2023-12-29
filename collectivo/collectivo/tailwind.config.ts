import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: "#0F1A2B",
        active: "#4E3095",
        gray: "#A1A6AC",
        cyan: "#2CB3A5",
        orange: "#D36D29",
        red: "#D94C4C",
        violet: "#AA4ABC",
        blue: "#5E84E7",

        "primary-light": "#0f1a2b99",
        "cyan-light": "#EAFFF8",
        "violet-light": "#FDF2FF",
        "orange-light": "#FFF7E3",
        "red-light": "#FFF2F1",
        "purple-light": "#ECF1FD",
        "blue-light": "#64c7ff1a",
        "gray-light": "#F4F7FE",

        purple: {
          50: "#3b2476",
          100: "#3b2476",
          200: "#3b2476",
          300: "#3b2476",
          400: "#3b2476",
          500: "#3b2476",
          600: "#3b2476",
          700: "#3b2476",
          800: "#3b2476",
          900: "#3b2476",
          950: "#3b2476",
        },
      },
      boxShadow: {
        sidebar: "0px 0px 48px 0px rgba(220, 226, 239, 0.50)",
      },
      fontSize: {
        lg: ["1.125rem", { lineHeight: "22px" }],
        xl: ["1.25rem", { lineHeight: "24px" }],
        "2xl": ["1.5rem", { lineHeight: "30px" }],
        "3xl": ["1.625rem", { lineHeight: "32px" }],
        "4xl": ["1.875rem", { lineHeight: "36px" }],
      },
      fontFamily: {
        urbanist: '"Urbanist", sans-serif',
      },
      gridTemplateColumns: {
        "custom-4": "repeat(4, minmax(270px, 1fr))",
      },
    },
  },
};
