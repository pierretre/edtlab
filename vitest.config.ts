import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        exclude: [
            'node_modules/**',
            'dist/**',
            '.astro/**',
            'src/test/e2e/**', // Exclude Playwright tests
            '**/*.spec.ts', // Exclude Playwright spec files
        ],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'dist/',
                '.astro/',
                'coverage/',
                '**/*.config.*',
                '**/*.d.ts',
                'src/test/setup.ts',
                'src/test/e2e/**',
            ],
            thresholds: {
                global: {
                    branches: 50,
                    functions: 50,
                    lines: 50,
                    statements: 50
                }
            }
        },
    },
});