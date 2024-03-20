import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import obfuscator from 'rollup-plugin-obfuscator';

export default defineConfig({
  build: {
    minify:"terser",
  },
  plugins: [
    react(),
    crx({ manifest}),
    obfuscator({
      compact: true,
      rotateStringArray: true,
      stringArray: true,
      stringArrayEncoding: true,
      stringArrayThreshold: 0.75
    }),
  ]
})