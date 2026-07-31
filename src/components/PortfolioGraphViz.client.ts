import { linkPath, type Pos } from "@utils/portfolio-graph-layout";

function initPortfolioGraph(root: HTMLElement) {
    const svg = root.querySelector("svg");
    if (!svg) return;

    const gapY = Number(root.dataset.gapY ?? 8);

    // Interactive elements (hover/focus preview target): the <a> or role="button" div in each card.
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".pg-node[data-node-id]"));
    // Positioned elements (one per node, drives layout): the <foreignObject> wrapping each card.
    const foreignObjects = Array.from(svg.querySelectorAll<SVGForeignObjectElement>("foreignObject[data-node-id]"));
    const links = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-link-source]"));
    const isolateButtons = Array.from(root.querySelectorAll<HTMLButtonElement>(".pg-isolate-btn"));
    const resetButton = root.querySelector<HTMLButtonElement>(".pg-reset-btn");
    const originalIsolateLabels = new Map(isolateButtons.map((btn) => [btn, btn.getAttribute("aria-label") ?? ""]));

    // The button on the pinned card itself swaps from "pin this" to "cancel the pin",
    // since re-pinning a card that's already isolated on itself would be a no-op.
    function setPinnedButton(id: string | null) {
        isolateButtons.forEach((btn) => {
            const isPinned = !!id && btn.dataset.isolateTarget === id;
            btn.classList.toggle("is-cancel", isPinned);
            btn.setAttribute("aria-label", isPinned ? (btn.dataset.cancelLabel ?? "") : (originalIsolateLabels.get(btn) ?? ""));
        });
    }

    function recomputeLinkPaths() {
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
            const s = posById.get(l.dataset.linkSource!);
            const t = posById.get(l.dataset.linkTarget!);
            if (s && t) l.setAttribute("d", linkPath(s, t));
        });
    }

    // Cards size to their own text (see .pg-node's `height: auto` in the component's <style>),
    // so each card's true height can only be known once the browser has laid it out. Re-stack
    // every column from the cards' measured heights before anything else reads position data,
    // so hover/isolate math and the reset snapshot below all agree with what's on screen.
    function autoFitColumns() {
        const byCol: SVGForeignObjectElement[][] = [[], [], []];
        foreignObjects.forEach((fo) => {
            const col = Number(fo.dataset.col ?? 0);
            byCol[col]?.push(fo);
        });

        byCol.forEach((list) => {
            let y = 0;
            list.forEach((fo) => {
                const nodeEl = fo.querySelector<HTMLElement>(".pg-node");
                const measured = nodeEl
                    ? Math.ceil(nodeEl.getBoundingClientRect().height)
                    : Number(fo.getAttribute("height"));
                fo.setAttribute("y", String(y));
                fo.setAttribute("height", String(measured));
                y += measured + gapY;
            });
        });

        const maxHeight = Math.max(
            200,
            ...byCol.map((list) => {
                const last = list.at(-1);
                return last ? Number(last.getAttribute("y")) + Number(last.getAttribute("height")) : 0;
            }),
        );
        svg!.setAttribute("height", String(maxHeight));
        const [vbX, vbY, vbW] = svg!.getAttribute("viewBox")!.split(" ");
        svg!.setAttribute("viewBox", `${vbX} ${vbY} ${vbW} ${maxHeight}`);

        recomputeLinkPaths();
    }
    autoFitColumns();

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
            n.classList.toggle("is-selected", n.dataset.nodeId === id);
            n.classList.remove("is-dim");
        });

        // Restack each column's still-visible cards contiguously, in their original order.
        // Each card's own (already-measured) height never changes, only its y offset does.
        const byCol: SVGForeignObjectElement[][] = [[], [], []];
        foreignObjects.forEach((fo) => {
            if (fo.style.display === "none") return;
            const col = Number(fo.dataset.col ?? 0);
            byCol[col]?.push(fo);
        });
        byCol.forEach((list) => {
            let y = 0;
            list.forEach((fo) => {
                fo.setAttribute("y", String(y));
                y += Number(fo.getAttribute("height")) + gapY;
            });
        });
        const maxHeight = Math.max(
            200,
            ...byCol.map((list) => {
                const last = list.at(-1);
                return last ? Number(last.getAttribute("y")) + Number(last.getAttribute("height")) : 0;
            }),
        );
        svg!.setAttribute("height", String(maxHeight));
        const [vbX, vbY, vbW] = originalViewBox.split(" ");
        svg!.setAttribute("viewBox", `${vbX} ${vbY} ${vbW} ${maxHeight}`);

        recomputeLinkPaths();
        links.forEach((l) => {
            const show =
                !!l.dataset.linkSource && !!l.dataset.linkTarget && activeSet.has(l.dataset.linkSource) && activeSet.has(l.dataset.linkTarget);
            l.style.display = show ? "" : "none";
            l.classList.toggle("is-active", show);
            l.classList.remove("is-dim");
        });

        setPinnedButton(id);
        if (resetButton) resetButton.hidden = false;
    }

    function resetIsolation() {
        isolated = false;
        nodes.forEach((n) => n.classList.remove("is-selected"));
        setPinnedButton(null);
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
            if (btn.classList.contains("is-cancel")) {
                resetIsolation();
                return;
            }
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
