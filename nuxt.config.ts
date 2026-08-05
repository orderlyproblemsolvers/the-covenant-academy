// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr:true,
  nitro: {
    preset: 'netlify'
  },
  modules: ["@nuxt/ui", '@nuxtjs/supabase', '@nuxtjs/seo', 'nuxt-jsonld', '@nuxt/image'],
  // image: {
  //   provider: process.env.NODE_ENV === 'development' ? 'ipx' : 'netlify',
  //   dir: 'public',
  //   quality: 80,
  //   format: ['webp', 'avif', 'jpg'],
  //   domains: [
  //     'xxjcpqsodvrenyayjbzb.supabase.co', 
  //     'localhost:3000', 
  //     'thecovenantacademy.org', 
  //     'localhost:3001'
  //   ],
  // },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // You can add more sizes/formats as needed
        // { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        // { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  css: [
    "~/assets/css/main.css",
    'quill/dist/quill.snow.css',
    "@fontsource/eb-garamond/400.css", // Regular
    "@fontsource/eb-garamond/600.css", // Semi-bold
    "@fontsource/eb-garamond/700.css",
    "@fontsource/raleway/400.css",
    "@fontsource/raleway/500.css",
    "@fontsource/raleway/600.css",
    "@fontsource/inter/400.css",
    "@fontsource/inter/500.css",
    "@fontsource/inter/600.css",
    'leaflet/dist/leaflet.css'
  ],
  supabase: {
    // This is the default configuration
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false
    },
    runtimeConfig: {
      public: {
        adminEmail: process.env.VITE_ADMIN_EMAIL,
        siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      }
    },
    ogImage: {
    enabled: true,
    debug: true,
  },
  site: { 
 url: 'https://thecovenantacademy.org', 
 name: 'The Covenant Academy', 
 }, 
    vite: {
    optimizeDeps: {
      include: ['@supabase/supabase-js'],
      rolldownOptions: {
        target: 'esnext'
      }
    },
    resolve: {
      alias: {
        '@supabase/supabase-js': '@supabase/supabase-js/dist/module/index.js'
      }
    }
  },

  sitemap: {
    // This tells Nuxt to look for dynamic routes at this endpoint
    sources: [
      '/api/__sitemap__/urls'
    ],
    exclude: [
      '/admin/**',
      '/admin',
      '/login' 
    ],
  }
});