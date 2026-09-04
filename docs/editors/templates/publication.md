---
title: "Full Title of the Publication"
authors: ["First Author", "Second Author", "Third Author"]
type: "journal"  # Options: journal | conference | book | report | white-paper | preprint | thesis | workshop-paper | slidedeck
year: 2024
origin: "edt"  # Optional: "edt" | "external" — defaults to "external" if omitted
tags:
  - "PC1"  # Options: "PC1", "PC2", "PC3", "PC4", "PC5"
venue: "Name of Journal, Conference, or Publisher"  # Optional but recommended
doi: "10.1000/182"  # Optional: Digital Object Identifier
url: "https://example.com/publication"  # Optional: Direct link to publication
---

**Template Notes**:

- **Title**: Use the complete, official title of the publication
- **Authors**: List all authors in the order they appear on the publication
- **Type**: Choose from the nine options listed above
- **Year**: Publication year (required for filtering and sorting)
- **Origin**: Set to `edt` for EDT-program outputs; publications auto-imported from HAL are always `edt`
- **Venue**: Journal name, conference name, or publisher
- **DOI**: Include if available (helps with academic indexing)
- **URL**: Link to the official publication or preprint

**Content Guidelines**:

- Keep the abstract concise but informative
- Focus on contributions relevant to digital twin research
- Include methodology only if it's novel or particularly relevant
- Provide proper citation format for easy reference
- Link to related publications when available

**File Naming**: `{first-author-lastname}-{year}-{short-title}.md` in `src/content/publications/` (e.g. `combemale-2024-digital-twin-engineering.md`) — author first, then year.
**Language**: Publications are typically in the language they were published in
**Validation**: All fields will be validated against the schema in `src/content.config.ts`
