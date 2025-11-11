# Publications Management Guide

This guide explains how to add, manage, and organize publications in the EDT Research Website.

## Overview

The publications system automatically generates a filterable list of all research publications. Publications are stored as markdown files in the `src/content/publications/` directory and are automatically displayed on the publications page with filtering capabilities.

The publications pages (`src/content/pages/production/publications/`) use MDX format to enable the integration of the interactive PublicationList component within the content.

## Adding a New Publication

### Step 1: Choose the Right Template

Use the appropriate template from the `templates/` directory:

- `publication-journal-template.md` - For peer-reviewed journal articles
- `publication-conference-template.md` - For conference papers and proceedings
- `publication-book-template.md` - For books, book chapters, and monographs
- `publication-report-template.md` - For technical reports and white papers

### Step 2: Create Publication Files

1. **Copy the template** to `src/content/publications/`
2. **Rename the file** using a descriptive name:
   - Format: `{type}-{short-title}-{year}.md`
   - Examples: 
     - `journal-digital-twin-framework-2024-en.md`
     - `conference-realtime-implementation-2023-fr.md`

3. **Create both language versions** (English and French):
   - English version: `publication-name-en.md`
   - French version: `publication-name-fr.md`

### Step 3: Fill in the Frontmatter

The frontmatter (metadata at the top of the file) must include:

```yaml
---
title: "Publication Title"
authors: ["Author 1", "Author 2", "Author 3"]
type: "journal"  # Must be: journal, conference, book, or report
year: 2024
venue: "Journal/Conference/Publisher Name"  # Optional
doi: "10.1000/xxx"  # Optional
url: "http://edtlab.fr/"  # Optional
---
```

#### Required Fields
- `title`: Full title of the publication
- `authors`: Array of author names
- `type`: One of "journal", "conference", "book", "report"
- `year`: 4-digit publication year

#### Optional Fields
- `venue`: Journal name, conference name, or publisher
- `doi`: Digital Object Identifier
- `url`: Link to the publication online

### Step 4: Write the Content

Write the publication content in markdown format below the frontmatter. Include:

- Abstract or summary
- Main sections appropriate to the publication type
- Proper headings and formatting
- Any relevant figures or tables (as markdown)

## Publication Types and Filtering

The system supports four publication types:

### Journal Articles (`type: "journal"`)
- Peer-reviewed academic journal articles
- Displayed as "Journal Article" (EN) / "Article de Revue" (FR)

### Conference Papers (`type: "conference"`)
- Conference proceedings and presentations
- Displayed as "Conference Paper" (EN) / "Article de Conférence" (FR)

### Books (`type: "book"`)
- Books, book chapters, monographs
- Displayed as "Book" (EN) / "Livre" (FR)

### Technical Reports (`type: "report"`)
- Technical reports, white papers, working papers
- Displayed as "Technical Report" (EN) / "Rapport Technique" (FR)

## Filtering Features

The publications page includes automatic filtering by:

1. **Publication Type**: Filter by journal, conference, book, or report
2. **Publication Year**: Filter by specific years
3. **Search**: Full-text search across titles, authors, and venues
4. **Clear Filters**: Reset all filters to show all publications

## Best Practices

### File Organization
- Use consistent, descriptive file names
- Always create both English and French versions
- Keep files organized in the `src/content/publications/` directory

### Content Quality
- Write clear, informative abstracts
- Use proper academic formatting
- Include all relevant metadata
- Proofread both language versions

### Metadata Consistency
- Use consistent author name formatting across publications
- Include venue information when available
- Add DOI and URL links when possible
- Use accurate publication years

### Bilingual Content
- Ensure both language versions have equivalent content
- Translate titles and abstracts accurately
- Maintain consistent author names across languages
- Use appropriate language-specific formatting

## Troubleshooting

### Publication Not Appearing
1. Check that the file is in `src/content/publications/`
2. Verify the frontmatter syntax is correct
3. Ensure required fields are present
4. Check that the `type` field uses valid values
5. Rebuild the site to see changes

### Filtering Issues
1. Verify the `type` field matches exactly: "journal", "conference", "book", "report"
2. Check that the `year` field is a number, not a string
3. Ensure the `lang` field is either "en" or "fr"

### Display Problems
1. Check markdown formatting in the content
2. Verify that special characters are properly escaped
3. Ensure author names are in array format: `["Name 1", "Name 2"]`

## Example Publication

Here's a complete example of a journal article:

```markdown
---
title: "Advanced Digital Twin Architectures for Smart Manufacturing"
authors: ["Dr. Jane Smith", "Prof. John Doe", "Dr. Marie Dubois"]
type: "journal"
year: 2024
venue: "International Journal of Smart Manufacturing"
doi: "10.1000/smartmfg.2024.001"
url: "http://edtlab.fr/"
lang: "en"
---

# Advanced Digital Twin Architectures for Smart Manufacturing

## Abstract

This paper presents novel architectural approaches for implementing digital twins in smart manufacturing environments, focusing on real-time data integration and predictive analytics capabilities.

## Introduction

Digital twin technology has emerged as a key enabler for Industry 4.0 initiatives...

[Continue with full content]
```

## Technical Implementation

### MDX Integration
The publications pages use MDX (Markdown + JSX) to enable the use of Astro components within content files. This allows the PublicationList component to be embedded directly in the content pages.

### Component Integration
The PublicationList component is imported and used in the publications pages:
```mdx
---
title: "Publications"
href: "production/publications"
lang: "en"
---

import PublicationList from '../../../../components/PublicationList.astro';

# Publications

<PublicationList lang={lang} />
```

### Astro Configuration
The project includes the MDX integration in `astro.config.mjs`:
```javascript
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
  ]
});
```

## Support

For questions about the publications system:
1. Check this documentation first
2. Review the template files for examples
3. Contact the technical team for system issues
4. Consult the main project documentation for general guidelines