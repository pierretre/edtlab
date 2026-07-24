import { getCollection, getEntry, type CollectionEntry } from "astro:content";

// Heading conventions used across UC fiches and research-study fiches (fr/en).
// Add a new title here if a future fiche uses different wording for the same section.
const USE_CASE_CHALLENGES_HEADINGS = [
    "Enjeux scientifiques et techniques",
    "Scientific and Technical Challenges",
];
const THESIS_CHALLENGES_HEADINGS = ["Research Challenges"];

const RQ_CODE_PATTERN = /RQ_[A-Z]+\d+/g;
// Tolerates an optional closing backtick between the code and its gloss, since some
// fiches write the code as inline code: "`RQ_D9` (CRUD-like interface for AI models)".
const RQ_CODE_WITH_GLOSS = /(RQ_[A-Z]+\d+)`?\s*\(([^)]+)\)/g;

// EDT scientific roadmap (Combemale et al., hal-05223776) top-level RQ categories,
// in the taxonomy's own order. A challenge's theme is derived from the category
// letter of its RQ code (e.g. "RQ_D6" -> "D").
const RQ_THEME_ORDER = ["D", "I", "U", "C", "T", "E", "P"] as const;
export type RQTheme = (typeof RQ_THEME_ORDER)[number];
const RQ_THEME_SET: ReadonlySet<string> = new Set(RQ_THEME_ORDER);

// A challenge is a single RQ_X entry from the EDT scientific roadmap (Combemale et al.,
// 2025, hal-05223776) — the reference itself, not a UC author's prose blurb. Several use
// cases addressing the same underlying scientific question converge on the same challenge.
export interface PortfolioChallenge {
    id: string;
    label: string;
    theme: RQTheme | null;
    useCaseIds: string[];
}

export interface PortfolioThesis {
    id: string;
    title: string;
    researcher: string;
    pc: CollectionEntry<"research-studies">["data"]["pc"];
    useCaseIds: string[];
    rqCodes: string[];
}

export interface PortfolioUseCase {
    id: string;
    slug: string;
    title: string;
    domain?: string;
}

export interface ChallengeThesisLink {
    challengeId: string;
    thesisId: string;
}

export interface PortfolioGraph {
    useCases: PortfolioUseCase[];
    challenges: PortfolioChallenge[];
    theses: PortfolioThesis[];
    challengeToThesis: ChallengeThesisLink[];
}

/**
 * Extracts every distinct RQ_X code (EDT scientific roadmap, hal-05223776) found in a text,
 * regardless of how it's glossed in prose ("RQ associées : RQ_D2 (...)" or "**Associated RQs:** `RQ_D2` (...)").
 */
export function extractRQCodes(text: string): string[] {
    const matches = text.match(RQ_CODE_PATTERN) ?? [];
    return [...new Set(matches)];
}

/**
 * Extracts the human-readable gloss authors wrote next to a code, e.g. "RQ_D2 (données non
 * mesurables / partiellement observables)" -> {"RQ_D2": "données non mesurables / partiellement
 * observables"}. First occurrence wins when the same code is glossed more than once.
 */
export function extractRQGlosses(text: string): Map<string, string> {
    const glosses = new Map<string, string>();
    for (const match of text.matchAll(RQ_CODE_WITH_GLOSS)) {
        const [, code, gloss] = match;
        if (!glosses.has(code)) glosses.set(code, gloss.trim());
    }
    return glosses;
}

/** Derives the top-level RQ category (theme) a single RQ_X code belongs to. */
export function themeOf(code: string): RQTheme | null {
    const letter = code.match(/^RQ_([A-Z]+)\d+$/)?.[1];
    return letter && RQ_THEME_SET.has(letter) ? (letter as RQTheme) : null;
}

const RQ_THEME_RANK = new Map<string, number>(RQ_THEME_ORDER.map((theme, i) => [theme, i]));

/**
 * Sorts RQ_X codes in the EDT roadmap's own taxonomy order (category, then number),
 * e.g. ["RQ_I3", "RQ_D2"] -> ["RQ_D2", "RQ_I3"]. This is the canonical reference
 * order used to order challenges and to display them on portfolio graph cards.
 */
export function sortRQCodes(rqCodes: string[]): string[] {
    return [...rqCodes].sort((a, b) => {
        const ma = a.match(/^RQ_([A-Z]+)(\d+)$/);
        const mb = b.match(/^RQ_([A-Z]+)(\d+)$/);
        const rankA = RQ_THEME_RANK.get(ma?.[1] ?? "") ?? Number.MAX_SAFE_INTEGER;
        const rankB = RQ_THEME_RANK.get(mb?.[1] ?? "") ?? Number.MAX_SAFE_INTEGER;
        if (rankA !== rankB) return rankA - rankB;
        return Number(ma?.[2] ?? 0) - Number(mb?.[2] ?? 0);
    });
}

/**
 * Extracts the raw markdown of a heading's section (until the next heading of the same
 * or higher level). Level 2 sections keep their nested "###" subsections; level 3 sections
 * stop at the next "##" or "###".
 */
export function extractSection(
    body: string,
    level: 2 | 3,
    titles: string[],
): string | null {
    const lines = body.split(/\r?\n/);
    const headingRegex = new RegExp(`^#{${level}}\\s+(.+)$`);
    const normalizedTitles = titles.map((t) => t.trim().toLowerCase());

    const startIdx = lines.findIndex((line) => {
        const m = line.match(headingRegex);
        return m ? normalizedTitles.includes(m[1].trim().toLowerCase()) : false;
    });
    if (startIdx === -1) return null;

    const stopPattern = level === 2 ? /^##\s+/ : /^#{2,3}\s+/;
    let endIdx = lines.length;
    for (let i = startIdx + 1; i < lines.length; i++) {
        if (stopPattern.test(lines[i])) {
            endIdx = i;
            break;
        }
    }
    return lines.slice(startIdx + 1, endIdx).join("\n").trim();
}

