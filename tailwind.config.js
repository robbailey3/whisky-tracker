module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}']
  },
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        display: ['Sriracha', 'cursive'],
        'sans-serif': ['Ubuntu', 'Comic Sans', 'Helvetica', 'sans-serif'],
        monospace: ['Ubuntu Mono', 'Consolas', 'monospace']
      },
      colors: {
        brand: '#080724',
        dark: '#121212',
        steel: {
          50: '#f9fbfb',
          100: '#f4f7f8',
          200: '#e4eaee',
          300: '#d1d5e3',
          400: '#adaecf',
          500: '#7f84b1',
          600: '#585e8a',
          700: '#414969',
          800: '#30374c',
          900: '#252c3b'
        },
        chestnut: {
          50: '#fbfafa',
          100: '#f8f6f5',
          200: '#f0e7e8',
          300: '#e7ced5',
          400: '#d9a2b2',
          500: '#c57687',
          600: '#9d515e',
          700: '#6f3e4a',
          800: '#4d2f39',
          900: '#39262e'
        },
        blush: {
          50: '#fbfafa',
          100: '#f9f6f5',
          200: '#f2e7e6',
          300: '#eaced1',
          400: '#dfa1a9',
          500: '#cf757b',
          600: '#a94f53',
          700: '#783c42',
          800: '#532e35',
          900: '#3e252b'
        },
        sepia: {
          50: '#fbfbfa',
          100: '#f9f6f5',
          200: '#f1e7e7',
          300: '#e9ced2',
          400: '#dda1ac',
          500: '#cc757f',
          600: '#a65057',
          700: '#763c45',
          800: '#512e36',
          900: '#3c252c'
        },
        cooper: {
          50: '#fbfbfa',
          100: '#f9f6f5',
          200: '#f1e7e6',
          300: '#e9cfd0',
          400: '#dda2a8',
          500: '#cc7779',
          600: '#a55152',
          700: '#753d41',
          800: '#512f34',
          900: '#3c262b'
        },
        beaver: {
          50: '#fbfbfa',
          100: '#f8f7f6',
          200: '#efe8e8',
          300: '#e4d0d6',
          400: '#d4a5b4',
          500: '#bc7a89',
          600: '#935460',
          700: '#67404b',
          800: '#48313a',
          900: '#36272f'
        },
        pink: {
          50: '#fbfbfa',
          100: '#f8f7f5',
          200: '#f0e8e8',
          300: '#e6cfd5',
          400: '#d7a4b1',
          500: '#c17886',
          600: '#99535d',
          700: '#6b3f49',
          800: '#4b3039',
          900: '#38262e'
        },
        plum: {
          50: '#fbfafa',
          100: '#f8f6f6',
          200: '#efe7e9',
          300: '#e6ced8',
          400: '#d6a2b8',
          500: '#c17690',
          600: '#995167',
          700: '#6c3e4f',
          800: '#4b2f3d',
          900: '#382631'
        },
        wisteria: {
          50: '#fbfafa',
          100: '#f8f6f6',
          200: '#efe7ea',
          300: '#e6ced9',
          400: '#d7a1b9',
          500: '#c37592',
          600: '#9b5069',
          700: '#6d3d51',
          800: '#4c2f3e',
          900: '#392631'
        },
        manatee: {
          50: '#fafafb',
          100: '#f6f6f7',
          200: '#ebe7ed',
          300: '#decfe0',
          400: '#c8a5c8',
          500: '#aa79a9',
          600: '#805481',
          700: '#5b4063',
          800: '#403149',
          900: '#312839'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
});
