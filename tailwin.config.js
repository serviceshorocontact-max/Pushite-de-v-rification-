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
        'custom-white': '#FFFFFF',
        'custom-green': '#2E7D32',
        'custom-light-green': '#4CAF50',
        'custom-yellow': '#FFC107',
        'custom-light-yellow': '#FFF9C4',
        'custom-dark': '#1B2E1B',
      },
    },
  },
  plugins: [],
}
