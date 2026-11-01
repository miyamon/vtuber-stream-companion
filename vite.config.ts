import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Относительные ссылки работают и локально, и в подпапке GitHub Pages.
  base: './',
})
