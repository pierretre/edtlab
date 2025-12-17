# How to Create and Manage Publications

This guide provides step-by-step instructions for creating, updating, and managing publication entries on the EDT Research Website.

## Quick Start Checklist

- [ ] Gather complete bibliographic information
- [ ] Determine publication type and associated project
- [ ] Create properly named content file
- [ ] Fill all required frontmatter fields
- [ ] Write compelling abstract or summary
- [ ] Include relevant links and resources
- [ ] Test content before publishing
- [ ] Update project pages if needed

## Publication Types Overview

The publications system supports four main types:

### Journal Articles
- Peer-reviewed journal publications
- Research articles, reviews, surveys
- High-impact research contributions

### Conference Papers
- Conference proceedings and presentations
- Workshop papers and extended abstracts
- Peer-reviewed conference contributions

### Books and Book Chapters
- Monographs and edited volumes
- Book chapters and contributions
- Technical reports with ISBN

### Reports
- Technical reports and white papers
- Government and institutional reports
- Working papers and preprints

## File Structure and Naming

### Location
All publications are stored in: `src/content/publications/`

### Naming Convention
Use this pattern: `{year}-{first-author-lastname}-{short-title}.md`

**Examples:**
```
2024-combemale-digital-twin-engineering.md
2024-jezequel-modular-architecture.md
2023-gerard-collaborative-development.md
2024-duval-human-interaction-frameworks.md
```

**Guidelines:**
- Use publication year
- Use first author's last name (lowercase)
- Include 2-3 key words from title
- Use hyphens, no spaces
- Keep under 50 characters total

## Step-by-Step Creation Process

### Step 1: Gather Information

**Required Information:**
- Complete title
- All author names (in publication order)
- Publication type
- Publication year
- Venue (journal/conference name)
- DOI (if available)
- URL to full text (if available)

**Optional Information:**
- Abstract or summary
- Keywords
- Project association
- Related publications
- Supplementary materials

### Step 2: Create the File

1. Navigate to `src/content/publications/`
2. Create file using naming convention
3. Set up frontmatter and content

### Step 3: Set Up Frontmatter

```yaml
---
title: "Complete Publication Title"
authors: 
  - "First Author Name"
  - "Second Author Name"
  - "Third Author Name"
type: "journal" # journal | conference | book | report
year: 2024
venue: "Journal Name or Conference Proceedings" # Optional
doi: "10.1000/182" # Optional but recommended
url: "https://journal.example.com/article/123" # Optional
tags: # Optional: project association and keywords
  - "PC1"
  - "model-hybridization"
  - "digital-twins"
---
```

## Content Writing Guidelines

### Abstract and Summary

Structure your content using this template:

```markdown
## Abstract

[Include the official abstract if available, or write a comprehensive summary of the work]

## Key Contributions

- Main contribution 1
- Main contribution 2
- Main contribution 3

## Research Context

Brief description of how this work fits within the EDT program and broader digital twin research landscape.

## Methodology

[If relevant] Overview of the research methodology, experimental setup, or theoretical approach used.

## Results and Impact

Summary of key findings, results, or theoretical contributions.

## Related Work

- Links to related publications
- References to associated projects
- Connections to other EDT research

## Resources

- [Link to full text](URL)
- [Supplementary materials](URL)
- [Code repository](URL)
- [Dataset](URL)
```

### Writing Guidelines

**Academic Tone:**
- Use formal, academic language
- Be precise and specific
- Avoid marketing language
- Focus on scientific contributions

**Accessibility:**
- Explain technical terms when first used
- Provide context for specialized research
- Use clear, logical structure
- Include relevant background information

**SEO Optimization:**
- Include relevant keywords naturally
- Use descriptive headings
- Provide comprehensive abstracts
- Link to related content

## Frontmatter Field Reference

### Required Fields

#### `title`
- **Purpose**: Complete publication title
- **Guidelines**: 
  - Use exact title from publication
  - Include subtitle if present
  - Maintain original capitalization
  - Use quotes around entire title

