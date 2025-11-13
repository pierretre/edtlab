# Analytics Integration Guide

This comprehensive guide covers the complete setup and configuration of Matomo analytics for the EDT Research Website.

## Overview

The website uses Matomo (formerly Piwik) for privacy-focused web analytics. The integration is designed to be GDPR-compliant by default, environment-configurable, and respects user privacy preferences.

## Table of Contents

1. [Environment Configuration](#environment-configuration)
2. [Privacy & GDPR Compliance](#privacy--gdpr-compliance)
3. [Docker Setup](#docker-setup)
4. [Matomo Installation](#matomo-installation)
5. [Component Integration](#component-integration)
6. [Tracking Features](#tracking-features)
7. [Development & Testing](#development--testing)
8. [Production Deployment](#production-deployment)
9. [Troubleshooting](#troubleshooting)
10. [Important Notes](#important-notes)

## Environment Configuration

### Environment Files

Astro reads environment files in priority order:

**Development Mode (`npm run dev`):**

1. `.env.local` (highest priority, not committed)
2. `.env.development.local`
3. `.env.development` ✅ (your main dev config)
4. `.env` (base config)

**Production Mode (`npm run build`):**

1. `.env.local` (highest priority, not committed)
2. `.env.production.local`
3. `.env.production` ✅ (your main prod config)
4. `.env` (base config)

## Required Environment Variables

```bash
# Required
MATOMO_URL=http://localhost:8080
MATOMO_SITE_ID=3
```

## Optional Environment Variables

```bash
# Privacy & Performance Settings
MATOMO_ENABLE_COOKIES=false          # Default: false (GDPR compliant)
MATOMO_RESPECT_DNT=true              # Default: true (respect Do Not Track)
MATOMO_ENABLE_HEARTBEAT=true         # Default: false (accurate time tracking)
MATOMO_HEARTBEAT_TIMER=15            # Default: 15 seconds
```

## Environment File Examples

**Development (`.env.development`):**

```bash
# Development Environment Configuration

# Database Configuration
MYSQL_ROOT_PASSWORD=REDACTED
MYSQL_DATABASE=matomo_dev
MYSQL_USER=matomo_dev
MYSQL_PASSWORD=REDACTED

# Matomo Configuration
MATOMO_PORT=8080

# Matomo Analytics Settings
MATOMO_URL=http://localhost:8080
MATOMO_SITE_ID=3

# Analytics Configuration
MATOMO_ENABLE_COOKIES=false
MATOMO_RESPECT_DNT=true
MATOMO_ENABLE_HEARTBEAT=true
MATOMO_HEARTBEAT_TIMER=15

# Site Configuration
SITE_URL=http://localhost:4321
SITE_NAME="EDT Research Program Dev"
```

**Production (`.env.production`):**

```bash
# Production Environment Configuration

# Matomo Analytics Settings
MATOMO_URL=https://analytics.yourdomain.com
MATOMO_SITE_ID=1

# Analytics Configuration
MATOMO_ENABLE_COOKIES=false
MATOMO_RESPECT_DNT=true
MATOMO_ENABLE_HEARTBEAT=true
MATOMO_HEARTBEAT_TIMER=15

# Site Configuration
SITE_URL=https://yourdomain.com
SITE_NAME="EDT Research Program"
```

## Privacy & GDPR Compliance

### Built-in Privacy Features

The integration includes several privacy-focused features by default:

1. **Cookieless Tracking**: No cookies are used by default
2. **Do Not Track Respect**: Honors browser DNT settings
3. **Anonymous Tracking**: No personally identifiable information is collected
4. **Content Impression Tracking**: Tracks content views without user identification
5. **Conditional Loading**: Only loads when properly configured

### Privacy Configuration

```javascript
// Respect user privacy preferences
_paq.push(['setDoNotTrack', respectDNT]);

// GDPR-compliant cookieless tracking
if (!enableCookies) {
 _paq.push(['disableCookies']);
}

// Performance tracking with heartbeat
if (enableHeartbeat) {
 _paq.push(['enableHeartBeatTimer', heartbeatTimer]);
}
```

## Docker Setup

### Docker Compose Configuration

The project includes a complete Docker setup for Matomo:

```yaml
# docker-compose.dev.yml
services:
 # Matomo Database
 matomo-db:
  image: mysql:8.0
  environment:
   MYSQL_ROOT_PASSWORD: REDACTED
   MYSQL_DATABASE: matomo
   MYSQL_USER: matomo
   MYSQL_PASSWORD: matomo
  volumes:
   - matomo-db-data:/var/lib/mysql
  command: --default-authentication-plugin=mysql_native_password

 # Matomo Analytics
 matomo:
  image: matomo:4-apache
  depends_on:
   - matomo-db
  environment:
   MATOMO_DATABASE_HOST: matomo-db
   MATOMO_DATABASE_ADAPTER: mysql
   MATOMO_DATABASE_TABLES_PREFIX: matomo_
   MATOMO_DATABASE_USERNAME: matomo
   MATOMO_DATABASE_PASSWORD: matomo
   MATOMO_DATABASE_DBNAME: matomo
   MATOMO_GENERAL_SALT: dev_salt_change_in_production_12345678901234567890
   MATOMO_GENERAL_TRUSTED_HOSTS: "localhost,localhost:8080,127.0.0.1,127.0.0.1:8080"
   MATOMO_GENERAL_ENABLE_TRUSTED_HOST_CHECK: 1
   MATOMO_SKIP_BOOTSTRAP: 0
  volumes:
   - matomo-data:/var/www/html
  ports:
   - "8080:80"

volumes:
 matomo-db-data:
 matomo-data:
```

### Starting Matomo

```bash
# Start Matomo and database
docker-compose -f docker-compose.dev.yml up -d matomo matomo-db

# Check status
docker-compose -f docker-compose.dev.yml ps

# View logs
docker-compose -f docker-compose.dev.yml logs matomo
```

## Matomo Installation

### Initial Setup Steps

1. **Start Matomo**: `docker-compose -f docker-compose.dev.yml up -d matomo`
2. **Access Dashboard**: <http://localhost:8080>
3. **Complete Setup**: Follow the Matomo installation wizard
4. **Get Site ID**: Note the Site ID from your Matomo dashboard
5. **Update Environment**: Set `MATOMO_SITE_ID` in your `.env.development`

### Trusted Hosts Configuration

If you encounter trusted hosts errors, the Docker Compose configuration includes:

```yaml
environment:
 MATOMO_GENERAL_TRUSTED_HOSTS: "localhost,localhost:8080,127.0.0.1,127.0.0.1:8080"
```

For additional hosts, update this environment variable.

### Manual Configuration Fix

If needed, you can manually fix trusted hosts:

```bash
# Access container
docker exec -it <matomo-container-name> bash

# Edit config
cd /var/www/html/config
nano config.ini.php

# Add under [General] section:
trusted_hosts[] = "localhost"
trusted_hosts[] = "localhost:8080"
trusted_hosts[] = "127.0.0.1"
trusted_hosts[] = "127.0.0.1:8080"
```

## Component Integration

### MatomoAnalytics Component

The `MatomoAnalytics.astro` component handles all analytics integration:

```astro
---
// Environment-based configuration
const matomoUrl = import.meta.env.MATOMO_URL || 'http://localhost:8080';
const matomoSiteId = import.meta.env.MATOMO_SITE_ID || '1';
const enableCookies = import.meta.env.MATOMO_ENABLE_COOKIES === 'true';
const respectDNT = import.meta.env.MATOMO_RESPECT_DNT !== 'false';
const enableHeartbeat = import.meta.env.MATOMO_ENABLE_HEARTBEAT === 'true';
const heartbeatTimer = parseInt(import.meta.env.MATOMO_HEARTBEAT_TIMER || '15');
const isDev = import.meta.env.DEV;

// Only load Matomo if URL and Site ID are configured
const shouldLoadMatomo = matomoUrl && matomoSiteId;

// Clean URL for script (remove protocol for relative URLs)
const cleanMatomoUrl = matomoUrl.replace(/^https?:/, '');
---

{shouldLoadMatomo && (
 <!-- Matomo Analytics -->
 <script is:inline define:vars={{ 
  matomoUrl: cleanMatomoUrl, 
  matomoSiteId, 
  enableCookies, 
  respectDNT, 
  enableHeartbeat, 
  heartbeatTimer, 
  isDev 
 }}>
  // Privacy-focused Matomo initialization
  // Error handling and development logging
  // Async script loading with callbacks
 </script>
)}
```

### BaseLayout Integration

The component is automatically included in `BaseLayout.astro`:

```astro
<!-- Matomo Analytics Integration -->
<MatomoAnalytics />
```

## Tracking Features

### Automatic Tracking

The integration automatically tracks:

- **Page Views**: All page visits with titles
- **Link Clicks**: External and download links
- **Content Impressions**: Content visibility
- **Performance Timing**: Page load metrics

### Publication System Integration

The publications system includes built-in analytics:

```javascript
// Filter usage tracking
if (window._paq) {
 if (typeValue) {
  window._paq.push(['trackEvent', 'Publications', 'Filter', 'Type: ' + typeValue]);
 }
 if (yearValue) {
  window._paq.push(['trackEvent', 'Publications', 'Filter', 'Year: ' + yearValue]);
 }
 if (searchValue) {
  window._paq.push(['trackSiteSearch', searchValue, 'Publications', visibleCount]);
 }
}

// Publication link clicks
document.querySelectorAll('.publication-link').forEach(link => {
 link.addEventListener('click', function() {
  if (window._paq) {
   const publicationType = this.dataset.publicationType;
   const publicationTitle = this.dataset.publicationTitle;
   window._paq.push(['trackEvent', 'Publications', 'View', `${publicationType}: ${publicationTitle}`]);
  }
 });
});
```

### Custom Event Tracking

You can add custom tracking throughout the application:

```javascript
// Basic event tracking
if (window._paq) {
 window._paq.push(['trackEvent', 'Category', 'Action', 'Name', Value]);
}

// Site search tracking
if (window._paq) {
 window._paq.push(['trackSiteSearch', 'search term', 'category', resultsCount]);
}

// Goal tracking
if (window._paq) {
 window._paq.push(['trackGoal', goalId]);
}
```

## Development & Testing

### Development Features

- **Console Logging**: All analytics calls are logged in development mode
- **Error Handling**: Failed script loads are handled gracefully
- **Conditional Loading**: Only loads when properly configured
- **Debug Information**: Configuration details logged to console

### Testing Analytics

In development mode, check the browser console for:

```javascript
// Configuration logging
Loading Matomo Analytics... {
 matomoUrl: "//localhost:8080",
 matomoSiteId: "3",
 enableCookies: false,
 respectDNT: true,
 enableHeartbeat: true
}

// Event tracking
[Analytics] trackEvent: Publications, Filter, Type: journal
[Analytics] trackSiteSearch: digital twins, Publications, 5
```

### Verification Steps

1. **Check Console**: Look for Matomo initialization messages
2. **Network Tab**: Verify `matomo.js` loads successfully
3. **Matomo Dashboard**: Check real-time visitor reports
4. **Test Events**: Trigger actions and verify in Matomo

## Production Deployment

### Environment Setup

1. **Create Production Environment**:

  ```bash
  # .env.production
  MATOMO_URL=https://analytics.yourdomain.com
  MATOMO_SITE_ID=1
  MATOMO_ENABLE_COOKIES=false
  MATOMO_RESPECT_DNT=true
  ```

2. **SSL Configuration**: Ensure HTTPS for production Matomo
3. **Domain Configuration**: Update trusted hosts for production domain
4. **Security**: Use strong passwords and secure database credentials

### Nginx Configuration

The project includes production-ready Nginx configuration (`nginx/matomo.conf`):

```nginx
server {
  listen 443 ssl http2;
  server_name analytics.yourdomain.com;

  # SSL Configuration
  ssl_certificate /etc/nginx/ssl/matomo.crt;
  ssl_certificate_key /etc/nginx/ssl/matomo.key;
    
  # Security headers
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options nosniff always;
  add_header X-Frame-Options DENY always;
    
  # Proxy to Matomo
  location / {
    proxy_pass http://matomo:80;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Troubleshooting

### Common Issues

1. **Analytics not loading**

- Check `MATOMO_URL` and `MATOMO_SITE_ID` environment variables
- Verify Matomo server is accessible
- Check browser console for error messages

2. **Trusted hosts error**

- Update Docker Compose `MATOMO_GENERAL_TRUSTED_HOSTS`
- Manually edit `config/config.ini.php` in Matomo container
- Restart Matomo container after changes

3. **No data in Matomo**

- Verify site ID matches Matomo dashboard
- Check if Do Not Track is enabled (see Important Notes)
- Ensure JavaScript is enabled in browser

4. **CORS issues**

- Verify Matomo server allows requests from your domain
- Check SSL certificate validity
- Ensure proper proxy configuration

### Debug Steps

1. **Check Environment Variables**:

```javascript
console.log('MATOMO_URL:', import.meta.env.MATOMO_URL);
console.log('MATOMO_SITE_ID:', import.meta.env.MATOMO_SITE_ID);
```

2. **Verify Script Loading**:

- Open browser Network tab
- Look for `matomo.js` request
- Check for 200 status code

3. **Test Matomo Server**:

```bash
curl http://localhost:8080/matomo.php
```

4. **Check Container Logs**:

```bash
docker-compose -f docker-compose.dev.yml logs matomo
```

## Important Notes

### Do Not Track (DNT) Configuration

**⚠️ CRITICAL**: By default, the analytics respects the "Do Not Track" browser setting (`MATOMO_RESPECT_DNT=true`). This means:

- **If users have DNT enabled in their browser, NO analytics data will be collected**
- **To receive analytics data during development/testing, you must either:**

 1. **Disable DNT in your browser** (recommended for testing), OR
 2. **Set `MATOMO_RESPECT_DNT=false` in your environment** (not recommended for production)

### Browser DNT Settings

To disable Do Not Track for testing:

**Chrome/Edge:**

1. Settings → Privacy and security → Cookies and other site data
2. Turn off "Send a 'Do Not Track' request"

**Firefox:**

1. Settings → Privacy & Security
2. Under "Enhanced Tracking Protection", uncheck "Send websites a 'Do Not Track' signal"

**Safari:**

1. Safari → Preferences → Privacy
2. Uncheck "Prevent cross-site tracking"

### Privacy Considerations

- **Production**: Keep `MATOMO_RESPECT_DNT=true` for user privacy
- **Development**: You may temporarily disable DNT for testing
- **GDPR**: The cookieless configuration ensures GDPR compliance
- **User Choice**: Always respect user privacy preferences in production

### Performance Impact

- Analytics script loads asynchronously
- Minimal impact on page load times
- Heartbeat timer can be adjusted based on needs
- Content impression tracking is lightweight

### Security

- Use HTTPS in production
- Configure proper trusted hosts
- Regular Matomo updates
- Secure database credentials
- Monitor access logs

## Files Overview

### Created/Modified Files

- `src/components/MatomoAnalytics.astro` - Main analytics component
- `.env` - Base environment configuration
- `.env.development` - Development environment variables
- `.env.production` - Production environment variables
- `.env.example` - Environment template
- `docker-compose.dev.yml` - Docker configuration with Matomo
- `nginx/matomo.conf` - Production Nginx configuration
- `docs/analytics-integration.md` - This comprehensive guide

### Environment Files Priority

```
.env.local (highest priority, gitignored)
├── .env.development.local (gitignored)
├── .env.development (development)
├── .env.production.local (gitignored)
├── .env.production (production)
└── .env (base configuration)
```

The analytics integration is now fully environment-configurable, privacy-compliant, and ready for production deployment with comprehensive tracking capabilities.
