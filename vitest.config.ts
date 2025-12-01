import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@content': path.resolve(__dirname, './src/content'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@models': path.resolve(__dirname, './src/models'),
            '@i18n': path.resolve(__dirname, './src/i18n'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '~': path.resolve(__dirname, './src'),
        },
    },
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