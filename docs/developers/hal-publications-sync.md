# HAL Publications Sync

This guide explains how publications from the lab's [HAL open-science](https://hal.science/) collection (`EDT`) are synced into MongoDB and merged into the publications page alongside the hand-written (MDX) publications.

---

## Overview

The publications page (`/en/publications`, `/fr/publications`) shows two sources of publications, merged into one list:

- **Static publications** — hand-written MDX files in `src/content/publications/`, managed through the CMS like any other content.
- **HAL publications** — fetched from the `EDT` collection on HAL, stored in MongoDB, refreshed once a day by a cron job running a sync script inside the container. There is no network-reachable endpoint for this — the sync is not callable from outside the server.

The page is rendered server-side (SSR) so it can read from MongoDB on every request; it is no longer part of the statically prerendered build output.

---

## Architecture

```text
src/
├── utils/
│   ├── hal.ts             # Fetch HAL search API (paginated) + map to Publication shape
│   └── mongodb.ts         # Singleton MongoClient, getPublicationsCollection()
├── pages/
│   └── [lang]/
│       └── publications.astro  # SSR page (prerender = false)
├── components/
│   ├── PublicationList.astro   # Merges + dedupes static + Mongo publications, renders + filters
│   └── PublicationCard.astro   # Renders one publication, incl. "HAL"/"EDT" badges
├── models/
│   └── Publication.model.ts    # origin: 'edt' | 'external' | 'hal'
└── content.config.ts            # publications schema, same origin enum

scripts/
└── sync-hal.ts             # One-shot sync script, bundled to dist/scripts/sync-hal.mjs
```

**Data flow:**

1. A daily cron job on the host runs `docker exec edtlab_web node dist/scripts/sync-hal.mjs` — a script inside the running container, not an HTTP endpoint. Nothing listens on the network for this.
2. The script pages through the HAL search API for the `EDT` collection, maps every doc to the `Publication` shape, and replaces the entire `publications` collection in MongoDB (`deleteMany({})` + `insertMany(...)`).
3. On every request to `/[lang]/publications`, `PublicationList.astro` reads the static MDX publications (`getCollection("publications")`) and the Mongo publications (`getPublicationsCollection().find()`), dedupes and concatenates them, sorts by year/title, and renders.
4. If MongoDB is unreachable, the fetch is wrapped in a `try/catch` and the page falls back to static-only publications rather than failing.

---

## HAL API

The sync fetches from HAL's public search API:

```text
https://api.hal.science/search/EDT/?q=*:*&rows=100&start=<N>&wt=json&fl=<fields>
```

`fetchAllHalPublications()` in `src/utils/hal.ts` pages through this with `rows=100`, incrementing `start` until `start >= response.numFound`, so it always fetches the full collection regardless of size.

Fields requested (`fl=`): `docid`, `title_s`, `authFullName_s`, `producedDateY_i`, `journalTitle_s`, `conferenceTitle_s`, `proceedingsTitle_s`, `doiId_s`, `uri_s`, `docType_s`, `keyword_s`.

### HAL doc type → `Publication.type` mapping

| HAL `docType_s`                             | Publication `type`   |
| -------------------------------------------- | --------------------- |
| `ART`                                        | `journal`             |
| `COMM`                                       | `conference`          |
| `OUV`, `COUV`                                | `book`                |
| `REPORT`, `RAPPORT`                          | `report`              |
| `THESE`                                      | `thesis`              |
| anything else (`POSTER`, `UNDEFINED`, ...)   | `preprint` (fallback) |

`venue` is taken from whichever of `journalTitle_s` / `conferenceTitle_s` / `proceedingsTitle_s` is present. `tags` comes from `keyword_s`. `origin` is always set to `'hal'`.

---

## Sync script: `scripts/sync-hal.ts`

There is deliberately no HTTP endpoint for this — the original implementation used a secret-protected `POST /api/hal-collection` route, but that meant dealing with Astro's same-site `Origin` check, a shared secret to manage, and a publicly reachable route whose only purpose was to be hit by cron. Running it as an in-container script removes all of that: nothing listens on the network, there's no secret to leak or rotate, and cron just needs shell access to the box it already runs on.

**Build**: `scripts/sync-hal.ts` is bundled by `esbuild` into a single `dist/scripts/sync-hal.mjs` as part of `npm run build` / `npm run build:prod` (see the `build:scripts` script in `package.json`). It reuses `src/utils/hal.ts` and `src/utils/mongodb.ts` directly — esbuild resolves the `@utils/*`/`@models/*` path aliases via `tsconfig.json` at bundle time, so the output is self-contained (the `mongodb` driver itself stays external, resolved from `node_modules` at runtime, same as everywhere else in the app). This mirrors how `dist/server/entry.mjs` already works: the final Docker image only ever ships `dist/` — no `src/`, no `tsconfig.json`, no `tsx` needed at runtime.

**Run it**:

```bash
# Inside a running container (production/local docker-compose)
docker exec edtlab_web node dist/scripts/sync-hal.mjs

# Directly, if MONGODB_URI is set in the environment
node dist/scripts/sync-hal.mjs
```

