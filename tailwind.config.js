/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

