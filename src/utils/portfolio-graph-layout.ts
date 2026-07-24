// Layout math for the portfolio graph diagram (src/components/PortfolioGraphViz.astro).
// `linkPath` and the size constants are shared verbatim between the server-side render and
// the client-side isolate/reset script so the two never drift apart. `buildPortfolioGraphLayout`
// does the one-time column/position/adjacency computation the Astro component's template reads.

import type { PortfolioGraph, PortfolioUseCase, PortfolioChallenge, PortfolioThesis } from "./portfolio-graph";

export interface Pos {
    x: number;
    y: number;
    w: number;
    h: number;
}

export const NODE_W = 260;
export const GAP_X = 100;
export const GAP_Y = 8;
export const ROW_H = { uc: 82, challenge: 82, thesis: 82 } as const;
export const COL_X = [0, NODE_W + GAP_X, 2 * (NODE_W + GAP_X)];

/** Smooth cubic-bezier path from the right edge of `s` to the left edge of `t`. */
export function linkPath(s: Pos, t: Pos): string {
    const x1 = s.x + s.w;
    const y1 = s.y + s.h / 2;
    const x2 = t.x;
    const y2 = t.y + t.h / 2;
    const cx1 = x1 + (x2 - x1) / 2;
    const cx2 = x2 - (x2 - x1) / 2;
    return `M${x1},${y1} C${cx1},${y1} ${cx2},${y2} ${x2},${y2}`;
}

export interface LayoutNode<T> {
    item: T;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface GraphLink {
    id: string;
    source: string;
    target: string;
}

export interface PortfolioGraphLayout {
    sortedUseCases: PortfolioUseCase[];
    challengesSorted: PortfolioChallenge[];
    thesesSorted: PortfolioThesis[];
    ucLayout: LayoutNode<PortfolioUseCase>[];
    challengeLayout: LayoutNode<PortfolioChallenge>[];
    thesisLayout: LayoutNode<PortfolioThesis>[];
    svgWidth: number;
    svgHeight: number;
    allLinks: GraphLink[];
    related: Record<string, string[]>;
    getLinkPath: (sourceId: string, targetId: string) => string | null;
}

function layoutColumn<T extends { id: string }>(items: T[], rowH: number, x: number): LayoutNode<T>[] {
    return items.map((item, i) => ({ item, x, y: i * (rowH + GAP_Y), w: NODE_W, h: rowH }));
}

/**
 * Computes everything the diagram's template needs to render: column positions, link paths,
 * and the "related" 2-hop neighborhood per node used by the hover/isolate interaction.
 *
 * The graph is exactly 3 columns deep (use case — challenge — thesis), so "related" for any
 * node is: its direct neighbors, plus its neighbors' neighbors, excluding same-column nodes
 * (e.g. a use case's related set never includes another use case, even if they share a
 * challenge). One undirected adjacency map, built once from `allLinks`, serves all three
 * node types identically.
 */
export function buildPortfolioGraphLayout(graph: PortfolioGraph): PortfolioGraphLayout {
    const sortedUseCases = [...graph.useCases].sort((a, b) => a.id.localeCompare(b.id));
    // Already ordered by RQ reference (see getPortfolioGraph) — a challenge is the RQ_X
    // reference itself, so several use cases can converge on the same one.
    const challengesSorted = graph.challenges;
    const thesesSorted = [...graph.theses].sort((a, b) => a.id.localeCompare(b.id));

    const ucLayout = layoutColumn(sortedUseCases, ROW_H.uc, COL_X[0]);
    const challengeLayout = layoutColumn(challengesSorted, ROW_H.challenge, COL_X[1]);
    const thesisLayout = layoutColumn(thesesSorted, ROW_H.thesis, COL_X[2]);

    const svgWidth = COL_X[2] + NODE_W;
    const svgHeight = Math.max(
        200,
        ucLayout.length * (ROW_H.uc + GAP_Y),
        challengeLayout.length * (ROW_H.challenge + GAP_Y),
        thesisLayout.length * (ROW_H.thesis + GAP_Y),
    );

    // Position lookup used to draw links (right edge of source -> left edge of target).
    const positions = new Map<string, Pos>();
    for (const n of [...ucLayout, ...challengeLayout, ...thesisLayout]) {
        positions.set(n.item.id, { x: n.x, y: n.y, w: n.w, h: n.h });
    }
    function getLinkPath(sourceId: string, targetId: string): string | null {
        const s = positions.get(sourceId);
        const target = positions.get(targetId);
        return s && target ? linkPath(s, target) : null;
    }

    // A challenge can have several use cases (it's the shared reference, not a per-UC
    // blurb) — one link per use case that addresses it.
    const ucChallengeLinks = challengesSorted.flatMap((c) =>
        c.useCaseIds.map((ucId) => ({ id: `link-${ucId}-${c.id}`, source: ucId, target: c.id })),
    );
    const challengeThesisLinks = graph.challengeToThesis.map((l) => ({
        id: `link-${l.challengeId}-${l.thesisId}`,
        source: l.challengeId,
        target: l.thesisId,
    }));
    const allLinks = [...ucChallengeLinks, ...challengeThesisLinks];

    const ucIds = new Set(sortedUseCases.map((uc) => uc.id));
    const challengeIds = new Set(challengesSorted.map((c) => c.id));
    const thesisIds = new Set(thesesSorted.map((th) => th.id));

    const adjacency = new Map<string, Set<string>>();
    for (const link of allLinks) {
        if (!adjacency.has(link.source)) adjacency.set(link.source, new Set());
        if (!adjacency.has(link.target)) adjacency.set(link.target, new Set());
        adjacency.get(link.source)!.add(link.target);
        adjacency.get(link.target)!.add(link.source);
    }

    function ownColumnOf(id: string): Set<string> {
        if (ucIds.has(id)) return ucIds;
        if (challengeIds.has(id)) return challengeIds;
        return thesisIds;
    }

    function relatedIdsOf(id: string): string[] {
        const ownColumn = ownColumnOf(id);
        const result = new Set<string>();
        for (const neighbor of adjacency.get(id) ?? []) {
            result.add(neighbor);
            for (const secondHop of adjacency.get(neighbor) ?? []) {
                if (secondHop !== id && !ownColumn.has(secondHop)) result.add(secondHop);
            }
        }
        return [...result];
    }

    const related: Record<string, string[]> = {};
    for (const id of [...ucIds, ...challengeIds, ...thesisIds]) {
        related[id] = relatedIdsOf(id);
    }

    return {
        sortedUseCases,
        challengesSorted,
        thesesSorted,
        ucLayout,
        challengeLayout,
        thesisLayout,
        svgWidth,
        svgHeight,
        allLinks,
        related,
        getLinkPath,
    };
}
