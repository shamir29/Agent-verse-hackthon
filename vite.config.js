import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Add host options if needed for previewing
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5185,
    host: true
  }
})

