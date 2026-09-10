import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { glob } from 'astro/loaders';
import type { Loader, LoaderContext } from 'astro/loaders';
import type { Publication } from '~/models/Publication.model';

const STATIC_PUBLICATIONS_BASE = './src/content/publications';
const HAL_EXPORT_PATH = './src/content/publications/hal-publications.json';

interface HalDoc {
    docid: string;
    title_s?: string[];
    authFullName_s?: string[];
    producedDateY_i?: number;
    journalTitle_s?: string;
    conferenceTitle_s?: string;
    proceedingsTitle_s?: string;
    doiId_s?: string;
    uri_s?: string;
    docType_s?: string;
    docSubType_s?: string;
    keyword_s?: string[];
    collaboration_s?: string[];
}

// Raw response shape of https://api.hal.science/search/EDT/?...&wt=json,
// as downloaded verbatim by .github/workflows/hal-import.yml.
interface HalSearchResponse {
    response: {
        numFound: number;
        docs: HalDoc[];
    };
}

const DOC_TYPE_MAP: Record<string, Publication['type']> = {
    ART: 'journal',
    COMM: 'conference',
    OUV: 'book',
    COUV: 'book',
    REPORT: 'delivrable',
    RAPPORT: 'delivrable',
    THESE: 'thesis',
};

const REPORT_SUBTYPE_TAG_MAP: Record<string, string> = {
    RESREPORT: 'research-report',
    TECHREPORT: 'technical-report',
    FUNDREPORT: 'deliverable',
    EXPERTREPORT: 'expert-report',
    DMP: 'dmp',
    RESPROT: 'research-protocol',
};

const PROJECT_TAG_MAP: Record<string, string> = {
    CATALYST: 'PC1',
    DTCOMPOSE: 'PC2',
    TWINOPS: 'PC3',
    SYNCHRONIC: 'PC4',
    GENUINE: 'PC5',
};

const HTML_NAMED_ENTITIES: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
};

function decodeHtmlEntities(text: string): string {
    return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
        if (entity[0] === '#') {
            const codePoint = entity[1] === 'x' || entity[1] === 'X'
                ? parseInt(entity.slice(2), 16)
                : parseInt(entity.slice(1), 10);
            return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
        }
        return HTML_NAMED_ENTITIES[entity] ?? match;
    });
}

async function readHalExport(context: LoaderContext): Promise<HalDoc[]> {
    const fileUrl = new URL(HAL_EXPORT_PATH, context.config.root);

    let raw: string;
    try {
        raw = await readFile(fileURLToPath(fileUrl), 'utf-8');
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            context.logger.warn(`${HAL_EXPORT_PATH} not found, skipping HAL publications`);
            return [];
        }
        throw error;
    }

    const data = JSON.parse(raw) as HalSearchResponse;
    return data.response.docs;
}

const toPublication = (doc: HalDoc): Record<string, unknown> => {
    const reportSubtypeTag = doc.docSubType_s && REPORT_SUBTYPE_TAG_MAP[doc.docSubType_s];
    const projectTags = (doc.collaboration_s || []).map(
        (project) => PROJECT_TAG_MAP[project.toUpperCase()] || project,
    );
    const tags = [
        ...(doc.keyword_s || []),
        ...projectTags,
        ...(reportSubtypeTag ? [reportSubtypeTag] : []),
    ];

    return {
        title: (doc.title_s?.[0] && decodeHtmlEntities(doc.title_s[0])) || '(untitled)',
        authors: doc.authFullName_s || [],
        year: doc.producedDateY_i || new Date().getFullYear(),
        venue: doc.journalTitle_s || doc.conferenceTitle_s || doc.proceedingsTitle_s,
        doi: doc.doiId_s,
        url: doc.uri_s,
        type: (doc.docType_s && DOC_TYPE_MAP[doc.docType_s]) || 'preprint',
        tags,
        origin: 'edt',
    };
};

export function publicationsLoader(): Loader {
    const staticPublicationsLoader = glob({
        base: STATIC_PUBLICATIONS_BASE,
        pattern: '**/*.{md,mdx}',
    });

    return {
        name: 'publications-loader',
        load: async (context) => {
            // clear collection
            context.store.clear();

            // Populates the store with the hand-written MDX/MD publications.
            await staticPublicationsLoader.load(context);

            const staticEntries = context.store.values();
            const staticIdByDoi = new Map(
                staticEntries
                    .filter((entry) => entry.data.doi)
                    .map((entry) => [(entry.data.doi as string).toLowerCase(), entry.id]),
            );
            const staticIdByTitle = new Map(
                staticEntries.map((entry) => [(entry.data.title as string).toLowerCase(), entry.id]),
            );

            const halDocs = await readHalExport(context);
            for (const doc of halDocs) {
                const title = doc.title_s?.[0]?.toLowerCase() || '';
                const doi = doc.doiId_s?.toLowerCase();
                const matchingStaticId = (doi && staticIdByDoi.get(doi)) || staticIdByTitle.get(title);
                if (matchingStaticId) {
                    context.store.delete(matchingStaticId);
                }

                const id = `hal-${doc.docid}`;
                const data = await context.parseData({ id, data: toPublication(doc) });
                context.store.set({ id, data });
            }
        },
    };
}
