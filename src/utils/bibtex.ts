/**
 * BibTeX export utility for publications.
 * Converts publication data to BibTeX format.
 */

export interface BibTeXEntry {
    title: string;
    authors: string[];
    year: number;
    venue?: string;
    doi?: string;
    url?: string;
    type?: string;
}

/**
 * Generate a BibTeX key from author + year + first title word
 */
function generateKey(entry: BibTeXEntry): string {
    const firstAuthor = entry.authors[0] || 'unknown';
    const surname = firstAuthor.split(',')[0].trim().toLowerCase().replace(/[^a-z]/g, '');
    const titleWord = (entry.title.split(' ').find(w => w.length > 3) || 'ref').toLowerCase().replace(/[^a-z]/g, '');
    return `${surname}${entry.year}${titleWord}`;
}

/**
 * Map publication type to BibTeX entry type
 */
function toBibTeXType(type?: string): string {
    switch (type) {
        case 'journal': return 'article';
        case 'conference':
        case 'workshop': return 'inproceedings';
        case 'book': return 'book';
        case 'report':
        case 'white-paper': return 'techreport';
        case 'thesis': return 'phdthesis';
        case 'preprint': return 'misc';
        default: return 'misc';
    }
}

/**
 * Format authors for BibTeX: "Lastname, Firstname and Lastname, Firstname"
 */
function formatAuthors(authors: string[]): string {
    return authors.join(' and ');
}

/**
 * Convert a single publication to BibTeX string
 */
export function toBibTeX(entry: BibTeXEntry): string {
    const key = generateKey(entry);
    const type = toBibTeXType(entry.type);
    const lines: string[] = [];

    lines.push(`@${type}{${key},`);
    lines.push(`  title = {${entry.title}},`);
    lines.push(`  author = {${formatAuthors(entry.authors)}},`);
    lines.push(`  year = {${entry.year}},`);

    if (entry.venue) {
        const venueField = type === 'article' ? 'journal' : 'booktitle';
        lines.push(`  ${venueField} = {${entry.venue}},`);
    }
    if (entry.doi && entry.doi !== 'xxx') {
        lines.push(`  doi = {${entry.doi}},`);
    }
    if (entry.url) {
        lines.push(`  url = {${entry.url}},`);
    }

    lines.push('}');
    return lines.join('\n');
}

/**
 * Convert multiple publications to a single BibTeX file content
 */
export function toBibTeXFile(entries: BibTeXEntry[]): string {
    return entries.map(toBibTeX).join('\n\n');
}
