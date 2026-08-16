import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_URL || 'http://localhost:4000'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      // Forwards any request the frontend makes to "/api/..." straight to
      // your Express server. This lets your React code just call fetch('/api/brews')
      // without hardcoding "http://localhost:4000" everywhere, and avoids
      // CORS issues entirely during local development.
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  }
})