import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const vendorChunks: Record<string, RegExp> = {
  react: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
  motion: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/,
  forms: /node_modules[\\/](zod|react-hook-form|@hookform)[\\/]/,
};

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          for (const [name, re] of Object.entries(vendorChunks)) if (re.test(id)) return name;
        },
      },
    },
  },
});
