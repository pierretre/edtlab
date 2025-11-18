import { useTranslations } from '../i18n/utils';

/**
 * Get default SEO keywords from translations
 */
export function getDefaultKeywords(lang: 'en' | 'fr'): string[] {
    const t = useTranslations(lang);

    try {
        const baseKeywords = t('seo.keywords.base');
        return baseKeywords
            .split(',')
            .map((keyword: string) => keyword.trim())
            .filter((keyword: string) => keyword.length > 0);
    } catch (error) {
        // Fallback to hardcoded keywords if translation is missing
        console.warn('SEO keywords translation missing, using fallback');
        return lang === 'fr'
            ? ['jumeaux numériques', 'ingénierie', 'recherche', 'EDT', 'simulation', 'modélisation']
            : ['digital twins', 'engineering', 'research', 'EDT', 'simulation', 'modeling'];
    }
}

/**
 * Get specific SEO keywords from translations
 */
export function getKeywords(key: string, lang: 'en' | 'fr'): string[] {
    const t = useTranslations(lang);

    try {
        const keywords = t(`seo.keywords.${key}` as any);
        return keywords
            .split(',')
            .map((keyword: string) => keyword.trim())
            .filter((keyword: string) => keyword.length > 0);
    } catch (error) {
        // Return empty array if translation is missing
        return [];
    }
}

/**
 * Combine default keywords with additional keywords
 */
export function combineKeywords(additionalKeywords: string[], lang: 'en' | 'fr'): string {
    const defaultKeywords = getDefaultKeywords(lang);
    const allKeywords = [...defaultKeywords, ...additionalKeywords];

    // Remove duplicates and filter out empty strings
    const uniqueKeywords = [...new Set(allKeywords.filter(keyword => keyword && keyword.trim().length > 0))];

    return uniqueKeywords.join(', ');
}