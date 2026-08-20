import { MongoClient, type Collection } from 'mongodb';
import type { Publication } from '@models/Publication.model';

const DB_NAME = 'edtlab';
const PUBLICATIONS_COLLECTION = 'publications';

let clientPromise: Promise<MongoClient> | null = null;

function getClient(): Promise<MongoClient> {
    if (!clientPromise) {
        const uri = process.env.MONGODB_URI || import.meta.env.MONGODB_URI;
        if (!uri) {
            throw new Error('Missing required MONGODB_URI configuration');
        }
        clientPromise = new MongoClient(uri).connect();
    }
    return clientPromise;
}

export async function getPublicationsCollection(): Promise<Collection<Publication & { halId: string }>> {
    const client = await getClient();
    return client.db(DB_NAME).collection(PUBLICATIONS_COLLECTION);
}
