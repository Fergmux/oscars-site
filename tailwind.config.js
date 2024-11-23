/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        base: '1920px',
      },
      width: {
        112: '448px',
        128: '512px',
      },
      height: {
        112: '448px',
        128: '512px',
      },
    },
  },
  plugins: [],
};
