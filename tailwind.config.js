/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1931',
          900: '#060F1E',
          800: '#0A1931',
          700: '#112544',
          600: '#18345E',
        },
        corporate: {
          DEFAULT: '#1A3D63',
          hover: '#132E4C',
          light: '#245284',
          subtle: '#2E619B',
        },
        steel: {
          DEFAULT: '#4A7FA7',
          hover: '#3B688B',
          light: '#6598BF',
        },
        ice: {
          DEFAULT: '#B3CFE5',
          light: '#E2EEF8',
          dark: '#8CB6D6',
        },
        offwhite: {
          DEFAULT: '#F6FAFD',
          50: '#FFFFFF',
          100: '#F6FAFD',
          200: '#EAF1F8',
          300: '#DDE7F2',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(10, 25, 49, 0.08)',
        'card-hover': '0 12px 28px -4px rgba(10, 25, 49, 0.16)',
        'glow': '0 0 25px rgba(74, 127, 167, 0.35)',
      },
      borderRadius: {
        'card': '16px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
      },
    },
  },
  plugins: [],
}
