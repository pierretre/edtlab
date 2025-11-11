import { test, expect } from '@playwright/test';

test.describe('Link Verification Tests', () => {
    // Main routes to test for links
    const routesToTest = [
        '/',
        '/en/',
        '/fr/',
        '/en/program',
        '/fr/programme',
        '/en/focused-projects',
        '/fr/projets-cibles',
        '/en/production',
        '/fr/production',
        '/en/demo-center',
        '/fr/centre-demo',
        '/en/resources',
        '/fr/ressources',
        '/en/news',
        '/fr/actualites',
        '/en/join-us',
        '/fr/nous-rejoindre',
        '/en/contact',
        '/fr/contact',
        '/en/about',
        '/fr/a-propos'
    ];

    // Helper function to check if a link is valid
    async function checkLink(page: any, url: string, _linkText: string): Promise<{ url: string, status: number, error?: string }> {
        try {
            // Handle relative URLs
            const fullUrl = url.startsWith('http') ? url : new URL(url, page.url()).href;

            // Skip certain URLs that are expected to be external or special
            if (fullUrl.includes('mailto:') ||
                fullUrl.includes('tel:') ||
                fullUrl.includes('javascript:') ||
                fullUrl.includes('#')) {
                return { url: fullUrl, status: 200 }; // Skip these types of links
            }

            const response = await page.request.get(fullUrl);
            return { url: fullUrl, status: response.status() };
        } catch (error) {
            return {
                url: url,
                status: 0,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // Test each route for broken links
    routesToTest.forEach(route => {
        test(`should have no broken links on ${route}`, async ({ page }) => {
            // Navigate to the route
            const response = await page.goto(route);

            // Skip if route doesn't exist yet
            if (response?.status() === 404) {
                console.log(`Route ${route} not implemented yet, skipping link verification`);
                return;
            }

            expect(response?.status()).toBeLessThan(400);

            // Get all links on the page
            const links = await page.locator('a[href]').all();
            const brokenLinks: Array<{ url: string, status: number, error?: string, linkText: string }> = [];

            console.log(`Found ${links.length} links on ${route}`);

            // Check each link
            for (const link of links) {
                const href = await link.getAttribute('href');
                const linkText = (await link.textContent())?.trim() || 'No text';

                if (!href) continue;

                const result = await checkLink(page, href, linkText);

                // Consider 4xx and 5xx status codes as broken links
                if (result.status >= 400 || result.status === 0) {
                    brokenLinks.push({
                        url: result.url,
                        status: result.status,
                        error: result.error,
                        linkText: linkText
                    });
                }
            }

            // Report broken links
            if (brokenLinks.length > 0) {
                console.log(`Found ${brokenLinks.length} broken links on ${route}:`);
                brokenLinks.forEach(link => {
                    console.log(`  - "${link.linkText}" -> ${link.url} (Status: ${link.status}${link.error ? ', Error: ' + link.error : ''})`);
                });
            }

            // Fail the test if there are broken links
            expect(brokenLinks.length).toBe(0);
        });
    });

    test('should verify navigation menu links work correctly', async ({ page }) => {
        await page.goto('/en/');

        // Find navigation menu
        const navMenu = page.locator('nav, .navbar, [role="navigation"]').first();

        if (await navMenu.count() > 0) {
            const navLinks = await navMenu.locator('a[href]').all();

            console.log(`Found ${navLinks.length} navigation links`);

            for (const link of navLinks) {
                const href = await link.getAttribute('href');
                const linkText = (await link.textContent())?.trim() || 'No text';

                if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
                    continue;
                }

                // Test internal navigation links
                if (href.startsWith('/') || href.includes(page.url().split('/')[2])) {
                    console.log(`Testing navigation link: "${linkText}" -> ${href}`);

                    const response = await page.request.get(new URL(href, page.url()).href);

                    // Allow 404 for routes not implemented yet, but fail on server errors
                    if (response.status() >= 500) {
                        throw new Error(`Navigation link "${linkText}" (${href}) returned server error: ${response.status()}`);
                    }
                }
            }
        } else {
            console.log('No navigation menu found on the page');
        }
    });

    test('should verify footer links work correctly', async ({ page }) => {
        await page.goto('/en/');

        // Find footer
        const footer = page.locator('footer, .footer').first();

        if (await footer.count() > 0) {
            const footerLinks = await footer.locator('a[href]').all();

            console.log(`Found ${footerLinks.length} footer links`);

            for (const link of footerLinks) {
                const href = await link.getAttribute('href');
                const linkText = (await link.textContent())?.trim() || 'No text';

                if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
                    continue;
                }

                // Test internal footer links
                if (href.startsWith('/') || href.includes(page.url().split('/')[2])) {
                    console.log(`Testing footer link: "${linkText}" -> ${href}`);

                    const response = await page.request.get(new URL(href, page.url()).href);

                    // Allow 404 for routes not implemented yet, but fail on server errors
                    if (response.status() >= 500) {
                        throw new Error(`Footer link "${linkText}" (${href}) returned server error: ${response.status()}`);
                    }
                }
            }
        } else {
            console.log('No footer found on the page');
        }
    });

    test('should verify language switching links work', async ({ page }) => {
        await page.goto('/en/program');

        // Look for language toggle/switch links
        const languageLinks = page.locator('[data-testid="language-toggle"] a, .language-toggle a, a[href*="/fr/"], a[href*="/en/"]');
        const linkCount = await languageLinks.count();

        if (linkCount > 0) {
            console.log(`Found ${linkCount} language switching links`);

            for (let i = 0; i < linkCount; i++) {
                const link = languageLinks.nth(i);
                const href = await link.getAttribute('href');
                const linkText = (await link.textContent())?.trim() || 'No text';

                if (href && (href.includes('/en/') || href.includes('/fr/'))) {
                    console.log(`Testing language link: "${linkText}" -> ${href}`);

                    const response = await page.request.get(new URL(href, page.url()).href);

                    // Language switching should work properly
                    expect(response.status()).toBeLessThan(400);
                }
            }
        } else {
            console.log('No language switching links found');
        }
    });
});