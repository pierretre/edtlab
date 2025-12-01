# Matomo Analytics Setup Guide

This guide covers setting up Matomo (formerly Piwik) for the EDT Lab website with proper storage management and log rotation to prevent disk space issues.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation with Docker](#installation-with-docker)
3. [Database Configuration](#database-configuration)
4. [Storage Management](#storage-management)
5. [Log Rotation](#log-rotation)
6. [Backup Strategy](#backup-strategy)
7. [Monitoring](#monitoring)

## Prerequisites

- Docker and Docker Compose installed
- At least 2GB of free disk space (recommended: 10GB+)
- MySQL/MariaDB database
- Domain name with SSL certificate

## Installation with Docker

### 1. Create Docker Compose Configuration

Create a `docker-compose.matomo.yml` file:

```yaml
version: '3.8'

services:
  matomo-db:
    image: mariadb:10.11
    container_name: matomo-db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MATOMO_DB_ROOT_PASSWORD}
      MYSQL_DATABASE: matomo
      MYSQL_USER: matomo
      MYSQL_PASSWORD: ${MATOMO_DB_PASSWORD}
    volumes:
      - matomo-db:/var/lib/mysql
      - ./matomo-db-config.cnf:/etc/mysql/conf.d/matomo.cnf:ro
    ports:
      - "4003:3306"
    networks:
      - matomo-network
    command: --max-allowed-packet=64MB

  matomo:
    image: matomo:5-apache
    container_name: matomo
    restart: unless-stopped
    depends_on:
      - matomo-db
    environment:
      MATOMO_DATABASE_HOST: matomo-db
      MATOMO_DATABASE_ADAPTER: mysql
      MATOMO_DATABASE_TABLES_PREFIX: matomo_
      MATOMO_DATABASE_USERNAME: matomo
      MATOMO_DATABASE_PASSWORD: ${MATOMO_DB_PASSWORD}
      MATOMO_DATABASE_DBNAME: matomo
      PHP_MEMORY_LIMIT: 512M
    volumes:
      - matomo-data:/var/www/html
      - ./matomo-config:/var/www/html/config:rw
      - ./matomo-logs:/var/www/html/tmp:rw
    ports:
      - "4002:80"
    networks:
      - matomo-network

volumes:
  matomo-db:
    driver: local
  matomo-data:
    driver: local

networks:
  matomo-network:
    driver: bridge
```

### 2. Create Database Configuration

Create `matomo-db-config.cnf`:

```ini
[mysqld]
# Performance settings
innodb_buffer_pool_size = 256M
innodb_log_file_size = 64M
max_allowed_packet = 64M

# Log rotation settings
expire_logs_days = 7
max_binlog_size = 100M

# Character set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
```

### 3. Create Environment File

Create `.env.matomo`:

```bash
MATOMO_DB_ROOT_PASSWORD=REDACTED_here
MATOMO_DB_PASSWORD=REDACTED_here
```

### 4. Start Matomo

```bash
docker-compose -f docker-compose.matomo.yml --env-file .env.matomo up -d
```

### 5. Initial Setup

1. Access Matomo at `http://your-server:4002`
2. Follow the installation wizard
3. Configure your first website
4. Copy the tracking code

**Port Configuration:**
- Matomo Web Interface: `http://localhost:4002`
- MariaDB Database: `localhost:4003` (for external connections if needed)

## Database Configuration

### Optimize Database Tables

Create a script `scripts/matomo-optimize-db.sh`:

```bash
#!/bin/bash

# Matomo Database Optimization Script
# Run this weekly via cron

CONTAINER_NAME="matomo-db"
DB_NAME="matomo"
DB_USER="matomo"
DB_PASS="${MATOMO_DB_PASSWORD}"

echo "Starting Matomo database optimization..."

# Optimize all tables
docker exec -i ${CONTAINER_NAME} mysql -u${DB_USER} -p${DB_PASS} ${DB_NAME} <<EOF
OPTIMIZE TABLE matomo_log_visit;
OPTIMIZE TABLE matomo_log_link_visit_action;
OPTIMIZE TABLE matomo_log_conversion;
OPTIMIZE TABLE matomo_log_action;
EOF

echo "Database optimization complete."
```

Make it executable:

```bash
chmod +x scripts/matomo-optimize-db.sh
```

## Storage Management

### 1. Configure Matomo Data Retention

Edit Matomo's `config/config.ini.php` (or via UI: Administration → System → General Settings):

```ini
[General]
; Delete logs older than X days (recommended: 180-365)
delete_logs_older_than = 180

; Enable automatic log deletion
enable_auto_database_size_estimate = 1
enable_delete_old_data_settings_admin = 1

; Archive reports after X days
delete_reports_older_than = 365

; Keep aggregated reports
delete_reports_keep_basic_metrics = 1
delete_reports_keep_day_reports = 1
delete_reports_keep_week_reports = 1
delete_reports_keep_month_reports = 1
delete_reports_keep_year_reports = 1

[Deletelogs]
delete_logs_enable = 1
delete_logs_schedule_lowest_interval = 7
delete_logs_older_than = 180
```

### 2. Create Cleanup Script

Create `scripts/matomo-cleanup.sh`:

```bash
#!/bin/bash

# Matomo Storage Cleanup Script
# Removes old logs and temporary files

MATOMO_CONTAINER="matomo"
MATOMO_PATH="/var/www/html"

echo "Starting Matomo cleanup..."

# Clean temporary files older than 7 days
docker exec ${MATOMO_CONTAINER} find ${MATOMO_PATH}/tmp -type f -mtime +7 -delete

# Clean cache older than 1 day
docker exec ${MATOMO_CONTAINER} find ${MATOMO_PATH}/tmp/cache -type f -mtime +1 -delete

# Clean old session files
docker exec ${MATOMO_CONTAINER} find ${MATOMO_PATH}/tmp/sessions -type f -mtime +1 -delete

# Clean old asset files
docker exec ${MATOMO_CONTAINER} find ${MATOMO_PATH}/tmp/assets -type f -mtime +7 -delete

# Clean old template cache
docker exec ${MATOMO_CONTAINER} find ${MATOMO_PATH}/tmp/templates_c -type f -mtime +7 -delete

echo "Cleanup complete."

# Show disk usage
echo "Current disk usage:"
docker exec ${MATOMO_CONTAINER} du -sh ${MATOMO_PATH}/tmp/*
```

Make it executable:

```bash
chmod +x scripts/matomo-cleanup.sh
```

### 3. Archive Old Data Script

Create `scripts/matomo-archive.sh`:

```bash
#!/bin/bash

# Matomo Archive Processing Script
# Processes and archives analytics data

MATOMO_CONTAINER="matomo"
MATOMO_URL="http://localhost"

echo "Starting Matomo archiving..."

# Run the archive command
docker exec ${MATOMO_CONTAINER} php /var/www/html/console core:archive \
    --url=${MATOMO_URL} \
    --force-all-websites \
    --force-all-periods=315576000 \
    --force-date-last-n=365 \
    --concurrent-requests-per-website=3

echo "Archiving complete."
```

Make it executable:

```bash
chmod +x scripts/matomo-archive.sh
```

## Log Rotation

### 1. Configure Logrotate for Matomo Logs

Create `/etc/logrotate.d/matomo`:

```
/path/to/matomo-logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        docker exec matomo kill -USR1 1 2>/dev/null || true
    endscript
}
```

### 2. Configure Docker Container Logs

Create `/etc/docker/daemon.json` (or update existing):

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3",
    "compress": "true"
  }
}
```

Restart Docker:

```bash
sudo systemctl restart docker
```

### 3. Database Binary Log Rotation

The MariaDB configuration already includes:

```ini
expire_logs_days = 7
max_binlog_size = 100M
```

To manually purge old binary logs:

```bash
docker exec matomo-db mysql -uroot -p${MATOMO_DB_ROOT_PASSWORD} \
    -e "PURGE BINARY LOGS BEFORE DATE(NOW() - INTERVAL 7 DAY);"
```

## Backup Strategy

### 1. Database Backup Script

Create `scripts/matomo-backup.sh`:

```bash
#!/bin/bash

# Matomo Backup Script

BACKUP_DIR="/backups/matomo"
DATE=$(date +%Y%m%d_%H%M%S)
CONTAINER_DB="matomo-db"
CONTAINER_APP="matomo"
DB_NAME="matomo"
DB_USER="root"
DB_PASS="${MATOMO_DB_ROOT_PASSWORD}"
RETENTION_DAYS=30

mkdir -p ${BACKUP_DIR}

echo "Starting Matomo backup..."

# Backup database
echo "Backing up database..."
docker exec ${CONTAINER_DB} mysqldump \
    -u${DB_USER} -p${DB_PASS} \
    --single-transaction \
    --quick \
    --lock-tables=false \
    ${DB_NAME} | gzip > ${BACKUP_DIR}/matomo_db_${DATE}.sql.gz

# Backup configuration
echo "Backing up configuration..."
docker exec ${CONTAINER_APP} tar czf - /var/www/html/config \
    > ${BACKUP_DIR}/matomo_config_${DATE}.tar.gz

# Remove old backups
echo "Removing backups older than ${RETENTION_DAYS} days..."
find ${BACKUP_DIR} -type f -mtime +${RETENTION_DAYS} -delete

echo "Backup complete. Files saved to ${BACKUP_DIR}"
ls -lh ${BACKUP_DIR}/*${DATE}*
```

Make it executable:

```bash
chmod +x scripts/matomo-backup.sh
```

## Monitoring

### 1. Disk Usage Monitoring Script

Create `scripts/matomo-monitor.sh`:

```bash
#!/bin/bash

# Matomo Monitoring Script
# Checks disk usage and sends alerts if needed

THRESHOLD=80
EMAIL="admin@example.com"
MATOMO_CONTAINER="matomo"

# Check disk usage
USAGE=$(docker exec ${MATOMO_CONTAINER} df -h /var/www/html | awk 'NR==2 {print $5}' | sed 's/%//')

if [ ${USAGE} -gt ${THRESHOLD} ]; then
    echo "WARNING: Matomo disk usage is at ${USAGE}%" | \
        mail -s "Matomo Disk Usage Alert" ${EMAIL}
fi

# Check database size
DB_SIZE=$(docker exec matomo-db mysql -uroot -p${MATOMO_DB_ROOT_PASSWORD} \
    -e "SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)' \
    FROM information_schema.TABLES WHERE table_schema='matomo';" -sN)

echo "Database size: ${DB_SIZE} MB"

# Check if database is too large (> 5GB)
if (( $(echo "${DB_SIZE} > 5000" | bc -l) )); then
    echo "WARNING: Database size exceeds 5GB" | \
        mail -s "Matomo Database Size Alert" ${EMAIL}
fi
```

Make it executable:

```bash
chmod +x scripts/matomo-monitor.sh
```

### 2. Setup Cron Jobs

Add to crontab (`crontab -e`):

```cron
# Matomo archiving - every hour
0 * * * * /path/to/scripts/matomo-archive.sh >> /var/log/matomo-archive.log 2>&1

# Matomo cleanup - daily at 2 AM
0 2 * * * /path/to/scripts/matomo-cleanup.sh >> /var/log/matomo-cleanup.log 2>&1

# Database optimization - weekly on Sunday at 3 AM
0 3 * * 0 /path/to/scripts/matomo-optimize-db.sh >> /var/log/matomo-optimize.log 2>&1

# Backup - daily at 4 AM
0 4 * * * /path/to/scripts/matomo-backup.sh >> /var/log/matomo-backup.log 2>&1

# Monitoring - every 6 hours
0 */6 * * * /path/to/scripts/matomo-monitor.sh >> /var/log/matomo-monitor.log 2>&1
```

## Nginx Reverse Proxy Configuration

Create `/etc/nginx/sites-available/matomo`:

```nginx
server {
    listen 443 ssl http2;
    server_name analytics.edtlab.fr;

    ssl_certificate /etc/letsencrypt/live/analytics.edtlab.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/analytics.edtlab.fr/privkey.pem;

    access_log /var/log/nginx/matomo-access.log;
    error_log /var/log/nginx/matomo-error.log;

    location / {
        proxy_pass http://localhost:4002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Increase timeouts for archiving
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}

server {
    listen 80;
    server_name analytics.edtlab.fr;
    return 301 https://$server_name$request_uri;
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/matomo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Integration with Website

Add to your website's `<head>` section:

```html
<!-- Matomo -->
<script>
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://analytics.edtlab.fr/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo Code -->
```

## Troubleshooting

### Check Container Status

```bash
docker-compose -f docker-compose.matomo.yml ps
```

### View Logs

```bash
# Matomo application logs
docker logs matomo -f

# Database logs
docker logs matomo-db -f
```

### Check Disk Usage

```bash
# Container disk usage
docker exec matomo du -sh /var/www/html/*

# Database size
docker exec matomo-db mysql -uroot -p${MATOMO_DB_ROOT_PASSWORD} \
    -e "SELECT table_schema AS 'Database', \
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)' \
    FROM information_schema.TABLES \
    WHERE table_schema='matomo' \
    GROUP BY table_schema;"
```

### Manual Archive Processing

```bash
docker exec matomo php /var/www/html/console core:archive --url=http://localhost
```

## Security Recommendations

1. **Change default passwords** immediately after installation
2. **Enable 2FA** for all admin accounts
3. **Restrict access** to Matomo admin panel by IP if possible
4. **Regular updates**: Keep Matomo and Docker images updated
5. **Use strong passwords** for database and admin accounts
6. **Enable HTTPS** with valid SSL certificates
7. **Regular backups**: Test restore procedures periodically

## Performance Optimization

1. **Enable browser archiving** for better performance
2. **Use Redis** for session storage (optional)
3. **Configure PHP opcache** for faster execution
4. **Optimize MySQL** settings based on available RAM
5. **Use CDN** for serving matomo.js if high traffic

## Additional Resources

- [Matomo Official Documentation](https://matomo.org/docs/)
- [Matomo System Requirements](https://matomo.org/docs/requirements/)
- [Matomo Performance Optimization](https://matomo.org/docs/optimize-how-to/)
- [Docker Hub - Matomo](https://hub.docker.com/_/matomo)
