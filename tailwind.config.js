import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // if using Next.js app router
  ],
  darkMode: 'class', // or 'media' or false
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config