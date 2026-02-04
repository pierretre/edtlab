# EDT Lab API - Node.js Backend

TypeScript-based backend service for EDT Lab website providing:
- Contact form email handling via Brevo
- OAuth authentication for Decap CMS (GitHub)
- Rate limiting and security features

## Project Structure

```
src/api-node/
├── index.ts                 # Main server entry point
├── services/
│   ├── auth.service.ts      # OAuth authentication logic
│   ├── callback.service.ts  # OAuth callback handling
│   └── mail.service.ts      # Email sending via Brevo
├── utils/
│   └── rate-limit.ts        # Rate limiting utilities
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Prerequisites
- Node.js >= 18.0.0
- npm

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file with:
```env
# Server
PORT=8080
APP_ENV=development

# GitHub OAuth (for Decap CMS)
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_REPO_PRIVATE=0

# Brevo Email
BREVO_API_KEY=your_brevo_api_key
SENDER_EMAIL=contact@edtlab.fr
SENDER_NAME=EDT Research Program
LIST_INBOX=recipient@example.com
```

### Run Development Server
```bash
npm run dev
```

The server will start on `http://localhost:8080` with auto-reload on file changes.

### Run Production Server
```bash
npm start
```

### Type Checking
```bash
npm run type-check
```

### Build (optional)
```bash
npm run build
```

## API Endpoints

### Health Check
```
GET /health
```
Returns server status.

### OAuth Authentication (Decap CMS)
```
GET /auth?provider=github
```
Initiates GitHub OAuth flow for Decap CMS.

```
GET /callback?provider=github&code=...
```
Handles OAuth callback and returns token to CMS.

### Contact Form
```
POST /
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "general",
  "message": "Hello...",
  "privacy": true,
  "organization": "Optional Org"
}
```

## Docker

### Development
```bash
docker build -f Dockerfile.dev -t edtlab-api:dev .
docker run -p 8080:8080 --env-file .env edtlab-api:dev
```

### Production
```bash
docker build -f Dockerfile -t edtlab-api:prod .
docker run -p 8080:8080 --env-file .env edtlab-api:prod
```

## Technologies

- **TypeScript** - Type-safe JavaScript
- **Express** - Web framework
- **tsx** - TypeScript execution engine
- **Brevo** - Email service
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
