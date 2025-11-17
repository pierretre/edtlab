import { getCollection, type CollectionEntry } from "astro:content";
import { getContentLink } from "../i18n/links";

export async function generateAllPagesStaticPaths(): Promise<any[]> {
    const baseEntries = await generateBasePagesStaticPaths();
    const eventEntries = await generateTypePagesStaticPaths("events");
    const pressReleaseEntries = await generateTypePagesStaticPaths("press-releases");
    const jobOfferEntries = await generateTypePagesStaticPaths("job-offers");

    return [...baseEntries, ...eventEntries, ...pressReleaseEntries, ...jobOfferEntries];
}

/**
 * Generate base pages from the pages collection
 * @returns Array of static path entries
 */
async function generateBasePagesStaticPaths() {
    const allPages = await getCollection("pages");

    return allPages.map((page: CollectionEntry<"pages">) => {
        const { lang, href, template } = page.data;

        return {
            params: {
                lang: lang,
                slug: href,
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
async function generateTypePagesStaticPaths(collection: "press-releases" | "events" | "job-offers"): Promise<any[]> {
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
        },
    );
}