#### `authors`
- **Format**: Array of strings
- **Purpose**: Complete author list in publication order
- **Guidelines**:
  - Use full names as they appear in publication
  - Maintain exact order from publication
  - Include all authors (don't truncate with "et al.")
  - Use consistent name formatting

```yaml
authors:
  - "Benoit Combemale"
  - "Jean-Marc Jézéquel"
  - "Sébastien Gérard"
```

#### `type`
- **Options**: `journal`, `conference`, `book`, `report`
- **Purpose**: Publication categorization and filtering
- **Guidelines**: Choose the most appropriate category

#### `year`
- **Format**: Number (YYYY)
- **Purpose**: Chronological organization and filtering
- **Guidelines**: Use publication year, not submission year

### Optional Fields

#### `venue`
- **Purpose**: Journal name, conference proceedings, or publisher
- **Guidelines**:
  - Use official publication venue name
  - Include full conference name for proceedings
  - Use journal abbreviations only if widely recognized

```yaml
venue: "IEEE Transactions on Software Engineering"
venue: "Proceedings of the 25th International Conference on Model Driven Engineering Languages and Systems"
venue: "Springer Nature"
```

#### `doi`
- **Format**: DOI string (without URL prefix)
- **Purpose**: Academic linking and citation
- **Guidelines**:
  - Include when available
  - Use DOI string only (e.g., "10.1000/182")
  - Verify DOI is correct and active

#### `url`
- **Format**: Complete URL
- **Purpose**: Direct link to full text or publication page
- **Guidelines**:
  - Link to official publication page when possible
  - Use institutional repositories if open access
  - Ensure link is stable and permanent
  - Prefer HTTPS when available

#### `tags`
- **Format**: Array of strings
- **Purpose**: Project association and keyword categorization
- **Common Values**:
  - Project codes: `PC1`, `PC2`, `PC3`, `PC4`, `PC5`
  - Research areas: `model-hybridization`, `architecture`, `human-interaction`
  - Technical terms: `digital-twins`, `simulation`, `verification`

```yaml
tags:
  - "PC1"
  - "model-hybridization"
  - "uncertainty-quantification"
```

## Project Association Guidelines

### Focused Project Mapping

**PC1 - Model Hybridization and Management:**
- Model integration and hybridization
- Multi-fidelity modeling
- Uncertainty quantification
- Model interfaces and composition

**PC2 - Architecture, Composability and Interoperability:**
- Digital twin architectures
- System composition and federation
- Interoperability frameworks
- Semantic integration

**PC3 - Methodology, Development Life Cycle, and Languages:**
- Development methodologies
- Domain-specific languages
- Software engineering practices
- Collaborative development tools

**PC4 - Digital Coupling and Gateway:**
- Physical-digital synchronization
- Data assimilation
- Real-time coupling
- Network optimization

**PC5 - Human-Digital Twin Interactions:**
- User interface design
- Visualization techniques
- Interaction paradigms
- Usability studies

### Tagging Strategy

1. **Primary Association**: Include main project code
2. **Secondary Associations**: Add related project codes if applicable
3. **Technical Keywords**: Include 2-3 specific research terms
4. **General Terms**: Add broad categories like "digital-twins"

## Quality Assurance

### Bibliographic Accuracy

- [ ] Title matches original publication exactly
- [ ] All authors included in correct order
- [ ] Publication year is correct
- [ ] Venue information is accurate and complete
- [ ] DOI is valid and links to correct publication
- [ ] URL links to accessible version of paper

### Content Quality

- [ ] Abstract accurately represents the work
- [ ] Key contributions are clearly stated
- [ ] Research context is provided
- [ ] Technical terms are explained appropriately
- [ ] Links to related work are included
- [ ] Supplementary resources are linked when available

### Technical Validation

- [ ] Frontmatter follows correct YAML syntax
- [ ] All required fields are present
- [ ] Enum values are correct (type, project codes)
- [ ] URLs are properly formatted and accessible
- [ ] File naming convention is followed

## Publication Workflow

### For New Publications

1. **Immediate Entry**: Add publication as soon as it's accepted
2. **Preprint Stage**: Include with URL to preprint repository
3. **Final Publication**: Update with final venue and DOI information
4. **Promotion**: Share through appropriate channels

### For Historical Publications

1. **Systematic Review**: Identify relevant existing publications
2. **Prioritization**: Focus on high-impact and directly relevant work
3. **Batch Processing**: Process multiple publications efficiently
4. **Quality Control**: Ensure consistent formatting and completeness

### For Collaborative Publications

1. **Author Coordination**: Verify author list and affiliations
2. **Content Review**: Have co-authors review abstract and summary
3. **Link Sharing**: Ensure all authors have access to publication entry
4. **Update Notifications**: Inform co-authors of any updates

## Integration with Project Pages

### Automatic Integration

Publications automatically appear on relevant project pages based on tags. Ensure proper tagging for correct association.

### Manual Cross-References

- Link to publications from project descriptions
- Reference key publications in research summaries
- Include publications in project milestone reports
- Use publications to demonstrate project impact

## SEO and Discoverability

### Search Optimization

1. **Keywords**: Include relevant research terms in abstract
2. **Titles**: Use descriptive, keyword-rich titles
3. **Abstracts**: Write comprehensive, searchable abstracts
4. **Tags**: Use consistent, discoverable tag terms

### Academic Visibility

1. **DOI Links**: Always include DOI when available
2. **Open Access**: Link to open access versions when possible
3. **Institutional Repositories**: Include repository links
4. **Author Profiles**: Ensure consistent author name formatting

## Common Issues and Solutions

### Bibliographic Issues

**Missing Information:**
- Contact authors for complete details
- Check publisher websites for official information
- Use library databases for verification
- Include partial information with notes about missing details

**Inconsistent Author Names:**
- Use names as they appear in the specific publication
- Note variations in author profiles or comments
- Maintain consistency within single publication entry

**Venue Name Variations:**
- Use official venue names from publication
- Include common abbreviations in tags if helpful
- Be consistent across similar publications

### Technical Issues

**DOI Problems:**
- Verify DOI format (no URL prefix)
- Test DOI links before publishing
- Use CrossRef or publisher sites to verify

**URL Access Issues:**
- Check for paywall restrictions
- Provide alternative open access links when available
- Note access restrictions in content

**File Naming Conflicts:**
- Add distinguishing information (e.g., conference name)
- Use middle initials for author disambiguation
- Include publication type if needed

## Best Practices

### Content Creation

1. **Comprehensive Abstracts**: Write detailed, informative abstracts
2. **Clear Context**: Explain relevance to EDT program
3. **Proper Attribution**: Credit all contributors appropriately
4. **Resource Links**: Include all relevant supplementary materials
5. **Regular Updates**: Keep information current and accurate

### Maintenance

1. **Periodic Review**: Check links and update information quarterly
2. **Impact Tracking**: Monitor citations and usage
3. **Related Work**: Update cross-references as new work is published
4. **Archive Management**: Maintain historical publication records

### Collaboration

1. **Author Communication**: Keep co-authors informed of entries
2. **Institutional Coordination**: Align with institutional repositories
3. **Project Integration**: Ensure publications support project narratives
4. **Community Sharing**: Promote publications within EDT community

## Templates and Examples

### Journal Article Template

```yaml
---
title: "Advanced Model Hybridization Techniques for Digital Twin Applications"
authors: 
  - "Julien Deantoni"
  - "Benoit Combemale"
  - "Jean-Marc Jézéquel"
type: "journal"
year: 2024
venue: "ACM Transactions on Modeling and Computer Simulation"
doi: "10.1145/3589334.3645678"
url: "https://dl.acm.org/doi/10.1145/3589334.3645678"
tags:
  - "PC1"
  - "model-hybridization"
  - "digital-twins"
  - "simulation"
---

## Abstract

This paper presents novel techniques for hybridizing heterogeneous models in digital twin applications...

## Key Contributions

- A formal framework for model interface specification
- Automated hybridization operators for common model types
- Uncertainty propagation methods for hybrid models
- Validation through industrial case studies

## Research Context

This work addresses fundamental challenges in PC1 (Model Hybridization and Management) by providing systematic approaches to combining data-driven and physics-based models...
```

### Conference Paper Template

```yaml
---
title: "Towards Interoperable Digital Twin Architectures: A Semantic Web Approach"
authors: 
  - "Fabien Gandon"
  - "Jean-Marc Jézéquel"
type: "conference"
year: 2024
venue: "Proceedings of the 27th International Conference on Model Driven Engineering Languages and Systems (MODELS 2024)"
doi: "10.1109/MODELS.2024.00023"
url: "https://ieeexplore.ieee.org/document/10234567"
tags:
  - "PC2"
  - "interoperability"
  - "semantic-web"
  - "architecture"
---

## Abstract

Digital twin interoperability remains a significant challenge for large-scale deployment...

## Key Contributions

- Semantic framework for digital twin interoperability
- Ontology alignment techniques for heterogeneous systems
- Prototype implementation and evaluation
- Case study in smart city applications
```

## Resources and References

### External Resources

- [CrossRef DOI Search](https://search.crossref.org/)
- [DBLP Computer Science Bibliography](https://dblp.org/)
- [Google Scholar](https://scholar.google.com/)
- [Semantic Scholar](https://www.semanticscholar.org/)

### Internal Resources

- [Content Style Guide](../guidelines/content-style-guide.md)
- [Frontmatter Reference](../guidelines/frontmatter-reference.md)
- [SEO Guidelines](../guidelines/seo-guide.md)
- [Project Pages](/focused-projects)

### Citation Tools

- [Zotero](https://www.zotero.org/) - Reference management
- [Mendeley](https://www.mendeley.com/) - Academic reference manager
- [EndNote](https://endnote.com/) - Citation management
- [BibTeX](http://www.bibtex.org/) - Bibliography formatting