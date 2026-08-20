import { getCollection, type CollectionEntry } from "astro:content";
import type { Publication } from "@models/Publication.model";
import { getPublicationsCollection } from "@utils/mongodb";

const sortByYearTitle = (a: Publication, b: Publication) => {
    if (b.year !== a.year) return b.year - a.year;
    return (a.title || "").localeCompare(b.title || "");
};

async function getAllPublications(origin?: "edt" | "external"): Promise<Publication[]> {
    const halPublicationsCollection = await getPublicationsCollection();
    const halPublications = await halPublicationsCollection.find().toArray();

    const halDois = new Set(halPublications.map((p) => p.doi?.toLowerCase()).filter((doi) => doi !== undefined));
    const halTitles = new Set(halPublications.map((p) => p.title.toLowerCase()));

    const halEntryExists = (entry: CollectionEntry<"publications">) => !halDois.has(entry.data.doi?.toLowerCase() || "") && !halTitles.has(entry.data.title.toLowerCase());

    console.log(
        `Loaded ${halPublications.length} HAL publications from MongoDB, filtering out ${halDois.size} static DOIs and ${halTitles.size} static titles`,
    );

    // Statically authored publications (content collection)
    const staticPublications = (await getCollection("publications", halEntryExists))
        .map((entry) => entry.data as Publication);

    return [...staticPublications, ...halPublications]
        .filter((p) => origin !== undefined && p.origin === origin)
        .sort(sortByYearTitle);
}

export { getAllPublications };