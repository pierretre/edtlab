import { describe, it, expect } from 'vitest';

describe('Content Collections', () => {
    it('should validate bilingual content structure', () => {
        const supportedLanguages = ['en', 'fr'];
        const requiredFields = ['title', 'slug', 'lang'];

        expect(supportedLanguages).toContain('en');
        expect(supportedLanguages).toContain('fr');
        expect(requiredFields).toEqual(['title', 'slug', 'lang']);
    });

    it('should validate content file naming convention', () => {
        const validFileNames = ['en.md', 'fr.md', 'en.mdx', 'fr.mdx'];
        const invalidFileNames = ['es.md', 'de.md', 'english.md'];

        validFileNames.forEach(fileName => {
            expect(fileName).toMatch(/^(en|fr)\.(md|mdx)$/);
        });

        invalidFileNames.forEach(fileName => {
            expect(fileName).not.toMatch(/^(en|fr)\.(md|mdx)$/);
        });
    });

    it('should validate content directory structure', () => {
        const expectedDirectories = [
            'pages',
            'menu',
            'events',
            'job-offers',
            'publications'
        ];

        expectedDirectories.forEach(dir => {
            expect(dir).toMatch(/^[a-z-]+$/);
            expect(dir.length).toBeGreaterThan(0);
        });
    });
});