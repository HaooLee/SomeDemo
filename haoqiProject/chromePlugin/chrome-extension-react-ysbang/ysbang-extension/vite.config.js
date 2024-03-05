import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

export default defineConfig({
  build: {
    minify:"terser",

  },
  plugins: [
    react(),
    crx({ manifest}),
  ]
})