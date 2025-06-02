import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteStaticCopy } from 'vite-plugin-static-copy'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'remove-vite-logo',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Evita mostrar el logo de Vite en el entorno de desarrollo
          res.setHeader('Cache-Control', 'no-store');
          next();
        });
      }
    },
  ],
  optimizeDeps: {
    include: ['chart.js'],
  },
  build: {
    chunkSizeWarningLimit: 2000, 
    outDir: 'dist',
    sourcemap: true, // Habilita sourcemaps
  },
  server: {
    hmr: {
      overlay: false, // Esto desactiva el overlay de HMR para no ver los errores de WASM
    },
  },
});