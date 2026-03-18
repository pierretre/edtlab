import { getCollection, type CollectionEntry } from "astro:content";
import { getContentLink } from "@i18n/links";
import { enToFrMapping } from "@i18n/page-mapping";

export async function generateAllPagesStaticPaths(): Promise<any[]> {
    const baseEntries = await generateBasePagesStaticPaths();
    const newsEntries = await generateNewsPagesStaticPaths();
    const jobOfferEntries = await generateJobOffersStaticPaths();
    const useCaseEntries = await generateUseCasesStaticPaths();

    return [...baseEntries, ...newsEntries, ...jobOfferEntries, ...useCaseEntries];
}

/**
 * Generate base pages from the pages collection
 * @returns Array of static path entries
 */
async function generateBasePagesStaticPaths() {
    const allPages = await getCollection("pages");

    return allPages.map((page: CollectionEntry<"pages">) => {
        const { lang, href, template } = page.data;
        const { resolvedLang, resolvedSlug } = getLangAndSlugFromPageData(page.slug, lang, href);

        return {
            params: {
                lang: resolvedLang,
                slug: resolvedSlug,
            },
            props: {
                page,
                template,
            },
        };
    });
}

/**
 * Generate static paths for news pages
 * @returns Array of static path entries
 */
async function generateNewsPagesStaticPaths(): Promise<any[]> {
    const allEntries = await getCollection("news");

    return allEntries.map(
        (entry: CollectionEntry<"news">) => {
            const { lang } = entry.data;
            const link = getContentLink(
                lang,
                "news",
                entry.slug,
                true,
            );

            // Remove lang suffix from link for slug param
            const cleanSlug = link ? link.replace(/-(en|fr)$/, '') : undefined;

            return {
                params: {
                    lang: lang,
                    slug: cleanSlug,
                },
                props: {
                    page: entry
                },
            };
        });
}

/**
 * Generate static paths for job offer pages
 * @returns Array of static path entries
 */
async function generateJobOffersStaticPaths(): Promise<any[]> {
    const allEntries = await getCollection("job-offers");

    let pages: any[] = [];
    allEntries.forEach(
        (entry: CollectionEntry<"job-offers">) => {
            const linkEN = getContentLink("en", "job-offers", entry.slug, true);
            pages.push({
                params: {
                    lang: "en",
                    slug: linkEN,
                },
                props: {
                    page: entry
                },
            });

            const linkFR = getContentLink("fr", "job-offers", entry.slug, true);
            pages.push({
                params: {
                    lang: "fr",
                    slug: linkFR,
                },
                props: {
                    page: entry
                },
            });
        });
    return pages;
}

/**
 * Generate static paths for use case pages
 */
async function generateUseCasesStaticPaths(): Promise<any[]> {
    const allEntries = await getCollection("use-cases");

    return allEntries
        .filter((entry: CollectionEntry<"use-cases">) => entry.data.status === 'published')
        .map((entry: CollectionEntry<"use-cases">) => {
            const { lang } = entry.data;
            const link = getContentLink(
                lang,
                "use-cases",
                entry.slug,
                true,
            );

            const cleanSlug = link ? link.replace(/-(en|fr)$/, '') : undefined;

            return {
                params: {
                    lang: lang,
                    slug: cleanSlug,
                },
                props: {
                    page: entry
                },
            };
        });
}

function getLangAndSlugFromPageData(
    slug: string,
    lang?: 'en' | 'fr',
    href?: string
): { resolvedLang: 'en' | 'fr'; resolvedSlug: string } {
    // Default resolvedLang and slug from data
    let resolvedLang = lang as string | undefined;
    let resolvedSlug = href as string | undefined;

    // If lang not provided, try to extract it from the href suffix (e.g. 'about-en' -> 'about', 'en')
    if (!resolvedLang || !resolvedSlug) {
        const m = slug.match(/(.*)\/(en|fr)$/);
        if (m) {
            resolvedSlug = m[1];
            resolvedLang = m[2];

            if (resolvedLang === 'fr') {
                resolvedSlug = enToFrMapping[resolvedSlug] || resolvedSlug;
            }
        }
    }

    return {
        resolvedLang: resolvedLang as 'en' | 'fr',
        resolvedSlug: resolvedSlug || slug,
    };
}