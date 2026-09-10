# Brevo Email API Integration

This guide explains the Astro SSR API implementation using Brevo (formerly Sendinblue) for handling contact form submissions.

---

## Overview

The EDT website uses Astro's server-side rendering (SSR) capabilities to handle contact form submissions via Brevo's transactional email service. The API is integrated directly into the Astro application, eliminating the need for a separate Node.js server.

---

## Architecture

The contact form API is now part of the main Astro application:

```
src/
├── pages/
│   └── api/
│       └── contact.ts      # SSR API endpoint
└── components/
    └── ContactForm.astro   # Contact form component
```

**Benefits:**
- ✅ Simplified architecture (one application instead of two)
- ✅ No CORS configuration needed
- ✅ Better performance (no network overhead)
- ✅ Easier deployment (single container)
- ✅ Unified codebase

---

## API Implementation

### Endpoint

**URL**: `/api/contact`

**Method**: `POST`

**Content-Type**: `application/json`

**Rendering**: Server-side only (`export const prerender = false`)

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

**Rate Limited (429)**:
```json
{
  "error": "Please wait 60 seconds before submitting again.",
  "retry_after": 60
}
```

**Validation Error (400)**:
```json
{
  "error": "Missing required fields"
}
```

**Server Error (500)**:
```json
{
  "error": "Error message"
}
```

---

## Environment Configuration

Environment variables are configured in `.env`:

```bash
# Brevo API Configuration
BREVO_API_KEY=your_brevo_api_key_here
LIST_INBOX=contact@edtlab.fr
SENDER_EMAIL=noreply@edtlab.fr
SENDER_NAME=EDT Research Program
```

**Variables:**
- `BREVO_API_KEY`: Your Brevo API key for sending emails
- `LIST_INBOX`: Recipient email address (where contact form submissions are sent)
- `SENDER_EMAIL`: Email address used as the sender (must be verified in Brevo)
- `SENDER_NAME`: Display name for the sender

**Important**: These variables are now used directly by the Astro application via `import.meta.env`.

### Getting a Brevo API Key

