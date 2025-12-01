import { getCollection } from 'astro:content';

export interface LinkValidationResult {
    isValid: boolean;
    exists: boolean;
    suggestedUrl?: string;
    error?: string;
}

/**
 * Validate internal links and suggest corrections
 */
export async function validateInternalLink(
    href: string,
    currentLang: 'en' | 'fr'
): Promise<LinkValidationResult> {
    try {
        // Skip external links
        if (href.startsWith('http') || href.startsWith('//')) {
            return { isValid: true, exists: true };
        }

        // Remove language prefix and leading slash for validation
        const cleanPath = href.replace(/^\/[a-z]{2}\//, '').replace(/^\//, '');

        // Check if it's a static page route
        const staticRoutes = [
            '',  // home page
            'program',
            'focused-projects',
            'production',
            'production/publications',
            'production/platform',
            'demo-center',
            'resources',
            'news',
            'join-us',
            'contact',
            'about'
        ];

        if (staticRoutes.includes(cleanPath)) {
            return {
                isValid: true,
                exists: true,
                suggestedUrl: `/${currentLang}/${cleanPath}`
            };
        }

        // Check focused projects (fp1-fp5)
        const fpMatch = cleanPath.match(/^focused-projects\/(fp[1-5])$/);
        if (fpMatch) {
            return {
                isValid: true,
                exists: true,
                suggestedUrl: `/${currentLang}/${cleanPath}`
            };
        }

        // Check content collections
        try {
            const pages = await getCollection('pages');
            const pageExists = pages.some(page =>
                page.data.lang === currentLang &&
                page.data.href === cleanPath
            );

            if (pageExists) {
                return {
                    isValid: true,
                    exists: true,
                    suggestedUrl: `/${currentLang}/${cleanPath}`
                };
            }
        } catch (error) {
            console.warn('Could not validate against pages collection:', error);
        }

        // Check for common typos and suggest corrections
        const suggestions = getSuggestions(cleanPath, staticRoutes);

        return {
            isValid: false,
            exists: false,
            suggestedUrl: suggestions.length > 0 ? `/${currentLang}/${suggestions[0]}` : undefined,
            error: `Page not found: ${cleanPath}`
        };

    } catch (error) {
        return {
            isValid: false,
            exists: false,
            error: `Validation error: ${error}`
        };
    }
}

/**
 * Get suggestions for similar paths
 */
function getSuggestions(path: string, validPaths: string[]): string[] {
    const suggestions: Array<{ path: string; score: number }> = [];

    validPaths.forEach(validPath => {
        const score = calculateSimilarity(path, validPath);
        if (score > 0.5) {
            suggestions.push({ path: validPath, score });
        }
    });

    return suggestions
        .sort((a, b) => b.score - a.score)
        .map(s => s.path)
        .slice(0, 3);
}

/**
 * Calculate string similarity using Levenshtein distance
 */
function calculateSimilarity(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;

    if (len1 === 0) return len2 === 0 ? 1 : 0;
    if (len2 === 0) return 0;

    const matrix: number[][] = [];

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,      // deletion
                matrix[i][j - 1] + 1,      // insertion
                matrix[i - 1][j - 1] + cost // substitution
            );
        }
    }

    const maxLen = Math.max(len1, len2);
    return (maxLen - matrix[len1][len2]) / maxLen;
}

/**
 * Generate anchor links for headings
 */
export function generateAnchorId(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Replace multiple hyphens with single
        .replace(/^-|-$/g, '');   // Remove leading/trailing hyphens
}

/**
 * Extract internal links from content
 */
export function extractInternalLinks(content: string): string[] {
    const linkRegex = /href=["']([^"']+)["']/g;
    const links: string[] = [];
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
        const href = match[1];
        // Only include internal links (not external or mailto/tel)
        if (!href.startsWith('http') &&
            !href.startsWith('//') &&
            !href.startsWith('mailto:') &&
            !href.startsWith('tel:') &&
            !href.startsWith('#')) {
            links.push(href);
        }
    }

    return [...new Set(links)]; // Remove duplicates
}

/**
 * Build proper internal link with language prefix
 */
export function buildInternalLink(path: string, lang: 'en' | 'fr'): string {
    // If path already has language prefix, return as is
    if (path.match(/^\/[a-z]{2}\//)) {
        return path;
    }

    // If path is external (starts with http), return as is
    if (path.startsWith('http') || path.startsWith('//')) {
        return path;
    }

    // If path starts with /, add language prefix
    if (path.startsWith('/')) {
        return `/${lang}${path}`;
    }

    // Otherwise, add language prefix and leading slash
    return `/${lang}/${path}`;
}

/**
 * Generate related links based on current page
 */
export async function generateRelatedLinks(
    currentPath: string,
    currentLang: 'en' | 'fr',
    maxLinks: number = 5
): Promise<Array<{ title: string; href: string; description?: string }>> {
    const relatedLinks: Array<{ title: string; href: string; description?: string }> = [];

    try {
        const pages = await getCollection('pages');
        const currentPagePages = pages.filter(page => page.data.lang === currentLang);

        // Get pages from the same section
        const currentSection = currentPath.split('/')[0];
        const sectionPages = currentPagePages.filter(page =>
            page.slug.startsWith(currentSection) &&
            page.data.href !== currentPath
        );

        // Add section pages first
        sectionPages.slice(0, Math.min(3, maxLinks)).forEach(page => {
            relatedLinks.push({
                title: page.data.title,
                href: `/${currentLang}/${page.data.href}`,
                description: page.data.description
            });
        });

        // Fill remaining slots with other pages
        if (relatedLinks.length < maxLinks) {
            const otherPages = currentPagePages.filter(page =>
                !page.slug.startsWith(currentSection) &&
                !relatedLinks.some(link => link.href.includes(page.slug))
            );

            otherPages.slice(0, maxLinks - relatedLinks.length).forEach(page => {
                relatedLinks.push({
                    title: page.data.title,
                    href: `/${currentLang}/${page.data.href}`,
                    description: page.data.description
                });
            });
        }

    } catch (error) {
        console.warn('Could not generate related links:', error);
    }

    return relatedLinks;
}