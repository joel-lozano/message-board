import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/posts': 'http://localhost:3000',
      '/logout': 'http://localhost:3000'
    },
  },
});
