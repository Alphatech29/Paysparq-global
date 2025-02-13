import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react({
    fastRefresh: true,  
  })],
  optimizeDeps: {

    include: [
      'react-router-dom',
      'react-icons',
      'react-toastify',
      'cookie',
      'react-redux',
    ],
  },
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
    host: 'localhost', 
    watch: {
      usePolling: true, 
    },
  },
});
