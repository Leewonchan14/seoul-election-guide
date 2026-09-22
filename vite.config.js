import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const entry = (path) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/seoul-election-guide/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        landing: entry('./index.html'),
        seoul: entry('./seoul/index.html'),
        incheon: entry('./incheon/index.html'),
        travel: entry('./travel/index.html'),
      },
    },
  },
})