/** Groups use-case entries by their logical `id`, keeping the latest version for the given language. */
function pickLatestUseCasesByLang(
    entries: CollectionEntry<"use-cases">[],
    lang: "en" | "fr",
): CollectionEntry<"use-cases">[] {
    const byId = new Map<string, CollectionEntry<"use-cases">[]>();
    for (const entry of entries) {
        const group = byId.get(entry.data.id) ?? [];
        group.push(entry);
        byId.set(entry.data.id, group);
    }

    const result: CollectionEntry<"use-cases">[] = [];
    for (const group of byId.values()) {
        const preferred = group.filter((e) => e.data.lang === lang);
        const candidates = preferred.length > 0 ? preferred : group;
        const latest = candidates.sort((a, b) =>
            (b.data.version || "0").localeCompare(a.data.version || "0"),
        )[0];
        result.push(latest);
    }
    return result;
}

/**
 * Builds the full portfolio graph (use cases -> scientific challenges -> theses)
 * by parsing the semi-structured markdown bodies of the `use-cases` and `research-studies`
 * collections. Re-derived on every call, so it always reflects the latest content.
 */
export async function getPortfolioGraph(lang: "en" | "fr"): Promise<PortfolioGraph> {
    const allUseCases = await getCollection(
        "use-cases",
        (item) => item.data.status === "published",
    );
    const useCaseEntries = pickLatestUseCasesByLang(allUseCases, lang);

    const useCases: PortfolioUseCase[] = [];
    const challengesByCode = new Map<string, { useCaseIds: Set<string>; gloss?: string }>();

    for (const entry of useCaseEntries) {
        const ucId = entry.data.id;
        useCases.push({
            id: ucId,
            slug: entry.id,
            title: entry.data.title,
            domain: entry.data.domain,
        });

        const challengesSection = extractSection(
            entry.body ?? "",
            2,
            USE_CASE_CHALLENGES_HEADINGS,
        );
        if (!challengesSection) continue;

        const glosses = extractRQGlosses(challengesSection);
        for (const code of extractRQCodes(challengesSection)) {
            const challenge = challengesByCode.get(code) ?? { useCaseIds: new Set<string>() };
            challenge.useCaseIds.add(ucId);
            if (!challenge.gloss && glosses.has(code)) challenge.gloss = glosses.get(code);
            challengesByCode.set(code, challenge);
        }
    }

    const researchStudies = await getCollection("research-studies");
    const theses: PortfolioThesis[] = [];
    for (const entry of researchStudies) {
        const resolvedUseCases = await Promise.all(
            entry.data.useCases.map((uc) => (uc.ref ? getEntry(uc.ref) : null)),
        );
        const useCaseIds = [...new Set(
            resolvedUseCases
                .filter((uc): uc is CollectionEntry<"use-cases"> => uc !== null)
                .map((uc) => uc.data.id),
        )];

        const challengesSection = extractSection(
            entry.body ?? "",
            2,
            THESIS_CHALLENGES_HEADINGS,
        );
        const rqCodes = challengesSection ? extractRQCodes(challengesSection) : [];
        const thesisGlosses = challengesSection ? extractRQGlosses(challengesSection) : new Map<string, string>();
        for (const code of rqCodes) {
            const challenge = challengesByCode.get(code) ?? { useCaseIds: new Set<string>() };
            if (!challenge.gloss && thesisGlosses.has(code)) challenge.gloss = thesisGlosses.get(code);
            challengesByCode.set(code, challenge);
        }

        theses.push({
            id: entry.id,
            title: entry.data.title,
            researcher: entry.data.researcher.name,
            pc: entry.data.pc,
            useCaseIds,
            rqCodes,
        });
    }

    const challenges: PortfolioChallenge[] = sortRQCodes([...challengesByCode.keys()]).map((code) => {
        const entry = challengesByCode.get(code)!;
        return {
            id: code,
            label: entry.gloss ?? code,
            theme: themeOf(code),
            useCaseIds: [...entry.useCaseIds],
        };
    });

    // Challenges are the reference itself, so a thesis links to one purely by sharing the
    // code — regardless of which use case(s) either side happens to be attached to.
    const challengeToThesis: ChallengeThesisLink[] = [];
    for (const thesis of theses) {
        for (const code of thesis.rqCodes) {
            if (challengesByCode.has(code)) {
                challengeToThesis.push({ challengeId: code, thesisId: thesis.id });
            }
        }
    }

    return { useCases, challenges, theses, challengeToThesis };
}
