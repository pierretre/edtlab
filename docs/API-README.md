# Contact Form API

The EDT Lab website uses a Node.js API for handling contact form submissions via Brevo's transactional email service.

## Quick Start

### Development
```bash
docker-compose -f docker-compose.dev.yml up -d api-node
```

### Production
```bash
docker-compose up -d api-node
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

**Response (200):**
```json
{
  "success": true
}
```

### GET /health
Health check endpoint

**Response (200):**
```json
{
  "status": "ok",
  "service": "edtlab-api"
}
```

## Features

- ✅ Express.js server with modern Node.js
- ✅ Brevo email integration
- ✅ Rate limiting (60s per IP)
- ✅ CORS protection
- ✅ Security headers (Helmet.js)
- ✅ Input validation and sanitization
- ✅ Health check endpoint
- ✅ Non-root container user
- ✅ Professional HTML email templates

## Environment Variables

```bash
BREVO_API_KEY=your_brevo_api_key
LIST_INBOX=contact@edtlab.fr
SENDER_EMAIL=contact@edtlab.fr
SENDER_NAME=EDT Research Program
APP_ENV=production  # or 'development'
```

## Documentation

- **[Brevo Email Integration](developers/brevo-emails.md)** - Complete API documentation
- **[Deployment Checklist](deployment/DEPLOYMENT-CHECKLIST.md)** - Production deployment guide
- **[Quick Reference](deployment/QUICK-REFERENCE.md)** - Common commands and troubleshooting
- **[API Source Code](../src/api-node/README.md)** - Technical implementation details

## Testing

```bash
# Health check
curl http://localhost:4004/health

# Test contact form
curl -X POST http://localhost:4004/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "general",
    "message": "Test message",
    "privacy": true
  }'

# Run automated tests
cd src/api-node && ./test-api.sh
```

## Architecture

```
Contact Form (Frontend)
    ↓
Node.js API (Express.js)
    ↓
Brevo API
    ↓
Email Delivery
```

## Performance

- Container Size: 180MB
- Memory Usage: ~50MB
- Startup Time: ~1.2s
- Request Time: ~20ms

## Support

For issues or questions:
1. Check logs: `docker logs edtlab_api_node`
2. Test health: `curl http://localhost:4004/health`
3. Review documentation above
