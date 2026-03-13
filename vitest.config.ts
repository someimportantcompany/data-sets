import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['packages/*/index.test.ts'],
  },
});
