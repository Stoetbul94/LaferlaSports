/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0b0b0b',
          lighter: '#121212',
          light: '#1a1a1a',
          border: '#2a2a2a',
        },
        accent: {
          DEFAULT: '#b11217',
          light: '#d32f2f',
          dark: '#8b0e12',
          hover: '#c41e24',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f4d03f',
          dark: '#b8941f',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b3b3b3',
          muted: '#808080',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wide: '0.05em',
        wider: '0.1em',
        widest: '0.15em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1.22)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'ken-burns': 'ken-burns 22s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};


