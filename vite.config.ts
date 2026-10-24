import { cloudflare } from '@cloudflare/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

const isVercelBuild = process.env.VERCEL === '1' || process.env.NITRO_PRESET === 'vercel'

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  plugins: isVercelBuild
    ? [tanstackStart(), nitro(), react()]
    : [cloudflare({ viteEnvironment: { name: 'ssr' } }), tanstackStart(), react()],
})
