# EDT Research Website

A multilingual research website platform built with Astro.js, featuring anonymous analytics with Matomo integration.

## Features

- 🌍 **Bilingual Support**: English and French content management
- 📊 **Anonymous Analytics**: Cookieless Matomo integration with GDPR compliance
- 🎨 **Modern Design**: Tailwind CSS with Flowbite components
- 📱 **Responsive**: Mobile-first design approach
- 🔍 **SEO Optimized**: Meta tags, structured data, and sitemap generation

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🚀 Quick Start

### Option 1: Docker Development

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd edtlab
   ```

2. **Start development environment**:

   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. **Access the services**:
   - 🌐 **Website**: <http://localhost:4321> (Astro dev server with hot reload)
   - 📊 **Matomo Analytics**: <http://localhost:4002>
   - 🗄️ **MySQL Database**: localhost:4003

### Option 2: Manual Development

If you prefer manual setup without Docker:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run dev:cms`         | Starts dev server + CMS proxy for content editing |
| `npm run proxy`           | Starts CMS proxy server only                     |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📊 Analytics Setup

This website includes anonymous Matomo analytics integration with comprehensive privacy features.

**📖 Complete Setup Guide**: [Analytics Integration Guide](./docs/developers/analytics-integration.md)

## 🌐 Content Management

The website supports bilingual content (English/French) with DecapCMS for easy content editing.

### DecapCMS Admin Interface

**Local Development:**

```bash
npm run dev:cms          # Start Astro + CMS proxy
```

Then access: `http://localhost:4321/admin/`

**Production:** `https://edtlab.fr/admin/` (GitHub OAuth, configured in `public/admin/config.yml`)

### Content Structure

- **Pages** (`src/content/pages/`): Nested structure with bilingual support
- **News** (`src/content/news/`): Events and press releases
- **Positions** (`src/content/positions/`): Open and occupied/ongoing PhD, postdoc, engineer, and intern positions — see [Positions Guide](docs/editors/how-to/positions-guide.md)
- **Publications** (`src/content/publications/`): Research papers and articles
- **Use Cases** (`src/content/use-cases/`)
- **Calendar** (`src/content/calendar/`): Program milestones shown alongside events
- **Newsletter** (`src/content/newsletter/`)
- **Menus** (`src/content/menu/`): Navigation structure (EN/FR)

### Translation Management

- **Content pages** (`.md`/`.mdx` files): Create separate files for each language (e.g., `en.md`, `fr.md`)
- **UI elements** (navigation, buttons, labels): Edit translations in `src/i18n/ui.ts`
- **Menu structure**: Configure in `src/content/menu/en.json` and `src/content/menu/fr.json`

**Note**: For non-markdown page elements like navigation bars, footers, buttons, and other UI components, all translations must be added to `src/i18n/ui.ts`.

## 🔧 Technology Stack

- **Framework**: Astro.js 7.x with TypeScript
- **Styling**: Tailwind CSS + Flowbite components
- **Content**: Astro Content Collections with Zod validation
- **Analytics**: Matomo (cookieless, anonymous)
- **Deployment**: Docker with Docker Compose
- **Fonts**: Marianne (French government typeface)

## 🚀 Production Deployment

The website can be deployed to production using Docker with integrated Matomo analytics.

### Docker Services

- **Website**: Node.js SSR server (`@astrojs/node`, standalone mode), host port 4001 → container port 4321
- **Matomo**: Analytics platform, host port 4002
- **Matomo DB**: MariaDB, host port 4003

A separate host-level Nginx reverse-proxies these to the public domain — see [Nginx Configuration](docs/deployment/nginx-configuration.md).

### Management Commands

```bash
# Check service status
docker-compose ps

# View service logs  
docker-compose logs -f [service]

# Stop services
docker-compose down
```

For the full production install/deploy process, see [Deployment — Install Guide](docs/deployment/install.md) and [Deployment Guide](docs/developers/deployment.md).

## 📈 Analytics & Privacy

This website uses Matomo with cookies disabled at the tracking-script level (see [Analytics Integration](docs/developers/analytics-integration.md)) — no consent banner is shown because no cookie is ever set. IP anonymization and data-retention settings are configured separately, in the Matomo admin UI, not in this codebase.
