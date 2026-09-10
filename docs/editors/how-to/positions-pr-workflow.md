# Updating a Position's Status via Pull Request

This guide walks through two specific, common changes to a position record, done directly through GitHub (fork/branch → edit → pull request), without needing DecapCMS access:

1. **Marking a position as filled** — the hiring is done, and the position should move from the open "join us" listing into the ongoing-research record.
2. **Updating your own position record** — you are the researcher who filled the position, and want to keep your record current (status, publications, end date, etc.) once it's live.

For the full field reference (every frontmatter option, naming conventions, writing guidelines), see the [Positions Guide](positions-guide.md). This page is the short, task-focused version aimed at anyone comfortable making a small pull request but who isn't necessarily a regular content editor — including researchers and supervisors who only ever touch this one file.

## Do I need this guide, or the CMS?

- If you have a DecapCMS account (`/admin`), you can make the same changes through the web form — see the [Positions Guide](positions-guide.md) and the [DecapCMS setup](../../developers/ci-cd-setup.md).
- If you don't have CMS access, or you just prefer editing the Markdown directly, use the PR flow below. Anyone with a GitHub account can propose this change — you don't need write access to the repository, since GitHub will fork the repo for you automatically.

## Before you start: find your file(s)

Positions live in `src/content/positions/`, one file per language:

```
src/content/positions/{type}-{project}-{identifier}-en.md
src/content/positions/{type}-{project}-{identifier}-fr.md
```

For example: `phd-pc1-cetim-model-hybridization-en.md`.

If you don't know the exact filename, search the repository on GitHub for your position's title or your name.

## The pull request workflow

The same steps apply to both scenarios below — only the frontmatter fields you change differ.

### 1. Open the file on GitHub and start editing

1. Navigate to the file in `src/content/positions/` on GitHub.
2. Click the pencil icon ("Edit this file") in the top right.
3. If you don't have write access, GitHub automatically creates a fork for you the first time you save — you don't need to set anything up manually.

### 2. Edit the frontmatter

Change only the fields relevant to your update (see the two scenarios below). Leave everything else — especially `title`, the filename, and `pc` — untouched unless you're coordinating a bigger change with the editor team, since those drive URLs and where the position shows up on the site.

Repeat the edit on **both the `-en.md` and `-fr.md` files** so the two languages stay in sync.

### 3. Commit your change

Scroll to the bottom of the GitHub editor:

- Write a short, descriptive commit message, e.g. `Mark PhD position pc1-cetim-model-hybridization as filled`.
- Select **"Create a new branch for this commit and start a pull request."**
- Suggested branch naming, matching the convention used elsewhere in this repo: `content/position-{identifier}-filled` or `content/position-{identifier}-update`.

### 4. Open the pull request

- Click **"Propose changes"**, then **"Create pull request"**.
- In the description, briefly state what changed and why (e.g. "Researcher hired, updating status and adding supervisor info"). If you edited both `-en.md` and `-fr.md`, say so.
- Submit the PR. Automated checks (build, content validation) run automatically — see [CI/CD Setup](../../developers/ci-cd-setup.md) — you don't need to run anything locally, though you're welcome to preview locally first following the [Workflow Guide](../workflow-guide.md).

### 5. Review and merge

- An editor or maintainer reviews the PR, checks both language versions match, and merges it.
- If a check fails (e.g. a schema validation error), GitHub will show it directly on the PR — the most common cause is a typo in an enum value (see the field reference table below) or a missing quote around a string.

### 6. Verify on the live site

Once merged to `main`, CI builds and publishes a new Docker image automatically (see [Deployment](../../developers/deployment.md)); the production server picks it up via its own webhook shortly after. Check the position's page and the "join us" listing (and its focused-project page, if `pc` is set) once the new deploy is live.

---

## Scenario A — Marking a position as filled

When a candidate is hired, don't delete the file — update it in place so it becomes the public record of the position. In both the `-en.md` and `-fr.md` files, set at minimum:

```yaml
filled: true
researcher:
  name: "Firstname Lastname"
  email: "firstname.lastname@institution.fr" # optional
```

