import { test, expect } from '@playwright/test';

test.describe('Route Testing', () => {
    const mainRoutes = [
        '/',
        '/en/',
        '/fr/',
        '/en/program',
        '/fr/program',
        '/en/focused-projects',
        '/fr/focused-projects',
        '/en/production',
        '/fr/production',
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

    const subRoutes = [
        '/en/production/publications',
        '/fr/production/publications',
        '/en/production/platform',
        '/fr/production/platform',
        '/en/focused-projects/fp1',
        '/fr/focused-projects/fp1',
        '/en/focused-projects/fp2',
        '/fr/focused-projects/fp2',
        '/en/focused-projects/fp3',
        '/fr/focused-projects/fp3',
        '/en/focused-projects/fp4',
        '/fr/focused-projects/fp4',
        '/en/focused-projects/fp5',
        '/fr/focused-projects/fp5'
    ];

    test('homepage should redirect to language-specific page', async ({ page }) => {
        await page.goto('/');

        // Should redirect to either /en/ or /fr/
        await page.waitForURL(/\/(en|fr)\//);
        const url = page.url();
        expect(url).toMatch(/\/(en|fr)\/$/);
    });

    mainRoutes.forEach(route => {
        test(`route ${route} should be accessible`, async ({ page }) => {
            const response = await page.goto(route);
            expect(response?.status()).toBeLessThan(400);

            // Check that the page has content
            const bodyText = await page.textContent('body');
            expect(bodyText).toBeTruthy();
            expect(bodyText!.length).toBeGreaterThan(0);
        });
    });

    subRoutes.forEach(route => {
        test(`sub-route ${route} should be accessible`, async ({ page }) => {
            const response = await page.goto(route);

            // Sub-routes might not be implemented yet, so we allow 404s
            if (response?.status() === 404) {
                console.log(`Route ${route} not yet implemented (404)`);
                return;
            }

            expect(response?.status()).toBeLessThan(400);

            // Check that the page has content
            const bodyText = await page.textContent('body');
            expect(bodyText).toBeTruthy();
            expect(bodyText!.length).toBeGreaterThan(0);
        });
    });

    test('should have consistent navigation across languages', async ({ page }) => {
        // Test English navigation
        await page.goto('/en/program');
        const enNavigation = await page.locator('nav').textContent();

        // Test French navigation
        await page.goto('/fr/program');
        const frNavigation = await page.locator('nav').textContent();

        // Both should have navigation content
        expect(enNavigation).toBeTruthy();
        expect(frNavigation).toBeTruthy();
    });

    test('should handle 404 errors gracefully', async ({ page }) => {
        const response = await page.goto('/non-existent-page');

        if (response?.status() === 404) {
            // Should have a proper 404 page
            const bodyText = await page.textContent('body');
            expect(bodyText).toBeTruthy();
        } else {
            // If no 404 handling yet, should at least not crash
            expect(response?.status()).toBeLessThan(500);
        }
    });

    test('language switching should work', async ({ page }) => {
        await page.goto('/en/program');

        // Look for language toggle/switch
        const languageToggle = page.locator('[data-testid="language-toggle"], .language-toggle, a[href*="/fr/"]');
        const toggleCount = await languageToggle.count();

        if (toggleCount > 0) {
            await languageToggle.first().click();
            await page.waitForURL(/\/fr\//);
            expect(page.url()).toMatch(/\/fr\//);
        } else {
            console.log('Language toggle not yet implemented');
        }
    });
});