Prints `Synced <N> HAL publications.` and exits `0` on success, or logs the error and exits `1` on failure (bad HAL response, Mongo unreachable, etc.) — suitable for cron's own failure handling/alerting.

---

## Environment configuration

```bash
# MongoDB (HAL publications sync)
MONGODB_URI=mongodb://mongo:27017/edtlab
```

`MONGODB_URI` is the only variable this feature needs. Inside Docker Compose it points at the `mongo` service (`mongodb://mongo:27017/edtlab`); for `npm run dev` against a local container, use `mongodb://localhost:27017/edtlab`.

Read via `process.env.MONGODB_URI` (see `src/utils/mongodb.ts`), matching the pattern used by the other API routes (e.g. `contact.ts`, `phd-club.ts`).

---

## MongoDB (Docker)

A `mongo:7` service is defined in `docker-compose.yml`, `docker-compose.local.yml`, and `docker-compose.dev.yml`, on the existing `edtlab_network`, exposed only on `127.0.0.1:4004:27017` (same pattern as `matomo-db`). Data persists to `/var/www/edtlabfr/mongo/data` in prod/local, and to a named volume (`mongo-dev-data`) in dev.

```bash
# Start everything, including Mongo
docker compose up -d

# Or just Mongo, for local `npm run dev`
docker run -d -p 27017:27017 --name edtlab-mongo-dev mongo:7
```

Inspect the collection directly:

```bash
docker exec edtlab-mongo-dev mongosh edtlab --quiet --eval 'db.publications.find().pretty()'
```

---

## Cron setup

There's no cron process inside this repo/container — install a crontab entry on the host that shells into the running `web` container:

```cron
0 3 * * * docker exec edtlab_web node dist/scripts/sync-hal.mjs >> /var/log/hal-sync.log 2>&1
```

This line is also documented as a comment next to `MONGODB_URI` in `.env.example`. The container name (`edtlab_web`) comes from `docker-compose.yml`; adjust it if you're running under a different compose project name or on `docker-compose.local.yml` (`edtlab_web_local`).

---

## Local development

```bash
# 1. Start a local Mongo container
docker run -d -p 27017:27017 --name edtlab-mongo-dev mongo:7

# 2. Set MONGODB_URI=mongodb://localhost:27017/edtlab in .env

# 3. Build the script (or `npm run build:scripts` alone if the rest of the
#    build is already up to date) and run it directly
npm run build:scripts
MONGODB_URI=mongodb://localhost:27017/edtlab node dist/scripts/sync-hal.mjs

# 4. Start the dev server and visit the merged page
npm run dev
open http://localhost:4321/en/publications
```

---

## Origin/badge behaviour

`origin` on a `Publication` is `'edt' | 'external' | 'hal'`. The publications page calls `<PublicationList origin="edt" />`, meaning "EDT-authored publications only" — since HAL publications come from the lab's own HAL collection, they count as EDT publications for this filter too. In `PublicationList.astro`, the `origin === 'edt'` branch matches `data.origin === 'edt' || data.origin === 'hal'`. `PublicationCard.astro` shows a `"HAL"` badge for `origin === 'hal'` (alongside the existing `"EDT"` badge for `origin === 'edt'`).

---

## Dedupe

If a publication is both hand-written in `src/content/publications/` and present in the HAL collection, the HAL copy is dropped so it doesn't show up twice. `PublicationList.astro` filters the Mongo docs against the static entries by DOI first (case-insensitive), falling back to a lowercased title match when no DOI is available on either side, before merging them into the render list. The static entry always wins — it may carry manual edits (better-formatted author names, curated tags) that the HAL copy doesn't have.

## Known limitations

- **Full replace, not diff**: every sync wipes and reinserts the whole `publications` collection in Mongo. Simple and always consistent with HAL, but means a brief moment where the collection is empty mid-sync (not user-visible, since it happens well under the request time of a single sync run).
- **No pagination on the page**: all publications (static + HAL) render in one list; filtering is client-side (`FilterManagerImpl`), same as before this feature.

---

## A gotcha this feature surfaced: `prefixDefaultLocale`

Before this feature, every page under `/en/...` was prerendered (`prerender = true`) and served as a static file, which bypasses Astro's i18n routing middleware entirely. The first *SSR* route added under `/en/...` (this publications page) immediately 404'd in production, while the equivalent `/fr/...` route worked fine.

Root cause: `astro.config.mjs`'s `i18n` block defaults to `routing.prefixDefaultLocale: false`, under which Astro's middleware expects the default locale (`en`) to be served unprefixed at the root, and rejects on-demand requests to `/en/...`. This repo's file-based routing prefixes *every* locale, including the default one, so the fix is:

```js
i18n: {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  routing: {
    prefixDefaultLocale: true,
  },
},
```

This matters for any *future* SSR route placed under `/en/...` — without it, the route will work for `/fr/...` and silently 404 for `/en/...`.

---

## Sitemap

`prerender = false` pages aren't auto-discovered by `@astrojs/sitemap` the way prerendered pages are. The publications URLs are added explicitly via `customPages` in the `sitemap()` integration config in `astro.config.mjs`. Any future SSR page will need the same treatment to stay in the sitemap.
