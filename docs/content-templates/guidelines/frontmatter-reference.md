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
type: "conference"
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

#### `type`
- **Type**: Enum (`"announcement"` | `"partnership"` | `"award"` | `"milestone"` | `"general"`)
- **Description**: Type of press release
- **Usage**: Categorization and filtering

```yaml
type: "milestone"
```

### Optional Fields

#### `url`
- **Type**: URL string
- **Description**: Link to external press coverage
- **Usage**: Reference to media coverage or official announcements

```yaml
url: "https://news.example.com/edt-funding-announcement"
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