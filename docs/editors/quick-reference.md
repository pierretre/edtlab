# Editor Quick Reference

## Content Creation Cheat Sheet

### File Locations

```
src/content/
├── positions/      # Open and occupied/ongoing positions
├── news/           # Events and press releases  
├── publications/   # Research papers and articles
├── pages/          # Static content pages
└── menu/           # Navigation data

src/assets/images/  # Optimized images (recommended)
├── news-covers/    # News and event photos
├── team/           # Team member photos
├── partners/       # Partner logos
├── diagrams/       # Technical diagrams
└── general/        # General purpose images

public/             # Direct access images
├── favicon.png     # Site favicon
└── *.svg          # Government logos
```

### Naming Conventions

**Pages:** `{section}/{lang}.mdx` or `{section}/{subsection}/{lang}.mdx`

```
about/en.mdx
program/governance-and-committees/fr.mdx
```

**Job Offers:** `{type}-{project}-{identifier}-{lang}.md`

```
postdoc-pc1-hybridization-en.md
phd-pc2-architecture-fr.md
```

**News:** `{type}-{identifier}-{lang}.md`

```
event-models2024-conference-en.md
press-funding-announcement-fr.md
```

**Publications:** `{year}-{author}-{short-title}.md`

```
2024-combemale-digital-twin-engineering.md
2024-jezequel-modular-architecture.md
```

**Images:** `{type}-{identifier}-{context}.{ext}`

```
event-models2024-conference.jpg
press-funding-announcement-2024.jpg
team-pc1-2024.jpg
diagram-architecture-overview.png
```

### Required Frontmatter

#### Pages

```yaml
---
title: "Page Title"
href: "url-slug"
lang: "en" # en|fr
description: "Brief description"
toc: false # true for table of contents
---
```

#### Job Offers

```yaml
---
title: "Position Title"
type: "PostDoc" # PostDoc|PhD|Engineer|Intern|Others
location: "City, Country"
expectedStartDate: "Spring 2025"
filled: false
publishedDate: 2024-01-15
description: "Brief description"
requirements: ["Req 1", "Req 2"]
lang: "en" # en|fr
---
```

#### News (Events)

```yaml
---
title: "Event Title"
date: 2024-06-15
newsType: "event"
location: "Paris, France"
description: "Brief description"
lang: "en"
photo: "event-photo.jpg"
---
```

#### News (Press Releases)

```yaml
---
title: "Press Release Title"
date: 2024-02-10
newsType: "press-release"
description: "Brief description"
lang: "en"
photo: "press-photo.jpg"
---
```

#### Publications

```yaml
---
title: "Publication Title"
authors: ["Author 1", "Author 2"]
type: "journal" # journal|conference|book|report
year: 2024
venue: "Journal Name"
doi: "10.1000/182"
url: "https://example.com"
tags: ["PC1", "keyword"]
---
```

### Common Tags

**Project Codes:** `PC1`, `PC2`, `PC3`, `PC4`, `PC5`, `General`

**Research Areas:**

- `model-hybridization`
- `architecture`
- `interoperability`
- `development-lifecycle`
- `digital-coupling`
- `human-interaction`
- `digital-twins`
- `simulation`

### Image Requirements

**Primary Location:** `src/assets/images/` (auto-optimized)
**Alternative:** `public/` (direct access, no optimization)

**Specifications:**

- **Format**: JPG (photos), PNG (graphics), SVG (logos)
- **Size**: Min 800px wide, max 2MB file size
- **Social**: 1200x630px for optimal sharing
- **Aspect**: 16:9 or 4:3 preferred for news
- **Optimization**: Compress before upload
- **Naming**: Descriptive, kebab-case

**Usage in Content:**

```mdx
# MDX Pages (advanced)
import OptimizedFigure from '@components/OptimizedFigure.astro';
import image from '/src/assets/images/diagram.png';

<OptimizedFigure
  src={image}
  alt="Descriptive alt text"
  caption="Figure caption"
/>

# Markdown (basic)
![Alt text](../assets/images/photo.jpg)

# Frontmatter (news/jobs)
photo: "filename.jpg"  # filename only
```

### Bilingual Requirements

- Create both `en` and `fr` versions
- Use identical structure and information
- Adapt cultural context appropriately
- Maintain consistent messaging

### Quick Validation Checklist

- [ ] All required fields present
- [ ] Correct enum values used
- [ ] Date format: YYYY-MM-DD
- [ ] Valid URLs and email addresses
- [ ] Both language versions created
- [ ] Images properly referenced
- [ ] Tags follow conventions

### Common Validation Errors

**Missing Required Fields**

```
Error: Required field 'publishedDate' is missing
Fix: Add publishedDate: 2024-01-15
```

**Invalid Enum Value**

```
Error: Invalid type 'researcher'
Fix: Use: PostDoc|PhD|Engineer|Intern|Others
```

**Invalid Date Format**

```
Error: Invalid date '01/15/2024'
Fix: Use: 2024-01-15
```

**Invalid Email**

```
Error: Invalid email format
Fix: Use: user@domain.com
```

### Useful Commands

**Check content validation:**

```bash
npm run check
```

**Start development server:**

```bash
npm run dev
```

**Build for production:**

```bash
npm run build
```

### Quick Links

- [Pages Guide](how-to/pages-guide.md)
- [Positions Guide](how-to/positions-guide.md)
- [News Guide](how-to/news-guide.md)
- [Publications Guide](how-to/publications-guide.md)
- [Image Management](guidelines/image-management.md)
- [Style Guide](guidelines/content-style-guide.md)
- [Frontmatter Reference](guidelines/frontmatter-reference.md)
- [Content Schema](../src/content/config.ts)
