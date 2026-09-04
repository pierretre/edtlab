# Editor Documentation Hub

This directory contains comprehensive documentation for creating and managing content on the EDT Research Website.

## Quick Access

- **⚡ [Workflow Guide](workflow-guide.md)** - Simple process from creation to publication
- **📄 [Pages Guide](how-to/pages-guide.md)** - Complete page creation workflow
- **📋 [Positions Guide](how-to/positions-guide.md)** - Complete position posting workflow (open and ongoing/occupied)
- **🔀 [Positions PR Workflow](how-to/positions-pr-workflow.md)** - Mark a position filled, or update your own record, via pull request
- **📰 [News Guide](how-to/news-guide.md)** - Events and press releases
- **📚 [Publications Guide](how-to/publications-guide.md)** - Research publication management
- **🖼️ [Image Management](guidelines/image-management.md)** - Image storage, optimization, and usage
- **✍️ [Style Guide](guidelines/content-style-guide.md)** - Writing standards
- **⚙️ [Technical Reference](guidelines/frontmatter-reference.md)** - Frontmatter documentation

## Quick Start

1. **New to content creation?** Start with the [Content Style Guide](guidelines/content-style-guide.md)
2. **Need specific instructions?** Check the relevant how-to guide above
3. **Looking for templates?** Browse the templates directory

## Documentation Structure

```
docs/editors/
├── README.md                    # This file - documentation hub
├── how-to/                      # Step-by-step content creation guides
│   ├── positions-guide.md      # Complete position creation guide
│   ├── news-guide.md           # Events and press releases guide
│   └── publications-guide.md   # Research publications guide
├── templates/                   # Content templates for different types
│   ├── page-basic.md           # Basic page template
│   ├── page-advanced.mdx       # Advanced page with components
│   ├── publication.md          # Publication entry template
│   ├── event.md               # Event entry template
│   ├── press-release.md       # Press release template
│   └── position.md             # Position template
└── guidelines/                 # Technical reference and style guides
    ├── content-style-guide.md # Writing and formatting standards
    ├── frontmatter-reference.md # Complete frontmatter documentation
    ├── component-usage.md     # MDX component usage guide
    ├── image-management.md    # Image storage, optimization, and usage
    └── accessibility-guide.md # Accessibility requirements
```

## Content Creation Guides

### 📄 [Pages Guide](how-to/pages-guide.md)

Complete instructions for creating and modifying static content pages:

- Basic vs advanced page types
- File structure and organization
- Frontmatter configuration
- Working with MDX components
- Bilingual content management
- Quality assurance and best practices

### 📋 [Positions Guide](how-to/positions-guide.md)

Complete step-by-step instructions for creating and managing positions, from open recruitment listings through to the ongoing-research record once filled:

- Position types and requirements
- File naming and organization
- Frontmatter configuration
- The `pc` field and how it makes a position appear on its focused project's page
- Writing effective position descriptions
- Bilingual content management
- Marking a position as filled / ongoing research, status updates and promotion
- For the short, PR-focused version of "mark as filled" / "update my own record", see the [Positions PR Workflow](how-to/positions-pr-workflow.md)

### 📰 [News Guide](how-to/news-guide.md)

Comprehensive guide for events and press releases:

- Event announcements and coverage
- Press release creation and distribution
- Image requirements and optimization
- Content promotion strategies
- SEO and social media optimization

### 📚 [Publications Guide](how-to/publications-guide.md)

Detailed instructions for research publication entries:

- Bibliographic information management
- Publication types and categorization
- Project association and tagging
- Academic linking and DOI handling
- Integration with project pages

## Content Types Overview

### Pages (`src/content/pages/`)

Static content pages with standard or advanced formatting, including project descriptions, program information, and resource pages.

### Collections (`src/content/`)

Dynamic content collections that power the website's interactive features:

- **Publications** (`publications/`): Research papers, articles, and reports with filtering and search
- **News** (`news/`): Events and press releases with chronological organization
- **Positions** (`positions/`): Open and occupied/ongoing positions, with status tracking and focused-project association via `pc`
- **Menu** (`menu/`): Navigation structure data for site organization

## Key Requirements

### Bilingual Content

All content must be available in both English and French:

- Use consistent file naming: `{identifier}-{lang}.md`
- Maintain equivalent information across languages
- Adapt cultural context appropriately
- Ensure complete translation coverage

### Content Validation

All content is validated against schemas in `src/content/config.ts`:

- Required fields must be present and correctly formatted
- Enum values must match specified options
- URLs and email addresses are validated
- Date formats must follow YYYY-MM-DD standard

## Getting Started

### For New Editors

1. Read the [Content Style Guide](guidelines/content-style-guide.md) for writing standards
2. Choose the appropriate how-to guide for your content type
3. Use templates as starting points for new content

### For Experienced Editors

- Consult how-to guides for specific workflows
- Reference technical guidelines for advanced features
- Use templates for consistent formatting
- Check migration guides for schema updates

## Technical Resources

- **Schema Reference**: `src/content/config.ts` - Authoritative source for content structure
- **Validation**: Automatic validation during build process
- **Templates**: Pre-configured starting points for each content type
- **Guidelines**: Detailed technical and style requirements

## Support and Troubleshooting

- **Common Issues**: Check troubleshooting sections in each guide
- **Validation Errors**: Consult frontmatter reference and schema documentation
- **Style Questions**: Reference the content style guide
- **Technical Problems**: Review component usage and accessibility guides
