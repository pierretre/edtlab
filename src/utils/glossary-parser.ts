/**
 * Glossary parser utility.
 *
 * Parses the single Markdown glossary source file into structured entries.
 * Format expected:
 *   ## Term EN / Term FR
 *   - **en**: English definition
 *   - **fr**: French definition
 *
 * @module glossary-parser
 */

export interface GlossaryEntry {
    /** Term in English */
    termEn: string;
    /** Term in French */
    termFr: string;
    /** Definition in English */
    definitionEn: string;
    /** Definition in French */
    definitionFr: string;
}

/**
 * Parse the raw Markdown content of the glossary file into structured entries.
 *
 * @param markdown - Raw Markdown string
 * @returns Array of glossary entries sorted alphabetically by English term
 */
export function parseGlossary(markdown: string): GlossaryEntry[] {
    const entries: GlossaryEntry[] = [];

    // Split into sections by h2 headings
    const sections = markdown.split(/^## /m).slice(1);

    for (const section of sections) {
        const lines = section.trim().split('\n');
        if (lines.length === 0) continue;

        // First line is the heading: "Term EN / Term FR"
        const heading = lines[0].trim();
        const slashIndex = heading.indexOf('/');
        if (slashIndex === -1) continue;

        const termEn = heading.substring(0, slashIndex).trim();
        const termFr = heading.substring(slashIndex + 1).trim();

        // Parse definitions from bullet lines
        let definitionEn = '';
        let definitionFr = '';

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            const enMatch = line.match(/^-\s+\*\*en\*\*:\s*(.+)$/);
            if (enMatch) {
                definitionEn = enMatch[1].trim();
                continue;
            }
            const frMatch = line.match(/^-\s+\*\*fr\*\*:\s*(.+)$/);
            if (frMatch) {
                definitionFr = frMatch[1].trim();
                continue;
            }
        }

        if (termEn && termFr && definitionEn && definitionFr) {
            entries.push({ termEn, termFr, definitionEn, definitionFr });
        }
    }

    // Sort alphabetically by English term (case-insensitive)
    entries.sort((a, b) =>
        a.termEn.localeCompare(b.termEn, 'en', { sensitivity: 'base' })
    );

    return entries;
}

/**
 * Get the term in the given language.
 */
export function getTerm(entry: GlossaryEntry, lang: 'en' | 'fr'): string {
    return lang === 'fr' ? entry.termFr : entry.termEn;
}

/**
 * Get the definition in the given language.
 */
export function getDefinition(entry: GlossaryEntry, lang: 'en' | 'fr'): string {
    return lang === 'fr' ? entry.definitionFr : entry.definitionEn;
}

/**
 * Get the list of unique first letters from glossary entries for a given language.
 *
 * @param entries - Parsed glossary entries
 * @param lang - Language for term extraction
 * @returns Sorted array of uppercase first letters
 */
export function getAlphabeticalIndex(
    entries: GlossaryEntry[],
    lang: 'en' | 'fr'
): string[] {
    const letters = new Set<string>();
    for (const entry of entries) {
        const term = getTerm(entry, lang);
        if (term.length > 0) {
            letters.add(term[0].toUpperCase());
        }
    }
    return Array.from(letters).sort((a, b) => a.localeCompare(b, lang));
}

/**
 * Group entries by first letter of their term in the given language.
 *
 * @param entries - Parsed glossary entries
 * @param lang - Language for term extraction
 * @returns Map of letter -> entries, sorted by letter
 */
export function groupByLetter(
    entries: GlossaryEntry[],
    lang: 'en' | 'fr'
): Map<string, GlossaryEntry[]> {
    // Sort entries by term in the given language
    const sorted = [...entries].sort((a, b) =>
        getTerm(a, lang).localeCompare(getTerm(b, lang), lang, { sensitivity: 'base' })
    );

    const groups = new Map<string, GlossaryEntry[]>();
    for (const entry of sorted) {
        const term = getTerm(entry, lang);
        const letter = term[0].toUpperCase();
        if (!groups.has(letter)) {
            groups.set(letter, []);
        }
        groups.get(letter)!.push(entry);
    }

    return groups;
}
