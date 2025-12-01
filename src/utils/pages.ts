import { getCollection, type CollectionEntry } from "astro:content";
import { getContentLink } from "@i18n/links";
import { enToFrMapping } from "@i18n/page-mapping";

export async function generateAllPagesStaticPaths(): Promise<any[]> {
    const baseEntries = await generateBasePagesStaticPaths();
    const newsEntries = await generateTypePagesStaticPaths("news");
    const jobOfferEntries = await generateTypePagesStaticPaths("job-offers");

    return [...baseEntries, ...newsEntries, ...jobOfferEntries];
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
 * Generate static paths for content types like events, press releases, job offers
 * @param collection - The content collection name
 * @returns Array of static path entries
 */
async function generateTypePagesStaticPaths(collection: "news" | "job-offers"): Promise<any[]> {
    const allEntries = await getCollection(collection);

    return allEntries.map(
        (entry: CollectionEntry<typeof collection>) => {
            const { lang, template } = entry.data;
            const link = getContentLink(
                lang,
                collection,
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
                    page: entry,
                    template,
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