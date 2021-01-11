module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.tsx'
  ],
  darkMode: 'class', // or 'media' or false
  theme: {
    extend: {},
    fontFamily: {
      cursive: ['Fugaz One', 'cursive'],
      sans: ['Inter', 'sans-serif'],
      display: ['Inter', 'sans-serif']
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
