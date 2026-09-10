# CI/CD Pipeline Documentation

Four GitHub Actions workflows exist, each independent:

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `.github/workflows/ci.yml` | push/PR to `main` | Build & check (below) |
| `.github/workflows/docker-build-publish.yml` | push to `main` | Build & push the production Docker image |
| `.github/workflows/hal-import.yml` | daily cron (`0 3 * * *`) + manual | Refresh HAL publications, commit if changed |
| `.github/workflows/notify-publishers.yml` | PR labeled/opened/synced | Comments on the PR, pinging maintainers when it's labeled `decap-cms/pending_publish` |

## `ci.yml` — Build and Check

One job, `build-and-check`, on `ubuntu-latest` with Node **22.x**:

```yaml
- checkout
- setup-node (22.x, npm cache)
- npm ci
- npm run check          # astro check
- npm run test:ci        # push events only, not PRs
- npm run build
```

That's the entire pipeline — no test matrix, no separate accessibility/route/quality-gate jobs, no coverage upload, no Dependabot config. `npm run test:ci` excludes the spelling test (`vitest --run --exclude src/test/content/spelling.test.ts`).

## `docker-build-publish.yml`

Runs on every push to `main` (not on GitHub Releases). Builds `Dockerfile.prod`, tags the image `latest` and the short commit SHA, pushes both to Docker Hub as `<DOCKER_HUB_USERNAME>/edtlab` using the `DOCKER_HUB_USERNAME`/`DOCKER_HUB_ACCESS_TOKEN` secrets. It does not deploy anything — see [Deployment](deployment.md) for what happens after the image is published.

## Coverage

`vitest.config.ts` sets the global threshold to **70%** for branches/functions/lines/statements — not enforced as a separate CI gate, just fails `npm run test:ci` if unmet.

## Local equivalent

```bash
npm run check
npm run test
npm run build
./scripts/validate-ci.sh   # runs the same checks locally
```
