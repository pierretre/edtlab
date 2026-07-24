import { getCollection, type CollectionEntry } from "astro:content";
import { getContentLink } from "@i18n/links";
import { enToFrMapping } from "@i18n/page-mapping";

/**
 * Builds one Astro static-path entry ({ params: { lang, slug }, props: { page, ... } }),
 * the shape every generate*StaticPaths function below produces one (or more) of per entry.
 */
function createStaticPage<T>(
    lang: "en" | "fr",
    slug: string | undefined,
    page: T,
    extraProps: Record<string, unknown> = {},
) {
    return {
        params: { lang, slug },
        props: { page, ...extraProps },
    };
}

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

        return createStaticPage(resolvedLang, resolvedSlug, page, { template });
    });
}

/**
 * Generate static paths for news pages
 * @returns Array of static path entries
 */
async function generateNewsPagesStaticPaths(): Promise<any[]> {
    const allEntries = await getCollection("news");
    return allEntries.map((entry: CollectionEntry<"news">) => {
        const { lang } = entry.data;
        const link = getContentLink(lang, "news", entry.id, true);

        // Remove lang suffix from link for slug param
        const cleanSlug = link ? link.replace(/-(en|fr)$/, '') : undefined;

        return createStaticPage(lang, cleanSlug, entry);
    });
}

/**
 * Generate static paths for job offer pages
 * @returns Array of static path entries
 */
async function generateJobOffersStaticPaths(): Promise<any[]> {
    const allEntries = await getCollection("job-offers");

    return allEntries.flatMap((entry: CollectionEntry<"job-offers">) =>
        (["en", "fr"] as const).map((lang) =>
            createStaticPage(lang, getContentLink(lang, "job-offers", entry.id, true), entry),
        ),
    );
}

/**
 * Generate static paths for research-studies pages (ongoing PhD / postdoc)
 * @returns Array of static path entries
 */
async function generateResearchStudiesStaticPaths(): Promise<any[]> {
    const allEntries = await getCollection("research-studies");

    return allEntries.flatMap((entry: CollectionEntry<"research-studies">) =>
        (["en", "fr"] as const).map((lang) =>
            createStaticPage(lang, getContentLink(lang, "research-studies", entry.id, true), entry),
        ),
    );
}

/**
 * Generate static paths for use case pages
 * @returns Array of static path entries
 */
async function generateUseCasesStaticPaths(): Promise<any[]> {
    const allEntries = await getCollection("use-cases", (e) => e.data.status !== "draft");

    // Group entries by their use-case id field (e.g. "uc05"), which is
    // language-agnostic and decoupled from the filename. A use case can have several
    // versions per language (e.g. r1.0 and r1.1) — every version of every language
    // must get its own route, since the version selector and the synthesis list both
    // link directly to a specific entry's own slug.
    const byId = new Map<string, CollectionEntry<"use-cases">[]>();
    for (const entry of allEntries) {
        const group = byId.get(entry.data.id) ?? [];
        group.push(entry);
        byId.set(entry.data.id, group);
    }

    const pages: any[] = [];
    const addPage = (lang: "en" | "fr", entry: CollectionEntry<"use-cases">) =>
        pages.push(createStaticPage(lang, getContentLink(lang, "use-cases", entry.id, true), entry));

    for (const group of byId.values()) {
        // One route per entry, at its own language and its own slug.
        group.forEach((entry) => {
            const otherLang = entry.data.lang === "en" ? "fr" : "en";
            addPage(entry.data.lang, entry);

            // Cross-language fallback: a use case provided in only one language is still
            // served under both /en and /fr — the other locale shows its latest version.
            if (!group.some((e) => e.data.lang === otherLang)) {
                const latest = [...group].sort((a, b) => (b.data.version || "0").localeCompare(a.data.version || "0"))[0];
                if (latest) addPage(otherLang, latest);
            }
        });
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