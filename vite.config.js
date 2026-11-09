import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { otoxFormApiPlugin } from './server/viteApiPlugin.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), otoxFormApiPlugin()],
  server: {
    port: 3000,
    open: false
  }
});
