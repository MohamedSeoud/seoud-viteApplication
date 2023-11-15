import { defineConfig } from 'vite'
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['react-moment'])],

    },
  },
  build: {
    chunkSizeWarningLimit: 100000000,
  }



});
