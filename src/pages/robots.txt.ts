import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
    const baseUrl = site?.toString().replace(/\/$/, '') || 'http://localhost:4321';

    const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap-index.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin or private areas (if any)
# Disallow: /admin/
# Disallow: /private/

# Allow all content for search engines
# This is a public research website
`;

    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
        }
    });
};