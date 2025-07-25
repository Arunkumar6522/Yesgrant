/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A9D93",
        secondary: "#212529",
        dark: "#212529",
        light: "#ffffff",
        dark2: "#6B7280",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
        },
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-medium': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) 0.2s infinite',
        'pulse-slow': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) 0.4s infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

