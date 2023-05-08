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
        'hero': "url('/hero-bg.png.webp')",
        'logo': "url('/logo.png')",
        'developer': "url('https://media.licdn.com/dms/image/D4D03AQFtdddQ3qPFQA/profile-displayphoto-shrink_800_800/0/1677486744695?e=1689206400&v=beta&t=bUaMdIrsw8QyCfeAx4aOgY7-eNH1k1TmhIeJB-GwOug')",
        'designer': "url('https://media.licdn.com/dms/image/D4D03AQHb3zJ_9rFBQQ/profile-displayphoto-shrink_400_400/0/1683481996832?e=1689206400&v=beta&t=L1HmNQMNT5N3X6nxGIwxuIlo9mPixE2jeBRwZz6jjiQ')",
      },
    },
  },
  plugins: [],
}
