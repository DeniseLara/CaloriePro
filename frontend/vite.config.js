import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  base: '/static/',
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
    outDir: path.resolve(__dirname, '../backend/dist/static'),
    sourcemap: true, // Habilita sourcemaps
    emptyOutDir: true,
  },
  server: {
    hmr: {
      overlay: false, // Esto desactiva el overlay de HMR para no ver los errores de WASM
    },
  },
});