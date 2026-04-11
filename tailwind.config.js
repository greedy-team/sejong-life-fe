/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        'shark': '#1C1C22',
        'jumbo': '#797986',
        'jumbo-50': 'rgba(121, 121, 134, 0.5)',
        'alabaster': '#FAFAFA',
        'athens-gray': '#ECECEE',
        'iron': '#E4E4E7',
        'mandy': '#EB4763',
        'tangerine': '#F48434',
        'meeting-surface': '#F5F3FF',
      },
    },
  },
  plugins: [],
}
