# EDT Lab API - Node.js

Contact form API server for the EDT Lab website, migrated from PHP to Node.js.

## Features

- Contact form email handling via Brevo (formerly Sendinblue)
- Rate limiting (60 seconds between submissions per IP)
- CORS configuration for development and production
- HTML email templates with reply functionality
- Security headers via Helmet
- Health check endpoint

## Environment Variables

Required environment variables:

```bash
BREVO_API_KEY=your_brevo_api_key
LIST_INBOX=recipient@example.com
SENDER_EMAIL=contact@edtlab.fr
SENDER_NAME=EDT Research Program
APP_ENV=production  # or 'development' for dev mode
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Run in production mode
npm start
```

## Docker

```bash
# Build image
docker build -t edtlab-api-node .

# Run container
docker run -p 8080:8080 \
  -e BREVO_API_KEY=your_key \
  -e LIST_INBOX=recipient@example.com \
  -e SENDER_EMAIL=contact@edtlab.fr \
  -e SENDER_NAME="EDT Research Program" \
  -e APP_ENV=production \
  edtlab-api-node
```

## API Endpoints

### POST /

Submit contact form

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "organization": "Example Corp",
  "subject": "general",
  "message": "Hello, I have a question...",
  "privacy": true
}
```

**Subject options:**
- `general` - General Inquiry
- `collaboration` - Collaboration
- `research` - Research
- `technical` - Technical Support
- `media` - Media
- `other` - Other

**Response:**
```json
{
  "success": true
}
```

**Error responses:**
- `400` - Missing required fields or privacy not accepted
- `429` - Rate limit exceeded
- `500` - Server error

### GET /health

Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "service": "edtlab-api"
}
```

## Rate Limiting

- 60 seconds between submissions per IP address
- Rate limit data stored in temporary file
- Old entries (>2 hours) automatically cleaned up

## Security

- Helmet.js for security headers
- CORS with origin whitelist in production
- Input sanitization (HTML escaping)
- Non-root user in Docker container
- Health check for container orchestration

## Migration from PHP

This Node.js implementation is functionally identical to the original PHP version:

- Same API endpoints and request/response format
- Same rate limiting behavior
- Same email template and Brevo integration
- Same CORS and security configuration
- Compatible with existing frontend code

## Dependencies

- `express` - Web framework
- `@getbrevo/brevo` - Brevo API client
- `cors` - CORS middleware
- `helmet` - Security headers middleware

### Security Note

The Brevo SDK (`@getbrevo/brevo`) has some transitive dependencies with known vulnerabilities (form-data, tough-cookie). These are in the SDK's HTTP client layer and are not directly exploitable in our use case since:

1. We don't accept file uploads (form-data vulnerability)
2. We don't parse cookies from untrusted sources (tough-cookie vulnerability)
3. All user input is sanitized before use

The Brevo team is aware of these issues. Monitor for SDK updates and upgrade when available. In the meantime, the API is safe to use as the vulnerabilities don't affect our implementation.
