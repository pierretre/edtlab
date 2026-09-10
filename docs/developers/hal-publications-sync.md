# HAL Publications Sync

This guide explains how publications from the lab's [HAL open-science](https://hal.science/) collection (`EDT`) are merged into the publications page alongside the hand-written (MDX) publications.

---

## Overview

The publications page (`/en/publications`, `/fr/publications`) shows two sources of publications, merged into one list:

- **Static publications** — hand-written MDX files in `src/content/publications/`, managed through the CMS like any other content.
- **HAL publications** — fetched from the `EDT` collection on HAL as a raw JSON export, refreshed daily by a scheduled GitHub Actions workflow that commits the new export.

Both sources are merged into the `publications` content collection at build time by a custom Astro loader, so the page is fully static — it is prerendered like any other page, with no server-side dependency.

The publications page itself isn't a dedicated route: it's a normal `src/content/pages/publications/{en,fr}.mdx` entry, rendered through the generic `[lang]/[...slug].astro` catch-all like any other page, with `<PublicationList lang="en" origin="edt" />` embedded directly in the MDX body (see `src/components/exported-components.ts` for the list of components available inside page MDX).

---

## Architecture

```text
src/
├── loaders/
│   └── publications-loader.ts      # Custom Astro loader: merges MDX publications with the HAL JSON export
├── components/
│   ├── PublicationList.astro       # Reads the merged collection, filters + renders + sets up structured data
│   └── PublicationCard.astro       # Renders one publication
├── content/
│   ├── publications/
│   │   ├── *.md, *.mdx             # Hand-written publications
│   │   └── hal-publications.json   # Raw HAL export, refreshed by .github/workflows/hal-import.yml
│   └── pages/publications/
│       ├── en.mdx                  # <PublicationList lang="en" origin="edt" />
│       └── fr.mdx                  # <PublicationList lang="fr" origin="edt" />
├── models/
│   └── Publication.model.ts        # origin: 'edt' | 'external'
└── content.config.ts               # publications collection: loader: publicationsLoader()

.github/workflows/
└── hal-import.yml              # Weekly (and manually-triggered) HAL export + commit
```

**Data flow:**

1. `.github/workflows/hal-import.yml` runs daily (03:00 UTC) or on manual dispatch. It `wget`s the HAL search API response for the `EDT` collection straight to `src/content/publications/hal-publications.json` — no intermediate transform, just the raw Solr JSON response.
2. It then runs `npm run build` to make sure the app still builds with the refreshed export before committing anything.
3. If `src/content/publications/hal-publications.json` changed, the workflow commits it as `github-actions[bot]` and pushes to `main`. That push triggers `.github/workflows/docker-build-publish.yml`, which rebuilds and republishes the production image with the new publications baked in.
4. At build time, `publicationsLoader()` (`src/loaders/publications-loader.ts`) populates the `publications` content collection: it first loads the hand-written MDX files the usual way, then reads `hal-publications.json`, maps each HAL doc to the `Publication` shape, and adds any publication not already covered by a hand-written entry.
5. `PublicationList.astro` reads the merged collection via `getCollection("publications", ...)`, sorts by year/title, and renders it — same as any other content collection, fully static.

---

## HAL API

`.github/workflows/hal-import.yml` fetches from HAL's public search API:

```text
https://api.hal.science/search/EDT/?q=*:*&rows=100&start=0&wt=json&fl=<fields>
```

Fields requested (`fl=`): `docid`, `title_s`, `authFullName_s`, `producedDateY_i`, `journalTitle_s`, `conferenceTitle_s`, `proceedingsTitle_s`, `doiId_s`, `uri_s`, `docType_s`, `docSubType_s`, `keyword_s`, `collaboration_s`.

`wt=json` is required — without it HAL falls back to its default (non-JSON) response format. The raw response has the shape `{ response: { numFound, docs: [...] } }`; `publications-loader.ts` reads `response.docs`.

**Known limitation — no pagination**: `rows=100` is a single page. The `EDT` collection currently has far fewer than 100 publications, so this isn't an issue today, but if the collection ever grows past 100, this fetch will silently truncate. If that happens, the workflow needs to either loop over `start=0,100,200,...` until `numFound` is exhausted, or switch to Solr's cursor-based pagination.

### HAL doc type → `Publication.type` mapping

| HAL `docType_s`                            | Publication `type`    |
| ------------------------------------------ | --------------------- |
| `ART`                                      | `journal`             |
| `COMM`                                     | `conference`          |
| `OUV`, `COUV`                              | `book`                |
| `REPORT`, `RAPPORT`                        | `delivrable`          |
| `THESE`                                    | `thesis`              |
| anything else (`POSTER`, `UNDEFINED`, ...) | `preprint` (fallback) |

`venue` is taken from whichever of `journalTitle_s` / `conferenceTitle_s` / `proceedingsTitle_s` is present. `origin` is always set to `'edt'` — HAL publications are treated the same as hand-written EDT publications, since they come from the lab's own HAL collection.

