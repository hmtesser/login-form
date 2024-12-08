import { defineConfig } from 'vitest/config';
import { join } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [join(__dirname, 'src/setupTests.ts')],
    include: ['src/**/*.{test,spec}.ts', 'src/**/*.{test,spec}.tsx'],
  },
});
