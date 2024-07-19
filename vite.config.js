// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
    vue(),
  ],
  root: 'frontend', // Ensure Vite knows where to find index.html
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'frontend/index.html',
    },
  },
});
