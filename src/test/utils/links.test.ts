import { describe, it, expect, vi } from 'vitest';

// astro:content is a virtual module only available inside Astro's SSR context
vi.mock('astro:content', () => ({ getCollection: vi.fn() }));

import { generateAnchorId, extractInternalLinks, buildInternalLink } from '@utils/links';

describe('generateAnchorId', () => {
    it('should lowercase and replace spaces with hyphens', () => {
        expect(generateAnchorId('Hello World')).toBe('hello-world');
    });

    it('should remove special characters', () => {
        expect(generateAnchorId('Title: With! Symbols?')).toBe('title-with-symbols');
    });

    it('should collapse multiple hyphens', () => {
        expect(generateAnchorId('A  B   C')).toBe('a-b-c');
    });

    it('should remove leading and trailing hyphens', () => {
        expect(generateAnchorId('  hello  ')).toBe('hello');
    });

    it('should handle empty string', () => {
        expect(generateAnchorId('')).toBe('');
    });

    it('should strip accented characters (not in \\w)', () => {
        // é is not in \w, so it gets removed — R and other ASCII letters are kept
        expect(generateAnchorId('Résumé')).toBe('rsum');
    });

    it('should handle already clean slugs', () => {
        expect(generateAnchorId('my-section')).toBe('my-section');
    });
});

describe('extractInternalLinks', () => {
    it('should extract internal links from HTML content', () => {
        const content = '<a href="/en/about">About</a><a href="/fr/contact">Contact</a>';
        expect(extractInternalLinks(content)).toEqual(['/en/about', '/fr/contact']);
    });

    it('should ignore external links', () => {
        const content = '<a href="https://example.com">External</a>';
        expect(extractInternalLinks(content)).toEqual([]);
    });

    it('should ignore mailto and tel links', () => {
        const content = '<a href="mailto:test@test.com">Mail</a><a href="tel:+33123">Phone</a>';
        expect(extractInternalLinks(content)).toEqual([]);
    });

    it('should ignore anchor links', () => {
        const content = '<a href="#section">Section</a>';
        expect(extractInternalLinks(content)).toEqual([]);
    });

    it('should deduplicate links', () => {
        const content = '<a href="/en/about">A</a><a href="/en/about">B</a>';
        expect(extractInternalLinks(content)).toEqual(['/en/about']);
    });

    it('should return empty array for content with no links', () => {
        expect(extractInternalLinks('no links here')).toEqual([]);
    });

    it('should handle both single and double quotes', () => {
        const content = `<a href='/en/about'>A</a><a href="/fr/contact">B</a>`;
        expect(extractInternalLinks(content)).toEqual(['/en/about', '/fr/contact']);
    });
});

describe('buildInternalLink', () => {
    it('should add language prefix to a relative path', () => {
        expect(buildInternalLink('about', 'en')).toBe('/en/about');
        expect(buildInternalLink('about', 'fr')).toBe('/fr/about');
    });

    it('should add language prefix to a path starting with /', () => {
        expect(buildInternalLink('/about', 'en')).toBe('/en/about');
        expect(buildInternalLink('/contact', 'fr')).toBe('/fr/contact');
    });

    it('should not modify paths that already have a language prefix', () => {
        expect(buildInternalLink('/en/about', 'fr')).toBe('/en/about');
        expect(buildInternalLink('/fr/contact', 'en')).toBe('/fr/contact');
    });

    it('should not modify external links', () => {
        expect(buildInternalLink('https://example.com', 'en')).toBe('https://example.com');
        expect(buildInternalLink('//cdn.example.com/file.js', 'fr')).toBe('//cdn.example.com/file.js');
    });
});
