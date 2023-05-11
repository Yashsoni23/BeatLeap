/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#246DC5',
        'l-white': '#ADAFCB',
        'herobg': '#1E1E1E',
        
        
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero': "url('/Background.png')",
        'logo': "url('/logo.png')",
        'developer': "url('/Yash.jpeg')",
        'designer': "url('/Vishwas.jpeg')",
      },
    },
  },
  plugins: [],
}
