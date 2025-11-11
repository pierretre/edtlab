# Docker Setup - EDT Research Website

## Service URLs

### Production Mode (default)
- 🌐 **Website**: http://localhost:80 (Nginx serving static files)
- 📊 **Matomo Analytics**: http://localhost:8080  
- 🗄️ **MySQL Database**: localhost:3306

### Development Mode
- 🌐 **Website**: http://localhost:4321 (Astro dev server with hot reload)
- 📊 **Matomo Analytics**: http://localhost:8080  
- 🗄️ **MySQL Database**: localhost:3306

## Docker Commands

### Start All Services (Production - default)
```bash
docker-compose up -d
```

### Start All Services (Development)
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

### Start Individual Services

```bash
# Production mode
docker-compose up -d website
docker-compose up -d matomo
docker-compose up -d matomo-db

# Development mode
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d website
```

### Management Commands

```bash
# Check status
docker-compose ps

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f website
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

- `.env.dev` - Development configuration
- `.env.production` - Production configuration

## Development Workflow

1. **Start development**: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`
2. **Code**: Edit files normally, hot reload works at http://localhost:4321
3. **Analytics**: Configure Matomo at http://localhost:8080
4. **Stop**: `docker-compose down`

## Production Workflow

1. **Start production**: `docker-compose up -d`
2. **Access**: Website at http://localhost:80, Matomo at http://localhost:8080
3. **Stop**: `docker-compose down`

## Individual Service Control

```bash
# Start only what you need
docker-compose up -d website          # Just the website
docker-compose up -d matomo-db         # Just the database  
docker-compose up -d matomo            # Matomo + database

# Stop specific services
docker-compose stop website
docker-compose stop matomo
docker-compose stop matomo-db
```

## Quick Reference

- **Production**: `docker-compose up -d`
- **Development**: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`
- **Website only**: `docker-compose up -d website`
- **Matomo only**: `docker-compose up -d matomo`
- **Check status**: `docker-compose ps`
- **View logs**: `docker-compose logs -f [service-name]`
- **Stop all**: `docker-compose down`

## Port Mapping Summary

**Production (default):**
- Website: Host port 80 → Container port 80 (Nginx serving static files)
- Matomo: Host port 8080 → Container port 80
- MySQL: Host port 3306 → Container port 3306

**Development (with docker-compose.dev.yml):**
- Website: Host port 4321 → Container port 4321 (Astro dev server with --host)
- Matomo: Host port 8080 → Container port 80
- MySQL: Host port 3306 → Container port 3306