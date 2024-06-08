import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import distImporter from 'vite-plugin-dist-importer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), distImporter()],
})
