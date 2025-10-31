# EDT Research Website

A multilingual research website platform built with Astro.js, featuring anonymous analytics with Matomo integration.

## Features

- 🌍 **Bilingual Support**: English and French content management
- 📊 **Anonymous Analytics**: Cookieless Matomo integration with GDPR compliance
- ♿ **Accessibility**: RGAA 4.1 AA compliant with screen reader support
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

### Local Development

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd edt-research-website
   npm install
   ```

2. **Set up local development environment** (includes Matomo analytics):
   ```bash
   ./scripts/local-dev.sh setup
   ```

3. **Start development server**:
   ```bash
   ./scripts/local-dev.sh start
   ```

The website will be available at `http://localhost:4321` and Matomo analytics at `http://localhost:8080`.

### Manual Setup

If you prefer manual setup:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📊 Analytics Setup

This website includes anonymous Matomo analytics integration. For detailed setup instructions:

- **Local Testing**: See [Local Testing Guide](./docs/local-testing-guide.md)
- **Production Setup**: See [Matomo Setup Guide](./docs/matomo-setup.md)

### Key Features:
- ✅ **Cookieless tracking** - No cookie consent required
- ✅ **IP anonymization** - Full privacy protection  
- ✅ **GDPR compliant** - Anonymous data collection only
- ✅ **Legal notices** - Clear privacy information in footer

## 📚 Documentation

- [Local Testing Guide](./docs/local-testing-guide.md) - Set up and test locally with Docker
- [Matomo Setup Guide](./docs/matomo-setup.md) - Production analytics deployment
- [Project Structure](./docs/structure.md) - Content organization and conventions
- [Technology Stack](./docs/tech.md) - Framework and tools overview

## 🛠️ Development Scripts

| Script | Description |
|--------|-------------|
| `./scripts/local-dev.sh setup` | Set up complete local development environment |
| `./scripts/local-dev.sh start` | Start website development server |
| `./scripts/local-dev.sh matomo` | Set up Matomo analytics locally |
| `./scripts/local-dev.sh status` | Check service status |
| `./scripts/local-dev.sh stop` | Stop all services |
| `./scripts/local-dev.sh reset` | Reset local environment |

## 🌐 Content Management

The website supports bilingual content (English/French) with:
- Markdown/MDX content files in `src/content/`
- Automatic language routing with `/en/` and `/fr/` prefixes
- Translation strings in `src/i18n/ui.ts`
- Menu configuration in `src/content/menu/`

## 🔧 Technology Stack

- **Framework**: Astro.js 5.x with TypeScript
- **Styling**: Tailwind CSS + Flowbite components
- **Content**: Astro Content Collections with Zod validation
- **Analytics**: Matomo (cookieless, anonymous)
- **Deployment**: Docker with Docker Compose
- **Fonts**: Marianne (French government typeface)

## 📈 Analytics & Privacy

This website uses anonymous analytics to improve user experience:
- No cookies or personal data collection
- IP addresses are anonymized
- Geographic data is aggregated
- Full GDPR compliance without consent banners
- Legal notices in footer explain data usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `./scripts/local-dev.sh`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
