// Daily HAL publications sync. Not reachable over the network: run this
// directly inside the running container, e.g. via cron on the host:
//   docker exec edtlab_web node dist/scripts/sync-hal.mjs
// See docs/developers/hal-publications-sync.md.
import { fetchAllHalPublications, mapHalDocToPublication } from '../src/utils/hal';
import { getPublicationsCollection } from '../src/utils/mongodb';

async function main() {
    const halDocs = await fetchAllHalPublications();
    const publications = halDocs.map(mapHalDocToPublication);

    const collection = await getPublicationsCollection();
    await collection.deleteMany({});
    if (publications.length > 0) {
        await collection.insertMany(publications);
    }

    console.log(`Synced ${publications.length} HAL publications.`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('HAL sync failed:', error);
        process.exit(1);
    });
