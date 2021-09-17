module.exports = {
  purge: [
    './src/**/*.js',
    './src/**/*.html',
    './src/**/*.jsx',
    './public/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#00E599',
        secondary: '#000023',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
