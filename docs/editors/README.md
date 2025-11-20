# Content Templates and Editor Documentation

This directory contains templates and documentation for creating and managing content on the EDT Research Website.

## Quick Start

1. **Choose the appropriate template** from the templates directory based on your content type
2. **Copy the template** to the appropriate location in `src/content/`
3. **Fill in the frontmatter** with your content-specific information
4. **Write your content** using Markdown or MDX syntax
5. **Follow the style guide** for consistent formatting and structure

## Directory Structure

```
docs/editors/
├── README.md                    # This file - overview and quick start
├── templates/                   # Content templates for different types
│   ├── page-basic.md           # Basic page template
│   ├── page-advanced.mdx       # Advanced page with components
│   ├── publication.md          # Publication entry template
│   ├── event.md               # Event entry template
│   ├── press-release.md       # Press release template
│   └── job-offer.md           # Job offer template
└── guidelines/                 # Content creation guidelines
    ├── content-style-guide.md # Writing and formatting guidelines
    ├── frontmatter-reference.md # Complete frontmatter documentation
    ├── component-usage.md     # MDX component usage guide
    └── accessibility-guide.md # Accessibility requirements for content
```

## Content Types

The website supports the following content types:

### Pages (`src/content/pages/`)

- **Basic Pages**: Simple content pages with standard formatting
- **Advanced Pages**: Pages with interactive components and rich media
- **Index Pages**: Landing pages that aggregate other content

### Collections (`src/content/`)

- **Publications**: Research papers, articles, and reports
- **Events**: Conferences, workshops, seminars
- **Press Releases**: News announcements and press coverage
- **Job Offers**: Employment opportunities and positions
- **Menu**: Navigation structure data

## Bilingual Content

All content must be created in both English and French:

- English files: `en.md` or `en.mdx`
- French files: `fr.md` or `fr.mdx`
- Consistent slugs and structure across languages
- Complete translation coverage required

## Getting Help

- **Style Guide**: See [guidelines/content-style-guide.md](guidelines/content-style-guide.md)
- **Frontmatter Reference**: See [guidelines/frontmatter-reference.md](guidelines/frontmatter-reference.md)
- **Component Guide**: See [guidelines/component-usage.md](guidelines/component-usage.md)

## Validation

All content is automatically validated against schemas defined in `src/content/config.ts`. The file `src/content/config.ts` is the authoritative source for frontmatter fields and types — editors should consult it when in doubt. Common validation errors and solutions are documented in the troubleshooting section of each guideline.
