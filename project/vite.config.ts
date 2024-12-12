import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000, // Para desarrollo local
  },
  build: {
    outDir: 'dist', // Asegúrate de que el directorio de salida sea correcto
  },
  base: './', // Configura el "base" para producción relativa
});