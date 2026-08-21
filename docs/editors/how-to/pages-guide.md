# How to Create and Modify Pages

This guide provides step-by-step instructions for creating, updating, and managing static content pages on the EDT Research Website.

## Quick Start Checklist

- [ ] Identify the page type (basic or advanced)
- [ ] Create both English and French versions
- [ ] Use proper file structure and naming
- [ ] Fill required frontmatter fields
- [ ] Write clear, structured content
- [ ] Add table of contents if needed
- [ ] Test content before publishing
- [ ] Update navigation if necessary

## Page Types Overview

The website supports two main types of pages:

### Basic Pages (.md)

- Simple content with standard markdown
- Text, headings, lists, links, and basic formatting
- No interactive components
- Faster loading and simpler maintenance

### Advanced Pages (.mdx)

- Rich content with interactive components
- Custom components for figures, cards, and layouts
- Dynamic content and enhanced functionality
- More complex but more flexible

## File Structure and Organization

### Location

All pages are stored in: `src/content/pages/`

### Directory Structure

Pages are organized in folders by topic:

```
src/content/pages/
├── about/                  # About pages
│   ├── en.mdx
│   └── fr.mdx
├── program/                # Program information
│   ├── en.mdx
│   ├── fr.mdx
│   └── governance-and-committees/
│       ├── en.mdx
│       └── fr.mdx
├── focused-projects/       # Project pages
│   ├── en.mdx
│   ├── fr.mdx
│   ├── fp1/
│   │   ├── en.mdx
│   │   └── fr.mdx
│   └── fp2/
│       ├── en.mdx
│       └── fr.mdx
└── resources/              # Resources and tools
    ├── en.mdx
    └── fr.md
```

### Naming Conventions

**Main Pages:** `{lang}.md` or `{lang}.mdx`

```
about/en.mdx
about/fr.mdx
program/en.mdx
program/fr.mdx
```

**Sub-pages:** `{section}/{subsection}/{lang}.mdx`

```
program/governance-and-committees/en.mdx
focused-projects/fp1/en.mdx
```

## Step-by-Step Page Creation

### Step 1: Plan Your Page

**Determine Page Type:**

- Use `.md` for simple text content
- Use `.mdx` for pages needing components, figures, or interactive elements

**Plan Content Structure:**

- Outline main sections and headings
- Identify where components might be needed
- Consider table of contents requirements

### Step 2: Create Directory and Files

1. Navigate to `src/content/pages/`
2. Create folder using kebab-case naming
3. Create both language files: `en.md`/`en.mdx` and `fr.md`/`fr.mdx`

### Step 3: Set Up Frontmatter

#### Basic Page Template

```yaml
---
title: "Page Title"
href: "url-slug"
lang: "en" # en | fr
description: "Brief description for SEO and previews"
toc: false # true to enable table of contents
---
```

#### Advanced Page Template

```yaml
---
title: "Page Title"
href: "url-slug"
lang: "en" # en | fr
description: "Brief description for SEO and previews"
toc: true # Often true for complex pages
lastModified: 2024-01-15 # Optional: last update date
color: "#665BA7" # Optional: custom theme color
template: "advanced" # Optional: custom template
---
```

### Step 4: Write Content

#### Basic Markdown Structure

```markdown
# Main Page Title

## Introduction

Brief introduction to the page content and its purpose within the EDT program.

## Main Section

### Subsection

Content with proper heading hierarchy.

## Key Points

- Important point 1
- Important point 2
- Important point 3

## Related Resources

- [Link to related page](/related-page)
- [External resource](https://example.com)
```

#### Advanced MDX Structure

```mdx
---
title: "Advanced Page"
toc: true
---

# Advanced Page Title

## Overview with Visual

<OptimizedFigure
  src={imageFile}
  alt="Descriptive alt text"
  caption="Figure caption explaining the image"
  maxWidth={800}
/>

## Highlighted Information

<OutlinedCard title="Important Notice">
This is highlighted information that stands out from regular content.
</OutlinedCard>

## Regular Content

Continue with standard markdown content...
```

## Frontmatter Field Reference

### Required Fields

#### `title`

- **Purpose**: Page title displayed in navigation and headers
- **Guidelines**:
  - Keep under 60 characters for SEO
  - Use title case
  - Be descriptive and specific
- **Example**: `"The EDT Research Program"`

#### `href`

- **Purpose**: URL slug for the page
- **Guidelines**:
  - Use kebab-case (lowercase with hyphens)
  - Keep short and descriptive
  - Must be unique within the language
  - Should match folder name for consistency
- **Example**: `"focused-projects"`

#### `lang`

- **Options**: `en` or `fr`
- **Purpose**: Language-specific routing and content organization
- **Guidelines**: Must match the content language

### Optional Fields

#### `description`

- **Purpose**: Brief summary for SEO, search results, and social media
- **Guidelines**:
  - Keep between 120-160 characters
  - Include relevant keywords
  - Make it compelling and informative
