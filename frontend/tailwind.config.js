/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff',
          DEFAULT: '#0066cc',
          dark: '#004d99',
        },
        secondary: {
          light: '#f8f9fa',
          DEFAULT: '#e9ecef',
          dark: '#dee2e6',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
