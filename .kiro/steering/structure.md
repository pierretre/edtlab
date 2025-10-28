# Project Structure

## Root Directory
```
/
├── src/                    # Source code
├── public/                 # Static assets
├── .astro/                 # Astro build artifacts
├── node_modules/           # Dependencies
└── package.json           # Project configuration
```

## Source Organization

### Components (`src/components/`)
- **Astro components** with `.astro` extension
- Reusable UI elements: Header, Footer, Navbar, Card
- Specialized components: LanguageToggle, TableOfContents, NewsList

### Content (`src/content/`)
Organized by content type with bilingual structure:
```
content/
├── pages/                  # Main content pages
│   ├── about/              # About pages (en.md, fr.md)
│   ├── contact/            # Contact information (en.md, fr.md)
│   ├── demo-center/        # Demo center (en.md, fr.md)
│   ├── focused-projects/   # Research projects
│   │   ├── fp1/            # Project 1 (en.md, fr.md)
│   │   ├── fp2/            # Project 2 (en.md, fr.md)
│   │   ├── fp3/            # Project 3 (en.md, fr.md)
│   │   ├── fp4/            # Project 4 (en.md, fr.md)
│   │   ├── fp5/            # Project 5 (en.md, fr.md)
│   │   ├── en.md           # Projects index (English)
│   │   └── fr.md           # Projects index (French)
│   ├── join-us/            # Career opportunities (en.md, fr.md)
│   ├── news/               # News events and press releases
│   │   ├── en.mdx          # News index (English)
│   │   └── fr.mdx          # News index (French)
│   ├── production/         # Production and outputs
│   │   ├── publications/   # Publications subsection (en.md, fr.md)
│   │   ├── platform/       # Platform documentation (en.md, fr.md)
│   │   ├── en.md           # Production index (English)
│   │   └── fr.md           # Production index (French)
│   ├── program/            # Program information (en.md, fr.md)
│   └── resources/          # Resources and tools (en.md, fr.md)
├── menu/                   # Navigation menus
│   ├── en.json             # English navigation
│   └── fr.json             # French navigation
├── events/                 # Events collection (separate from pages)
├── job-offers/             # Job offers collection to display in 'join-us' (separate from pages)
└── publications/           # Publications collection (separate from pages)
```

### Current Page Structure
All main pages have been created with bilingual support:

**Core Pages:**
- `/program` - Program information (en.md, fr.md)
- `/focused-projects` - Projects index and individual projects (fp1-fp5)
- `/production` - Production index with publications and platform subsections
    - `/production/publications` - Publications list with filters (en.md, fr.md)
    - `/production/platform` - Platform documentation (en.md, fr.md)
- `/demo-center` - Demo center (en.md, fr.md)
- `/resources` - Resources and tools (en.md, fr.md)
- `/news` - News index with subsections (events, press-releases)
- `/join-us` - Career opportunities (en.md, fr.md)
- `/contact` - Contact information (en.md, fr.md)
- `/about` - About pages (en.md, fr.md)

**Note:** Menu structure discrepancy between English and French versions needs to be resolved for consistency.

### Internationalization (`src/i18n/`)
- `ui.ts` - Translation strings and locale configuration
- Supports `en` (English) and `fr` (French)

### Pages (`src/pages/`)
- `[lang]/` - Dynamic language routing
- `[...slug].astro` - Catch-all for content pages
- `index.astro` - Homepage with language redirect

### Assets (`src/assets/`)
- `fonts/` - Marianne font family files
- `styles/` - Global CSS and Sass files

## Content Conventions

### Frontmatter Schema
All pages content files must include:
```yaml
title: "Page Title"
href: "url-slug"
lang: "en" | "fr"
description: "Optional description"
toc: true/false          # Enable table of contents
```

### File Naming
- Content files: `{lang}.md` or `{lang}.mdx`
- Menu files: `{lang}.json`
- Folders represent content sections/categories

### Bilingual Structure
Every content piece should have both English and French versions with identical slugs but different `lang` values.