- **Example**: `"Overview of the EDT research program goals, structure, and focused projects"`

#### `toc`

- **Options**: `true` or `false`
- **Default**: `false`
- **Purpose**: Enable/disable automatic table of contents generation
- **Guidelines**: Use `true` for long pages with multiple sections

#### `lastModified`

- **Format**: YYYY-MM-DD
- **Purpose**: Content freshness indicators and change tracking
- **Guidelines**: Update when making significant content changes

#### `color`

- **Format**: Hex color string
- **Purpose**: Custom theme color for page accents
- **Guidelines**: Use EDT brand colors when possible
- **Example**: `"#665BA7"` (EDT primary color)

#### `illustration`

- **Format**: Image filename
- **Purpose**: Header image for page or social previews
- **Guidelines**: Store in `src/assets/images/` and use descriptive filename

#### `template`

- **Format**: Template name string
- **Purpose**: Override default page rendering
- **Guidelines**: Coordinate with developers for custom templates

## Working with Components (MDX Pages)

### Importing Components

Always import components at the top of your MDX file:

```mdx
---
title: "Page Title"
---

import OptimizedFigure from '@components/OptimizedFigure.astro';
import OutlinedCard from '@components/OutlinedCard.astro';
import ColorTable from '@components/ColorTable.astro';
```

### Available Components

#### OptimizedFigure

For displaying images with responsive sizing and accessibility:

```mdx
import OptimizedFigure from '@components/OptimizedFigure.astro';
import imageFile from '/src/assets/images/diagram.png';

<OptimizedFigure
  src={imageFile}
  alt="EDT program architecture diagram showing five focused projects"
  caption="Figure 1: EDT Research Program Architecture Overview"
  maxWidth={900}
  loading="eager"
/>
```

**Props:**

- `src` (required): Image file import or path
- `alt` (required): Descriptive alt text for accessibility
- `caption` (optional): Caption displayed below image
- `maxWidth` (optional): Maximum width in pixels
- `loading` (optional): "eager" or "lazy" loading

#### OutlinedCard

For highlighting important information:

```mdx
import OutlinedCard from '@components/OutlinedCard.astro';

<OutlinedCard title="Important Update">
The EDT program has received additional funding for 2025 research activities.
</OutlinedCard>
```

**Props:**

- `title` (optional): Card header title
- Content goes between opening and closing tags

#### ColorTable

For displaying color schemes and brand guidelines:

```mdx
import ColorTable from '@components/ColorTable.astro';

<ColorTable lang="en" />
```

**Props:**

- `lang` (required): "en" or "fr" for language-specific content

### Image Management

#### Image Location

Store images in: `src/assets/images/`

#### Image Import

```mdx
import diagramImage from '/src/assets/images/edt-architecture.png';
import photoImage from '/src/assets/images/team-photo.jpg';
```

#### Image Optimization

- Use appropriate formats (JPG for photos, PNG for diagrams)
- Optimize file sizes (aim for under 500KB)
- Use descriptive filenames
- Provide high-resolution images for social sharing

## Content Writing Guidelines

### Structure and Organization

#### Heading Hierarchy

```markdown
# Page Title (H1) - Only one per page
## Main Section (H2)
### Subsection (H3)
#### Detail Level (H4) - Use sparingly
```

#### Content Flow

1. **Introduction**: Brief overview of page purpose
2. **Main Content**: Organized in logical sections
3. **Key Information**: Highlighted using components or formatting
4. **Related Resources**: Links to relevant content
5. **Contact/Next Steps**: Clear calls to action

### Writing Style

#### Tone and Voice

- Professional but accessible
- Clear and concise
- Consistent with EDT program messaging
- Appropriate for academic and industry audiences

#### Technical Content

- Define technical terms on first use
- Provide context for specialized concepts
- Use examples and analogies when helpful
- Link to detailed technical resources

#### Accessibility

- Use descriptive link text
- Provide alt text for all images
- Use proper heading hierarchy
- Ensure sufficient color contrast

## Bilingual Content Management

### Translation Guidelines

#### Content Equivalence

- Ensure both versions convey the same information
- Adapt cultural references appropriately
- Maintain consistent messaging and tone
- Include equivalent examples and resources

#### Technical Considerations

- Use consistent technical terminology
- Adapt URLs and links for language-specific content
- Consider different text lengths in layouts
- Maintain parallel structure across languages

### Common Translation Patterns

#### Academic Terms

- Digital Twin → Jumeau Numérique
- Research Program → Programme de Recherche
- Focused Project → Projet Ciblé
- Cross-cutting Action → Action Transverse

#### Navigation and UI

- About → À Propos
- Contact → Contact
- Resources → Ressources
- Publications → Publications

## Page Modification Workflow

### For Existing Pages

1. **Locate Files**: Find both language versions in `src/content/pages/`
2. **Backup Content**: Consider version control before major changes
3. **Update Content**: Make changes to both language versions
4. **Update Frontmatter**: Modify `lastModified` date if significant changes
5. **Test Locally**: Run development server to preview changes
6. **Validate**: Check for broken links and formatting issues

