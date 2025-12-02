import { describe, it, expect } from 'vitest';
import {
    generatePageKeywords,
    generateArticleSection,
    generateArticleTags
} from '@utils/keywords';

describe('Keywords Utilities', () => {
    describe('generatePageKeywords', () => {
        it('should generate base keywords for all pages', () => {
            const keywords = generatePageKeywords('test', 'en');

            expect(keywords).toContain('digital twins');
            expect(keywords).toContain('engineering');
            expect(keywords).toContain('research');
            expect(keywords).toContain('EDT');
            expect(keywords).toContain('simulation');
            expect(keywords).toContain('modeling');
        });

        it('should generate French base keywords', () => {
            const keywords = generatePageKeywords('test', 'fr');

            expect(keywords).toContain('jumeaux numériques');
            expect(keywords).toContain('ingénierie');
            expect(keywords).toContain('recherche');
            expect(keywords).toContain('EDT');
            expect(keywords).toContain('simulation');
            expect(keywords).toContain('modélisation');
        });

        it('should generate program-specific keywords in English', () => {
            const keywords = generatePageKeywords('program', 'en');

            expect(keywords).toContain('program');
            expect(keywords).toContain('research program');
        });

        it('should generate program-specific keywords in French', () => {
            const keywords = generatePageKeywords('programme', 'fr');

            expect(keywords).toContain('programme');
            expect(keywords).toContain('programme de recherche');
        });

        it('should generate focused projects keywords', () => {
            const keywordsEn = generatePageKeywords('focused-projects/fp1', 'en');
            const keywordsFr = generatePageKeywords('projets-cibles/pc1', 'fr');

            expect(keywordsEn).toContain('focused projects');
            expect(keywordsEn).toContain('model hybridization');

            expect(keywordsFr).toContain('projets ciblés');
            expect(keywordsFr).toContain('hybridation de modèles');
        });

        it('should generate production keywords', () => {
            const keywordsEn = generatePageKeywords('production', 'en');
            const keywordsFr = generatePageKeywords('production', 'fr');

            expect(keywordsEn).toContain('production');
            expect(keywordsEn).toContain('scientific production');

            expect(keywordsFr).toContain('production');
            expect(keywordsFr).toContain('production scientifique');
        });

        it('should generate demo center keywords', () => {
            const keywordsEn = generatePageKeywords('demo-center', 'en');
            const keywordsFr = generatePageKeywords('centre-demo', 'fr');

            expect(keywordsEn).toContain('demo center');
            expect(keywordsEn).toContain('demonstration');

            expect(keywordsFr).toContain('centre de démo');
            expect(keywordsFr).toContain('démonstration');
        });

        it('should remove duplicates', () => {
            const keywords = generatePageKeywords('test', 'en');
            const uniqueKeywords = [...new Set(keywords)];

            expect(keywords.length).toBe(uniqueKeywords.length);
        });
    });

    describe('generateArticleSection', () => {
        it('should extract first path segment', () => {
            expect(generateArticleSection('program/details')).toBe('program');
            expect(generateArticleSection('focused-projects/fp1')).toBe('focused-projects');
            expect(generateArticleSection('news/events')).toBe('news');
        });

        it('should handle single segment paths', () => {
            expect(generateArticleSection('about')).toBe('about');
            expect(generateArticleSection('contact')).toBe('contact');
        });

        it('should handle empty or root paths', () => {
            expect(generateArticleSection('')).toBe('general');
            expect(generateArticleSection('/')).toBe('general');
        });
    });

    describe('generateArticleTags', () => {
        it('should generate focused project tags', () => {
            const tagsEn = generateArticleTags('focused-projects/fp1', 'en');
            const tagsFr = generateArticleTags('projets-cibles/pc1', 'fr');

            expect(tagsEn).toContain('focused-project');
            expect(tagsEn).toContain('digital-twins');
            expect(tagsEn).toContain('research');

            expect(tagsFr).toContain('projet-ciblé');
            expect(tagsFr).toContain('jumeaux-numériques');
            expect(tagsFr).toContain('recherche');
        });

        it('should generate news tags', () => {
            const tagsEn = generateArticleTags('news', 'en');
            const tagsFr = generateArticleTags('actualites', 'fr');

            expect(tagsEn).toContain('news');
            expect(tagsFr).toContain('actualités');
        });

        it('should generate news tags', () => {
            const tagsEn = generateArticleTags('news/event', 'en');
            const tagsFr = generateArticleTags('actualites/evenement', 'fr');

            expect(tagsEn).toContain('news');
            expect(tagsFr).toContain('actualité');
        });

        it('should generate demo tags', () => {
            const tagsEn = generateArticleTags('demo-center', 'en');
            const tagsFr = generateArticleTags('centre-demo', 'fr');

            expect(tagsEn).toContain('demonstration');
            expect(tagsFr).toContain('démonstration');
        });

        it('should always include base research tags', () => {
            const tagsEn = generateArticleTags('any-path', 'en');
            const tagsFr = generateArticleTags('any-path', 'fr');

            expect(tagsEn).toContain('digital-twins');
            expect(tagsEn).toContain('research');

            expect(tagsFr).toContain('jumeaux-numériques');
            expect(tagsFr).toContain('recherche');
        });
    });
});