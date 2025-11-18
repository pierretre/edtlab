# Schema mapping (authoritative view from src/content/config.ts)

This concise mapping lists each Astro Content collection and the frontmatter fields (required/optional) as defined in `src/content/config.ts`. Use this as the quick reference for editors; the full `frontmatter-reference.md` provides examples and guidance.

## pages (type: content)

Required:

- title (string)
- href (string)
- lang ("en" | "fr")

Optional:

- description (string)
- toc (boolean, default false)
- lastModified (date)
- color (string)
- illustration (string)
- template (string)

## publications (type: content)

Required:

- title (string)
- authors (string[])
- type ("journal" | "conference" | "book" | "report")
- year (number)
- project ("PC1" | "PC2" | "PC3" | "PC4" | "PC5")

Optional:

- venue (string)
- doi (string)
- url (string - must be a valid URL)

## events (type: content)

Required:

- title (string)
- date (date)
- type ("conference" | "workshop" | "seminar")
- description (string)
- lang ("en" | "fr")

Optional:

- project ("PC1" | "PC2" | "PC3" | "PC4" | "PC5" | "General")
- location (string)
- url (string - URL)
- photo (string)  # filename of the event photo; required per documentation
- template (string)

## press-releases (type: content)

Required:

- title (string)
- date (date)
- description (string)
- lang ("en" | "fr")

Optional:

- project ("PC1" | "PC2" | "PC3" | "PC4" | "PC5" | "General")
- url (string - URL)
- photo (string)  # filename of the press release hero image; required per documentation
- tags (string[])
- template (string)

## job-offers (type: content)

Required:

- title (string)
- project ("PC1" | "PC2" | "PC3" | "PC4" | "PC5" | "General")
- type ("postdoc" | "phd" | "engineer" | "intern")
- location (string)
- deadline (date)
- publishedDate (date)
- description (string)
- requirements (string[])
- lang ("en" | "fr")

Optional:

- template (string)

## menu (type: data)

Required:

- sections (array of objects { name: string, href: string, items?: [{ name, href }] })

---

Note: This mapping is generated from `src/content/config.ts`. When in doubt about a field's type, default, or allowed values, consult that file — it is authoritative for content validation.
