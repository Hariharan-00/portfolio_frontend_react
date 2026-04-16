/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Space Mono', 'monospace'],
        'sans': ['Outfit', 'sans-serif'],
      },
      colors: {
        'neon': '#00FF94',
        'neon-blue': '#00D4FF',
        'dark': '#080B12',
        'dark-2': '#0D1117',
        'dark-3': '#161B27',
        'dark-4': '#1E2535',
        'muted': '#6B7280',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'fadeInUp': 'fadeInUp 0.8s ease forwards',
        'slideInLeft': 'slideInLeft 0.8s ease forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          from: { textShadow: '0 0 10px #00FF94, 0 0 20px #00FF94' },
          to: { textShadow: '0 0 20px #00FF94, 0 0 40px #00FF94, 0 0 60px #00FF94' },
        },
      },
    },
  },
  plugins: [],
}
