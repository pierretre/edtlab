import { getCollection, type CollectionEntry } from "astro:content";
import { getContentLink } from "@i18n/links";
import { enToFrMapping } from "@i18n/page-mapping";

export async function generateAllPagesStaticPaths(): Promise<any[]> {
    const baseEntries = await generateBasePagesStaticPaths();
    const newsEntries = await generateNewsPagesStaticPaths();
    const jobOfferEntries = await generateJobOffersStaticPaths();
    const useCaseEntries = await generateUseCasesStaticPaths();
    const researchStudyEntries = await generateResearchStudiesStaticPaths();

    return [...baseEntries, ...newsEntries, ...jobOfferEntries, ...useCaseEntries, ...researchStudyEntries];
}

/**
 * Generate base pages from the pages collection
 * @returns Array of static path entries
 */
async function generateBasePagesStaticPaths() {
    const allPages = await getCollection("pages");

    return allPages.map((page: CollectionEntry<"pages">) => {
        const { lang, href, template } = page.data;
        const { resolvedLang, resolvedSlug } = getLangAndSlugFromPageData(page.id, lang, href);

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
    return allEntries
        .map(
            (entry: CollectionEntry<"news">) => {
                const { lang } = entry.data;

                const link = getContentLink(
                    lang,
                    "news",
                    entry.id,
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
            const linkEN = getContentLink("en", "job-offers", entry.id, true);
            pages.push({
                params: {
                    lang: "en",
                    slug: linkEN,
                },
                props: {
                    page: entry
                },
            });

            const linkFR = getContentLink("fr", "job-offers", entry.id, true);
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
 * Generate static paths for research-studies pages (ongoing PhD / postdoc)
 * @returns Array of static path entries
 */
async function generateResearchStudiesStaticPaths(): Promise<any[]> {
    const allEntries = await getCollection("research-studies");

    let pages: any[] = [];
    allEntries.forEach(
        (entry: CollectionEntry<"research-studies">) => {
            const linkEN = getContentLink("en", "research-studies", entry.id, true);
            pages.push({
                params: {
                    lang: "en",
                    slug: linkEN,
                },
                props: {
                    page: entry
                },
            });

            const linkFR = getContentLink("fr", "research-studies", entry.id, true);
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
 * @returns Array of static path entries
 */
async function generateUseCasesStaticPaths(): Promise<any[]> {
    const allEntries = await getCollection("use-cases");

    // Group entries by their language-agnostic base slug (filename without the
    // trailing "-en"/"-fr"). Like job offers, a use case provided in a single
    // language is still served under both /en and /fr; when both languages
    // exist, each locale serves its own file instead of generating a duplicate
    // static path for the shared slug.
    const byBaseSlug = new Map<string, CollectionEntry<"use-cases">[]>();
    for (const entry of allEntries) {
        const baseSlug = entry.id.replace(/-(en|fr)$/, "");
        const group = byBaseSlug.get(baseSlug) ?? [];
        group.push(entry);
        byBaseSlug.set(baseSlug, group);
    }

    const langs: ("en" | "fr")[] = ["en", "fr"];
    const pages: any[] = [];
    for (const group of byBaseSlug.values()) {
        for (const lang of langs) {
            // Prefer the file written in the target language, otherwise fall
            // back to whichever language is available.
            const entry = group.find((e) => e.data.lang === lang) ?? group[0];
            pages.push({
                params: {
                    lang,
                    slug: getContentLink(lang, "use-cases", entry.id, true),
                },
                props: {
                    page: entry,
                },
            });
        }
    }
    return pages;
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