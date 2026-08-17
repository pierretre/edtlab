# HAL Publications Sync

This guide explains how publications from the lab's [HAL open-science](https://hal.science/) collection (`EDT`) are synced into MongoDB and merged into the publications page alongside the hand-written (MDX) publications.

---

## Overview

The publications page (`/en/publications`, `/fr/publications`) shows two sources of publications, merged into one list:

- **Static publications** — hand-written MDX files in `src/content/publications/`, managed through the CMS like any other content.
- **HAL publications** — fetched from the `EDT` collection on HAL, stored in MongoDB, refreshed once a day by a cron job hitting a sync endpoint.

The page is rendered server-side (SSR) so it can read from MongoDB on every request; it is no longer part of the statically prerendered build output.

---

## Architecture

```text
src/
├── utils/
│   ├── hal.ts             # Fetch HAL search API (paginated) + map to Publication shape
│   └── mongodb.ts         # Singleton MongoClient, getPublicationsCollection()
├── pages/
│   ├── api/
│   │   └── hal-collection.ts   # POST endpoint: triggers a full HAL -> Mongo sync
│   └── [lang]/
│       └── publications.astro  # SSR page (prerender = false)
├── components/
│   ├── PublicationList.astro   # Merges static + Mongo publications, renders + filters
│   └── PublicationCard.astro   # Renders one publication, incl. "HAL"/"EDT" badges
├── models/
│   └── Publication.model.ts    # origin: 'edt' | 'external' | 'hal'
└── content.config.ts            # publications schema, same origin enum
```

**Data flow:**

1. A daily cron job on the host calls `POST /api/hal-collection` with a shared secret.
2. The endpoint pages through the HAL search API for the `EDT` collection, maps every doc to the `Publication` shape, and replaces the entire `publications` collection in MongoDB (`deleteMany({})` + `insertMany(...)`).
3. On every request to `/[lang]/publications`, `PublicationList.astro` reads the static MDX publications (`getCollection("publications")`) and the Mongo publications (`getPublicationsCollection().find()`), concatenates them, sorts by year/title, and renders.
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

## API endpoint: `POST /api/hal-collection`

**Auth**: shared secret via the `X-Sync-Secret` header, checked against `HAL_SYNC_SECRET`.

**Request**: no body required.

```bash
curl -X POST \
  -H "X-Sync-Secret: $HAL_SYNC_SECRET" \
  -H "Origin: https://edtlab.fr" \
  https://edtlab.fr/api/hal-collection
```

> The `Origin` header is required — Astro rejects same-site, non-GET requests without a matching `Origin` by default. A bare `curl -X POST` with no `Origin` header gets a 403 ("Cross-site POST form submissions are forbidden"), not a 401.

**Responses:**

- `200` — `{ "success": true, "count": 7 }`
- `401` — `{ "error": "Unauthorized" }` (missing/incorrect `X-Sync-Secret`)
- `500` — `{ "error": "<message>" }` (HAL API or MongoDB failure)

---

## Environment configuration

```bash
# MongoDB (HAL publications sync)
MONGODB_URI=mongodb://mongo:27017/edtlab
HAL_SYNC_SECRET=change_me
```

- `MONGODB_URI` — connection string. Inside Docker Compose this points at the `mongo` service (`mongodb://mongo:27017/edtlab`); for `npm run dev` against a local container, use `mongodb://localhost:27017/edtlab`.
- `HAL_SYNC_SECRET` — shared secret required by the sync endpoint. Generate a random value for production; any value works for local testing.

Both are read via `process.env.X || import.meta.env.X`, matching the pattern used by the other API routes (e.g. `contact.ts`, `phd-club.ts`).

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

The daily sync is triggered externally — there's no cron process inside this repo/container. Install a crontab entry on the host:

```cron
0 3 * * * curl -sf -X POST -H "X-Sync-Secret: $HAL_SYNC_SECRET" -H "Origin: https://edtlab.fr" https://edtlab.fr/api/hal-collection
```

This line is also documented as a comment next to `HAL_SYNC_SECRET` in `.env.example`.

---

## Local development

```bash
# 1. Start a local Mongo container
docker run -d -p 27017:27017 --name edtlab-mongo-dev mongo:7

# 2. Set MONGODB_URI=mongodb://localhost:27017/edtlab and HAL_SYNC_SECRET in .env

# 3. Start the dev server
npm run dev

# 4. Trigger a sync
curl -X POST -H "X-Sync-Secret: <secret>" -H "Origin: http://localhost:4321" \
  http://localhost:4321/api/hal-collection

# 5. Visit the merged page
open http://localhost:4321/en/publications
```

---

## Origin/badge behaviour

`origin` on a `Publication` is `'edt' | 'external' | 'hal'`. The publications page calls `<PublicationList origin="edt" />`, meaning "EDT-authored publications only" — since HAL publications come from the lab's own HAL collection, they count as EDT publications for this filter too. In `PublicationList.astro`, the `origin === 'edt'` branch matches `data.origin === 'edt' || data.origin === 'hal'`. `PublicationCard.astro` shows a `"HAL"` badge for `origin === 'hal'` (alongside the existing `"EDT"` badge for `origin === 'edt'`).

---

## Dedupe

If a publication is both hand-written in `src/content/publications/` and present in the HAL collection, the HAL copy is dropped so it doesn't show up twice. `filterOutHalDuplicates()` in `src/utils/publications.ts` matches by DOI first (case-insensitive), falling back to a normalized title match (lowercased, punctuation stripped) when no DOI is available on either side. The static entry always wins — it may carry manual edits (better-formatted author names, curated tags) that the HAL copy doesn't have. This runs in `PublicationList.astro` before the HAL docs are merged into the render list, so a duplicate never reaches the page at all (not just visually hidden).

Unit tests: `src/test/utils/publications.test.ts`.

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