### For New Sections

1. **Plan Structure**: Determine if new folder is needed
2. **Create Files**: Add both language versions
3. **Update Navigation**: Modify menu files if needed
4. **Cross-Reference**: Add links from related pages
5. **Test Integration**: Ensure proper site navigation

### For Major Restructuring

1. **Plan Changes**: Document current structure and proposed changes
2. **Consider URLs**: Plan for redirects if URLs change
3. **Update References**: Find and update internal links
4. **Coordinate**: Work with developers for complex changes
5. **Test Thoroughly**: Validate all affected pages and navigation

## Quality Assurance Checklist

### Content Quality

- [ ] Both language versions created and equivalent
- [ ] All required frontmatter fields completed
- [ ] Proper heading hierarchy used
- [ ] Links tested and working
- [ ] Images optimized and accessible
- [ ] Content follows style guidelines
- [ ] Technical terms defined appropriately

### Technical Validation

- [ ] Frontmatter syntax correct
- [ ] Component imports working (MDX pages)
- [ ] Image paths correct
- [ ] No validation errors in build
- [ ] Page renders correctly in development
- [ ] Table of contents generates properly (if enabled)

### SEO and Accessibility

- [ ] Title and description optimized
- [ ] Alt text provided for all images
- [ ] Proper semantic markup used
- [ ] Color contrast sufficient
- [ ] Links have descriptive text
- [ ] Page structure logical for screen readers

## Common Issues and Solutions

### Build Errors

**Component Import Issues**

```
Error: Cannot resolve component import
Solution: Check import path and component name spelling
```

**Image Path Problems**

```
Error: Image not found
Solution: Verify image exists in src/assets/images/ and path is correct
```

**Frontmatter Validation**

```
Error: Invalid frontmatter field
Solution: Check field names and data types against schema
```

### Content Issues

**Broken Internal Links**

- Use relative paths for internal links
- Check that target pages exist
- Update links when page URLs change

**Missing Translations**

- Ensure both language versions exist
- Check that content is equivalent
- Verify language-specific frontmatter is correct

**Component Rendering Issues**

- Verify component imports are correct
- Check that required props are provided
- Ensure components are used within MDX files

## Best Practices

### Content Creation

1. **Start Simple**: Begin with basic markdown, add components as needed
2. **Plan Structure**: Outline content before writing
3. **Use Templates**: Start with existing pages as templates
4. **Test Early**: Preview changes frequently during development
5. **Consider Users**: Write for your target audience

### Maintenance

1. **Regular Reviews**: Check content accuracy quarterly
2. **Link Validation**: Test internal and external links regularly
3. **Image Optimization**: Compress images for web performance
4. **Content Updates**: Keep information current and relevant
5. **Version Control**: Use meaningful commit messages for changes

### Collaboration

1. **Coordinate Changes**: Communicate major updates with team
2. **Document Decisions**: Record rationale for structural changes
3. **Share Resources**: Maintain shared image and content libraries
4. **Review Process**: Have colleagues review significant changes
5. **Training**: Help new editors understand page structure and components

## Advanced Features

### Custom Templates

For pages requiring unique layouts:

```yaml
---
title: "Special Page"
template: "custom-layout"
---
```

Coordinate with developers to create custom templates for specific needs.

### Dynamic Content

For pages that need to display dynamic information:

```mdx
import PositionList from '@components/PositionList.astro';

## Current Opportunities

<PositionList lang="en" />
```

### Interactive Elements

For pages requiring user interaction:

```mdx
import FilterableList from '@components/FilterableList.astro';

## Publications

<FilterableList type="publications" filters={["year", "project"]} />
```

## Resources and Templates

### Page Templates

**Basic Page Template:**

```markdown
---
title: "Page Title"
href: "page-slug"
lang: "en"
description: "Brief description"
toc: false
---

# Page Title

## Introduction

Brief introduction to the page content.

## Main Content

Your main content here.

## Related Resources

- [Related Page](/related)
- [External Link](https://example.com)
```

**Advanced Page Template:**

```mdx
---
title: "Advanced Page"
href: "advanced-page"
lang: "en"
description: "Advanced page with components"
toc: true
---

import OptimizedFigure from '@components/OptimizedFigure.astro';

# Advanced Page Title

## Overview

<OptimizedFigure
  src="/src/assets/images/example.jpg"
  alt="Example image"
  caption="Example caption"
/>

## Content Sections

Your content here...
```

### Useful Links

- [Component Usage Guide](../guidelines/component-usage.md)
- [Content Style Guide](../guidelines/content-style-guide.md)
- [Accessibility Guidelines](../guidelines/accessibility-guide.md)
- [Astro MDX Documentation](https://docs.astro.build/en/guides/markdown-content/)

### Internal Resources

- Content Schema: `src/content/config.ts`
- Available Components: `src/components/`
- Image Assets: `src/assets/images/`
- Page Examples: `src/content/pages/`
