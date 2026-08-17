import type { APIRoute } from "astro";
import { fetchAllHalPublications, mapHalDocToPublication } from "@utils/hal";
import { getPublicationsCollection } from "@utils/mongodb";

// Daily HAL publications sync, triggered by a cron job hitting this endpoint
// with a shared secret. Fetches the full EDT collection from HAL, maps it to
// the Publication shape, and replaces the Mongo publications collection.
export const POST: APIRoute = async ({ request }) => {
    try {
        const expectedSecret = process.env.HAL_SYNC_SECRET || import.meta.env.HAL_SYNC_SECRET;
        const providedSecret = request.headers.get('X-Sync-Secret');

        if (!expectedSecret || providedSecret !== expectedSecret) {
            return new Response(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const halDocs = await fetchAllHalPublications();
        const publications = halDocs.map(mapHalDocToPublication);

        const collection = await getPublicationsCollection();
        await collection.deleteMany({});
        if (publications.length > 0) {
            await collection.insertMany(publications);
        }

        return new Response(
            JSON.stringify({ success: true, count: publications.length }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error syncing HAL publications:', error);
        const message = error instanceof Error ? error.message : 'An error occurred while syncing HAL publications';

        return new Response(
            JSON.stringify({ error: message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
