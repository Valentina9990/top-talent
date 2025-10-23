/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F0',
          100: '#FFE8D9',
          500: '#FF8838',
          600: '#FF6600',
          700: '#E55C00',
        },
        gray: {
          50: '#F9F9F9',
          100: '#F5F5F5',
          900: '#202020',
        }
      },
      backgroundColor: {
        default: '#FFFFFF',
      }
    },
  },
  plugins: [],
}