/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        "lg": "10px",
      },
    },

    extend: {
      screens: {
        "xs": "460px",
      },
      boxShadow: {
        regular: "0px 10px 30px -17px"
      }
    }
  },

  plugins: [
    function ({ addVariant }) {
      addVariant('ch', '& > *');
      addVariant('ch-hover', '& > *:hover');
    }
  ],
}
