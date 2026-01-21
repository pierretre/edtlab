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

### Option 1: Docker Development (Recommended)

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd edtlab
   ```

2. **Start development environment**:

   ```bash
   docker-compose --profile dev up -d
   ```

3. **Access the services**:
   - 🌐 **Website**: <http://localhost:4321> (Astro dev server with hot reload)
   - 🔌 **API**: <http://localhost:4004> (Node.js backend)
   - 📊 **Matomo Analytics**: <http://localhost:4002>
   - 🗄️ **MySQL Database**: localhost:4003

### Production Mode

For production (static files served by Nginx):

```bash
docker-compose --profile prod up -d
```

- 🌐 **Website**: <http://localhost:80>
- 🔌 **API**: <http://localhost:8080>
- 📊 **Matomo**: <http://localhost:4002>

### Option 2: Manual Development

If you prefer manual setup without Docker:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📊 Analytics Setup

This website includes anonymous Matomo analytics integration with comprehensive privacy features.

**📖 Complete Setup Guide**: [Analytics Integration Guide](./docs/analytics-integration.md)

### Key Features

- ✅ **Environment-configurable** - Easy deployment across environments
- ✅ **Cookieless tracking** - No cookie consent required
- ✅ **IP anonymization** - Full privacy protection  
- ✅ **GDPR compliant** - Anonymous data collection only
- ✅ **Do Not Track respect** - Honors browser privacy settings
- ✅ **Publication tracking** - Automatic research interaction analytics

## 📚 Documentation

- [Analytics Integration Guide](./docs/analytics-integration.md) - Complete Matomo setup and configuration
- [Local Testing Guide](./docs/local-testing-guide.md) - Set up and test locally with Docker
- [Matomo Setup Guide](./docs/matomo-setup.md) - Production analytics deployment
- [Project Structure](./docs/structure.md) - Content organization and conventions
- [Technology Stack](./docs/tech.md) - Framework and tools overview

## 🛠️ Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose --profile prod up -d` | Start production environment |
| `docker-compose --profile dev up -d` | Start development environment |
| `docker-compose ps` | Check service status |
| `docker-compose logs -f` | View service logs |
| `docker-compose down` | Stop all services |
| `docker-compose down -v` | Stop and remove all data |

See [DOCKER-SETUP.md](DOCKER-SETUP.md) for individual service commands.

## 🌐 Content Management

The website supports bilingual content (English/French) with:

- Markdown/MDX content files in `src/content/`
- Automatic language routing with `/en/` and `/fr/` prefixes
- Translation strings in `src/i18n/ui.ts`
- Menu configuration in `src/content/menu/`

### Translation Management

- **Content pages** (`.md`/`.mdx` files): Create separate files for each language (e.g., `en.md`, `fr.md`)
- **UI elements** (navigation, buttons, labels): Edit translations in `src/i18n/ui.ts`
- **Menu structure**: Configure in `src/content/menu/en.json` and `src/content/menu/fr.json`

**Note**: For non-markdown page elements like navigation bars, footers, buttons, and other UI components, all translations must be added to `src/i18n/ui.ts`.

## 🔧 Technology Stack

- **Framework**: Astro.js 5.x with TypeScript
- **Styling**: Tailwind CSS + Flowbite components
- **Content**: Astro Content Collections with Zod validation
- **Analytics**: Matomo (cookieless, anonymous)
- **Deployment**: Docker with Docker Compose
- **Fonts**: Marianne (French government typeface)

## 🚀 Production Deployment

The website can be deployed to production using Docker with integrated Matomo analytics.

### Docker Services

- **Website**: Astro.js static site with Nginx (port 4001)
- **API**: Node.js backend for contact form and email handling (port 4004)
- **Matomo**: Analytics platform with MySQL database (port 4002)
- **Matomo DB**: MariaDB database for Matomo (port 4003)

**Note**: The API is built with Node.js using Express.js.

### Management Commands

```bash
# Check service status
docker-compose ps

# View service logs  
docker-compose logs -f [service]

# Stop services
docker-compose down
```

For detailed Docker commands, see [DOCKER-SETUP.md](DOCKER-SETUP.md).

## 📈 Analytics & Privacy

This website uses anonymous analytics to improve user experience:

- No cookies or personal data collection
- IP addresses are anonymized
- Geographic data is aggregated
- Full GDPR compliance without consent banners
- Legal notices in footer explain data usage

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
