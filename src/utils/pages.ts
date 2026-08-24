import { getCollection, type CollectionEntry } from "astro:content";
import { getContentLink } from "@i18n/links";
import { enToFrMapping } from "@i18n/page-mapping";

export async function generateAllPagesStaticPaths(): Promise<any[]> {
    const baseEntries = await generateBasePagesStaticPaths();
    const newsEntries = await generateNewsPagesStaticPaths();
    const positionEntries = await generatePositionsStaticPaths();
    const useCaseEntries = await generateUseCasesStaticPaths();

    return [...baseEntries, ...newsEntries, ...positionEntries, ...useCaseEntries];
}

/**
 * Generate base pages from the pages collection
 * @returns Array of static path entries
 */
async function generateBasePagesStaticPaths() {
    const allPages = await getCollection("pages");

    return allPages
        .map((page: CollectionEntry<"pages">) => {
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
 * Generate static paths for position pages (open positions, and
 * occupied/ongoing research positions)
 * @returns Array of static path entries
 */
async function generatePositionsStaticPaths(): Promise<any[]> {
    const allEntries = await getCollection("positions");

    let pages: any[] = [];
    allEntries.forEach(
        (entry: CollectionEntry<"positions">) => {
            const linkEN = getContentLink("en", "positions", entry.id, true);
            pages.push({
                params: {
                    lang: "en",
                    slug: linkEN,
                },
                props: {
                    page: entry
                },
            });

            const linkFR = getContentLink("fr", "positions", entry.id, true);
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

    // Group entries by their use-case id field (e.g. "uc05"), which is
    // language-agnostic and decoupled from the filename. Like job offers, a use
    // case provided in a single language is still served under both /en and /fr;
    // when both languages exist, each locale serves its own file.
    const byId = new Map<string, CollectionEntry<"use-cases">[]>();
    for (const entry of allEntries) {
        const ucId = entry.data.id;
        const group = byId.get(ucId) ?? [];
        group.push(entry);
        byId.set(ucId, group);
    }

    const langs: ("en" | "fr")[] = ["en", "fr"];
    const pages: any[] = [];
    for (const group of byId.values()) {
        for (const lang of langs) {
            // Prefer published entry in target language, then any published
            // entry as fallback. Draft-only groups produce no path for that lang.
            const published = group.filter((e) => e.data.status !== "draft");
            const entry = published.find((e) => e.data.lang === lang) ?? published[0];
            if (!entry) continue;
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