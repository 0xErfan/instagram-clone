/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px"
      },
    },

    extend: {
      screens: {
        "xs": "460px",
      },
    }
  },

  plugins: [],
}
