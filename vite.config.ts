/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  test: {
    globals: true,
    environment: 'happy-dom',
    transformMode: {
      web: [/.[tj]sx$/]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