`title` is HTML-entity-decoded (`decodeHtmlEntities()` in `publications-loader.ts`) — HAL's `title_s` comes back HTML-escaped (e.g. `V&amp;V` for `V&V`), and Astro already escapes text content on render, so decoding first avoids double-escaping (`V&amp;amp;V`) on the page.

### `tags`

`tags` is the union of three sources, all handled in `toPublication()`:

- `keyword_s` — the author-entered HAL keywords, verbatim.
- `collaboration_s` — the HAL "collaboration or project" field, mapped to the matching PC code via `PROJECT_TAG_MAP` in `publications-loader.ts` (e.g. `TWINOPS` → `PC3`, `GENUINE` → `PC5` — see `src/content/menu/{en,fr}.json` for the full "PC&lt;n&gt;: &lt;acronym&gt;" list), so it plugs into the existing PC1-PC5 project filter (`src/utils/filter-configs.ts`) the same as a hand-written publication's project tag. HAL allows several values per doc; each becomes its own tag. A `collaboration_s` value with no matching PC code is kept as-is.
- A tag derived from `docSubType_s` (see below), only for `REPORT`-type docs.

### Report subtype → tag mapping

HAL's `docType_s: REPORT` is displayed on this site as **`publications.type.delivrable` = "Deliverable" / "Livrable"** (see `src/i18n/ui.ts`) regardless of subtype — the finer HAL subtype (`docSubType_s`) is preserved as a tag instead, via `REPORT_SUBTYPE_TAG_MAP` in `publications-loader.ts`:

| HAL `docSubType_s`     | HAL meaning (EN)           | Tag added           |
| ---------------------- | -------------------------- | ------------------- |
| `RESREPORT`            | Research Report            | `research-report`   |
| `TECHREPORT`           | Technical Report           | `technical-report`  |
| `FUNDREPORT`           | Contract/Project Report    | `deliverable`       |
| `EXPERTREPORT`         | Technical Expertise Report | `expert-report`     |
| `DMP`                  | Data Management Plan       | `dmp`               |
| `RESPROT`              | Research Protocol          | `research-protocol` |
| anything else / absent | —                          | no tag added        |

Each tag has a matching `badge.<tag>` i18n key in `src/i18n/ui.ts` (both `en` and `fr`) so it renders with a proper label via `Badge.astro` / `getBadge()` instead of the raw slug.

---

## Loader: `src/loaders/publications-loader.ts`

`publicationsLoader()` returns an [Astro content loader](https://docs.astro.build/en/reference/content-loader-reference/) used by the `publications` collection in `src/content.config.ts`:

1. Delegates to the built-in `glob()` loader to load every `src/content/publications/**/*.{md,mdx}` file into the collection store, exactly as before (the loader's glob pattern only matches `.md`/`.mdx`, so `hal-publications.json` sitting in the same directory isn't picked up by it).
2. Reads `src/content/publications/hal-publications.json` (if it doesn't exist yet — e.g. a fresh checkout before the first scheduled run — it logs a warning and skips HAL publications rather than failing the build).
3. For each HAL doc, checks it against the already-loaded static entries by DOI first (case-insensitive), falling back to a lowercased title match when no DOI is available on either side. If a static entry matches, it's removed from the store and replaced by the HAL copy — HAL publications take priority, since they're refreshed automatically and stay in sync with HAL, while a hand-written entry can silently drift out of date.
4. Any HAL publication not already covered is mapped to the `Publication` shape and added to the store under the id `hal-<docid>`, validated against the same collection schema as the MDX entries.

---

## Refreshing locally

```bash
# Fetch a fresh export the same way the workflow does
wget \
  --output-document=src/content/publications/hal-publications.json \
  "https://api.hal.science/search/EDT/?q=*:*&rows=100&start=0&wt=json&fl=docid,title_s,authFullName_s,producedDateY_i,journalTitle_s,conferenceTitle_s,proceedingsTitle_s,doiId_s,uri_s,docType_s,docSubType_s,keyword_s,collaboration_s"

npm run dev      # or: npm run build && npm run preview
open http://localhost:4321/en/publications
```

If `src/content/publications/hal-publications.json` doesn't exist locally yet, the page still builds — it just won't show any HAL-only publications until you fetch one (or pull the latest commit from the scheduled workflow).

---

## Known limitations

- **No pagination**: see the HAL API section above — the fetch is a single `rows=100` page.
- **Full replace, not diff**: every scheduled run overwrites the whole `hal-publications.json` file from HAL. Simple and always consistent with HAL, at the cost of the whole file's diff changing even for small updates.
- **No pagination on the page**: all publications (static + HAL) render in one list; filtering is client-side (`FilterManagerImpl`), same as before this feature.
- **Up to a day stale**: since the export only refreshes daily (or on manual `workflow_dispatch`), a publication added to HAL can take up to a day to appear on the site.

---

## Cron schedule

`.github/workflows/hal-import.yml` runs on `cron: "0 3 * * *"` (03:00 UTC daily) and can also be triggered manually from the Actions tab (`workflow_dispatch`).
