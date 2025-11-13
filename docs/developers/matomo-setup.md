# Matomo Analytics Setup Guide

This guide explains how to set up and configure Matomo analytics for the EDT Research Website with Docker deployment and GDPR compliance.

## Overview

The EDT website integrates Matomo analytics for anonymous data collection to track:
- User behavior and engagement metrics (anonymized)
- Geographic distribution of visitors (anonymized)
- Language preference tracking
- Content performance analytics
- Actionable interactions (downloads, job applications, etc.)

**Important**: This implementation uses cookieless analytics with full IP anonymization. No personal data is collected or stored, and no cookie consent is required.

## Prerequisites

- Docker and Docker Compose installed
- Domain name for Matomo instance (e.g., `analytics.yourdomain.com`)
- SSL certificate for HTTPS (recommended: Let's Encrypt)

## Local Testing

Before deploying to production, you can test the Matomo integration locally. See the [Local Testing Guide](./local-testing-guide.md) for detailed instructions on setting up and testing Matomo analytics in your local development environment.

## Quick Start

### 1. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.matomo.example .env.matomo
```

Edit `.env.matomo` with your specific values:

```env
# Database Configuration
MYSQL_ROOT_PASSWORD=your_secure_root_password
MYSQL_DATABASE=matomo
MYSQL_USER=matomo
MYSQL_PASSWORD=your_secure_matomo_password

# Matomo Configuration
MATOMO_URL=https://analytics.yourdomain.com
MATOMO_SITE_ID=1
MATOMO_AUTH_TOKEN=your_auth_token_here

# Anonymous Analytics (No cookies)
MATOMO_RESPECT_DNT=1
MATOMO_ANONYMIZE_IP=1
MATOMO_DISABLE_COOKIES=1
```

### 2. SSL Certificate Setup

Create SSL certificates for your Matomo domain:

```bash
# Create SSL directory
mkdir -p nginx/ssl

# Using Let's Encrypt (recommended)
certbot certonly --standalone -d analytics.yourdomain.com

# Copy certificates
cp /etc/letsencrypt/live/analytics.yourdomain.com/fullchain.pem nginx/ssl/matomo.crt
cp /etc/letsencrypt/live/analytics.yourdomain.com/privkey.pem nginx/ssl/matomo.key
```

### 3. Deploy Matomo

Start the Matomo stack:

```bash
# Load environment variables
source .env.matomo

# Start services
docker-compose -f docker-compose.matomo.yml up -d
```

### 4. Initial Matomo Configuration

1. Access your Matomo instance at `https://analytics.yourdomain.com`
2. Complete the installation wizard:
   - Database: Use the MySQL container settings from your `.env.matomo`
   - Create admin user
   - Add your website (EDT Research Website)
3. Configure anonymous analytics settings:
   - Go to Administration → Privacy → Anonymize Data
   - Enable IP anonymization (required)
   - Disable cookies for anonymous tracking
   - Set data retention policies (recommended: 6 months)

### 5. Website Integration

The Matomo tracking is automatically integrated into the website through:

- `src/components/MatomoAnalytics.astro` - Main tracking component
- `src/components/CookieConsent.astro` - GDPR-compliant consent management
- Environment variables in your deployment

## Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MATOMO_URL` | Matomo instance URL | `https://analytics.yourdomain.com` |
| `MATOMO_SITE_ID` | Site ID in Matomo | `1` |
| `MATOMO_AUTH_TOKEN` | API authentication token | Required for API access |
| `MATOMO_RESPECT_DNT` | Respect Do Not Track headers | `1` (enabled) |
| `MATOMO_ANONYMIZE_IP` | Anonymize visitor IP addresses | `1` (enabled) |
| `MATOMO_DEV_MODE` | Enable tracking in development | `0` (disabled) |

### Custom Tracking Events

The integration automatically tracks:

- **Page Views**: All page visits with language context
- **Downloads**: PDF, DOC, ZIP file downloads
- **External Links**: Outbound link clicks
- **Job Applications**: Career-related link interactions
- **Contact Forms**: Form submissions
- **Search Queries**: Site search usage
- **Language Switching**: Language preference changes
- **Content Engagement**: Time on page, scroll depth
- **Geographic Data**: Visitor location (anonymized)

### Manual Event Tracking

Use the global `matomoTrack` object for custom events:

```javascript
// Track custom event
window.matomoTrack.trackEvent('Category', 'Action', 'Name', 'Value');

// Track download
window.matomoTrack.trackDownload('/path/to/file.pdf', 'filename.pdf');

// Track outbound link
window.matomoTrack.trackOutboundLink('https://external-site.com', 'outbound');

// Track site search
window.matomoTrack.trackSiteSearch('search term', 'category', 10);

// Track goal conversion
window.matomoTrack.trackGoal(1, 100);
```

## GDPR Compliance

### Cookie Consent Management

The website implements a comprehensive cookie consent system:

1. **Banner Display**: Shows on first visit
2. **Granular Control**: Users can accept/reject analytics cookies
3. **Persistent Storage**: Remembers user preferences
4. **Easy Access**: Preferences can be changed anytime

### Data Privacy Features

- **IP Anonymization**: Last octet of IP addresses removed
- **Do Not Track**: Respects browser DNT headers
- **Cookie-less Tracking**: Option for cookieless analytics
- **Data Retention**: Configurable data retention periods
- **User Rights**: Easy data deletion and opt-out

### Privacy Policy Integration

Ensure your privacy policy covers:
- What data is collected
- How data is used
- Data retention periods
- User rights and controls
- Contact information for privacy concerns

## Monitoring and Maintenance

### Health Checks

Monitor your Matomo deployment:

```bash
# Check container status
docker-compose -f docker-compose.matomo.yml ps

# View logs
docker-compose -f docker-compose.matomo.yml logs matomo
docker-compose -f docker-compose.matomo.yml logs matomo-db

# Check database connectivity
docker exec matomo-mysql mysql -u matomo -p matomo -e "SELECT 1"
```

### Backup Strategy

Regular backups are essential:

```bash
# Database backup
docker exec matomo-mysql mysqldump -u root -p matomo > matomo-backup-$(date +%Y%m%d).sql

# Matomo files backup
docker cp matomo-app:/var/www/html ./matomo-files-backup-$(date +%Y%m%d)
```

### Updates

Keep Matomo updated:

```bash
# Pull latest images
docker-compose -f docker-compose.matomo.yml pull

# Restart with new images
docker-compose -f docker-compose.matomo.yml up -d
```

## Troubleshooting

### Common Issues

1. **Tracking Not Working**
   - Check browser console for JavaScript errors
   - Verify MATOMO_URL is accessible
   - Ensure cookie consent is given

2. **Database Connection Issues**
   - Check MySQL container logs
   - Verify database credentials
   - Ensure containers are on same network

3. **SSL Certificate Problems**
   - Verify certificate files exist and are readable
   - Check certificate expiration
   - Ensure proper nginx configuration

### Debug Mode

Enable debug mode for troubleshooting:

```bash
# Set in .env.matomo
MATOMO_DEV_MODE=1

# Restart containers
docker-compose -f docker-compose.matomo.yml restart
```

## Performance Optimization

### Caching

Configure nginx caching for better performance:

```nginx
# Add to nginx/matomo.conf
location ~* \\.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Database Optimization

Optimize MySQL for Matomo:

```sql
-- Add to MySQL configuration
innodb_buffer_pool_size = 256M
query_cache_size = 32M
query_cache_type = 1
```

## Security Considerations

### Access Control

- Use strong passwords for all accounts
- Enable two-factor authentication
- Restrict admin access by IP if possible
- Regular security updates

### Network Security

- Use HTTPS only
- Configure proper firewall rules
- Regular security scans
- Monitor access logs

## API Integration

### Authentication

Get your API token from Matomo:
1. Go to Administration → Personal → Security
2. Create new auth token
3. Add to `.env.matomo` as `MATOMO_AUTH_TOKEN`

### Common API Calls

```bash
# Get visitor data
curl "https://analytics.yourdomain.com/?module=API&method=VisitsSummary.get&idSite=1&period=day&date=today&format=JSON&token_auth=YOUR_TOKEN"

# Get page URLs
curl "https://analytics.yourdomain.com/?module=API&method=Actions.getPageUrls&idSite=1&period=month&date=today&format=JSON&token_auth=YOUR_TOKEN"
```

## Support

For issues and questions:
- Check Matomo documentation: https://matomo.org/docs/
- Review container logs for errors
- Verify environment configuration
- Test with browser developer tools

## Next Steps

After successful setup:
1. Configure custom dashboards in Matomo
2. Set up automated reports
3. Create custom segments for analysis
4. Integrate with other tools if needed
5. Train team members on analytics usage