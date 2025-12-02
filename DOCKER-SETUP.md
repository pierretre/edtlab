# Docker Setup - EDT Research Website

## Service URLs

### Production Mode (default)
- 🌐 **Website**: http://localhost:80 (Nginx serving static files)
- 🔌 **API**: http://localhost:8080 (PHP backend for contact form)
- 📊 **Matomo Analytics**: http://localhost:4002  
- 🗄️ **MySQL Database**: localhost:4003

### Development Mode
- 🌐 **Website**: http://localhost:4321 (Astro dev server with hot reload)
- 🔌 **API**: http://localhost:8080 (PHP backend for contact form)
- 📊 **Matomo Analytics**: http://localhost:4002  
- 🗄️ **MySQL Database**: localhost:4003

## Docker Commands

### Start All Services (Production)
```bash
docker-compose --profile prod up -d
```

This starts: Website (Nginx), API (PHP), Matomo, and Matomo DB

### Start All Services (Development)
```bash
docker-compose --profile dev up -d
```

This starts: Astro dev server, API (PHP), Matomo, and Matomo DB

**Note**: All services are now in a single `docker-compose.yml` file. Use `--profile prod` or `--profile dev` to control which environment to run.

### Start Individual Services

```bash
# Production mode
docker-compose --profile prod up -d website
docker-compose up -d api
docker-compose up -d matomo
docker-compose up -d matomo-db

# Development mode
docker-compose --profile dev up -d astro
docker-compose up -d api
docker-compose up -d matomo
docker-compose up -d matomo-db
```

### Management Commands

```bash
# Check status
docker-compose ps

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f website
docker-compose logs -f api
docker-compose logs -f matomo
docker-compose logs -f matomo-db

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v

# Rebuild a service
docker-compose build website
```

## Environment Files

All environment variables are now consolidated into single files per environment:

- `.env.development` - Development configuration (Matomo, API, Site settings)
- `.env.production` - Production configuration (Matomo, API, Site settings)
- `.env.example` - Template file with all available variables

**Setup:**
1. Copy `.env.example` to `.env.production` or `.env.development`
2. Fill in your actual values (API keys, passwords, URLs)
3. Never commit actual `.env` files to version control

## Development Workflow

1. **Start development**: `docker-compose --profile dev up -d`
2. **Code**: Edit files normally, hot reload works at http://localhost:4321
3. **API**: Available at http://localhost:8080
4. **Analytics**: Configure Matomo at http://localhost:4002
5. **Stop**: `docker-compose down`

## Production Workflow

1. **Start production**: `docker-compose --profile prod up -d`
2. **Access**: Website at http://localhost:80, API at http://localhost:8080, Matomo at http://localhost:4002
3. **Stop**: `docker-compose down`

## Individual Service Control

```bash
# Start only what you need
docker-compose up -d website          # Just the website
docker-compose up -d api              # Just the API
docker-compose up -d matomo-db        # Just the database  
docker-compose up -d matomo           # Matomo + database

# Stop specific services
docker-compose stop website
docker-compose stop api
docker-compose stop matomo
docker-compose stop matomo-db
```

## Quick Reference

- **Production**: `docker-compose --profile prod up -d`
- **Development**: `docker-compose --profile dev up -d`
- **Website only (prod)**: `docker-compose --profile prod up -d website`
- **Astro dev only**: `docker-compose --profile dev up -d astro`
- **API only**: `docker-compose up -d api`
- **Matomo only**: `docker-compose up -d matomo matomo-db`
- **Check status**: `docker-compose ps`
- **View logs**: `docker-compose logs -f [service-name]`
- **Stop all**: `docker-compose down`

## Port Mapping Summary

**Production (actual deployment):**
- Website: Host port 4001 → Container port 80 (Nginx serving static files)
- API: Host port 4004 → Container port 8080 (PHP backend)
- Matomo: Host port 4002 → Container port 80
- MySQL: Host port 4003 → Container port 3306

**Note**: In production, Nginx reverse proxy routes:
- `https://edtlab.fr/` → `http://127.0.0.1:4001` (website)
- `https://edtlab.fr/api/` → `http://127.0.0.1:4004/` (API)
- `https://edtlab.fr/matomo/` → `http://127.0.0.1:4002/` (Matomo)

**Development (local):**
- Astro: Host port 4321 → Container port 4321 (Astro dev server with hot reload)
- API: Host port 8080 → Container port 8080 (PHP backend)
- Matomo: Host port 4002 → Container port 80
- MySQL: Host port 4003 → Container port 3306