# Brevo Email API Integration

This guide explains the Node.js Contact API implementation using Brevo (formerly Sendinblue) for handling contact form submissions.

---

## Overview

The EDT website uses a Node.js API with Express.js to handle contact form submissions via Brevo's transactional email service. The API is containerized with Docker and runs alongside the Astro website.

---

## Project Structure

```
src/api-node/
├── index.js            # Main API server (Express.js)
├── package.json        # Node.js dependencies
├── Dockerfile          # Production container
├── Dockerfile.dev      # Development container
├── .dockerignore       # Files to exclude from Docker build
├── test-api.sh         # API testing script
└── README.md           # API documentation
```

---

## API Implementation

### Dependencies

The API uses the official Brevo Node.js SDK:

```json
{
  "dependencies": {
    "@getbrevo/brevo": "^2.2.0",
    "express": "^4.21.2",
    "helmet": "^8.0.0",
    "cors": "^2.8.5"
  }
}
```

### Endpoint

**URL**: `http://localhost:4004/` (development) or `http://your-domain:4004/` (production)

**Method**: `POST`

**Content-Type**: `application/json`

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "organization": "Company Name",
  "subject": "general",
  "message": "Your message here",
  "privacy": true
}
```

**Required fields:**
- `name` (string): Sender's name
- `email` (string): Sender's email address
- `subject` (string): Subject category (general, collaboration, research, technical, media, other)
- `message` (string): Message content
- `privacy` (boolean): Privacy policy acceptance (must be `true`)

**Optional fields:**
- `organization` (string): Sender's organization

### Response

**Success (200)**:
```json
{
  "success": true
}
```

**Error (400/500)**:
```json
{
  "error": "Error message"
}
```

### Health Check Endpoint

**URL**: `http://localhost:4004/health`

**Method**: `GET`

**Response**:
```json
{
  "status": "ok",
  "service": "edtlab-api"
}
```

---

## Environment Configuration

Environment variables are configured in `.env.development` or `.env.production`:

```bash
# Brevo API Configuration
BREVO_API_KEY=your_brevo_api_key_here
LIST_INBOX=contact@edtlab.fr
SENDER_EMAIL=contact@edtlab.fr
SENDER_NAME=EDT Research Program

# API URL for contact form (used by frontend)
PUBLIC_API_URL=http://localhost:4004

# Application environment
APP_ENV=production  # or 'development'
```

**Variables:**
- `BREVO_API_KEY`: Your Brevo API key for sending emails
- `LIST_INBOX`: Recipient email address (where contact form submissions are sent)
- `SENDER_EMAIL`: Email address used as the sender (must be verified in Brevo)
- `SENDER_NAME`: Display name for the sender
- `PUBLIC_API_URL`: API endpoint URL for the contact form (exposed to frontend)
- `APP_ENV`: Application environment (production/development)

**Environment-specific URLs:**
- **Development**: `http://localhost:4004`
- **Production**: `https://edtlab.fr/api` (or your production API URL)

### Getting a Brevo API Key

