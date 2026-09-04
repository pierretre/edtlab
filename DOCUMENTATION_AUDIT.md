# Documentation Audit — 2026-09-04

Full review of every file under `docs/`, plus `README.md`, `CONTRIBUTING.md`, `src/assets/fonts/README.md`, and `src/test/README.md`, cross-checked against the actual implementation (`src/content.config.ts`, `src/components/`, `.github/workflows/*.yml`, `docker-compose*.yml`, `vitest.config.ts`, `package.json`, real content files). Findings below are only claims that were actually verified against real files — nothing here is speculative.

**Headline:** the `docs/editors/` how-to guides are in decent shape (a handful of stale field names/links). The `docs/developers/` and `docs/deployment/` clusters are the problem — several files describe an **aspirational architecture that was never built or has since diverged**: invented components, invented shell scripts, invented env vars, a CI/CD pipeline that doesn't exist, and two mutually-contradictory Matomo setup guides. Anyone following those docs today would ship broken configuration.

Legend: 🔴 Critical (fabricated / describes something that doesn't exist) · 🟠 High (wrong technical fact — will break if followed) · 🟡 Medium (outdated/stale) · ⚪ Minor (nit)

**Status: item 1 of the priority list (Matomo/analytics docs) is fixed.** `docs/developers/analytics-integration.md`, `docs/developers/partytown-setup.md`, `docs/developers/matomo-setup.md` (local-dev), and `docs/deployment/matomo-setup.md` (production) now describe only the real component, the real `docker-compose*.yml` services, and `astro.config.mjs`'s Partytown config — kept concise, reference-style. Two gaps not in the original audit are called out where relevant: `matomo-apache-config.conf` is mounted by every compose file but isn't committed to git (fresh checkout gets an empty directory instead), and the committed `matomo-db-config.cnf` isn't mounted anywhere, so it's currently inert. All findings below that reference these four files are stale — kept as the record of what was wrong. Items 2–6 are still open.

---

## 1. Fabricated features — docs describe things that don't exist in the code 🔴 — ✅ FIXED, see status note above

| Doc | Claim | Reality |
| --- | --- | --- |
| `docs/developers/matomo-setup.md` | Documents a `CookieConsent.astro` component, a global `window.matomoTrack` API (`trackEvent`, `trackDownload`, `trackOutboundLink`, `trackSiteSearch`, `trackGoal`), a `docker-compose.matomo.yml` file, a `.env.matomo.example` file, and links to `./local-testing-guide.md` | None of these exist anywhere in the repo (grep confirms zero hits for `matomoTrack`, `CookieConsent`; no such files) |
| `docs/deployment/matomo-setup.md` | Documents 5 maintenance scripts (`matomo-optimize-db.sh`, `matomo-cleanup.sh`, `matomo-archive.sh`, `matomo-backup.sh`, `matomo-monitor.sh`) plus a crontab, and a second, differently-configured `docker-compose.matomo.yml` | `scripts/` only contains `edt-seminaire.ics`, `validate-ci.sh`, `validate-ci-enhanced.sh`. No such compose file exists — Matomo is one service inside the real `docker-compose.yml` |
| `docs/developers/analytics-integration.md` | Documents env vars `MATOMO_ENABLE_COOKIES`, `MATOMO_RESPECT_DNT`, `MATOMO_ENABLE_HEARTBEAT`, `MATOMO_HEARTBEAT_TIMER`, conditional script loading, and dev-mode debug logging of a config object | Verified `src/components/MatomoAnalytics.astro`: only reads `MATOMO_URL`/`MATOMO_SITE_ID`. DNT is hardcoded `"false"`, cookies are always disabled, heartbeat is hardcoded to 15s. None of those four env vars are read anywhere, and `.env.example` doesn't define them either |
| `docs/developers/analytics-integration.md` | Lists `nginx/matomo.conf` as a project file | No `nginx/` directory exists anywhere in the repo |
| `docs/developers/partytown-setup.md` | Claims `MatomoAnalytics.astro` "has been updated to use Partytown" via `<script type="text/partytown">` running Matomo in a web worker | Verified: the component uses a plain `<script is:inline>` on the main thread (see snippet below). Partytown *is* configured in `astro.config.mjs`, but it is not wired to the Matomo script at all — describes a feature that was never actually connected |
| `docs/developers/performance-optimization.md` | References `npm run perf:analyze`, `npm run images:analyze`, a public `window.getPerformanceMetrics()` runtime API, and "CI fails if performance budgets are exceeded" | Neither npm script exists in `package.json`. `getPerformanceMetrics` is only a TS type declaration inside a Playwright spec, never implemented in site code. `ci.yml` has no budget/perf gate |
| `docs/editors/guidelines/component-usage.md`, `docs/editors/templates/page-advanced.mdx` | Documents an `EventList` component with props `limit`, `showType`, `lang`, `filterType`, `showPast` | No `EventList.astro` exists in `src/components/` — the real component is `EventTimeline.astro`, an unrelated API |

**Verified `MatomoAnalytics.astro` (actual, current):**
```astro
const matomoUrl = import.meta.env.MATOMO_URL || "https://edtlab.fr/matomo/";
const matomoSiteId = import.meta.env.MATOMO_SITE_ID || "1";
...
_paq.push(["setDoNotTrack", "false"]);
_paq.push(["disableCookies"]);
_paq.push(["enableHeartBeatTimer", "15"]);
```
No config-driven behavior, no Partytown, no cookie consent gate — contradicts three separate docs above.

---

## 2. Wrong technical facts — will break if followed 🟠 — ✅ ALL FIXED

All rows below are resolved. Kept as the record of what was wrong.

| Doc | Was | Now |
| --- | --- | --- |
| `docs/developers/ci-cd-setup.md` | Fabricated multi-job pipeline, 50% coverage | Rewritten as a table of the 4 real workflows + the real single-job `ci.yml`, 70% threshold |
| `docs/developers/deployment.md` | Fake `release: published` trigger, `docker run -p 4001:80` | Real push-to-main → Docker Hub flow; port mismatch flagged as unverified-from-repo rather than silently guessed |
| `docs/deployment/nginx-configuration.md` | `0.0.0.0:4001:80` / `:4002:80` port table; "port 8080" in traffic-flow diagram | Corrected to `127.0.0.1:4001:4321` / `4002:80` / `4003:3306`; traffic-flow diagram corrected to port 4321 |
| `docs/deployment/install.md` | `redeploy.sh`: `git pull && docker-compose build` | Corrected to `docker-compose pull web && docker-compose up -d web`, with a note explaining there's no local build context in this compose file, and pointing at the live server's actual (different) webhook script in `deployment.md` |
| `docs/developers/hal-publications-sync.md` | "weekly (Mondays 04:00 UTC)", `cron: "0 4 * * 1"`, "up to a week stale" | Corrected to daily, `cron: "0 3 * * *"`, "up to a day stale" (3 occurrences) |
| `docs/developers/brevo-emails.md` | `@getbrevo/brevo: ^2.2.0` | `^3.0.1`, matching `package.json` |
| `docs/editors/how-to/positions-guide.md` | `type` lowercase (`postdoc\|phd\|engineer\|intern`) | `PostDoc\|PhD\|Engineer\|Intern\|Others`, in checklist + template + field reference |
| `docs/editors/how-to/publications-guide.md`, `templates/publication.md` | `type`: 4 values; naming `{year}-{author}-{title}.md`; `origin` undocumented | All 9 `type` values; naming corrected to `{author}-{year}-{title}.md` with real filenames; `origin` documented |
| `docs/editors/guidelines/component-usage.md` (+ 6 reuse sites) | `OptimizedFigure` example with bare/imported `src`; fake `EventList`, `TableOfContents`, wrong `PublicationList`/`Breadcrumb` props | `OptimizedFigure` now uses a real `/media/uploads/...` path everywhere it's shown; components renamed/corrected to `EventTimeline`, `TableOfContent`, real prop lists |
| `docs/editors/templates/event.md`, `press-release.md` | Wrong file location (`events/`/`press-releases/`), invalid `newsType` options, `press-release.md` missing required `newsType` + duplicate `tags:` key | File location corrected to `src/content/news/`; `newsType` options corrected; `press-release.md` frontmatter fixed (required field added, duplicate key merged) |
| `docs/editors/guidelines/image-management.md`, `docs/editors/quick-reference.md`, `docs/quick-reference.md` | Fake `src/assets/images/{news-covers,team,...}/` tree; fabricated `coverImage` (publications) and image field (positions) | Corrected to the real flat `src/assets/images/` + `public/media/uploads/`; fabricated fields removed |
| `README.md` | `src/content/job-offers/`; missing `calendar`/`newsletter`/`use-cases` from collection list; `docker-compose --profile dev`; "Astro.js 5.x"; "static site with Nginx (port 4001)"; unverifiable IP-anonymization claim; dangling `LICENSE` reference | All corrected — see current file |
| `src/test/README.md` | 50% coverage; `routes/` directory; "main/develop" CI trigger; fabricated multi-stage CI/CD section | Corrected to 70%, real subdirectories (`integration/`, real `e2e/` spec files), `main`-only trigger, CI/CD section trimmed to what `ci.yml` actually does |
| `docs/quick-reference.md` | Events frontmatter missing required `photo`; Positions `type: "postdoc"` (lowercase) despite a correct comment beside it; stale "Validation Rules" section (wrong required fields, wrong enums) | All corrected |
| `docs/editors/README.md` | Dead `frontmatter-reference.md` link (×2), wrong `src/content/config.ts` path (×2), stale directory tree, incomplete collection list | All corrected, tree updated to match real files |

---

## 3. Broken / dead links 🟠 — ✅ ALL FIXED

| Doc | Link | Fix |
| --- | --- | --- |
| `README.md` | `./docs/analytics-integration.md` | → `./docs/developers/analytics-integration.md` |
| `README.md` | `./docs/developers/decap-cms-setup.md` | Removed (no such doc exists); replaced with a pointer to `public/admin/config.yml` |
| `README.md` | `DOCKER-SETUP.md` | Removed; replaced with links to `docs/deployment/install.md` and `docs/developers/deployment.md` |
| `docs/editors/README.md`, `quick-reference.md` ×2, `publications-guide.md`, `templates/publication.md` | `guidelines/frontmatter-reference.md` | Removed everywhere; replaced with a link to the real `src/content.config.ts` |
| `docs/editors/quick-reference.md`, `templates/publication.md`, `README.md`, `pages-guide.md` (×2) | `src/content/config.ts` (wrong path) | Corrected to `src/content.config.ts` everywhere it appeared |
| `docs/editors/how-to/publications-guide.md` | `../guidelines/seo-guide.md` | Removed (no such doc exists) |
| `docs/developers/brevo-emails.md` | `../../MIGRATION-TO-ASTRO-API.md` | Removed (no such doc exists) |

---

## 4. Internally-inconsistent docs 🟡 — ✅ ALL FIXED

- ~~**Matomo setup has two competing guides**~~ **FIXED** (item 1) — differentiated by purpose (local dev vs. production), cross-linked.
- ~~**Deployment/redeploy had three incompatible narratives**~~ **FIXED** — `install.md`'s redeploy script now matches the real image-pull model instead of a nonexistent local build; `nginx-configuration.md`'s ports corrected to match `docker-compose.yml`; `deployment.md`'s trigger corrected (item 2). The live server's actual webhook script (`docker run -p 4001:80`, found in `deployment.md`) is still flagged, not silently rewritten, since it lives outside this repo and I can't confirm which side is stale — see §2 above.
- ~~**`CONTRIBUTING.md` / `positions-pr-workflow.md`** overstated "rebuilds and redeploys automatically"~~ **FIXED** — both now say CI builds and publishes an image automatically, and the production server picks it up via its own webhook, rather than implying one continuous automatic pipeline.

---

## 5. Minor nits ⚪ — mostly fixed

- ~~`docs/editors/templates/use-case.md` missing ~10 schema fields~~ **FIXED** — added `usagePhase`, `usageLevel`, `since`, `schema`, `objectives`, `users`, `approvedBy`, `approvedDate`, `pepr`, `license`, `lastUpdated`, with a note that `previewToken`/`confirmToken` are system-managed, not hand-authored.
- ~~`use-case.md`'s `domain` field presented as a fixed enum~~ **FIXED** — now labeled as a free-form `z.string()` with the value list framed as a convention, not a hard constraint.
- **New finding, fixed**: `docs/editors/how-to/pages-guide.md`'s `OutlinedCard` examples (×2) passed content as children; the real component (`src/components/OutlinedCard.astro`) has no `<slot />` and requires `label`/`title`/`description` as props. Both examples corrected.
- `README.md` / `positions-pr-workflow.md` markdownlint `MD040` (fenced block missing language) — checked, both already have language tags on their opening fences; not reproducible as filed. Not touched further.
- `positions-pr-workflow.md`'s branch-prefix suggestion — not a factual claim, left as-is (a suggestion, consistent with `workflow-guide.md`'s existing convention).

