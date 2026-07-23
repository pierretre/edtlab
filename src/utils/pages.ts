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
    const allEntries = (await getCollection("use-cases")).filter((e) => e.data.status !== "draft");

    // Group entries by their use-case id field (e.g. "uc05"), which is
    // language-agnostic and decoupled from the filename. A use case can have several
    // versions per language (e.g. r1.0 and r1.1) — every version of every language
    // must get its own route, since the version selector and the synthesis list both
    // link directly to a specific entry's own slug.
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
        // One route per entry, at its own language and its own slug.
        for (const entry of group) {
            pages.push({
                params: {
                    lang: entry.data.lang,
                    slug: getContentLink(entry.data.lang, "use-cases", entry.id, true),
                },
                props: {
                    page: entry,
                },
            });
        }

        // Cross-language fallback: a use case provided in only one language is still
        // served under both /en and /fr — the other locale shows its latest version.
        for (const lang of langs) {
            if (group.some((e) => e.data.lang === lang)) continue;
            const latest = [...group].sort((a, b) =>
                (b.data.version || "0").localeCompare(a.data.version || "0"),
            )[0];
            if (!latest) continue;
            pages.push({
                params: {
                    lang,
                    slug: getContentLink(lang, "use-cases", latest.id, true),
                },
                props: {
                    page: latest,
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