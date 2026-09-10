import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_URL задаётся только для gh-pages (см. package.json).
// В Docker/на сервере переменная не задана → base = '/'
const base = process.env.VITE_BASE || '/';

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8000',
      '/media': 'http://localhost:8000',
    },
  },
});