---

## 6. Confirmed accurate — no action needed ✅

- All npm scripts referenced across the audited docs (`dev`, `dev:cms`, `proxy`, `build`, `build:prod`, `preview`, `astro`, `check`, `lint`, `test`, `test:ci`, `test:watch`, `test:coverage`, `test:e2e`) exist in `package.json` and behave as described.
- `docs/developers/hal-publications-sync.md` — architecture, loader logic, dedup-by-DOI/title, doc-type mapping all verified accurate against `src/loaders/publications-loader.ts` (only the cron schedule is wrong, see §2).
- `docs/developers/newsletter-sending.md` — verified against real `src/emails/send-newsletter.ts` / `NewsletterEmail.tsx`.
- `docs/editors/guidelines/accessibility-guide.md` — RGAA 4.1 AA / WCAG 2.1 AA / axe-core claims confirmed against `src/test/accessibility/axe.test.ts`.
- `docs/editors/templates/position.md`, `page-basic.md`, `page-advanced.mdx` — frontmatter fields match their schemas correctly (aside from the shared `EventList`/`OptimizedFigure` issues above).
- `public/admin/config.yml` confirms `backend: github`, `repo: pierretre/edtlab`, `branch: main` — README's "production requires GitHub authentication" claim is accurate.
- `src/assets/fonts/README.md` accurately reflects the font files actually present.
- `CONTRIBUTING.md` — every relative link resolves to a real path.
- `docs/editors/how-to/positions-pr-workflow.md` — every field name/enum value in its YAML examples (`filled`, `researcher.name/email`, `researchStatus`, `funding`, `host`, `startDate`, `expectedEndDate`, `useCases[].ref`, `publications[]`) matches `src/content.config.ts` exactly.

