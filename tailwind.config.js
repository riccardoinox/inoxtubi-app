/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        inox: {
          blue: '#0477bf',
          navy: '#032641',
          lightBlue: '#068ee2',
          sky: '#e8f4fc',
          steel: '#52697a',
          dark: '#0e1e2c',
          bg: '#f6f8fb',
          card: '#ffffff',
          green: '#10b981',
          greenDark: '#059669',
          orange: '#f59e0b',
          orangeDark: '#d97706',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Rubik', 'system-ui', 'sans-serif'],
        display: ['Rubik', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(3, 38, 65, 0.08)',
        'glow-blue': '0 0 15px rgba(4, 119, 191, 0.35)',
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
};
