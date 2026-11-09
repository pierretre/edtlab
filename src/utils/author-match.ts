/**
 * Match a person's name against publication author lists.
 *
 * Names are compared after removing accents, case, punctuation and hyphens,
 * and independently of word order ("Pierre Treton" == "TRETON Pierre"), since
 * positions and HAL do not use the same conventions.
 */
export function normalizeName(name: string): string {
    return name
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean)
        .sort()
        .join(' ');
}

export function isAuthor(name: string, authors: string[]): boolean {
    const target = normalizeName(name);
    return !!target && authors.some((author) => normalizeName(author) === target);
}
