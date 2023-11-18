import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
      '~bootstrap': 'node_modules/bootstrap',
    }
  }
})
