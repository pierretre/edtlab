# Brevo Email API Integration

This guide explains the PHP Contact API implementation using Brevo (formerly Sendinblue) for handling contact form submissions.

---

## Overview

The EDT website uses a lightweight PHP API with the built-in PHP server to handle contact form submissions via Brevo's transactional email service. The API is containerized with Docker and runs alongside the Astro website.

---

## Project Structure

```
src/api/
├── index.php           # Main API endpoint
├── composer.json       # PHP dependencies (Brevo SDK)
├── Dockerfile          # Docker configuration
└── .dockerignore       # Files to exclude from Docker build
```

---

## API Implementation

### Dependencies

The API uses the official Brevo PHP SDK:

```json
{
  "require": {
    "getbrevo/brevo-php": "^1.0",
    "guzzlehttp/guzzle": "^7.0"
  }
}
```

### Endpoint

**URL**: `http://localhost:8080/` (development) or `http://your-domain:8080/` (production)

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
PUBLIC_API_URL=http://localhost:8080
```

**Variables:**
- `BREVO_API_KEY`: Your Brevo API key for sending emails
- `LIST_INBOX`: Recipient email address (where contact form submissions are sent)
- `SENDER_EMAIL`: Email address used as the sender (must be verified in Brevo)
- `SENDER_NAME`: Display name for the sender
- `PUBLIC_API_URL`: API endpoint URL for the contact form (exposed to frontend)

**Environment-specific URLs:**
- **Development**: `http://localhost:8080`
- **Production**: `https://edtlab.fr/api` (or your production API URL)

### Getting a Brevo API Key

1. Sign up at [Brevo](https://www.brevo.com/)
2. Go to **Settings** → **SMTP & API** → **API Keys**
3. Create a new API key with transactional email permissions
4. Copy the key to your environment file

---

## Docker Configuration

### Dockerfile

The API uses PHP 8.2 CLI with the built-in web server:

```dockerfile
FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    zip unzip git curl libzip-dev \
    && docker-php-ext-install zip

WORKDIR /var/www/html

# Copy application files
COPY . .

# Install Composer and dependencies
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

EXPOSE 8080

# Start PHP built-in server
CMD ["php", "-S", "0.0.0.0:8080", "-t", "."]
```

### Running with Docker Compose

**Development:**
```bash
docker-compose --profile dev up -d
```

**Production:**
```bash
docker-compose --profile prod up -d
```

The API service is shared between both environments and runs on port 8080.

---

## Testing the API

### Using curl

```bash
curl -X POST http://localhost:8080/ \
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

## Security Considerations

1. **CORS**: Configure CORS headers in production to restrict API access
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Input Validation**: All inputs are validated and sanitized
4. **Environment Variables**: Never commit `.env` files with real API keys
5. **HTTPS**: Always use HTTPS in production

---

## Troubleshooting

### Container not starting

Check logs:
```bash
docker-compose logs -f api
```

### Composer dependencies not installed

Rebuild the container:
```bash
docker-compose build api
docker-compose up -d api
```

### Brevo API errors

1. Verify your API key is correct
2. Check your Brevo account status
3. Ensure you have transactional email credits
4. Verify the sender email is authorized in Brevo

### Port conflicts

If port 8080 is already in use, modify `docker-compose.yml`:
```yaml
api:
  ports:
    - "8081:8080"  # Change host port
```

---

## Development Tips

### Hot Reload

In development mode, the API code is mounted as a volume for hot reload:

```yaml
volumes:
  - ./src/api:/var/www/html
  - /var/www/html/vendor  # Preserve vendor directory
```

Changes to `index.php` will be reflected immediately without rebuilding.

### Testing Locally

You can test the API without Docker:

```bash
cd src/api
composer install
export BREVO_API_KEY="your_key"
export LIST_INBOX="your_email"
php -S localhost:8080
```

---

## Production Deployment

1. **Set environment variables** in `.env.production`
2. **Configure reverse proxy** (Nginx/Apache) to forward `/api` requests
3. **Enable HTTPS** with SSL certificates
4. **Set up monitoring** for API health and email delivery
5. **Configure backup** email addresses in Brevo dashboard

### Nginx Reverse Proxy Example

```nginx
location /api/ {
    proxy_pass http://localhost:8080/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

---

## Integration with Astro Frontend

The contact form in the Astro frontend should POST to the API endpoint using the `PUBLIC_API_URL` environment variable:

```javascript
// Access the API URL from environment variables
const apiUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080';

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
