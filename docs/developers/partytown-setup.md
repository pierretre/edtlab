# Partytown Setup

[Partytown](https://partytown.builder.io/) is configured but not in active use — no script on the site runs through it yet.

## Configuration

`astro.config.mjs`:

```javascript
partytown({
  config: {
    forward: ['dataLayer.push', '_paq.push'],
    debug: false
  }
})
```

`forward: ['_paq.push']` is Matomo-specific setup — it proxies `_paq.push(...)` calls made inside the worker back to the real array on the main thread. Confirmed built: `npm run build` produces `dist/client/~partytown/` (`partytown.js`, `partytown-sw.js`, `partytown-atomics.js`, `partytown-media.js`).

## Current state

`src/components/MatomoAnalytics.astro` still loads Matomo as a plain main-thread `<script is:inline>` — no `type="text/partytown"` exists anywhere in the codebase. The worker infrastructure ships in every build without being used.

## To actually move Matomo onto it

1. In `MatomoAnalytics.astro`, keep the `_paq.push([...])` config calls in a main-thread `is:inline` script (they must run before the tracker loads and read `window.location`), but change the script tag that loads `matomo.js` to `type="text/partytown"`.
2. Confirm in dev tools that `matomo.js` loads via the Partytown service worker and that `_paq` events still reach Matomo.
3. Update [Analytics Integration](analytics-integration.md) to match once done.
