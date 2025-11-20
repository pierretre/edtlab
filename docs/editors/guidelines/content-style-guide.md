# Content Style Guide

This guide establishes writing standards and formatting conventions for the EDT Research Website to ensure consistency, clarity, and accessibility across all content.

## Language and Localization

- All content must be available in both English and French
- Maintain equivalent meaning and tone across languages
- Adapt cultural references appropriately
- Use consistent terminology across languages

## Content Structure

- Use logical heading hierarchy (H1 → H2 → H3)
- Keep headings descriptive and scannable
- Limit to 4 heading levels maximum
- Use sentence case for headings

```markdown
# Main Page Title (H1)
## Major Section (H2)
### Subsection (H3)
#### Detail Level (H4)
```

## Formatting Standards

### Text Formatting

- **Bold**: Use for emphasis and key terms
- *Italic*: Use for publication titles, foreign words, and subtle emphasis
- `Code`: Use for technical terms, file names, and code snippets
- ~~Strikethrough~~: Avoid in published content

### Links

- Use descriptive link text (not "click here" or "read more")
- Link to authoritative sources
- Check all links before publishing
- Use relative links for internal content

**Good:** [Digital Twin Consortium guidelines](https://example.com)
**Avoid:** [Click here](https://example.com) for guidelines

### Dates and Numbers

- Use ISO date format (YYYY-MM-DD) in frontmatter
- Use full dates in content (January 15, 2024)
- Spell out numbers one through nine, use numerals for 10+
- Use metric units with appropriate precision

### Citations and References

- Link to publications when available
- Use consistent citation format
- Provide DOI when available
- Credit all sources appropriately

## Technical Content Guidelines

### Code Examples

- Use proper syntax highlighting
- Include comments for clarity
- Test all code examples
- Provide context and explanation

```javascript
// Example: Digital twin data structure
const digitalTwin = {
  id: "dt-001",
  physicalTwinId: "pt-001",
  lastSync: new Date(),
  status: "active"
};
```

### Mathematical Notation

- Use LaTeX notation for complex equations
- Explain variables and symbols
- Provide context for formulas
- Consider accessibility for screen readers

### Diagrams and Figures

- Include descriptive captions
- Reference figures in text
- Use consistent styling
- Ensure accessibility with alt text

## SEO and Discoverability

### Page Titles

- Keep under 60 characters
- Include primary keywords
- Make titles unique and descriptive
- Use title case

### Meta Descriptions

- Keep between 120-160 characters
- Include relevant keywords naturally
- Make descriptions compelling
- Avoid duplicate descriptions

### Keywords

- Research relevant keywords for your topic
- Use keywords naturally in content
- Include variations and synonyms
- Don't over-optimize or keyword stuff

### Internal Linking

- Link to related content on the site
- Use descriptive anchor text
- Create logical content connections
- Help users discover related information

## Accessibility Guidelines

### Writing for Screen Readers

- Use descriptive headings
- Provide context for links
- Describe images and diagrams
- Use clear, logical structure

### Visual Accessibility

- Ensure sufficient color contrast
- Don't rely solely on color for meaning
- Use clear, readable fonts
- Provide text alternatives for visual content

### Cognitive Accessibility

- Use simple, clear language
- Provide definitions for technical terms
- Use consistent navigation and structure
- Break up long content with headings and lists

## Content Types and Specific Guidelines

### Research Pages

- Lead with key findings or contributions
- Provide appropriate technical detail
- Include methodology when relevant
- Link to related publications and projects

### News and Events

- Use inverted pyramid structure (most important first)
- Include all essential details (who, what, when, where, why)
- Provide clear calls to action
- Update information as it becomes available

### Job Postings

- Be specific about requirements and responsibilities
- Use inclusive language
- Provide clear application instructions
- Include contact information for questions

### Publications

- Use complete, accurate bibliographic information
- Provide abstracts or summaries
- Include links to full text when available
- Organize by relevance to digital twin research

## Review and Quality Assurance

### Content Review Process

1. **Self-review**: Check for clarity, accuracy, and completeness
2. **Technical review**: Verify technical accuracy and terminology
3. **Editorial review**: Check style, grammar, and consistency
4. **Accessibility review**: Ensure content meets accessibility standards
5. **Final approval**: Get approval from appropriate stakeholders

### Common Issues to Check

- Spelling and grammar errors
- Broken or incorrect links
- Missing or inadequate alt text for images
- Inconsistent terminology or formatting
- Missing required frontmatter fields
- Accessibility barriers

### Tools and Resources

- Grammar checkers (Grammarly, LanguageTool)
- Link checkers for broken links
- Accessibility testing tools
- Style guide references
- Peer review from colleagues

## Maintenance and Updates

### Regular Maintenance

- Review content quarterly for accuracy
- Update links and references
- Check for outdated information
- Refresh examples and case studies

### Version Control

- Use meaningful commit messages
- Document significant changes
- Maintain change logs for major updates
- Coordinate updates across languages

### Performance Monitoring

- Monitor page load times
- Check search engine rankings
- Analyze user engagement metrics
- Gather feedback from users

## Resources and References

### Style References

- [Academic Writing Guidelines](https://example.com)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAG/)
- [Plain Language Guidelines](https://plainlanguage.gov/)

### Tools

- [Hemingway Editor](https://hemingwayapp.com/) - Readability
- [WebAIM](https://webaim.org/) - Accessibility testing
- [Google PageSpeed Insights](https://pagespeed.web.dev/) - Performance

### Internal Resources

- Frontmatter Reference Guide
- Component Usage Guide
- Accessibility Guide
- Template Examples
