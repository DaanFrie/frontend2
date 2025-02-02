import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/games': 'http://145.24.223.37:8000',  // Vervang '/games' met je API-route
    },
  },
  plugins: [react()],
})