---

## Recommended priority order

1. ~~**Matomo/analytics docs** (`analytics-integration.md`, `partytown-setup.md`, both `matomo-setup.md` files)~~ **FIXED.**
2. ~~**`ci-cd-setup.md`** and **`deployment.md`**~~ **FIXED.** `ci-cd-setup.md` is now a table of the 4 real workflows plus what `ci.yml` actually runs (one job, 70% coverage threshold). `deployment.md` now describes the real push-to-main → Docker Hub → server-webhook flow instead of a nonexistent GitHub-Release trigger, and flags the `docker run -p 4001:80` vs. actual port `4321` mismatch in the live redeploy script as unverified-from-this-repo rather than silently correcting it (that script lives on the server, not in git). `docs/deployment/install.md`'s conflicting `docker-compose build`-based redeploy example is untouched — still open, see item 6.
3. ~~**`docs/deployment/vps-deployment.md`**~~ **FIXED** — deleted. It was 0 bytes and unreferenced by any other doc; VPS deployment is already covered by `docs/deployment/install.md` and `docs/developers/deployment.md`, so there was nothing to preserve.
4. ~~**`component-usage.md`** + the six docs that reuse its `OptimizedFigure` example~~ **FIXED.** `component-usage.md`'s `EventList`/`TableOfContents`/`PublicationList`/`Breadcrumb`/`OptimizedFigure` sections now match the real components (`EventTimeline`, `TableOfContent`, real prop lists). Every `OptimizedFigure` example across `quick-reference.md` ×2, `page-advanced.mdx`, `pages-guide.md` (3 occurrences), `image-management.md` (5 occurrences, plus its fabricated `positions`/`publications` image fields removed), and `accessibility-guide.md` now uses a working `/media/uploads/...` path. New finding surfaced while doing this, not yet fixed: `docs/editors/how-to/pages-guide.md`'s `OutlinedCard` example passes children between the tags (`<OutlinedCard title="...">text</OutlinedCard>`), but the real component (`src/components/OutlinedCard.astro`) has no `<slot />` and instead requires `label`, `title`, `description` as props — the documented usage renders none of the body text. Rolled into item 6.
5. ~~**`positions-guide.md`, `publications-guide.md`** enum-casing/naming-convention fixes~~ **FIXED.**
6. ~~Everything else in §2/§3 (dead links, stale cron, version numbers)~~ **FIXED.** All rows in §2/§3/§4/§5 above are resolved, including the `install.md`/`nginx-configuration.md` port and redeploy inconsistencies, the `use-case.md` schema gaps, and the `OutlinedCard` bug found along the way.

**All 6 items closed.** Every finding in this report has either been fixed in the docs or, where it depends on state outside this repo (the live server's redeploy script, the `LICENSE` file decision), flagged in place rather than guessed at.
