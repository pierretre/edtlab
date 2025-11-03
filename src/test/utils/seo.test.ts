import { describe, it, expect } from 'vitest';
import {
    optimizePageTitle,
    optimizeMetaDescription,
    generateCanonicalUrl,
    generateAlternateUrls,
    generateOrganizationStructuredData,
    generatePublicationStructuredData,
    generateEventStructuredData,
    generateJobPostingStructuredData,
    generateBreadcrumbStructuredData,
    generateSitemapXML
} from '../../utils/seo-pure';

describe('SEO Utilities', () => {
    describe('optimizePageTitle', () => {
        it('should create proper page title with site name', () => {
            const result = optimizePageTitle('About Us', 'EDT Research');
            expect(result).toBe('About Us | EDT Research');
        });

        it('should truncate long titles', () => {
            const longTitle = 'This is a very long title that exceeds the maximum length limit';
            const result = optimizePageTitle(longTitle, 'EDT Research', 30);
            expect(result.length).toBeLessThanOrEqual(30);
            expect(result).toContain('EDT Research');
        });
    });

    describe('optimizeMetaDescription', () => {
        it('should return description as-is if under limit', () => {
            const desc = 'Short description';
            const result = optimizeMetaDescription(desc);
            expect(result).toBe(desc);
        });

        it('should truncate long descriptions', () => {
            const longDesc = 'This is a very long description that exceeds the maximum length limit and should be truncated at a word boundary to maintain readability and proper formatting for search engines';
            const result = optimizeMetaDescription(longDesc, 100);
            expect(result.length).toBeLessThanOrEqual(100);
            expect(result).toMatch(/\.\.\.$/);
        });
    });

    describe('generateCanonicalUrl', () => {
        it('should generate proper canonical URL', () => {
            const result = generateCanonicalUrl('https://example.com', '/about');
            expect(result).toBe('https://example.com/about');
        });

        it('should handle trailing slashes', () => {
            const result = generateCanonicalUrl('https://example.com/', 'about');
            expect(result).toBe('https://example.com/about');
        });
    });

    describe('generateAlternateUrls', () => {
        it('should generate alternate language URLs', () => {
            const result = generateAlternateUrls('https://example.com', '/en/about', 'en');
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({ hreflang: 'en', href: 'https://example.com/en/about' });
            expect(result[1]).toEqual({ hreflang: 'fr', href: 'https://example.com/fr/about' });
            expect(result[2]).toEqual({ hreflang: 'x-default', href: 'https://example.com/en/about' });
        });
    });

    describe('generateSitemapXML', () => {
        it('should generate valid XML sitemap', () => {
            const entries = [
                {
                    url: 'https://example.com/',
                    lastmod: '2023-01-01',
                    changefreq: 'weekly' as const,
                    priority: 1.0
                },
                {
                    url: 'https://example.com/about',
                    lastmod: '2023-01-01',
                    changefreq: 'monthly' as const,
                    priority: 0.8
                }
            ];

            const result = generateSitemapXML(entries);

            expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
            expect(result).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
            expect(result).toContain('<loc>https://example.com/</loc>');
            expect(result).toContain('<lastmod>2023-01-01</lastmod>');
            expect(result).toContain('<changefreq>weekly</changefreq>');
            expect(result).toContain('<priority>1</priority>');
        });
    });

    describe('generateOrganizationStructuredData', () => {
        it('should generate valid organization structured data', () => {
            const result = generateOrganizationStructuredData(
                'EDT Research',
                'Engineering Digital Twins',
                'https://example.com',
                'https://example.com/logo.png'
            );

            expect(result['@context']).toBe('https://schema.org');
            expect(result['@type']).toBe('Organization');
            expect(result.name).toBe('EDT Research');
            expect(result.description).toBe('Engineering Digital Twins');
            expect(result.url).toBe('https://example.com');
            expect(result.logo).toEqual({
                '@type': 'ImageObject',
                url: 'https://example.com/logo.png'
            });
        });
    });

    describe('generatePublicationStructuredData', () => {
        it('should generate valid publication structured data', () => {
            const result = generatePublicationStructuredData(
                'Test Article',
                ['John Doe', 'Jane Smith'],
                '2023-01-01',
                'https://example.com/article',
                '10.1000/test',
                'Test Journal',
                'journal'
            );

            expect(result['@context']).toBe('https://schema.org');
            expect(result['@type']).toBe('ScholarlyArticle');
            expect(result.headline).toBe('Test Article');
            expect(result.author).toHaveLength(2);
            expect(result.author[0]).toEqual({ '@type': 'Person', name: 'John Doe' });
            expect(result.datePublished).toBe('2023-01-01');
            expect(result.url).toBe('https://example.com/article');
        });
    });

    describe('generateEventStructuredData', () => {
        it('should generate valid event structured data', () => {
            const result = generateEventStructuredData(
                'Test Conference',
                'A test conference about digital twins',
                '2023-06-01T09:00:00Z',
                'Paris, France',
                'https://example.com/conference',
                'conference'
            );

            expect(result['@context']).toBe('https://schema.org');
            expect(result['@type']).toBe('Event');
            expect(result.name).toBe('Test Conference');
            expect(result.description).toBe('A test conference about digital twins');
            expect(result.startDate).toBe('2023-06-01T09:00:00Z');
            expect(result.location).toEqual({ '@type': 'Place', name: 'Paris, France' });
        });
    });

    describe('generateJobPostingStructuredData', () => {
        it('should generate valid job posting structured data', () => {
            const result = generateJobPostingStructuredData(
                'Research Engineer',
                'Join our research team',
                'Paris, France',
                '2023-01-01',
                '2023-12-31',
                'FULL_TIME',
                ['PhD in Computer Science', 'Experience with digital twins']
            );

            expect(result['@context']).toBe('https://schema.org');
            expect(result['@type']).toBe('JobPosting');
            expect(result.title).toBe('Research Engineer');
            expect(result.description).toBe('Join our research team');
            expect(result.employmentType).toBe('FULL_TIME');
            expect(result.jobLocation).toEqual({
                '@type': 'Place',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Paris, France',
                    addressCountry: 'FR'
                }
            });
        });
    });

    describe('generateBreadcrumbStructuredData', () => {
        it('should generate valid breadcrumb structured data', () => {
            const items = [
                { name: 'Home', url: 'https://example.com/' },
                { name: 'About', url: 'https://example.com/about' }
            ];
            const result = generateBreadcrumbStructuredData(items);

            expect(result['@context']).toBe('https://schema.org');
            expect(result['@type']).toBe('BreadcrumbList');
            expect(result.itemListElement).toHaveLength(2);
            expect(result.itemListElement[0]).toEqual({
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://example.com/'
            });
        });
    });
});