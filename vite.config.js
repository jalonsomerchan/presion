import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const repositoryName = 'presion';
const base = process.env.GITHUB_ACTIONS ? `/${repositoryName}/` : './';

export default defineConfig({
  base,
  plugins: [tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
