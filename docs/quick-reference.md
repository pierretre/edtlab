# Quick Reference Card

A handy reference for content editors working on the EDT Research Website.

## Content Types Quick Reference

### Pages (`src/content/pages/`)

```yaml
---
title: "Page Title"
href: "page-slug" # deprecated
lang: "en" # or "fr"
description: "SEO description"
toc: true # or false
lastModified: 2024-01-01 # optional
template: "new" # optional
---
```

### Publications (`src/content/publications/`)

```yaml
---
title: "Publication Title"
authors: ["Author 1", "Author 2"]
type: "journal" # journal|conference|book|report
year: 2024
venue: "Journal Name" # optional
doi: "10.1000/182" # optional
url: "https://..." # optional
---
```

### Events (`src/content/news/`)

```yaml
---
title: "Event Title"
date: 2024-06-15
newsType: "event" 
location: "City, Country" # optional
description: "Brief description"
url: "https://..." # optional
lang: "en" # or "fr"
---
```

### Positions (`src/content/positions/`)

```yaml
---
title: "Position Title"
type: "postdoc" # PostDoc|PhD|Engineer|Intern|Others
pc: "PC1" # PC1|PC2|PC3|PC4|PC5, optional — makes it appear on that project's page
location: "City, Country"
filled: false
publishedDate: 2024-01-15
description: "Brief description"
requirements: ["Requirement 1", "Requirement 2"]
tags:
  - "General" # or "Extern", or free-form keywords
lang: "en" # or "fr"
---
```

## File Locations

| Content Type | Location | File Pattern |
|--------------|----------|--------------|
| Pages | `src/content/pages/[section]/` | `en.md`, `fr.md` |
| Publications | `src/content/publications/` | `title-slug.md` |
| News | `src/content/news/` | `event-name-year-en.md` |
| Positions | `src/content/positions/` | `position-type-project-year-en.md` |
| Navigation | `src/content/menu/` | `en.json`, `fr.json` |

## MDX Components

### OptimizedFigure

```mdx
<OptimizedFigure 
  src="image.jpg"
  alt="Descriptive alt text"
  caption="Optional caption"
/>
```

### EventList

```mdx
<EventList 
  limit={5}
  showType={true}
  lang="en"
  filterType="conference"
/>
```

### PublicationList

```mdx
<PublicationList 
  limit={10}
  showFilters={true}
  defaultType="all"
  defaultYear="all"
/>
```

### PositionList

```mdx
<PositionList lang="en" />
```

## Common Tailwind Classes

### Layout

```css
grid md:grid-cols-2 gap-6    /* Two-column grid */
flex items-center justify-between    /* Flex layout */
container mx-auto px-4    /* Centered container */
```

### Spacing

```css
p-4    /* Padding all sides */
m-6    /* Margin all sides */
mt-8   /* Margin top */
mb-4   /* Margin bottom */
```

### Colors (Scampi Theme)

```css
bg-primary-50     /* Light background */
text-primary-700  /* Dark text */
border-primary-500    /* Border color */
```

### Typography

```css
text-lg font-semibold    /* Large, semi-bold text */
text-sm text-gray-600    /* Small, gray text */
```

## Accessibility Checklist

- [ ] All images have descriptive alt text
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Descriptive link text (not "click here")
- [ ] Sufficient color contrast
- [ ] Form labels associated with inputs
- [ ] Keyboard navigation works
- [ ] Content works at 200% zoom

## Date Formats

| Context | Format | Example |
|---------|--------|---------|
| Frontmatter | YYYY-MM-DD | `2024-01-15` |
| Content (English) | Month DD, YYYY | `January 15, 2024` |
| Content (French) | DD month YYYY | `15 janvier 2024` |

## Language Codes

| Language | Code | Example Usage |
|----------|------|---------------|
| English | `en` | `lang: "en"` |
| French | `fr` | `lang: "fr"` |

## Project Codes

| Project | Code | Full Name |
|---------|------|-----------|
| PC1 | `PC1` | Model Hybridization and Management |
| PC2 | `PC2` | Architecture, Composability and Interoperability |
| PC3 | `PC3` | Methodology, Development Life Cycle, and Languages |
| PC4 | `PC4` | Digital Coupling and Gateway |
| PC5 | `PC5` | Human-Digital Twin Interactions |
| General | `General` | Cross-cutting or administrative |

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run astro check
```

## File Extensions

| Extension | Usage |
|-----------|-------|
| `.md` | Standard Markdown content |
| `.mdx` | Markdown with component support |
| `.json` | Data files (menus, configuration) |
| `.astro` | Astro components |

## Validation Rules

### Required Fields by Content Type

**Pages**: `title`, `href`, `lang`  
**Publications**: `title`, `authors`, `type`, `year`  
**Events**: `title`, `date`, `type`, `description`, `lang`  
**Job Offers**: `title`, `project`, `type`, `location`, `deadline`, `publishedDate`, `description`, `requirements`, `lang`  
**Press Releases**: `title`, `date`, `type`, `description`, `lang`

### Enum Values

**Publication Types**: `journal`, `conference`, `book`, `report`  
**Event Types**: `conference`, `workshop`, `seminar`  
**Job Types**: `postdoc`, `phd`, `engineer`, `intern`  
**Projects**: `PC1`, `PC2`, `PC3`, `PC4`, `PC5`, `General`  
**Languages**: `en`, `fr`

## Useful Links

- [Full Documentation](README.md)
- [Style Guide](editors/guidelines/content-style-guide.md)
- [Component Guide](editors/guidelines/component-usage.md)
- [Accessibility Guide](editors/guidelines/accessibility-guide.md)
- [Troubleshooting](troubleshooting-faq.md)
- [Astro Docs](https://docs.astro.build/)
- [Tailwind Docs](https://tailwindcss.com/docs)
