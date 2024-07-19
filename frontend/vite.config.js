import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: './postcss.config.cjs'
  },
  define: {
    'process.env': process.env
  }
});
