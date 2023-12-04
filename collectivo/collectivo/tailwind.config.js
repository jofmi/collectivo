/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "cv-primary": "#0F1A2B",
        "cv-active": "#4E3095",
        "cv-purple": "#4E3095",
        "cv-gray": "#A1A6AC",
        "cv-cyan": "#2CB3A5",
        "cv-orange": "#D36D29",
        "cv-red": "#D94C4C",
        "cv-violet": "#AA4ABC",
        "cv-blue": "#5E84E7",

        "cv-primary-light": "#0f1a2b99",
        "cv-cyan-light": "#EAFFF8",
        "cv-violet-light": "#FDF2FF",
        "cv-orange-light": "#FFF7E3",
        "cv-red-light": "#FFF2F1",
        "cv-purple-light": "#ECF1FD",
        "cv-blue-light": "#64c7ff1a",
        "cv-gray-light": "#F4F7FE",
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
