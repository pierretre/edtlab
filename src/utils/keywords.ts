import { useTranslations } from '../i18n/utils';
import { getDefaultKeywords, getKeywords } from './seo-keywords';

/**
 * Generate SEO keywords based on page content and path using translations
 */
export function generatePageKeywords(
    href: string,
    lang: 'en' | 'fr'
): string[] {
    const t = useTranslations(lang);
    const keywords: string[] = [];

    // Get base keywords from translations
    const baseKeywords = getDefaultKeywords(lang);
    keywords.push(...baseKeywords);

    // Add section-specific keywords based on path using translations
    if (href.includes('program') || href.includes('programme')) {
        keywords.push(t('nav.program').toLowerCase());
        keywords.push(...getKeywords('program', lang));
    }

    if (href.includes('focused-projects') || href.includes('projets-cibles') || href.includes('fp') || href.includes('pc')) {
        keywords.push(t('nav.focused-projects').toLowerCase());
        keywords.push(...getKeywords('focused-projects', lang));
    }

    if (href.includes('production')) {
        keywords.push(t('nav.production').toLowerCase());
        keywords.push(...getKeywords('production', lang));
    }

    if (href.includes('publications')) {
        keywords.push('publications');
        keywords.push(...getKeywords('publications', lang));
    }

    if (href.includes('demo-center') || href.includes('centre-demo')) {
        keywords.push(t('nav.demo-center').toLowerCase());
        keywords.push(...getKeywords('demo-center', lang));
    }

    if (href.includes('resources') || href.includes('ressources')) {
        keywords.push(t('nav.resources').toLowerCase());
        keywords.push(...getKeywords('resources', lang));
    }

    if (href.includes('news') || href.includes('actualites')) {
        keywords.push(t('nav.news').toLowerCase());
        keywords.push(...getKeywords('news', lang));
    }

    if (href.includes('join-us') || href.includes('nous-rejoindre')) {
        keywords.push(t('nav.join-us').toLowerCase());
        keywords.push(...getKeywords('join-us', lang));
    }

    if (href.includes('contact')) {
        keywords.push(t('nav.contact').toLowerCase());
        keywords.push(...getKeywords('contact', lang));
    }

    if (href.includes('about') || href.includes('a-propos')) {
        keywords.push(t('nav.about').toLowerCase());
        keywords.push(...getKeywords('about', lang));
    }

    // Add specific project keywords for focused projects
    if (href.includes('fp1') || href.includes('pc1')) {
        keywords.push(...getKeywords('fp1', lang));
    }

    if (href.includes('fp2') || href.includes('pc2')) {
        keywords.push(...getKeywords('fp2', lang));
    }

    if (href.includes('fp3') || href.includes('pc3')) {
        keywords.push(...getKeywords('fp3', lang));
    }

    if (href.includes('fp4') || href.includes('pc4')) {
        keywords.push(...getKeywords('fp4', lang));
    }

    if (href.includes('fp5') || href.includes('pc5')) {
        keywords.push(...getKeywords('fp5', lang));
    }

    // Remove duplicates and return
    return [...new Set(keywords.filter(keyword => keyword && keyword.trim().length > 0))];
}

/**
 * Generate article section from href
 */
export function generateArticleSection(href: string): string {
    const segments = href.split('/').filter(segment => segment.length > 0);
    return segments[0] || 'general';
}

/**
 * Generate article tags based on content type and path
 */
export function generateArticleTags(
    href: string,
    lang: 'en' | 'fr'
): string[] {
    const tags: string[] = [];

    // Add content type tags
    if (href.includes('fp') || href.includes('pc')) {
        tags.push(lang === 'fr' ? 'projet-ciblé' : 'focused-project');
    }

    if (href.includes('publications')) {
        tags.push(lang === 'fr' ? 'publication' : 'publication');
    }

    if (href.includes('news') || href.includes('actualites')) {
        tags.push(lang === 'fr' ? 'actualité' : 'news');
    }

    if (href.includes('demo')) {
        tags.push(lang === 'fr' ? 'démonstration' : 'demonstration');
    }

    // Add research area tags
    tags.push(
        lang === 'fr' ? 'jumeaux-numériques' : 'digital-twins',
        lang === 'fr' ? 'recherche' : 'research'
    );

    return tags;
}