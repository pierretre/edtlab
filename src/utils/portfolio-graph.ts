import { getCollection, getEntry, type CollectionEntry } from "astro:content";

// Heading conventions used across UC fiches and research-study fiches (fr/en).
// Add a new title here if a future fiche uses different wording for the same section.
const NEEDS_HEADINGS = ["Besoins fonctionnels", "Functional Requirements"];
const USE_CASE_CHALLENGES_HEADINGS = [
    "Enjeux scientifiques et techniques",
    "Scientific and Technical Challenges",
];
const THESIS_CHALLENGES_HEADINGS = ["Research Challenges"];

const RQ_CODE_PATTERN = /RQ_[A-Z]+\d+/g;

const NEED_LINE = /^-\s*\*\*(.+?)\*\*\s*·\s*\*(.+?)\*\s+(.+)$/;
const METRIC_INLINE = /\*\*(?:Métrique|Metric)\s*:?\*\*\s*:?\s*(.+)$/i;

export interface PortfolioNeed {
    id: string;
    useCaseId: string;
    verb: string;
    actor: string;
    need: string;
    metric?: string;
}

export interface PortfolioChallenge {
    id: string;
    useCaseId: string;
    title: string;
    description: string;
    rqCodes: string[];
}

export interface PortfolioThesis {
    id: string;
    title: string;
    researcher: string;
    status: CollectionEntry<"research-studies">["data"]["status"];
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
    needs: PortfolioNeed[];
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

/** Splits a level-2 section's body into its "###" subsections. */
export function splitH3Subsections(
    sectionText: string,
): { title: string; body: string }[] {
    const lines = sectionText.split(/\r?\n/);
    const items: { title: string; body: string }[] = [];
    let current: { title: string; lines: string[] } | null = null;

    for (const line of lines) {
        const m = line.match(/^###\s+(.+)$/);
        if (m) {
            if (current) {
                items.push({ title: current.title, body: current.lines.join("\n").trim() });
            }
            current = { title: m[1].trim(), lines: [] };
        } else if (current) {
            current.lines.push(line);
        }
    }
    if (current) {
        items.push({ title: current.title, body: current.lines.join("\n").trim() });
    }
    return items;
}

/** Parses the "Besoins fonctionnels" / "Functional Requirements" bullet list into structured needs. */
export function parseFunctionalNeeds(
    sectionText: string,
    useCaseId: string,
): PortfolioNeed[] {
    const needs: PortfolioNeed[] = [];
    const bulletLines = sectionText
        .split(/\r?\n/)
        .filter((line) => line.trim().startsWith("-"));

    bulletLines.forEach((line, index) => {
        const m = line.trim().match(NEED_LINE);
        if (!m) return;
        const [, verb, actor, rest] = m;
        const metricMatch = rest.match(METRIC_INLINE);
        const metric = metricMatch ? metricMatch[1].trim() : undefined;
        const need = metricMatch ? rest.slice(0, metricMatch.index).trim() : rest.trim();

        needs.push({
            id: `${useCaseId}-need-${index}`,
            useCaseId,
            verb: verb.trim(),
            actor: actor.trim(),
            need,
            metric,
        });
    });
    return needs;
}

/** Parses a "Enjeux scientifiques" / "Research Challenges" section into per-subsection challenges. */
export function parseChallenges(
    sectionText: string,
    useCaseId: string,
): PortfolioChallenge[] {
    return splitH3Subsections(sectionText).map((sub, index) => ({
        id: `${useCaseId}-challenge-${index}`,
        useCaseId,
        title: sub.title,
        description: sub.body
            .split(/\r?\n/)
            .filter((line) => !/RQ associées|Associated RQs/i.test(line))
            .join("\n")
            .trim(),
        rqCodes: extractRQCodes(sub.body),
    }));
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
 * Builds the full portfolio graph (use cases -> needs -> scientific challenges -> theses)
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
    const needs: PortfolioNeed[] = [];
    const challenges: PortfolioChallenge[] = [];

    for (const entry of useCaseEntries) {
        const ucId = entry.data.id;
        useCases.push({
            id: ucId,
            slug: entry.id,
            title: entry.data.title,
            domain: entry.data.domain,
        });

        const needsSection = extractSection(entry.body ?? "", 3, NEEDS_HEADINGS);
        if (needsSection) needs.push(...parseFunctionalNeeds(needsSection, ucId));

        const challengesSection = extractSection(
            entry.body ?? "",
            2,
            USE_CASE_CHALLENGES_HEADINGS,
        );
        if (challengesSection) challenges.push(...parseChallenges(challengesSection, ucId));
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

        theses.push({
            id: entry.id,
            title: entry.data.title,
            researcher: entry.data.researcher.name,
            status: entry.data.status,
            useCaseIds,
            rqCodes,
        });
    }

    const challengeToThesis: ChallengeThesisLink[] = [];
    for (const thesis of theses) {
        if (thesis.rqCodes.length === 0) continue;
        const relatedChallenges = challenges.filter(
            (c) => thesis.useCaseIds.includes(c.useCaseId) && c.rqCodes.some((code) => thesis.rqCodes.includes(code)),
        );
        for (const challenge of relatedChallenges) {
            challengeToThesis.push({ challengeId: challenge.id, thesisId: thesis.id });
        }
    }

    return { useCases, needs, challenges, theses, challengeToThesis };
}
