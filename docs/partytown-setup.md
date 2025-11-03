# Partytown Integration for Matomo Analytics

This document explains how Partytown is configured to run Matomo analytics scripts in a web worker, improving main thread performance.

## Overview

Partytown is a library that allows third-party scripts to run in a web worker, keeping them off the main thread. This improves page performance by preventing analytics scripts from blocking the main thread execution.

## Configuration

### Astro Configuration

Partytown is configured in `astro.config.mjs`:

```javascript
import partytown from "@astrojs/partytown";

export default defineConfig({
  integrations: [
    // ... other integrations
    partytown({
      config: {
        // Forward events to the main thread
        forward: ['dataLayer.push'],
        // Debug mode (disable in production)
        debug: false
      }
    })
  ]
});
```

### Matomo Analytics Component

The `MatomoAnalytics.astro` component has been updated to use Partytown:

1. **Main Thread Script**: Initializes `_paq` array and configures basic tracking settings
2. **Partytown Script**: Loads the actual Matomo script in a web worker using `type="text/partytown"`

## Benefits

- **Improved Performance**: Analytics scripts run in a web worker, not blocking the main thread
- **Better User Experience**: Page interactions remain responsive while analytics load
- **Maintained Functionality**: All Matomo features continue to work as expected

## Environment Variables

The following environment variables control Matomo configuration:

- `MATOMO_URL`: Matomo server URL (default: "http://localhost:8080")
- `MATOMO_SITE_ID`: Site ID in Matomo (default: "1")
- `MATOMO_ENABLE_COOKIES`: Enable cookies (default: false for GDPR compliance)
- `MATOMO_RESPECT_DNT`: Respect Do Not Track headers (default: true)
- `MATOMO_ENABLE_HEARTBEAT`: Enable heartbeat timer (default: false)
- `MATOMO_HEARTBEAT_TIMER`: Heartbeat timer interval in seconds (default: 15)

## Files Generated

When building the site, Partytown generates the following files in `dist/~partytown/`:

- `partytown.js` - Main Partytown library
- `partytown-sw.js` - Service worker for Partytown
- `partytown-atomics.js` - SharedArrayBuffer support
- `partytown-media.js` - Media-related functionality

## Browser Support

Partytown requires modern browser features:

- Web Workers
- Service Workers (for some features)
- SharedArrayBuffer (for optimal performance)

For browsers that don't support these features, scripts will fall back to running on the main thread.

## Debugging

To enable debug mode for development:

1. Set `debug: true` in the Partytown config
2. Check browser console for Partytown-related messages
3. Use browser dev tools to monitor web worker activity

## Performance Impact

With Partytown:
- Main thread blocking time is reduced
- Page load performance improves
- User interactions remain responsive
- Analytics data collection continues normally

The trade-off is slightly increased complexity in the analytics setup, but the performance benefits typically outweigh this cost.