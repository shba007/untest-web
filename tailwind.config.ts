/** @type {import('tailwindcss').Config} */
export default {
  content: ['components/**/*.{vue,js,ts}', 'layouts/**/*.vue', 'pages/**/*.vue', 'App.{js,ts,vue}', 'app.{js,ts,vue}', 'Error.{js,ts,vue}', 'error.{js,ts,vue}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.75rem', '0.875rem'],
      sm: ['0.875rem', '1.0625rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.25rem', '1.5625rem'],
      xl: ['1.5rem', '1.875rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['2.5rem', '3.125rem'],
      '4xl': ['3rem', '3.625rem'],
      '5xl': ['3.5rem', '4.1875rem'],
    },
    fontFamily: {
      // head: ['"Exo 2"', 'sans-serif'],
      // body: ['"Exo 2"', 'sans-serif'],
    },
    fontWeight: {
      light: 300,
      regular: 400,
      'semi-bold': 500,
      bold: 600,
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      light: {
        400: '#8D8D8D',
        500: '',
        600: '',
      },
      black: '#000000',
      dark: {
        400: '#191919',
        500: '#2B2B2B',
        600: '',
      },
      primary: {
        400: '#61BFFF',
        500: '#3AAFFF',
        600: '#2E8CCC',
      },
      success: {
        400: '',
        500: '#48FEA7',
        600: '',
      },
      warning: {
        400: '',
        500: '',
        600: '',
      },
      alert: {
        400: '',
        500: '#F43F5E',
        600: '',
      },
    },
    extend: {},
  },
  plugins: [],
}
