import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// Re-export pure functions and types
export {
    generateSitemapXML,
    generateOrganizationStructuredData,
    generateResearchProjectStructuredData,
    generatePublicationStructuredData,
    generateEventStructuredData,
    generateJobPostingStructuredData,
    generateBreadcrumbStructuredData,
    optimizePageTitle,
    optimizeMetaDescription,
    generateCanonicalUrl,
    generateAlternateUrls,
    type SitemapEntry,
    type StructuredData
} from './seo-pure';

import type { SitemapEntry } from './seo-pure';

/**
 * Generate sitemap entries for all pages and content
 */
export async function generateSitemapEntries(baseUrl: string): Promise<SitemapEntry[]> {
    const entries: SitemapEntry[] = [];

    // Static pages
    const staticPages = [
        { url: '/en/', priority: 1.0, changefreq: 'weekly' as const },
        { url: '/fr/', priority: 1.0, changefreq: 'weekly' as const },
    ];

    staticPages.forEach(page => {
        entries.push({
            url: `${baseUrl}${page.url}`,
            priority: page.priority,
            changefreq: page.changefreq,
            lastmod: new Date().toISOString().split('T')[0]
        });
    });

    // Content pages
    try {
        const pages = await getCollection('pages');
        pages.forEach((page: CollectionEntry<'pages'>) => {
            const { lang, href } = page.data;
            const url = `${baseUrl}/${lang}/${href}`;

            entries.push({
                url,
                lastmod: page.data.lastModified?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
                changefreq: 'monthly',
                priority: 0.8
            });
        });
    } catch (error) {
        console.warn('Could not load pages collection for sitemap:', error);
    }

    // Publications
    try {
        const publications = await getCollection('publications');
        publications.forEach((pub: CollectionEntry<'publications'>) => {
            // Publications are available in both languages
            ['en', 'fr'].forEach(lang => {
                const url = `${baseUrl}/${lang}/production/publications#${pub.slug}`;
                entries.push({
                    url,
                    lastmod: new Date().toISOString().split('T')[0],
                    changefreq: 'yearly',
                    priority: 0.6
                });
            });
        });
    } catch (error) {
        console.warn('Could not load publications collection for sitemap:', error);
    }

    // Events
    try {
        const events = await getCollection('events');
        events.forEach((event: CollectionEntry<'events'>) => {
            const { lang } = event.data;
            const url = `${baseUrl}/${lang}/news#${event.slug}`;

            entries.push({
                url,
                lastmod: event.data.date.toISOString().split('T')[0],
                changefreq: 'monthly',
                priority: 0.7
            });
        });
    } catch (error) {
        console.warn('Could not load events collection for sitemap:', error);
    }

    // Job offers
    try {
        const jobOffers = await getCollection('job-offers');
        jobOffers.forEach((job: CollectionEntry<'job-offers'>) => {
            const { lang } = job.data;
            const url = `${baseUrl}/${lang}/join-us#${job.slug}`;

            entries.push({
                url,
                lastmod: job.data.publishedDate.toISOString().split('T')[0],
                changefreq: 'weekly',
                priority: 0.8
            });
        });
    } catch (error) {
        console.warn('Could not load job-offers collection for sitemap:', error);
    }

    return entries;
}