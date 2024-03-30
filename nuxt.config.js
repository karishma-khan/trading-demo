export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'trading-dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    script: [
      {
        src: 'https://code.highcharts.com/stock/highstock.js',
        body: true
      },
      {
        src: 'https://code.highcharts.com/stock/modules/exporting.js',
        body: true
      },
      {
        src: 'https://code.highcharts.com/stock/modules/accessibility.js',
        body: true
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css", crossorigin: 'anonymous' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'static/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/axios", ssr: true },
    { src: "~/plugins/websocket", ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
