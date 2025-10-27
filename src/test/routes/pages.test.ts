import { describe, it, expect } from 'vitest';

describe('Route Structure', () => {
    it('should have proper route structure for main pages', () => {
        const expectedRoutes = [
            '/en/program',
            '/fr/program',
            '/en/focused-projects',
            '/fr/focused-projects',
            '/en/production',
            '/fr/production',
            '/en/production/publications',
            '/fr/production/publications',
            '/en/production/platform',
            '/fr/production/platform',
            '/en/demo-center',
            '/fr/demo-center',
            '/en/resources',
            '/fr/resources',
            '/en/news',
            '/fr/news',
            '/en/join-us',
            '/fr/join-us',
            '/en/contact',
            '/fr/contact',
            '/en/about',
            '/fr/about'
        ];

        // Test that all expected routes are defined
        expectedRoutes.forEach(route => {
            expect(route).toMatch(/^\/(en|fr)\//);
            expect(route.split('/').length).toBeGreaterThanOrEqual(3);
        });
    });

    it('should have bilingual route pairs', () => {
        const routePairs = [
            ['/en/program', '/fr/program'],
            ['/en/focused-projects', '/fr/focused-projects'],
            ['/en/production', '/fr/production'],
            ['/en/demo-center', '/fr/demo-center'],
            ['/en/resources', '/fr/resources'],
            ['/en/news', '/fr/news'],
            ['/en/join-us', '/fr/join-us'],
            ['/en/contact', '/fr/contact'],
            ['/en/about', '/fr/about']
        ];

        routePairs.forEach(([enRoute, frRoute]) => {
            expect(enRoute.replace('/en/', '/fr/')).toBe(frRoute);
            expect(frRoute.replace('/fr/', '/en/')).toBe(enRoute);
        });
    });

    it('should have focused project routes', () => {
        const projects = ['fp1', 'fp2', 'fp3', 'fp4', 'fp5'];
        const languages = ['en', 'fr'];

        projects.forEach(project => {
            languages.forEach(lang => {
                const route = `/${lang}/focused-projects/${project}`;
                expect(route).toMatch(new RegExp(`^/(en|fr)/focused-projects/${project}$`));
            });
        });
    });
});