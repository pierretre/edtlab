# Frontmatter Reference Guide

This document provides a complete reference for all frontmatter fields used across different content types in the EDT Research Website.

## Overview

Frontmatter is the YAML metadata at the top of each content file, enclosed between `---` markers. It provides structured information about the content that is used for:

- Content validation and type checking
- Automatic page generation and routing
- Search and filtering functionality
- SEO optimization and metadata
- Navigation and content organization

## Universal Fields

These fields are available across multiple content types:

### `title` (required)

- **Type**: String
- **Description**: The main title of the content
- **Usage**: Displayed in navigation, page headers, and search results
- **Guidelines**:
  - Keep under 60 characters for SEO
  - Use title case
  - Be descriptive and specific

```yaml
title: "Digital Twin Framework for Engineering Applications"
```

### `lang` (required for most content)

- **Type**: Enum (`"en"` | `"fr"`)
- **Description**: Language of the content
- **Usage**: Language-specific routing and content filtering
- **Guidelines**: Must match the language of the content

```yaml
lang: "en"
```

### `description` (optional but recommended)

- **Type**: String
- **Description**: Brief description for SEO and content previews
- **Usage**: Meta descriptions, search results, social media previews
- **Guidelines**:
  - Keep between 120-160 characters
  - Include relevant keywords
  - Make it compelling and informative

```yaml
description: "Comprehensive framework for developing and deploying digital twins in engineering applications"
```

## Pages Collection

Used for main content pages in `src/content/pages/`.

### Required Fields

#### `href`

- **Type**: String
- **Description**: URL slug for the page
- **Usage**: Generates the page URL
- **Guidelines**:
  - Use kebab-case (lowercase with hyphens)
  - Keep short and descriptive
  - Must be unique within the language

```yaml
href: "focused-projects"
```

### Optional Fields

#### `toc`

- **Type**: Boolean
- **Default**: `false`
- **Description**: Enable/disable table of contents generation
- **Usage**: Automatically generates navigation for long pages

```yaml
toc: true
```

#### `lastModified`

- **Type**: Date (YYYY-MM-DD)
- **Description**: Last modification date
- **Usage**: Content freshness indicators, change tracking

```yaml
lastModified: 2024-01-15
```

#### `color`

- **Type**: String (hex color)
- **Description**: Optional theme color used for page header accents or meta visuals
- **Usage**: Use a hex color string (e.g. `"#0a84ff"`) when a page needs a custom accent

```yaml
color: "#0a84ff"
```

#### `illustration`

- **Type**: String
- **Description**: Filename of an optional illustration image used for the page header or social previews
- **Usage**: Store images in `src/assets/images/` or `public/` and reference the filename

```yaml
illustration: "header-illustration.jpg"
```

#### `template`

- **Type**: String
- **Description**: Optional template key to override the default page rendering layout
- **Usage**: Use when a page should be rendered using a non-default layout; coordinate template names with developers

```yaml
template: "advanced"
```

## Publications Collection

Used for research publications in `src/content/publications/`.

### Required Fields

#### `authors`

- **Type**: Array of strings
- **Description**: List of publication authors
- **Usage**: Author listings, search, and filtering
- **Guidelines**: Use full names in publication order

```yaml
authors: ["John Doe", "Jane Smith", "Pierre Dupont"]
```

#### `type`

- **Type**: Enum (`"journal"` | `"conference"` | `"book"` | `"report"`)
- **Description**: Type of publication
- **Usage**: Filtering and categorization

```yaml
type: "journal"
```

#### `year`

- **Type**: Number
- **Description**: Publication year
- **Usage**: Chronological sorting and filtering

```yaml
year: 2024
```

### Required Fields (project association)

#### `project`

- **Type**: Enum (`"PC1"` | `"PC2"` | `"PC3"` | `"PC4"` | `"PC5"`)
- **Description**: Focused project associated with the publication (used for filtering and project pages)
- **Usage**: Associate publications to one of the focused projects

```yaml
project: "PC1"
```

### Optional Fields

#### `venue`

- **Type**: String
- **Description**: Journal name, conference name, or publisher
- **Usage**: Publication details and credibility

```yaml
venue: "Journal of Engineering Digital Twins"
```

#### `doi`

- **Type**: String
- **Description**: Digital Object Identifier
- **Usage**: Academic linking and citation

```yaml
doi: "10.1000/182"
```

#### `url`

- **Type**: URL string
- **Description**: Direct link to publication
- **Usage**: External linking to full text

```yaml
url: "https://journal.example.com/article/123"
```

## Events Collection

Used for events in `src/content/events/`.

### Required Fields

#### `date`

- **Type**: Date (YYYY-MM-DD)
- **Description**: Event date
- **Usage**: Chronological sorting and filtering

```yaml
date: 2024-06-15
```

#### `type`

- **Type**: Enum (`"conference"` | `"workshop"` | `"seminar"`)
- **Description**: Type of event
- **Usage**: Categorization and filtering

```yaml
newsType: "event"
```

#### `photo`

- **Type**: String
- **Description**: Filename of the event photo used for listings, cards and social previews. This field is required for events.
- **Usage**: Store images in `src/assets/images/` or `public/` and reference the filename here. Prefer optimized images and provide descriptive filenames.

```yaml
photo: "event-photo.jpg"
```

#### `project` (optional)

- **Type**: Enum (`"PC1"` | `"PC2"` | `"PC3"` | `"PC4"` | `"PC5"` | `"General"`)
- **Description**: Optional association to a focused project. Use this to group or filter events by project.
- **Usage**: Include the project short-code if the event is associated with a specific focused project.

