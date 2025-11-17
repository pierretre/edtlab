/**
 * Comprehensive i18n link utilities
 * Combines all dynamic link/URL/page creation functionality
 * 
 * @example
 * ```astro
 * ---
 * import { linkHelpers } from '../i18n/links';
 * const lang = 'fr';
 * ---
 * 
 * <!-- Instead of: href={lang === "fr" ? `/fr/nous-rejoindre/${jobOffer.slug.replace("-fr", "")}` : `/en/join-us/${jobOffer.slug.replace("-en", "")}`} -->
 * <a href={linkHelpers.jobOffer(lang, jobOffer.slug)}>Job Offer</a>
 * 
 * <!-- Instead of: href={lang === "fr" ? "/fr/actualites" : "/en/news"} -->
 * <a href={linkHelpers.newsIndex(lang)}>News</a>
 * 
 * <!-- Instead of: href={`/${lang}/program`} -->
 * <a href={linkHelpers.page(lang, 'program')}>Program</a>
 * ```
 */

import { enToFrMapping, getCorrespondingPage } from './page-mapping';

export type Lang = 'en' | 'fr';
export type ContentType = 'news' | 'press-releases' | 'job-offers' | 'events';

/**
 * Content type to route mappings
 */
const CONTENT_ROUTES: Record<ContentType, { en: string; fr: string }> = {
    news: {
        en: 'news',
        fr: 'actualites'
    },
    'press-releases': {
        en: 'news',
        fr: 'actualites'
    },
    'job-offers': {
        en: 'join-us',
        fr: 'nous-rejoindre'
    },
    events: {
        en: 'news',
        fr: 'actualites'
    }
};

/**
 * Generate a localized link for content with slug
 * @param lang - Current language ('en' | 'fr')
 * @param contentType - Type of content
 * @param slug - Content slug (with or without language suffix)
 * @param withoutLangSuffix - Whether the slug is provided without language suffix
 * @returns Localized URL path
 */
export function getContentLink(
    lang: Lang,
    contentType: ContentType,
    slug?: string,
    withoutLangSuffix: boolean = false
): string {
    const route = CONTENT_ROUTES[contentType][lang];
    let link;
    // If a slug is provided, remove any trailing language suffix ("-en" or "-fr").
    const cleanSlug = slug ? slug.replace(/-(en|fr)$/, '') : undefined;

    if (!cleanSlug) {
        link = `/${route}`;
    } else {
        link = `/${route}/${cleanSlug}`;
    }

    // console.log(`2) getContentLink - lang: ${lang}, contentType: ${contentType}, slug: ${slug}, withoutLangSuffix: ${withoutLangSuffix} => link before suffix check: ${link}`);

    return !withoutLangSuffix ? `/${lang}${link}` : link;
}

/**
 * Generate a localized page link using the page mapping system
 * @param lang - Current language ('en' | 'fr')
 * @param pageKey - Page key (e.g., 'program', 'focused-projects', 'demo-center')
 * @returns Localized URL path
 */
export function getPageLink(lang: Lang, pageKey: string): string {
    // Use the existing page mapping system
    let localizedPath: string;

    if (lang === 'fr') {
        localizedPath = enToFrMapping[pageKey] || pageKey;
    } else {
        localizedPath = pageKey;
    }

    return `/${lang}/${localizedPath}`;
}

/**
 * Generate a localized link for any route
 * @param lang - Current language ('en' | 'fr')
 * @param route - Route path (can be nested like 'production/publications')
 * @returns Localized URL path
 */
export function getLocalizedLink(lang: Lang, route: string): string {
    // Handle empty route (home page)
    if (!route || route === '/') {
        return `/${lang}`;
    }

    // Clean the route
    const cleanRoute = route.replace(/^\/+|\/+$/g, '');

    // Use page mapping if available
    const mappedRoute = lang === 'fr' ? (enToFrMapping[cleanRoute] || cleanRoute) : cleanRoute;

    return `/${lang}/${mappedRoute}`;
}

/**
 * Get alternate language link for current page
 * @param currentLang - Current language
 * @param currentRoute - Current route (without language prefix)
 * @returns Alternate language URL path
 */
export function getAlternateLink(currentLang: Lang, currentRoute: string): string {
    const targetLang: Lang = currentLang === 'en' ? 'fr' : 'en';
    const correspondingRoute = getCorrespondingPage(currentRoute, currentLang, targetLang);

    return correspondingRoute ? `/${targetLang}/${correspondingRoute}` : `/${targetLang}`;
}

/**
 * Build complete URL with protocol and host
 * @param baseUrl - Base URL (protocol + host)
 * @param lang - Language
 * @param route - Route path
 * @returns Complete URL
 */
export function buildCompleteUrl(baseUrl: string, lang: Lang, route: string = ''): string {
    const cleanRoute = route.replace(/^\/+|\/+$/g, '');
    const path = cleanRoute ? `/${lang}/${cleanRoute}` : `/${lang}`;
    return `${baseUrl}${path}`;
}

/**
 * Extract language from URL pathname
 * @param pathname - URL pathname
 * @returns Language or 'en' as default
 */
export function extractLangFromPath(pathname: string): Lang {
    const [, lang] = pathname.split('/');
    return (lang === 'fr' || lang === 'en') ? lang : 'en';
}

/**
 * Extract route from URL pathname (without language prefix)
 * @param pathname - URL pathname
 * @returns Route without language prefix
 */
export function extractRouteFromPath(pathname: string): string {
    const pathParts = pathname.split('/').filter(part => part.length > 0);

    // Remove language prefix if present
    if (pathParts.length > 0 && (pathParts[0] === 'en' || pathParts[0] === 'fr')) {
        pathParts.shift();
    }

    return pathParts.join('/');
}

/**
 * Convenience functions for specific content types
 */
export const linkHelpers = {
    /**
     * Generate news/events link
     */
    news: (lang: Lang, slug?: string) => getContentLink(lang, 'news', slug),

    /**
     * Generate press release link
     */
    press: (lang: Lang, slug?: string) => getContentLink(lang, 'press-releases', slug),

    /**
     * Generate job offer link
     */
    jobOffer: (lang: Lang, slug?: string) => getContentLink(lang, 'job-offers', slug),

    /**
     * Generate event link (alias for news)
     */
    event: (lang: Lang, slug?: string) => getContentLink(lang, 'events', slug),

    /**
     * Generate page links using page mapping
     */
    page: (lang: Lang, pageKey: string) => getPageLink(lang, pageKey),

    /**
     * Generate home link
     */
    home: (lang: Lang) => `/${lang}`,

    /**
     * Generate news index link
     */
    newsIndex: (lang: Lang) => getContentLink(lang, 'news'),

    /**
     * Generate careers/join-us link
     */
    careers: (lang: Lang) => getContentLink(lang, 'job-offers')
};