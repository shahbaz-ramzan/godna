/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "var(--color-primary)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        warning: "var(--color-warning)",
        background: "var(--color-background)",
        blue: "var(--color-blue)",
        destructive: "var(--color-destructive)",
        lightGray: "var(--color-lightGray)",
      },
    },
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{scss}",
  ],
  plugins: [],
};