```yaml
project: "PC1"
```

### Optional Fields

#### `location`

- **Type**: String
- **Description**: Event location (city, country, or "Virtual")
- **Usage**: Event details and logistics

```yaml
location: "Paris, France"
```

#### `url`

- **Type**: URL string
- **Description**: Official event website
- **Usage**: External linking for registration and details

```yaml
url: "https://conference2024.example.com"
```

## Press Releases Collection

Used for press releases in `src/content/press-releases/`.

### Required Fields

#### `date`

- **Type**: Date (YYYY-MM-DD)
- **Description**: Publication date of press release
- **Usage**: Chronological sorting and news organization

```yaml
date: 2024-02-10
```

#### `photo`

- **Type**: String
- **Description**: Filename of the press-release hero image used in listings, cards and social previews. This field is required for press releases.
- **Usage**: Store images in `src/assets/images/` or `public/` and reference the filename here. Prefer high-resolution images suitable for social previews.

```yaml
photo: "press-photo.jpg"
```

### Notes on `type` vs `tags`

The codebase's current content schema (see `src/content/config.ts`) does not define a `type` enum for press releases. Instead, press releases may use the optional `tags` array and an optional `template` field for categorization and rendering hints. If you previously used a `type` field, please migrate to `tags` (for filtering) or update the schema first and coordinate with developers.

### Optional Fields

#### `tags`

- **Type**: Array of strings
- **Description**: Labels used for filtering and grouping press releases (e.g. `"announcement"`, `"partnership"`)
- **Usage**: Use tags instead of a dedicated `type` enum for flexible categorization

```yaml
tags: ["announcement", "milestone"]
```

#### `url`

- **Type**: URL string
- **Description**: Link to external press coverage
- **Usage**: Reference to media coverage or official announcements

```yaml
url: "https://news.example.com/edt-funding-announcement"
```

#### `template`

- **Type**: String (optional)
- **Description**: Optional template key for rendering the press release with a specific layout
- **Usage**: Leave blank for default rendering or set to a named template

```yaml
template: "compact"
```

#### `project` (optional)

- **Type**: Enum (`"PC1"` | `"PC2"` | `"PC3"` | `"PC4"` | `"PC5"` | `"General"`)
- **Description**: Optional association to a focused project. Use this to group or filter press releases by project.
- **Usage**: Include the project short-code if the press release is associated with a specific focused project.

```yaml
project: "PC1"
```

## Job Offers Collection

Used for job postings in `src/content/job-offers/`.

### Required Fields

#### `project`

- **Type**: Enum (`"PC1"` | `"PC2"` | `"PC3"` | `"PC4"` | `"PC5"` | `"General"`)
- **Description**: Associated research project
- **Usage**: Project-based filtering and organization

```yaml
project: "PC1"
```

#### `type`

- **Type**: Enum (`"postdoc"` | `"phd"` | `"engineer"` | `"intern"`)
- **Description**: Position type
- **Usage**: Position-based filtering and categorization

```yaml
type: "postdoc"
```

#### `location`

- **Type**: String
- **Description**: Job location
- **Usage**: Geographic information for applicants

```yaml
location: "Paris, France"
```

#### `deadline`

- **Type**: Date (YYYY-MM-DD)
- **Description**: Application deadline
- **Usage**: Urgency indicators and automatic filtering

```yaml
deadline: 2024-12-31
```

#### `publishedDate`

- **Type**: Date (YYYY-MM-DD)
- **Description**: Date when the job offer was first published
- **Usage**: Chronological sorting and content freshness indicators

```yaml
publishedDate: 2024-01-15
```

#### `requirements`

- **Type**: Array of strings
- **Description**: List of job requirements
- **Usage**: Qualification details and applicant screening

```yaml
requirements: 
  - "PhD in Engineering or Computer Science"
  - "Experience with digital twin technology"
  - "Strong programming skills"
  - "Fluency in English"
```

## Menu Collection

Used for navigation menus in `src/content/menu/`.

### Required Fields

#### `sections`

- **Type**: Array of section objects
- **Description**: Navigation structure
- **Usage**: Automatic menu generation

Each section object contains:

- `name` (string): Display name
- `href` (string): URL path
- `items` (optional array): Dropdown menu items

```yaml
sections:
  - name: "Program"
    href: "/program"
    items:
      - name: "Goals & Structure"
        href: "/program#goals"
```

## Validation and Error Handling

### Common Validation Errors

1. **Missing Required Fields**: Ensure all required fields are present
2. **Invalid Enum Values**: Use only the specified enum options
3. **Invalid Date Format**: Use YYYY-MM-DD format for all dates
4. **Invalid URL Format**: Ensure URLs are properly formatted
5. **Empty Arrays**: Provide at least one item for array fields

### Troubleshooting

- **Build Errors**: Check the console for specific validation messages
- **Schema Validation**: Refer to `src/content/config.ts` for exact requirements
- **Type Mismatches**: Ensure data types match the schema definitions

### Best Practices

1. **Consistency**: Use consistent formatting across all content
2. **Completeness**: Fill in optional fields when they add value
3. **Accuracy**: Double-check dates, URLs, and enum values
4. **Localization**: Ensure language-specific content is properly tagged
5. **SEO**: Optimize titles and descriptions for search engines

## Schema Updates

When updating content schemas:

1. Update `src/content/config.ts`
2. Update this documentation
3. Update relevant templates
4. Test with existing content
5. Communicate changes to content editors

## Examples

See the `examples/` directory for complete, real-world examples of each content type with proper frontmatter usage.
