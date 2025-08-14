import react from '@vitejs/plugin-react'

// https://vite.dev/config/
import { defineConfig as defineVitestConfig } from 'vitest/config';

export default defineVitestConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
});

