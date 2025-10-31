# Local Testing Guide for Matomo Analytics

This guide explains how to test the Matomo analytics integration locally using Docker.

## Prerequisites

- Docker and Docker Compose installed
- Node.js and npm installed
- Git repository cloned locally

## Quick Start for Local Testing

### 1. Set Up Local Matomo Instance

First, create a local environment file for Matomo:

```bash
# Copy the example environment file
cp .env.matomo.example .env.matomo.local

# Edit the local configuration
nano .env.matomo.local
```

Update `.env.matomo.local` with local settings:

```env
# Local Matomo Database Configuration
MYSQL_ROOT_PASSWORD=local_root_password
MYSQL_DATABASE=matomo_local
MYSQL_USER=matomo_local
MYSQL_PASSWORD=local_matomo_password

# Local Matomo Configuration
MATOMO_URL=http://localhost:8080
MATOMO_SITE_ID=1
MATOMO_AUTH_TOKEN=

# Anonymous Analytics Settings
MATOMO_RESPECT_DNT=1
MATOMO_ANONYMIZE_IP=1
MATOMO_DISABLE_COOKIES=1

# Development mode enabled
MATOMO_DEV_MODE=1
```

### 2. Start Matomo Services

Use the deployment script to start Matomo locally:

```bash
# Make the script executable (if not already)
chmod +x scripts/deploy-matomo.sh

# Deploy Matomo locally
./scripts/deploy-matomo.sh deploy
```

Or manually with Docker Compose:

```bash
# Load environment variables
source .env.matomo.local

# Start services
docker-compose -f docker-compose.matomo.yml up -d
```

### 3. Configure Matomo

1. **Access Matomo**: Open http://localhost:8080 in your browser

2. **Complete Installation Wizard**:
   - Database Server: `matomo-mysql`
   - Login: `matomo_local`
   - Password: `local_matomo_password`
   - Database Name: `matomo_local`

3. **Create Admin User**:
   - Choose username and password
   - Email address for admin

4. **Add Website**:
   - Website Name: `EDT Research Website (Local)`
   - Website URL: `http://localhost:4321`
   - Timezone: Your local timezone

5. **Configure Anonymous Analytics**:
   - Go to Administration → Privacy → Anonymize Data
   - Enable "Anonymize IP addresses"
   - Set "Anonymize IP addresses" to 2 bytes (recommended)
   - Go to Administration → Privacy → GDPR
   - Enable "Force tracking without cookies"

6. **Get Site ID and Auth Token**:
   - Note the Site ID (usually 1 for first site)
   - Go to Administration → Personal → Security
   - Create new auth token and copy it

### 4. Configure Website Environment

Create a local environment file for the website:

```bash
# Create local environment file
cp .env.example .env.local
```

Update `.env.local` with your Matomo configuration:

```env
# Matomo Analytics Configuration
MATOMO_URL=http://localhost:8080
MATOMO_SITE_ID=1
MATOMO_AUTH_TOKEN=your_auth_token_here

# Anonymous Analytics Settings
MATOMO_RESPECT_DNT=1
MATOMO_ANONYMIZE_IP=1
MATOMO_DISABLE_COOKIES=1

# Development Settings (enable analytics in development)
MATOMO_DEV_MODE=1

# Site Configuration
SITE_URL=http://localhost:4321
SITE_NAME="EDT Research Program (Local)"

# Build Configuration
NODE_ENV=development
```

### 5. Start the Website

```bash
# Install dependencies
npm install

# Start development server with local environment
npm run dev
```

The website will be available at http://localhost:4321

## Testing Analytics

### 1. Verify Analytics Loading

1. Open your website at http://localhost:4321
2. Open browser developer tools (F12)
3. Go to Network tab
4. Look for requests to `localhost:8080/matomo.js` and `localhost:8080/matomo.php`
5. Check Console tab for any Matomo-related messages

### 2. Test Analytics Events

Navigate through your website and perform these actions:

- **Page Views**: Visit different pages
- **Downloads**: Click on PDF or document links
- **External Links**: Click on external links
- **Language Switching**: Switch between English and French
- **Job Applications**: Click on job-related links
- **Search**: Use any search functionality

