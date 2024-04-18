import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      include: [
        'src/**/*.ts',
      ],
      exclude: [
        'node_modules',
        'legacy',
      ],
    },
    exclude: [
      'legacy',
      'node_modules',
    ],
  },
})
