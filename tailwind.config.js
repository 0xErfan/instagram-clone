/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        "xs": "460px",
      },
      colors: {
        'btn-primary': "#0095F6",
        'secondary-bg': '#121212',
        'secondary-text': "#A8A8A8"
      },
      fontFamily: {
        'segoe-ui': ['Segoe UI Variable', '-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif']
      }
    }
  },

  plugins: [],
}
