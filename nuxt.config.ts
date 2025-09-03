import fs from 'node:fs'
import path from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'

const themeDir = path.resolve('src/assets/css/theme')

const themeImports = fs.existsSync(themeDir)
  ? fs.readdirSync(themeDir)
      .filter(f => f.endsWith('.scss') && f !== 'index.scss')
      .map(f => `@import "@/assets/css/theme/${f}";`)
      .join('\n')
  : ''

export default defineNuxtConfig({
  srcDir: 'src',
  css: ['bootstrap/dist/css/bootstrap.min.css',
        '@/assets/css/style.css',
        '@/assets/css/colors/sky.css',
        '@/assets/css/fonts/urbanist.css',
        '@/assets/css/fonts/unicons.css',
        'animate.css/animate.min.css',
        'swiper/css/bundle',
        'swiper/css/navigation',
        'swiper/css/pagination'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "bootstrap/scss/functions";
            @use "bootstrap/scss/mixins";
            @use "bootstrap/scss/variables" as *;
            @use "bootstrap/scss/maps";
            ${themeImports}
          `
        }
      }
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: { pageTransition: { name: 'page', mode: 'out-in' } },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',  
          ['defineStore', 'definePiniaStore']
        ]
      }
    ]
  ],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
    }
  }
})