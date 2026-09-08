# Matomo Setup — Local Development

For production, see [Matomo Setup — Production](../deployment/matomo-setup.md). For how tracking works in the app, see [Analytics Integration](analytics-integration.md).

## Services

Defined in `docker-compose.dev.yml` alongside the `astro` dev container:

```yaml
matomo-db:
  image: mariadb:10.11
  environment:
    MYSQL_ROOT_PASSWORD: ${MATOMO_DB_ROOT_PASSWORD}
    MYSQL_DATABASE: matomo
    MYSQL_USER: matomo
    MYSQL_PASSWORD: ${MATOMO_DB_PASSWORD}
  ports:
    - "0.0.0.0:4003:3306"

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
  volumes:
    - ./matomo-apache-config.conf:/etc/apache2/conf-enabled/matomo.conf:ro
  ports:
    - "0.0.0.0:4002:80"
```

## Steps

1. Copy `.env.example` to `.env` if needed; set `MATOMO_DB_ROOT_PASSWORD` and `MATOMO_DB_PASSWORD` to anything (throwaway local DB).
2. `matomo-apache-config.conf` is bind-mounted but **gitignored** (`matomo*` in `.gitignore`) — if it doesn't exist as a file, Docker creates an empty *directory* there instead and the mount breaks. Ensure it exists: `[ -f matomo-apache-config.conf ] || touch matomo-apache-config.conf`.
3. `docker-compose -f docker-compose.dev.yml up -d matomo matomo-db`
4. Complete the install wizard at <http://localhost:4002>, add the site, note the Site ID.
5. In `.env`: `MATOMO_URL=http://localhost:4002/` and `MATOMO_SITE_ID=<id>`. Restart the dev server.
6. Tracking is disabled on `localhost`/`127.0.0.1` regardless — see [Analytics Integration](analytics-integration.md#local-testing) for the workaround.

## Note

`matomo-db-config.cnf` (MariaDB tuning, committed at repo root) is not mounted by any compose file — add `- ./matomo-db-config.cnf:/etc/mysql/conf.d/matomo.cnf:ro` to `matomo-db` if you want it applied.
