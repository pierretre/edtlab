import type { APIRoute } from 'astro';
import { generateSitemapEntries, generateSitemapXML } from '../utils/seo';

export const GET: APIRoute = async ({ site }) => {
    // Use the site URL from Astro config, fallback to localhost for development
    const baseUrl = site?.toString().replace(/\/$/, '') || 'http://localhost:4321';

    try {
        const entries = await generateSitemapEntries(baseUrl);
        const sitemapXML = generateSitemapXML(entries);

        return new Response(sitemapXML, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
            }
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);

        // Return a minimal sitemap in case of error
        const fallbackSitemap = generateSitemapXML([
            {
                url: `${baseUrl}/en/`,
                lastmod: new Date().toISOString().split('T')[0],
                changefreq: 'weekly',
                priority: 1.0
            },
            {
                url: `${baseUrl}/fr/`,
                lastmod: new Date().toISOString().split('T')[0],
                changefreq: 'weekly',
                priority: 1.0
            }
        ]);

        return new Response(fallbackSitemap, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, max-age=300' // Shorter cache for error case
            }
        });
    }
};