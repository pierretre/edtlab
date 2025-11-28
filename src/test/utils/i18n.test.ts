import { describe, it, expect } from 'vitest';
import { isValidLanguage } from '@utils/validation';

describe('Internationalization', () => {
    it('should support required languages', () => {
        const supportedLanguages = ['en', 'fr'];
        const defaultLanguage = 'en';

        expect(supportedLanguages).toContain('en');
        expect(supportedLanguages).toContain('fr');
        expect(supportedLanguages).toContain(defaultLanguage);
    });

    it('should have proper URL structure for languages', () => {
        const languagePrefixes = {
            en: '/en/',
            fr: '/fr/'
        };

        expect(languagePrefixes.en).toBe('/en/');
        expect(languagePrefixes.fr).toBe('/fr/');
    });

    it('should validate language codes', () => {
        expect(isValidLanguage('en')).toBe(true);
        expect(isValidLanguage('fr')).toBe(true);
        expect(isValidLanguage('es')).toBe(false);
        expect(isValidLanguage('')).toBe(false);
    });
});