# API Quick Reference

## Essential Commands

### Start/Stop

```bash
# Start Node.js API (production)
docker-compose up -d api-node

# Start Node.js API (development)
docker-compose -f docker-compose.dev.yml up -d api-node

# Stop API
docker-compose stop api-node

# Restart API
docker-compose restart api-node

# View logs
docker logs -f edtlab_api_node
```

### Health & Status

```bash
# Health check
curl http://localhost:4004/health

# Container status
docker ps | grep api-node

# Resource usage
docker stats edtlab_api_node

# Inspect container
docker inspect edtlab_api_node
```

### Testing

```bash
# Run test script
cd src/api-node && ./test-api.sh

# Manual test
curl -X POST http://localhost:4004/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"general","message":"Test","privacy":true}'
```

### Debugging

```bash
# View logs (last 100 lines)
docker logs --tail 100 edtlab_api_node

# Follow logs in real-time
docker logs -f edtlab_api_node

# Execute command in container
docker exec edtlab_api_node node -v

# Shell access
docker exec -it edtlab_api_node sh

# Check environment variables
docker exec edtlab_api_node env | grep -E 'BREVO|SENDER|LIST'
```

### Maintenance

```bash
# Rebuild image
docker-compose build api-node

# Pull latest code and rebuild
git pull && docker-compose build api-node

# Clean up old images
docker image prune -f

# View container logs since specific time
docker logs --since 1h edtlab_api_node
```

## API Endpoints

### POST /

Submit contact form

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "organization": "Example Corp",
  "subject": "general",
  "message": "Hello...",
  "privacy": true
}
```

**Success Response (200):**
```json
{
  "success": true
}
```

**Error Responses:**
- `400` - Missing fields or validation error
- `429` - Rate limit exceeded
- `500` - Server error

### GET /health

Health check endpoint

**Response (200):**
```json
{
  "status": "ok",
  "service": "edtlab-api"
}
```

## Environment Variables

```bash
BREVO_API_KEY=your_api_key_here
LIST_INBOX=recipient@example.com
SENDER_EMAIL=contact@edtlab.fr
SENDER_NAME=EDT Research Program
APP_ENV=production  # or 'development'
```

## Port Mapping

| Environment | Host Port | Container Port |
|-------------|-----------|----------------|
| Production  | 4004      | 8080          |
| Development | 4004      | 8080          |

## Common Issues

### Container won't start
```bash
# Check logs
docker logs edtlab_api_node

# Check if port is in use
lsof -i :4004

# Verify environment variables
docker exec edtlab_api_node env
```

### Health check failing
```bash
# Test from inside container
docker exec edtlab_api_node curl http://localhost:8080/health

# Check if app is running
docker exec edtlab_api_node ps aux
```

### Email not sending
```bash
# Check Brevo API key
docker exec edtlab_api_node env | grep BREVO

# Check logs for errors
docker logs edtlab_api_node | grep -i error
```

### Rate limiting issues
Rate limits are stored in memory and automatically expire after 60 seconds. To reset:
```bash
# Restart the container to clear in-memory rate limits
docker-compose restart api-node
```



## Performance Metrics

| Metric | Target | Command |
|--------|--------|---------|
| Response Time | <100ms | `time curl http://localhost:4004/health` |
| Memory Usage | <100MB | `docker stats edtlab_api_node --no-stream` |
| Startup Time | <5s | `docker logs edtlab_api_node` |
| Health Check | 200 OK | `curl -I http://localhost:4004/health` |

## Security Checks

```bash
# Verify non-root user
docker exec edtlab_api_node whoami
# Expected: nodejs

# Check security headers
curl -I http://localhost:4004/health | grep -E 'X-|Content-Security'

# Verify CORS
curl -H "Origin: https://edtlab.fr" -I http://localhost:4004/health | grep Access-Control
```

## Monitoring

```bash
# Watch logs in real-time
docker logs -f edtlab_api_node

# Monitor resource usage
watch -n 1 'docker stats edtlab_api_node --no-stream'

# Check container health
docker inspect edtlab_api_node | grep -A 10 Health

# Count errors in logs
docker logs edtlab_api_node | grep -i error | wc -l
```

## File Locations

| Item | Location |
|------|----------|
| Source Code | `src/api-node/` |
| Dockerfile | `src/api-node/Dockerfile` |
| Package Config | `src/api-node/package.json` |
| Test Script | `src/api-node/test-api.sh` |
| Rate Limit Data | In-memory (automatic cleanup) |

## Useful One-Liners

```bash
# Restart and follow logs
docker-compose restart api-node && docker logs -f edtlab_api_node

# Check if API is responding
curl -f http://localhost:4004/health && echo "✅ API is healthy" || echo "❌ API is down"

# Count requests in last hour
docker logs --since 1h edtlab_api_node | grep "POST /" | wc -l

# Find errors in logs
docker logs edtlab_api_node | grep -i error | tail -20

# Check container uptime
docker inspect edtlab_api_node | grep StartedAt

# Test rate limiting
for i in {1..3}; do curl -X POST http://localhost:4004/ -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","subject":"general","message":"Test","privacy":true}'; echo ""; sleep 1; done
```

## Documentation Links

- [Brevo Email Integration](../developers/brevo-emails.md)
- [Deployment Checklist](DEPLOYMENT-CHECKLIST.md)
- [API README](../../src/api-node/README.md)
- [Docker Setup](../../DOCKER-SETUP.md)

## Support

For issues:
1. Check logs: `docker logs edtlab_api_node`
2. Test health: `curl http://localhost:4004/health`
3. Run tests: `cd src/api-node && ./test-api.sh`
4. Review documentation above

---

**Quick Help:** `docker logs edtlab_api_node | tail -50`