### 3. Verify Data in Matomo

1. Go to http://localhost:8080
2. Login to your Matomo dashboard
3. Check the following reports:
   - **Visitors → Overview**: See real-time visitors
   - **Actions → Pages**: See page views
   - **Actions → Downloads**: See file downloads
   - **Actions → Outlinks**: See external link clicks
   - **Visitors → Locations**: See geographic data (anonymized)
   - **Actions → Events**: See custom events

### 4. Test Anonymous Analytics

Verify that no personal data is collected:

1. **Check Cookies**: 
   - Open browser developer tools
   - Go to Application/Storage tab
   - Check that no Matomo cookies are set

2. **Verify IP Anonymization**:
   - In Matomo, go to Visitors → Visitor Log
   - Check that IP addresses are anonymized (e.g., 192.168.1.xxx)

3. **Test Do Not Track**:
   - Enable "Do Not Track" in your browser settings
   - Visit the website
   - Verify that no tracking occurs in Matomo

## Troubleshooting

### Common Issues

1. **Matomo not loading**:
   ```bash
   # Check container status
   docker-compose -f docker-compose.matomo.yml ps
   
   # Check logs
   docker-compose -f docker-compose.matomo.yml logs matomo
   ```

2. **Database connection issues**:
   ```bash
   # Check MySQL logs
   docker-compose -f docker-compose.matomo.yml logs matomo-db
   
   # Test database connection
   docker exec matomo-mysql mysql -u matomo_local -p matomo_local -e "SELECT 1"
   ```

3. **Analytics not tracking**:
   - Verify `MATOMO_DEV_MODE=1` in your environment
   - Check browser console for JavaScript errors
   - Ensure Matomo URL is accessible from your browser

4. **CORS issues**:
   - Make sure Matomo is configured to accept requests from localhost:4321
   - Check Matomo's trusted hosts configuration

### Debug Mode

Enable debug mode for detailed logging:

```bash
# Add to .env.local
MATOMO_DEV_MODE=1
DEBUG=1
```

### Reset Local Setup

To start fresh:

```bash
# Stop and remove containers
docker-compose -f docker-compose.matomo.yml down -v

# Remove volumes
docker volume prune -f

# Start again
./scripts/deploy-matomo.sh deploy
```

## Testing Checklist

- [ ] Matomo containers are running
- [ ] Matomo web interface is accessible
- [ ] Website loads without errors
- [ ] Analytics script loads in browser
- [ ] Page views are tracked in Matomo
- [ ] Custom events are tracked (downloads, external links)
- [ ] No cookies are set by Matomo
- [ ] IP addresses are anonymized in visitor logs
- [ ] Do Not Track is respected
- [ ] Legal mentions are displayed in footer

## Production Deployment Notes

When moving to production:

1. **Update Environment Variables**:
   - Change `MATOMO_URL` to your production domain
   - Set `MATOMO_DEV_MODE=0`
   - Use strong passwords for database

2. **SSL Configuration**:
   - Set up proper SSL certificates
   - Update Nginx configuration for HTTPS

3. **Security**:
   - Change default passwords
   - Restrict database access
   - Configure firewall rules

4. **Monitoring**:
   - Set up log monitoring
   - Configure backup procedures
   - Monitor container health

## Useful Commands

```bash
# View Matomo logs
docker-compose -f docker-compose.matomo.yml logs -f matomo

# Access Matomo container
docker exec -it matomo-app bash

# Access MySQL container
docker exec -it matomo-mysql mysql -u root -p

# Backup Matomo data
./scripts/deploy-matomo.sh backup

# Check service status
./scripts/deploy-matomo.sh status

# Stop services
./scripts/deploy-matomo.sh stop

# Restart services
./scripts/deploy-matomo.sh restart
```

## Next Steps

After successful local testing:

1. Set up production Matomo instance
2. Configure proper domain and SSL
3. Update website environment variables
4. Deploy to production
5. Monitor analytics data collection
6. Set up regular backups

For production deployment, refer to the main [Matomo Setup Guide](./matomo-setup.md).