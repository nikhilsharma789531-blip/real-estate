/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F7F4',
          100: '#E4ECE7',
          200: '#C8DAD0',
          300: '#A1BEAE',
          400: '#729C85',
          500: '#467B62',
          600: '#2D614D',
          700: '#1B4332', // Primary Brand Forest Green
          800: '#153528',
          900: '#0E221A',
        },
        sand: {
          50: '#FAF8F5',
          100: '#F4EFEA', // Muted beige
          200: '#E8E1D5',
          300: '#D5C8B6',
          400: '#BDB09B',
          500: '#9B8C77',
        },
        charcoal: {
          50: '#F7F7F7',
          100: '#E3E3E3',
          200: '#C7C7C7',
          400: '#767676',
          600: '#3D413F',
          700: '#2A2E2C',
          800: '#1F2421', // Primary Charcoal
          900: '#131614',
        },
        warmWhite: '#FCFAF7',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'card': '0 10px 30px -5px rgba(27, 67, 50, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'elevated': '0 20px 40px -15px rgba(27, 67, 50, 0.12)',
      }
    },
  },
  plugins: [],
}
