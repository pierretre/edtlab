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
 * @returns 
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
 * 
 * @param collection 
 * @returns 
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

            return {
                params: {
                    lang: lang,
                    slug: link,
                },
                props: {
                    page: entry,
                    template,
                },
            };
        },
    );
}