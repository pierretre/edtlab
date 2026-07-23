import { linkPath, type Pos } from "@utils/portfolio-graph-layout";

function initPortfolioGraph(root: HTMLElement) {
    const svg = root.querySelector("svg");
    if (!svg) return;

    const rowHeights = (root.dataset.rowH ?? "").split(",").map(Number);
    const gapY = Number(root.dataset.gapY ?? 8);

    // Interactive elements (hover/focus preview target): the <a> or role="button" div in each card.
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".pg-node[data-node-id]"));
    // Positioned elements (one per node, drives layout): the <foreignObject> wrapping each card.
    const foreignObjects = Array.from(svg.querySelectorAll<SVGForeignObjectElement>("foreignObject[data-node-id]"));
    const links = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-link-source]"));
    const isolateButtons = Array.from(root.querySelectorAll<HTMLButtonElement>(".pg-isolate-btn"));
    const resetButton = root.querySelector<HTMLButtonElement>(".pg-reset-btn");

    const originalY = new Map(foreignObjects.map((fo) => [fo.dataset.nodeId!, fo.getAttribute("y")!]));
    const originalD = new Map(links.map((l) => [l, l.getAttribute("d")!]));
    const originalHeight = svg.getAttribute("height")!;
    const originalViewBox = svg.getAttribute("viewBox")!;

    let isolated = false;

    const relatedById = new Map<string, string[]>(
        nodes.map((n) => [n.dataset.nodeId ?? "", (n.dataset.related ?? "").split(",").filter(Boolean)]),
    );
    function relatedOf(id: string): string[] {
        return relatedById.get(id) ?? [];
    }

    function applyPreview(activeId: string | null) {
        if (isolated) return;
        if (!activeId) {
            nodes.forEach((n) => n.classList.remove("is-active", "is-dim"));
            links.forEach((l) => l.classList.remove("is-active", "is-dim"));
            return;
        }
        const activeSet = new Set([activeId, ...relatedOf(activeId)]);
        nodes.forEach((n) => {
            const isActive = !!n.dataset.nodeId && activeSet.has(n.dataset.nodeId);
            n.classList.toggle("is-active", isActive);
            n.classList.toggle("is-dim", !isActive);
        });
        links.forEach((l) => {
            const isActive =
                !!l.dataset.linkSource &&
                !!l.dataset.linkTarget &&
                activeSet.has(l.dataset.linkSource) &&
                activeSet.has(l.dataset.linkTarget);
            l.classList.toggle("is-active", isActive);
            l.classList.toggle("is-dim", !isActive);
        });
    }

    function isolate(id: string) {
        const activeSet = new Set([id, ...relatedOf(id)]);
        isolated = true;

        foreignObjects.forEach((fo) => {
            const show = !!fo.dataset.nodeId && activeSet.has(fo.dataset.nodeId);
            fo.style.display = show ? "" : "none";
        });
        nodes.forEach((n) => {
            const show = !!n.dataset.nodeId && activeSet.has(n.dataset.nodeId);
            n.classList.toggle("is-active", show);
            n.classList.remove("is-dim");
        });

        // Restack each column's still-visible cards contiguously, in their original order.
        const byCol: SVGForeignObjectElement[][] = [[], [], []];
        foreignObjects.forEach((fo) => {
            if (fo.style.display === "none") return;
            const col = Number(fo.dataset.col ?? 0);
            byCol[col]?.push(fo);
        });
        byCol.forEach((list, col) => {
            list.forEach((fo, i) => {
                fo.setAttribute("y", String(i * ((rowHeights[col] ?? 0) + gapY)));
            });
        });
        const maxHeight = Math.max(200, ...byCol.map((list, col) => list.length * ((rowHeights[col] ?? 0) + gapY)));
        svg!.setAttribute("height", String(maxHeight));
        const [vbX, vbY, vbW] = originalViewBox.split(" ");
        svg!.setAttribute("viewBox", `${vbX} ${vbY} ${vbW} ${maxHeight}`);

        const posById = new Map<string, Pos>(
            foreignObjects
                .filter((fo) => fo.style.display !== "none")
                .map((fo) => [
                    fo.dataset.nodeId!,
                    {
                        x: Number(fo.getAttribute("x")),
                        y: Number(fo.getAttribute("y")),
                        w: Number(fo.getAttribute("width")),
                        h: Number(fo.getAttribute("height")),
                    },
                ]),
        );
        links.forEach((l) => {
            const show =
                !!l.dataset.linkSource && !!l.dataset.linkTarget && activeSet.has(l.dataset.linkSource) && activeSet.has(l.dataset.linkTarget);
            l.style.display = show ? "" : "none";
            l.classList.toggle("is-active", show);
            l.classList.remove("is-dim");
            if (!show) return;
            const s = posById.get(l.dataset.linkSource!);
            const t = posById.get(l.dataset.linkTarget!);
            if (s && t) l.setAttribute("d", linkPath(s, t));
        });

        if (resetButton) resetButton.hidden = false;
    }

    function resetIsolation() {
        isolated = false;
        foreignObjects.forEach((fo) => {
            fo.style.display = "";
            fo.setAttribute("y", originalY.get(fo.dataset.nodeId!) ?? "0");
        });
        links.forEach((l) => {
            l.style.display = "";
            l.setAttribute("d", originalD.get(l) ?? "");
        });
        svg!.setAttribute("height", originalHeight);
        svg!.setAttribute("viewBox", originalViewBox);
        if (resetButton) resetButton.hidden = true;
        applyPreview(null);
    }

    nodes.forEach((n) => {
        n.addEventListener("mouseenter", () => applyPreview(n.dataset.nodeId ?? null));
        n.addEventListener("mouseleave", () => applyPreview(null));
        n.addEventListener("focus", () => applyPreview(n.dataset.nodeId ?? null));
        n.addEventListener("blur", () => applyPreview(null));
    });

    isolateButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = btn.dataset.isolateTarget;
            if (id) isolate(id);
        });
    });

    resetButton?.addEventListener("click", resetIsolation);

    root.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Escape" && isolated) resetIsolation();
    });
}

document.querySelectorAll<HTMLElement>(".pg-root").forEach((el) => initPortfolioGraph(el));