1. Sign up at [Brevo](https://www.brevo.com/)
2. Go to **Settings** → **SMTP & API** → **API Keys**
3. Create a new API key with transactional email permissions
4. Copy the key to your `.env` file

---

## Dependencies

The API uses the official Brevo Node.js SDK:

```json
{
  "dependencies": {
    "@getbrevo/brevo": "^3.0.1"
  }
}
```

Install with:
```bash
npm install @getbrevo/brevo
```

---

## Testing the API

### Using curl

```bash
curl -X POST http://localhost:4321/api/contact \
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

### From the Contact Form

1. Start the dev server: `npm run dev`
2. Navigate to: `http://localhost:4321/en/contact-us`
3. Fill out and submit the form

### Expected Response

**Success**:
```json
{"success":true}
```

**Rate Limited**:
```json
{
  "error": "Please wait 60 seconds before submitting again.",
  "retry_after": 60
}
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
{"error":"Missing required mail configuration"}
```

---

## Email Template

The API sends professionally formatted HTML emails with the following features:

**Subject**: `Contact Form: [Subject Category] - [User Name]`

**From**: `EDT Research Program <noreply@edtlab.fr>` (configurable via `SENDER_EMAIL` and `SENDER_NAME`)

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

1. **Rate Limiting**: Built-in rate limiting to prevent abuse
   - **Client-side**: 60-second cooldown using localStorage
   - **Server-side**: 60-second cooldown per IP address (in-memory)
   - Returns HTTP 429 (Too Many Requests) when rate limit exceeded
   - Automatic cleanup of expired rate limit entries

2. **Input Validation**: All inputs are validated and sanitized
   - Required field validation
   - Email format validation
   - Privacy acceptance validation

3. **Environment Variables**: Never commit `.env` files with real API keys

4. **HTTPS**: Always use HTTPS in production

5. **IP-based Rate Limiting**: Tracks submissions by client IP address
   - Supports `X-Forwarded-For` header for proxy setups
   - Supports `X-Real-IP` header

### Rate Limiting Configuration

**Client-Side (ContactForm.astro):**
```javascript
const COOLDOWN_DURATION = 60000; // 60 seconds in milliseconds
```

**Server-Side (src/pages/api/contact.ts):**
```typescript
const RATE_LIMIT_SECONDS = 60; // 60 seconds
```

**How it works:**
1. Client checks localStorage before allowing form submission
2. Server checks IP-based rate limit in memory
3. If rate limit exceeded, returns HTTP 429 with remaining time
4. Rate limit data is automatically cleaned up after expiration

**Important Note**: Rate limit data is stored in memory and will reset when the server restarts. For production deployments with multiple instances, consider implementing Redis-based rate limiting.

**To adjust rate limits:**
- Change `COOLDOWN_DURATION` in ContactForm.astro for client-side
- Change `RATE_LIMIT_SECONDS` in src/pages/api/contact.ts for server-side
- Recommended: Keep both values synchronized

---

## Docker Configuration

The API is now part of the main Astro application container:

```dockerfile
FROM node:22-alpine

# Build stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache dumb-init
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

USER nodejs
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
```

### Running with Docker Compose

**Local Testing:**
```bash
docker-compose -f docker-compose.local.yml up -d --build
```

**Production:**
```bash
docker-compose up -d
```

The application runs on port 4321 and includes both the website and API.

---

## Troubleshooting

### API not responding

Check if the server is running:
```bash
# Check container logs
docker-compose logs -f web

# Test the endpoint
curl http://localhost:4321/api/contact
```

### Brevo API errors

1. Verify your API key is correct in `.env`
2. Check your Brevo account status
3. Ensure you have transactional email credits
4. Verify the sender email is authorized in Brevo
5. Check server logs for detailed error messages

### Rate limiting issues

1. Rate limits are per IP address
2. Behind a proxy, ensure `X-Forwarded-For` header is set
3. Rate limit data is in-memory and resets on server restart
4. Check client IP detection in logs

### Environment variables not loaded

1. Ensure `.env` file exists in the project root
2. Restart the Docker container after changing `.env`
3. Check that variables are not prefixed with `PUBLIC_` (they shouldn't be for server-side only)

### Email not sending

Check the logs for detailed error messages:
```bash
docker-compose logs -f web | grep "contact form"
```

Common issues:
- Missing `BREVO_API_KEY`
- Missing `LIST_INBOX`
- Sender email not verified in Brevo
- Brevo account suspended or out of credits

---

## Development Tips

### Local Development

Start the dev server:
```bash
npm run dev
```

The API will be available at `http://localhost:4321/api/contact`

### Testing Without Email

To test the API without actually sending emails, you can temporarily modify `src/pages/api/contact.ts` to skip the email sending:

```typescript
// Comment out the email sending
// await sendContactEmail({ name, email, subject, message, privacy, organization });
console.log('Would send email:', { name, email, subject, message });
```

### Hot Reload

In development mode, changes to `src/pages/api/contact.ts` will trigger a rebuild. The dev server will automatically restart.

---

## Production Deployment

1. **Set environment variables** in `.env`
2. **Build the application**: `npm run build`
3. **Configure reverse proxy** (Nginx) to forward requests
4. **Enable HTTPS** with SSL certificates
5. **Set up monitoring** for API health and email delivery

### Nginx Reverse Proxy Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name edtlab.fr www.edtlab.fr;
    
    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/edtlab.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/edtlab.fr/privkey.pem;
    
    # Proxy to Astro Node.js server
    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Important Notes:**
- The API endpoint is accessible at `https://edtlab.fr/api/contact`
- No special `/api/` location block needed - it's handled by Astro
- The `X-Forwarded-For` header is important for rate limiting

---

## Integration with Frontend

The contact form automatically uses the relative API endpoint:

```javascript
// In ContactForm.astro
const apiUrl = "/api/contact";  // Relative URL - no configuration needed

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

**Benefits:**
- No CORS issues (same origin)
- No environment variable configuration needed
- Works in both development and production
- Simpler code

---

## Performance Considerations

### In-Memory Rate Limiting

The current implementation stores rate limit data in memory:
- ✅ Fast and simple
- ✅ No external dependencies
- ❌ Resets on server restart
- ❌ Not shared across multiple instances

For production with multiple instances, consider:
- Redis for shared rate limiting
- Database-backed rate limiting
- External rate limiting service (e.g., Cloudflare)

### Email Sending

Email sending is synchronous and blocks the request. For high-volume scenarios, consider:
- Queue-based email sending (e.g., Bull, BullMQ)
- Background job processing
- Async email service

---

## Additional Resources

- [Brevo API Documentation](https://developers.brevo.com/)
- [Astro SSR Documentation](https://docs.astro.build/en/guides/server-side-rendering/)
- [Astro API Routes](https://docs.astro.build/en/core-concepts/endpoints/)
