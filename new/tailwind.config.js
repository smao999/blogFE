/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink': '#1a1a1a',
        'paper': '#f5f2eb',
        'accent': '#c9a962',
        'muted': '#8a8578',
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'mono': ['Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
