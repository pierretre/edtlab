import type { Publication } from '@models/Publication.model';

const HAL_COLLECTION = 'EDT';
const PAGE_SIZE = 100;
const FIELDS = [
    'docid',
    'title_s',
    'authFullName_s',
    'producedDateY_i',
    'journalTitle_s',
    'conferenceTitle_s',
    'proceedingsTitle_s',
    'doiId_s',
    'uri_s',
    'docType_s',
    'keyword_s',
].join(',');

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
    keyword_s?: string[];
}

interface HalSearchResponse {
    response: {
        numFound: number;
        docs: HalDoc[];
    };
}

// HAL document type codes -> our Publication.type enum. Unlisted codes
// (POSTER, PATENT, UNDEFINED, ...) fall back to 'preprint'.
const DOC_TYPE_MAP: Record<string, Publication['type']> = {
    ART: 'journal',
    COMM: 'conference',
    OUV: 'book',
    COUV: 'book',
    REPORT: 'report',
    RAPPORT: 'report',
    THESE: 'thesis',
};

export async function fetchAllHalPublications(): Promise<HalDoc[]> {
    const docs: HalDoc[] = [];
    let start = 0;
    let numFound = Infinity;

    while (start < numFound) {
        const url = `https://api.hal.science/search/${HAL_COLLECTION}/?q=*:*&rows=${PAGE_SIZE}&start=${start}&wt=json&fl=${FIELDS}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HAL API request failed with status ${res.status}`);
        }
        const data = (await res.json()) as HalSearchResponse;
        numFound = data.response.numFound;
        docs.push(...data.response.docs);
        start += PAGE_SIZE;
    }

    return docs;
}

export function mapHalDocToPublication(doc: HalDoc): Publication & { halId: string } {
    const venue = doc.journalTitle_s || doc.conferenceTitle_s || doc.proceedingsTitle_s;

    return {
        halId: doc.docid,
        title: doc.title_s?.[0] || '(untitled)',
        authors: doc.authFullName_s || [],
        year: doc.producedDateY_i || new Date().getFullYear(),
        venue,
        doi: doc.doiId_s,
        url: doc.uri_s,
        type: (doc.docType_s && DOC_TYPE_MAP[doc.docType_s]) || 'preprint',
        tags: doc.keyword_s || [],
        origin: 'edt',
    };
}
