import { describe, it, expect } from 'vitest';
import { getDefaultKeywords, combineKeywords, getKeywords } from '@utils/seo-keywords';

describe('SEO Keywords Utilities', () => {
    describe('getDefaultKeywords', () => {
        it('should return English default keywords', () => {
            const keywords = getDefaultKeywords('en');

            expect(keywords).toContain('digital twins');
            expect(keywords).toContain('engineering');
            expect(keywords).toContain('research');
            expect(keywords).toContain('EDT');
            expect(keywords).toContain('simulation');
            expect(keywords).toContain('modeling');
        });

        it('should return French default keywords', () => {
            const keywords = getDefaultKeywords('fr');

            expect(keywords).toContain('jumeaux numériques');
            expect(keywords).toContain('ingénierie');
            expect(keywords).toContain('recherche');
            expect(keywords).toContain('EDT');
            expect(keywords).toContain('simulation');
            expect(keywords).toContain('modélisation');
        });

        it('should return array of strings', () => {
            const keywordsEn = getDefaultKeywords('en');
            const keywordsFr = getDefaultKeywords('fr');

            expect(Array.isArray(keywordsEn)).toBe(true);
            expect(Array.isArray(keywordsFr)).toBe(true);
            expect(keywordsEn.every(keyword => typeof keyword === 'string')).toBe(true);
            expect(keywordsFr.every(keyword => typeof keyword === 'string')).toBe(true);
        });

        it('should return non-empty keywords', () => {
            const keywordsEn = getDefaultKeywords('en');
            const keywordsFr = getDefaultKeywords('fr');

            expect(keywordsEn.length).toBeGreaterThan(0);
            expect(keywordsFr.length).toBeGreaterThan(0);
            expect(keywordsEn.every(keyword => keyword.trim().length > 0)).toBe(true);
            expect(keywordsFr.every(keyword => keyword.trim().length > 0)).toBe(true);
        });
    });

    describe('combineKeywords', () => {
        it('should combine default and additional keywords in English', () => {
            const additional = ['machine learning', 'AI'];
            const result = combineKeywords(additional, 'en');

            expect(result).toContain('digital twins');
            expect(result).toContain('machine learning');
            expect(result).toContain('AI');
        });

        it('should combine default and additional keywords in French', () => {
            const additional = ['apprentissage automatique', 'IA'];
            const result = combineKeywords(additional, 'fr');

            expect(result).toContain('jumeaux numériques');
            expect(result).toContain('apprentissage automatique');
            expect(result).toContain('IA');
        });

        it('should remove duplicates', () => {
            const additional = ['research', 'digital twins', 'new keyword'];
            const result = combineKeywords(additional, 'en');

            // Count occurrences of 'research' and 'digital twins'
            const researchCount = (result.match(/research/g) || []).length;
            const digitalTwinsCount = (result.match(/digital twins/g) || []).length;

            expect(researchCount).toBe(1);
            expect(digitalTwinsCount).toBe(1);
            expect(result).toContain('new keyword');
        });

        it('should filter out empty strings', () => {
            const additional = ['', '  ', 'valid keyword', ''];
            const result = combineKeywords(additional, 'en');

            expect(result).toContain('valid keyword');

            // Split the result and check that no empty keywords exist
            const keywords = result.split(',').map(k => k.trim());
            expect(keywords.every(keyword => keyword.length > 0)).toBe(true);
        });

        it('should return comma-separated string', () => {
            const additional = ['keyword1', 'keyword2'];
            const result = combineKeywords(additional, 'en');

            expect(typeof result).toBe('string');
            expect(result).toContain(',');

            // Split and check that we have multiple keywords
            const keywords = result.split(',').map(k => k.trim());
            expect(keywords.length).toBeGreaterThan(1);
        });

        it('should handle empty additional keywords array', () => {
            const result = combineKeywords([], 'en');

            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
            expect(result).toContain('digital twins');
        });
    });

    describe('getKeywords', () => {
        it('should return specific keywords for English', () => {
            const keywords = getKeywords('program', 'en');

            expect(keywords).toContain('research program');
        });

        it('should return specific keywords for French', () => {
            const keywords = getKeywords('program', 'fr');

            expect(keywords).toContain('programme de recherche');
        });

        it('should return focused project keywords', () => {
            const keywordsEn = getKeywords('focused-projects', 'en');
            const keywordsFr = getKeywords('focused-projects', 'fr');

            expect(keywordsEn).toContain('focused projects');
            expect(keywordsEn).toContain('research projects');

            expect(keywordsFr).toContain('projets ciblés');
            expect(keywordsFr).toContain('projets de recherche');
        });

        it('should return project-specific keywords', () => {
            const fp1En = getKeywords('fp1', 'en');
            const fp1Fr = getKeywords('fp1', 'fr');

            expect(fp1En).toContain('model hybridization');
            expect(fp1En).toContain('model management');

            expect(fp1Fr).toContain('hybridation de modèles');
            expect(fp1Fr).toContain('gestion de modèles');
        });

        it('should return empty array for non-existent keys', () => {
            const keywords = getKeywords('non-existent', 'en');

            expect(keywords).toEqual([]);
        });

        it('should return array of strings', () => {
            const keywords = getKeywords('production', 'en');

            expect(Array.isArray(keywords)).toBe(true);
            expect(keywords.every(keyword => typeof keyword === 'string')).toBe(true);
        });
    });
});