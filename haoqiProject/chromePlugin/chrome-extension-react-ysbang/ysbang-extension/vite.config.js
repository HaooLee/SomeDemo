import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from '@crxjs/vite-plugin'
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import manifest from './manifest.json'

export default defineConfig({
  build: {
    minify:"terser",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      plugins: [
        obfuscatorPlugin({
          options:{
            compact: true,
            // 插入无限debugger
            debugProtection: true,
            // 全局变量和函数名混淆
            renameGlobals: true,
            sourceMap: true,
            // 将字符串字面量放在一个特殊的数组中
            stringArray: true,
            // // 字符串字面量编码，可选base64、rc4、none（不编码），以数组方式指定多个
            stringArrayEncoding: ['base64', 'rc4'],
          }
        }),
      ],
    },
  },
  plugins: [
    react(),
    crx({ manifest}),
  ]
})