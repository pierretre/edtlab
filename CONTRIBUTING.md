# Contributing to the EDT Research Website

Thanks for contributing. This page is a map: find the kind of contribution you want to make below, and follow the link to the dedicated guide. Everything here goes through a pull request on GitHub — nothing is pushed straight to `main`.

## What kind of contribution is this?

| I want to... | Start here |
| --- | --- |
| Mark a job position as filled, or update my own position record after being hired | **[Positions PR Workflow](docs/editors/how-to/positions-pr-workflow.md)** |
| Create or edit a job position listing (new posting, requirements, project association) | [Positions Guide](docs/editors/how-to/positions-guide.md) |
| Add or edit news, events, or press releases | [News Guide](docs/editors/how-to/news-guide.md) |
| Add or edit a research publication entry | [Publications Guide](docs/editors/how-to/publications-guide.md) |
| Create or edit a static page (About, Program, etc.) | [Pages Guide](docs/editors/how-to/pages-guide.md) |
| Understand the general content branch → PR → release process | [Editor Workflow Guide](docs/editors/workflow-guide.md) |
| Follow writing/style conventions | [Content Style Guide](docs/editors/guidelines/content-style-guide.md) |
| Add or optimize images | [Image Management](docs/editors/guidelines/image-management.md) |
| Use custom MDX components in a page | [Component Usage](docs/editors/guidelines/component-usage.md) |
| Meet accessibility (RGAA/WCAG) requirements | [Accessibility Guide](docs/editors/guidelines/accessibility-guide.md) |
| Fix a bug or build a feature in the codebase | [Developer docs](docs/developers/) — see below |
| Change deployment, infrastructure, or hosting | [Deployment docs](docs/deployment/) |

If nothing above fits, the [Documentation Index](docs/README.md) has the full map of `docs/developers/` (technical) vs. `docs/editors/` (content).

## Code and infrastructure contributions

Technical documentation lives in `docs/developers/`:

- [CI/CD Setup](docs/developers/ci-cd-setup.md) — what runs on every PR
- [Deployment](docs/developers/deployment.md) and [Deployment docs](docs/deployment/) — VPS, Docker, Nginx, Matomo
- [Analytics Integration](docs/developers/analytics-integration.md)
- [HAL Publications Sync](docs/developers/hal-publications-sync.md)
- [Newsletter Sending](docs/developers/newsletter-sending.md) / [Brevo Emails](docs/developers/brevo-emails.md)
- [Performance Optimization](docs/developers/performance-optimization.md)
- [Partytown Setup](docs/developers/partytown-setup.md)

### Local setup

```bash
npm install
npm run dev          # dev server at http://localhost:4321
npm run dev:cms      # dev server + CMS proxy for content editing at /admin
```

See the [README](README.md) for the Docker-based setup, and `src/content.config.ts` for the authoritative content schema.

### Before opening a PR

```bash
npm run check   # Astro/TypeScript check
npm run lint     # ESLint
npm run test     # unit tests
npm run build    # production build
```

These are the same checks CI runs on every pull request (see [ci.yml](.github/workflows/ci.yml)); running them locally first saves round-trips on review.

## The general pull request flow

1. **Branch** off `main`. Use a descriptive prefix: `content/...` for content changes, or a short feature/fix name for code.
2. **Make your change** — content in `src/content/`, code anywhere else.
3. **Test locally** — `npm run dev` for content, plus the checks above for code.
4. **Open a pull request** against `main` with a clear description of what changed and why.
5. **Address review feedback.** Once approved and merged, CI builds and publishes a new Docker image automatically; the production server picks it up via its own webhook shortly after (see [Deployment](docs/developers/deployment.md)).

For content changes specifically, this is spelled out step by step in the [Editor Workflow Guide](docs/editors/workflow-guide.md).
