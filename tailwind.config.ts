export default {
    theme: {
      extend: {
        fontFamily: {
          'garamond': ['EB Garamond', 'serif'],
          'raleway': ['Raleway', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
        },
      }
    },
    plugins: [],
    content: [
      './components/**/*.{js,vue,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './app.vue',
      './error.vue',
      './nuxt.config.{js,ts}'
    ]
  }