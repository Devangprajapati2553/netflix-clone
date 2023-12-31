/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dark:"#141414",
        netFlixRed:"#e50a14"
      },
      animation:{
        "slide-rtl":"slide-rtl .4s ease-in-out"
      },
      keyframes:{
        "slide-rtl":{
          from:{"margin-right":"-90%"},
          to:{"margin-right":"0%"}
        }
      }
    },
  },
  plugins: [],
}

