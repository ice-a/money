// 编码: UTF-8
// 相对路径: ./vite.config.js
// 文件名: vite.config.js
// Vite配置文件 - 用于配置Vue3项目的构建和开发服务器

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://v1.hitokoto.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist'
  }
});