/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        handwritten: ['Caveat', 'cursive'],
      },
      colors: {
        brand: {
          night: '#0F1B4C',
          diva: '#1565D8',
          sea: '#00A8E8',
          sky: '#EAF6FF',
          sun: '#FFC93C',
          coral: '#F99279',
          white: '#FFFFFF',
        },
        primary: {
          50: '#EAF6FF',
          100: '#EAF6FF',
          200: '#EAF6FF',
          300: '#00A8E8',
          400: '#1565D8',
          500: '#1565D8',
          600: '#1565D8',
          700: '#0F1B4C',
          800: '#0F1B4C',
          900: '#0F1B4C',
        },
        secondary: {
          50: '#FFFFFF',
          100: '#EAF6FF',
          200: '#FFFFFF',
          300: '#EAF6FF',
          400: '#FFFFFF',
          500: '#0F1B4C',
          600: '#0F1B4C',
          700: '#0F1B4C',
          800: '#0F1B4C',
          900: '#0F1B4C',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}