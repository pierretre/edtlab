/**
 * Page mapping for smart language switching
 * Maps English hrefs to their French counterparts and vice versa
 */

export interface PageMapping {
    [key: string]: string;
}

// English to French page mappings
export const enToFrMapping: PageMapping = {
    'program': 'programme',
    'program/governance-and-committees': 'programme/gouvernance-et-comites',
    'program/partners-and-collaborators': 'programme/partenaires-et-collaborateurs',
    'focused-projects': 'projets-cibles',
    'focused-projects/fp1': 'projets-cibles/pc1',
    'focused-projects/fp2': 'projets-cibles/pc2',
    'focused-projects/fp3': 'projets-cibles/pc3',
    'focused-projects/fp4': 'projets-cibles/pc4',
    'focused-projects/fp5': 'projets-cibles/pc5',
    'production': 'production',
    // 'production/publications': 'production/publications', // TODO remove commmented code 
    // 'production/platform': 'production/plateforme',
    'publications': 'publications',
    'platform': 'plateforme',
    // 'demo-center': 'centre-demo',
    'resources': 'ressources',
    'use-cases': 'cas-d-utilisation',
    'news': 'actualites',
    'join-us': 'nous-rejoindre',
    'contact-us': 'nous-contacter', // Both use same href but different lang
    'about': 'a-propos'
};

// French to English page mappings (reverse of above)
export const frToEnMapping: PageMapping = Object.fromEntries(
    Object.entries(enToFrMapping).map(([en, fr]) => [fr, en])
);

/**
 * Get the corresponding page href in the target language
 * @param currentHref - Current page href
 * @param currentLang - Current language
 * @param targetLang - Target language
 * @returns The corresponding href in target language, or fallback to home
 */
export function getCorrespondingPage(
    currentHref: string,
    currentLang: 'en' | 'fr',
    targetLang: 'en' | 'fr'
): string {
    // If switching to the same language, return current href
    if (currentLang === targetLang) {
        return currentHref;
    }

    // Clean the href (remove leading/trailing slashes)
    const cleanHref = currentHref.replace(/^\/+|\/+$/g, '');

    // If empty href (home page), return empty string for home
    if (!cleanHref) {
        return '';
    }

    // Get the mapping based on current language
    const mapping = currentLang === 'en' ? enToFrMapping : frToEnMapping;

    // Look for exact match first
    if (mapping[cleanHref]) {
        return mapping[cleanHref];
    }

    // For nested pages, try to find parent page mapping
    const pathParts = cleanHref.split('/');
    for (let i = pathParts.length - 1; i > 0; i--) {
        const parentPath = pathParts.slice(0, i).join('/');
        if (mapping[parentPath]) {
            // Found parent mapping, construct the full path
            const remainingPath = pathParts.slice(i).join('/');
            return `${mapping[parentPath]}/${remainingPath}`;
        }
    }

    // If no mapping found, return empty string to go to home page
    return '';
}

/**
 * Build the complete URL for language switching
 * @param currentUrl - Current URL object
 * @param targetLang - Target language
 * @returns Complete URL for the corresponding page in target language
 */
export function buildLanguageSwitchUrl(currentUrl: URL, targetLang: 'en' | 'fr'): string {
    const currentLang = getCurrentLangFromUrl(currentUrl);
    const currentHref = getCurrentHrefFromUrl(currentUrl);

    const correspondingHref = getCorrespondingPage(currentHref, currentLang, targetLang);

    // Build the new URL
    const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;
    const newPath = correspondingHref ? `/${targetLang}/${correspondingHref}` : `/${targetLang}/`;

    return `${baseUrl}${newPath}`;
}

/**
 * Extract current language from URL
 */
function getCurrentLangFromUrl(url: URL): 'en' | 'fr' {
    const [, lang] = url.pathname.split('/');
    return (lang === 'fr' || lang === 'en') ? lang : 'en';
}

/**
 * Extract current href from URL (without language prefix)
 */
function getCurrentHrefFromUrl(url: URL): string {
    const pathParts = url.pathname.split('/').filter(part => part.length > 0);

    // Remove language prefix if present
    if (pathParts.length > 0 && (pathParts[0] === 'en' || pathParts[0] === 'fr')) {
        pathParts.shift();
    }

    return pathParts.join('/');
}