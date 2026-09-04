# Matomo Setup — Production

For local dev, see [Matomo Setup — Local Development](../developers/matomo-setup.md). For how tracking works in the app, see [Analytics Integration](../developers/analytics-integration.md).

## Services

Two services inside the main `docker-compose.yml`, both bound to `127.0.0.1` only (reached via the host's Nginx, not directly):

```yaml
matomo-db:
  image: mariadb:10.11
  environment:
    MYSQL_ROOT_PASSWORD: ${MATOMO_DB_ROOT_PASSWORD}
    MYSQL_DATABASE: matomo
    MYSQL_USER: matomo
    MYSQL_PASSWORD: ${MATOMO_DB_PASSWORD}
  volumes:
    - /var/www/matomo/db:/var/lib/mysql
  ports:
    - "127.0.0.1:4003:3306"
  command: --max-allowed-packet=64MB

matomo:
  image: matomo:latest
  depends_on:
    matomo-db:
      condition: service_healthy
  environment:
    MATOMO_DATABASE_HOST: matomo-db
    MATOMO_DATABASE_ADAPTER: mysql
    MATOMO_DATABASE_TABLES_PREFIX: matomo_
    MATOMO_DATABASE_USERNAME: matomo
    MATOMO_DATABASE_PASSWORD: ${MATOMO_DB_PASSWORD}
    MATOMO_DATABASE_DBNAME: matomo
    PHP_MEMORY_LIMIT: 512M
  volumes:
    - /var/www/edtlabfr/matomo/data:/var/www/html
    - /var/www/edtlabfr/matomo/config:/var/www/html/config
    - /var/www/edtlabfr/matomo/logs:/var/www/html/tmp
    - ./matomo-apache-config.conf:/etc/apache2/conf-enabled/matomo.conf:ro
  ports:
    - "127.0.0.1:4002:80"
```

Nginx proxies `edtlab.fr/matomo/` → `127.0.0.1:4002` (see [Nginx Configuration](nginx-configuration.md)), matching the default `MATOMO_URL=https://edtlab.fr/matomo/`.

## `.env` (shared with the `web` service — no separate env file)

```bash
MATOMO_URL=https://edtlab.fr/matomo/
MATOMO_SITE_ID=1
MATOMO_DB_ROOT_PASSWORD=<strong random password>
MATOMO_DB_PASSWORD=<strong random password>
```

## First-time setup

1. `matomo-apache-config.conf` is bind-mounted but **not committed to git** (gitignored). It must exist as a file on the server before `docker-compose up`, or Docker mounts an empty directory instead. Its content isn't defined by this repo — for a `/matomo/` sub-path reverse-proxy setup, see [Matomo's reverse-proxy docs](https://matomo.org/faq/how-to-install/faq_98/).
2. `docker-compose up -d matomo-db matomo`
3. Complete the install wizard at `https://edtlab.fr/matomo/`, add the site, note the Site ID; set `MATOMO_SITE_ID` in `.env` and restart `web`.
4. Configure IP anonymization / data retention in the Matomo admin UI (Administration → Privacy) — not set by this repo.

## Note

`matomo-db-config.cnf` (committed at repo root) is not mounted by `matomo-db` — add `- ./matomo-db-config.cnf:/etc/mysql/conf.d/matomo.cnf:ro` if you want it applied.

## Backups

Not automated in this repo. Manual approach:

```bash
docker exec edtlab_matomo-db mysqldump -uroot -p"$MATOMO_DB_ROOT_PASSWORD" --single-transaction matomo | gzip > matomo-backup-$(date +%Y%m%d).sql.gz
tar czf matomo-files-backup-$(date +%Y%m%d).tar.gz /var/www/edtlabfr/matomo/config /var/www/edtlabfr/matomo/data
```

## Troubleshooting

- **Container won't start**: check `matomo-apache-config.conf` is a file, not a directory (`ls -la matomo-apache-config.conf`).
- **No data**: confirm `MATOMO_SITE_ID` matches the Matomo UI and `docker logs edtlab_matomo` is clean (the local-only tracking guard doesn't apply in production).
- **DB connection**: `matomo` waits on `matomo-db`'s healthcheck — `docker-compose ps` to confirm it's healthy.