As soon as `researcher` is filled in, the page automatically switches from the "apply now" view to the ongoing-research view, and the position moves out of the open listing into the "Ongoing" section of its `pc` project page (if any). It's worth adding the rest of the picture in the same PR if you have the information:

```yaml
supervisors:
  - name: "Supervisor Name"
    org: "Institution — Team"
    role: "director" # optional
funding: "EDT" # or "external" (e.g. CIFRE)
host: "Institution, Team" # optional
startDate: 2025-10-01
expectedEndDate: 2028-10-01 # optional
researchStatus: "ongoing" # planned | ongoing | completed | paused | withdrawn
```

The `requirements`, `contacts`, and apply-now fields are simply ignored once `researcher` is set — there's no need to remove them.

**Checklist for this PR:**

- [ ] `filled: true` set in both `-en.md` and `-fr.md`
- [ ] `researcher.name` set in both files
- [ ] `researchStatus` set (usually `ongoing` at hire time)
- [ ] `startDate` uses `YYYY-MM-DD` format
- [ ] `funding` is exactly `EDT` or `external`

## Scenario B — Updating your own position record

If you're the researcher (or supervisor) behind an already-filled position, you can open the same kind of PR at any point to keep the record current — for example, when a paper comes out, a use case gets linked, your status changes, or your end date shifts.

Fields you're likely to update over time:

```yaml
researchStatus: "completed" # planned | ongoing | completed | paused | withdrawn
expectedEndDate: 2028-10-01
useCases:
  - title: "Use case title"
    ref: "uc05-example-slug" # optional, references src/content/use-cases
    note: "Optional short note"
publications:
  - "2026-yourname-paper-slug" # slug of an entry in src/content/publications
lastUpdated: 2026-09-04 # bump this whenever you edit the record
```

You don't need to touch `title`, `filename`, `pc`, `type`, or `location` — those are set once and belong to the editor/hiring process. If any of those need to change (e.g. you moved host institutions), mention it in the PR description so a reviewer can double check the project page still makes sense.

**Checklist for this PR:**

- [ ] Only the fields you intend to change are touched
- [ ] Both `-en.md` and `-fr.md` updated the same way
- [ ] Dates use `YYYY-MM-DD`
- [ ] `lastUpdated` bumped to today's date
- [ ] `publications`/`useCases` entries reference slugs that actually exist in the repo

---

## Field reference (quick)

| Field | Values | Notes |
| --- | --- | --- |
| `filled` | `true` / `false` | Flip to `true` at hire time |
| `researcher.name` / `researcher.email` | free text / email | Presence of `researcher` is what switches the page view |
| `researchStatus` | `planned` \| `ongoing` \| `completed` \| `paused` \| `withdrawn` | |
| `funding` | `EDT` \| `external` | |
| `startDate` / `expectedEndDate` / `lastUpdated` | `YYYY-MM-DD` | |
| `publications` | array of publication slugs | must reference existing `src/content/publications` entries |
| `useCases` | array of `{ title, ref?, note? }` | `ref` must reference an existing `src/content/use-cases` slug |

See `src/content.config.ts` for the authoritative schema, and the [Positions Guide](positions-guide.md) for full context on every field.

## Troubleshooting

- **CI fails with a schema/validation error**: usually an enum typo (e.g. `funding: External` instead of `funding: external`) or a bad date format. The check output names the file and field.
- **English and French pages look out of sync**: make sure you edited both `-en.md` and `-fr.md` in the same PR — the site does not fall back from one language to the other.
- **The position doesn't show on its project page**: confirm `pc` is set correctly (`PC1`–`PC5`) in both files.
- **Not sure who can merge your PR**: tag an editor/maintainer in the PR description, or see [Contributing](../../../CONTRIBUTING.md).

## Related docs

- [Positions Guide](positions-guide.md) — full frontmatter reference and content writing guidelines
- [Editor Workflow Guide](../workflow-guide.md) — general branch/PR/release process
- [CI/CD Setup](../../developers/ci-cd-setup.md) — what runs automatically on your PR
