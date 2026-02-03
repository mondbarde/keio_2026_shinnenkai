/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 慶應義塾大学 공식 컬러
        'keio-blue': '#00356B',
        'keio-blue-light': '#1E5799',
        'keio-blue-dark': '#002244',
        // 삼색기 악센트
        'keio-red': '#DC143C',
        'keio-yellow': '#FFD700',
        'keio-accent-blue': '#4169E1',
      },
      fontFamily: {
        'jp': ['"Noto Sans JP"', '"Hiragino Sans"', 'sans-serif'],
        'display': ['"Noto Serif JP"', 'serif'],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.3)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'keio-gradient': 'linear-gradient(135deg, #00356B 0%, #1E5799 50%, #002244 100%)',
        'celebration-gradient': 'linear-gradient(135deg, #00356B 0%, #DC143C 50%, #FFD700 100%)',
      },
    },
  },
  plugins: [],
}
