# Analytics Integration Guide

Matomo tracking is a single component: [`src/components/MatomoAnalytics.astro`](../../src/components/MatomoAnalytics.astro), included unconditionally in `<head>` by [`src/layouts/BaseLayout.astro`](../../src/layouts/BaseLayout.astro) (`<MatomoAnalytics />`). No other analytics code exists in the repo.

```astro
---
const matomoUrl = import.meta.env.MATOMO_URL || "https://edtlab.fr/matomo/";
const matomoSiteId = import.meta.env.MATOMO_SITE_ID || "1";
---

<script is:inline define:vars={{ matomoUrl, matomoSiteId }}>
  if (window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")) {
    console.log("Matomo tracking disabled on localhost");
  } else {
    var _paq = (window._paq = window._paq || []);
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);
    _paq.push(["setDoNotTrack", "false"]);
    _paq.push(["disableCookies"]);
    _paq.push(["enableHeartBeatTimer", "15"]);
    (function () {
      var u = matomoUrl;
      _paq.push(["setTrackerUrl", u + "matomo.php"]);
      _paq.push(["setSiteId", matomoSiteId]);
      var d = document, g = d.createElement("script"), s = d.getElementsByTagName("script")[0];
      g.async = true;
      g.src = u + "matomo.js";
      s.parentNode.insertBefore(g, s);
    })();
  }
</script>
```

## Configuration

| Variable | Default | Source |
| --- | --- | --- |
| `MATOMO_URL` | `https://edtlab.fr/matomo/` | `.env` — keep the trailing slash |
| `MATOMO_SITE_ID` | `"1"` | `.env` |

Everything else is fixed in code, not env-driven: DNT is always sent as `"false"`, cookies are always disabled, heartbeat is always 15s. GDPR compliance rests entirely on cookies being disabled — there is no cookie-consent UI and none is needed while that stays true.

## Local testing

The script no-ops (just a `console.log`) whenever the page is served from `localhost`/`127.0.0.1` — `npm run dev` on `localhost:4321` never sends events. To test against a real Matomo instance, serve the dev server through a non-localhost hostname (e.g. an `/etc/hosts` entry), or temporarily comment out the guard.

Running a Matomo instance: [local dev](matomo-setup.md) / [production](../deployment/matomo-setup.md). Partytown status: [partytown-setup.md](partytown-setup.md).

## Custom events

No wrapper API — push directly onto the global array, guarding for the localhost no-op:

```javascript
if (window._paq) {
  window._paq.push(["trackEvent", "Category", "Action", "Name", value]);
}
```

Nothing currently does this beyond the automatic page view — search for `_paq` before assuming an interaction is already tracked.
