import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },

  // Cancellare in produzione
  server: {
    port: 5173,
    proxy: {
      '/auth': 'http://localhost',
      '/users': 'http://localhost',
      '/invoices': 'http://localhost',
    }
  }
})
