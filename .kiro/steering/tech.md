# Technology Stack

## Framework & Build System
- **Astro.js 5.x** - Static site generator with component islands architecture
- **Node.js** with ES modules (`"type": "module"`)
- **TypeScript** for type safety

## Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Flowbite** - Component library built on Tailwind
- **Marianne font** - Custom French government typeface
- **Sass** for additional styling capabilities

## Content Management
- **Astro Content Collections** - Type-safe content management
- **MDX** support for interactive markdown content
- **Zod schemas** for content validation

## Internationalization
- **Astro i18n** - Built-in internationalization
- Supports English (`en`) and French (`fr`)
- Prefix-based routing (`/en/`, `/fr/`)

## Common Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build locally

# Astro CLI
npm run astro add    # Add integrations
npm run astro check  # Type checking and validation
```

## Development Notes
- Uses polling for file watching (configured for container environments)
- Content schema enforces bilingual structure with `lang` field