1. Sign up at [Brevo](https://www.brevo.com/)
2. Go to **Settings** → **SMTP & API** → **API Keys**
3. Create a new API key with transactional email permissions
4. Copy the key to your environment file

---

## Docker Configuration

### Dockerfile

The API uses Node.js 20 Alpine with a non-root user:

```dockerfile
FROM node:20-alpine

# Create app directory and user
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application files
COPY index.js ./

# Set ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 8080

CMD ["node", "index.js"]
```

### Running with Docker Compose

**Development:**
```bash
docker-compose -f docker-compose.dev.yml up -d api-node
```

**Production:**
```bash
docker-compose up -d api-node
```

The API service runs on port 4004 (host) → 8080 (container).

---

## Testing the API

### Using curl

```bash
curl -X POST http://localhost:4004/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "organization": "Test Org",
    "subject": "general",
    "message": "This is a test message",
    "privacy": true
  }'
```

### Health Check

```bash
curl http://localhost:4004/health
```

### Automated Testing

```bash
cd src/api-node
./test-api.sh
```

### Expected Response

```json
{"success":true}
```

### Common Errors

**Missing required fields (400)**:
```json
{"error":"Missing required fields"}
```

**Privacy not accepted (400)**:
```json
{"error":"Privacy notice must be accepted"}
```

**Brevo API error (500)**:
```json
{"error":"Brevo error message"}
```

---

## Email Template

The API sends professionally formatted HTML emails with the following features:

**Subject**: `Contact Form: [Subject Category] - [User Name]`

**From**: `EDT Research Program <contact@edtlab.fr>` (configurable via `SENDER_EMAIL` and `SENDER_NAME`)

**Reply-To**: User's email address (allows direct reply to the sender)

**Email Content**:
- Professional HTML template with EDT branding (primary color #665BA7)
- Contact information (name, email, organization)
- Subject category and message
- Quick reply template included in the email body
- Responsive design for all email clients

**Quick Reply Feature**:
The email includes two convenient ways to respond:

1. **One-Click Reply Button**: A prominent button that opens the user's default email client with:
   - Pre-filled recipient (user's email)
   - Pre-filled subject line
   - Pre-formatted response template

2. **Manual Reply**: Recipients can also click "Reply" in their email client

**Reply Template**:
```
Dear [User Name],

Thank you for contacting the EDT Research Program. We have received your message regarding [Subject Category].

[Your response here]

Best regards,
EDT Research Team
```

**Subject Categories**:
- `general` → General Inquiry
- `collaboration` → Collaboration
- `research` → Research
- `technical` → Technical Support
- `media` → Media
- `other` → Other

**Important**: The sender email (`SENDER_EMAIL`) must be verified in your Brevo account. The user's email is set as the Reply-To address, allowing you to simply click "Reply" in your email client to respond directly to them.

---

## Security Features

1. **CORS**: Configured with allowed origins
   - Default allowed origins: `localhost:4321`, `localhost:80`, `edtlab.fr`, `www.edtlab.fr`
   - Add additional origins in `index.js` as needed

2. **Rate Limiting**: Built-in rate limiting to prevent abuse
   - **Client-side**: 60-second cooldown using localStorage
   - **Server-side**: 60-second cooldown per IP address
   - Returns HTTP 429 (Too Many Requests) when rate limit exceeded
   - Rate limit data stored in memory with automatic cleanup

3. **Security Headers**: Helmet.js provides:
   - Content Security Policy
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security

4. **Input Validation**: All inputs are validated and sanitized
5. **Environment Variables**: Never commit `.env` files with real API keys
6. **HTTPS**: Always use HTTPS in production
7. **Non-root User**: Container runs as non-root user for security

### CORS Configuration

To add more allowed origins, edit `src/api-node/index.js`:

```javascript
const allowedOrigins = [
  'http://localhost:4321',
  'http://localhost:80',
  'https://edtlab.fr',
  'https://www.edtlab.fr',
  'https://your-custom-domain.com'  // Add your domain here
];
```

### Rate Limiting Configuration

**Client-Side (ContactForm.astro):**
```javascript
const COOLDOWN_DURATION = 60000; // 60 seconds in milliseconds
```

**Server-Side (src/api-node/index.js):**
```javascript
const RATE_LIMIT_WINDOW = 60000; // 60 seconds in milliseconds
```

**How it works:**
1. Client checks localStorage before allowing form submission
2. Server checks IP-based rate limit in memory
3. If rate limit exceeded, returns HTTP 429 with remaining time
4. Rate limit data is automatically cleaned up after expiration

**To adjust rate limits:**
- Change `COOLDOWN_DURATION` in ContactForm.astro for client-side
- Change `RATE_LIMIT_WINDOW` in src/api-node/index.js for server-side
- Recommended: Keep both values synchronized

---

## Troubleshooting

### Container not starting

Check logs:
```bash
docker-compose logs -f api-node
```

### Dependencies not installed

Rebuild the container:
```bash
docker-compose build api-node
docker-compose up -d api-node
```

### Brevo API errors

1. Verify your API key is correct
2. Check your Brevo account status
3. Ensure you have transactional email credits
4. Verify the sender email is authorized in Brevo

### Port conflicts

If port 4004 is already in use, modify `docker-compose.yml`:
```yaml
api-node:
  ports:
    - "4005:8080"  # Change host port
```

### CORS errors in production

If you see CORS errors like "CORS request did not succeed":

1. **Check the API URL**: Ensure `PUBLIC_API_URL` in `.env.production` matches your actual API endpoint
2. **Verify allowed origins**: Add your production domain to `allowedOrigins` in `src/api-node/index.js`
3. **Check reverse proxy**: If using Nginx/Apache, ensure it's properly forwarding requests to the API
4. **Test API directly**: Use curl to verify the API is accessible:
   ```bash
   curl -X POST https://edtlab.fr/api \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","subject":"general","message":"Test","privacy":true}'
   ```
5. **Check browser console**: Look for the exact URL being requested and any additional error details

---

## Development Tips

### Hot Reload

In development mode, the API code is mounted as a volume for hot reload:

```yaml
volumes:
  - ./src/api-node:/app
  - /app/node_modules  # Preserve node_modules
```

Changes to `index.js` will be reflected immediately with nodemon.

### Testing Locally

You can test the API without Docker:

```bash
cd src/api-node
npm install
export BREVO_API_KEY="your_key"
export LIST_INBOX="your_email"
export SENDER_EMAIL="contact@edtlab.fr"
export SENDER_NAME="EDT Research Program"
npm start
```

---

## Production Deployment

1. **Set environment variables** in `.env.production`
2. **Configure reverse proxy** (Nginx/Apache) to forward `/api` requests
3. **Enable HTTPS** with SSL certificates
4. **Set up monitoring** for API health and email delivery
5. **Configure backup** email addresses in Brevo dashboard

### Nginx Reverse Proxy Configuration

The production setup uses a two-tier Nginx configuration:

**1. Root Nginx (Stream Module)** - Routes traffic based on SNI:
```nginx
stream {
  map $ssl_preread_server_name $name {
    hostnames;
    # ... other domains ...
    default 10.0.0.2:4443;  # Routes edtlab.fr to port 4443
  }
  server {
    listen 443;
    proxy_pass $name;
    ssl_preread on;
  }
}
```

**2. Site-Specific Nginx** - Proxies to Docker containers:
```nginx
server {
    server_name edtlab.fr;
    listen 4443 ssl;  # Receives traffic from root nginx
    
    # Main website (Astro static site)
    location / {
        proxy_pass http://127.0.0.1:4001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # Contact API
    location /api/ {
        proxy_pass http://127.0.0.1:4004/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # Note: No auth_basic here to allow public API access
    }
    
    # Matomo Analytics
    location /matomo/ {
        proxy_pass http://127.0.0.1:4002/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

**Docker Port Mapping:**
- Website (Astro): Container port 80 → Host port 4001
- API (Node.js): Container port 8080 → Host port 4004
- Matomo: Container port 80 → Host port 4002
- Matomo DB: Container port 3306 → Host port 4003

**Important Notes:**
- The API endpoint is accessible at `https://edtlab.fr/api`
- The `/api/` location does NOT have `auth_basic` to allow public access
- The trailing slash in `proxy_pass http://127.0.0.1:4004/;` is important - it strips `/api` from the path
- Set `PUBLIC_API_URL=https://edtlab.fr/api` in `.env.production`

---

## Integration with Astro Frontend

The contact form in the Astro frontend should POST to the API endpoint using the `PUBLIC_API_URL` environment variable:

```javascript
// Access the API URL from environment variables
const apiUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:4004';

const response = await fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    organization: formData.organization,
    subject: formData.subject,
    message: formData.message,
    privacy: formData.privacy
  })
});

const result = await response.json();
if (result.success) {
  // Handle success
} else {
  // Handle error
}
```

**Note**: Environment variables prefixed with `PUBLIC_` are automatically exposed to the client-side code in Astro. This allows the same code to work in both development and production environments.

---

## Performance Benefits

The Node.js API provides significant performance improvements:

| Metric | Node.js |
|--------|---------|
| Container Size | 180MB |
| Memory Usage | 50MB |
| Startup Time | 1.2s |
| Request Time | 20ms |

---

## Additional Features

- **Health Check Endpoint**: `/health` for container orchestration
- **Graceful Shutdown**: Proper cleanup on SIGTERM/SIGINT
- **Structured Logging**: Clear, informative logs for debugging
- **Error Handling**: Comprehensive error handling with appropriate status codes
- **Modern JavaScript**: ES6+ features with async/await
