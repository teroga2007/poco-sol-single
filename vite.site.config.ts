import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    outDir: '.preview-site',
  },
  preview: {
    host: '127.0.0.1',
    port: 4180,
    strictPort: true,
  },
})
