/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {
      height: {
        "1/4": "25vh",  // This sets the 'w-1/4' class to use 25% width
        "1/5": "20vh",  // This sets the 'w-1/4' class to use 25% width
        "1/6": "16.6vh",  // This sets the 'w-1/4' class to use 25% width
        "10vh": "10vh",
        "15vh": "15vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
      },
      colors: {
        'bg-color': '#323437', // This assumes you have --bg-color defined in your CSS
        'main-color': '#e2b714',
        'caret-color': '#e2b714',
        'sub-color': '#646669',
        'sub-alt-color': '#2c2e31',
        'text-color': '#d1d0c5',
      }
    },
  },
  plugins: [],
}

