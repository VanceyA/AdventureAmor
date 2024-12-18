import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  server: {
    watch: {
      usePolling: true,
    },
    // proxy:{
    //   '/api': 'http://localhost:8080'
    // }
  },

  build: {
    outDir: '../server/public',
    emptyOutDir: true,
  },
})
