# Troubleshooting and FAQ

This document addresses common issues and questions that content editors encounter when creating and managing content for the EDT Research Website.

## Common Issues and Solutions

### Content Validation Errors

#### Error: "Invalid frontmatter field"
**Problem**: The build process fails with validation errors about frontmatter fields.

**Common Causes**:
- Misspelled field names
- Incorrect data types (string vs. number vs. date)
- Missing required fields
- Invalid enum values

**Solutions**:
1. Check the [Frontmatter Reference Guide](guidelines/frontmatter-reference.md) for correct field names and types
2. Verify all required fields are present
3. Ensure dates are in YYYY-MM-DD format
4. Use only valid enum values (e.g., "en" or "fr" for language)

**Example Fix**:
```yaml
# ❌ Incorrect
---
title: "My Article"
language: "english"  # Should be "lang": "en"
date: "January 1, 2024"  # Should be "2024-01-01"
type: "research"  # Invalid enum value
---

# ✅ Correct
---
title: "My Article"
lang: "en"
date: 2024-01-01
type: "journal"
---
```

#### Error: "Content collection not found"
**Problem**: Content files are not being recognized by the build system.

**Solutions**:
1. Ensure files are in the correct directory structure
2. Check that file extensions match expected types (.md, .mdx, .json)
3. Verify the content collection is defined in `src/content/config.ts`

#### Error: "Duplicate href values"
**Problem**: Multiple pages have the same `href` value within the same language.

**Solutions**:
1. Make each `href` unique within the language
2. Use descriptive, hierarchical slugs (e.g., "focused-projects/fp1")
3. Check for accidentally duplicated content files

### Build and Deployment Issues

#### Error: "Module not found" for components
**Problem**: MDX files can't import Astro components.

**Solutions**:
1. Check the import path is correct relative to the content file
2. Ensure the component exists in the specified location
3. Verify the component is properly exported

**Example Fix**:
```mdx
# ❌ Incorrect path
import ResponsiveImage from '../../components/ResponsiveImage.astro';

# ✅ Correct path (from content/pages subdirectory)
import ResponsiveImage from '../../../components/ResponsiveImage.astro';
```

#### Error: "Image not found"
**Problem**: Images referenced in content don't load.

**Solutions**:
1. Place images in `src/assets/images/` or `public/` directory
2. Use correct relative paths or public URLs
3. Ensure image files have proper extensions and aren't corrupted

### Language and Translation Issues

#### Problem: Missing translations
**Symptoms**: Content appears in one language but not the other.

**Solutions**:
1. Create corresponding files for both languages (en.md and fr.md)
2. Ensure both files have matching `href` values
3. Verify language-specific navigation menus are updated

#### Problem: Inconsistent navigation between languages
**Symptoms**: Menu items appear differently in English and French.

**Solutions**:
1. Update both `src/content/menu/en.json` and `src/content/menu/fr.json`
2. Ensure href values are consistent (without language prefixes)
3. Translate menu item names appropriately

### Performance and Loading Issues

#### Problem: Slow page loading
**Symptoms**: Pages take a long time to load or build.

**Solutions**:
1. Optimize images before adding them to the project
2. Limit the number of dynamic components per page
3. Use appropriate limits on list components (EventList, PublicationList, etc.)
4. Check for large files or excessive content

#### Problem: Build timeouts
**Symptoms**: The build process fails due to timeouts.

**Solutions**:
1. Reduce the number of content files processed simultaneously
2. Optimize or remove large media files
3. Check for infinite loops in component logic
4. Simplify complex MDX content

## Frequently Asked Questions

### Content Creation

#### Q: How do I add a new page to the website?
**A**: 
1. Create the content file in the appropriate `src/content/pages/` subdirectory
2. Use the correct template from `docs/content-templates/templates/`
3. Fill in all required frontmatter fields
4. Create both English and French versions
5. Update navigation menus if needed

#### Q: What's the difference between .md and .mdx files?
**A**: 
- **.md files**: Standard Markdown with frontmatter, suitable for simple content
- **.mdx files**: Markdown with JSX/Astro component support, used for interactive content
- Use .mdx when you need to include components like ResponsiveImage, EventList, etc.

#### Q: How do I add images to my content?
**A**:
1. Place images in `src/assets/images/` for processed images or `public/` for static files
2. Use the ResponsiveImage component in MDX files:
   ```mdx
   <ResponsiveImage 
     src="image-name.jpg"
     alt="Descriptive alt text"
     caption="Optional caption"
   />
   ```
3. Always include descriptive alt text for accessibility

#### Q: How do I create a table of contents?
**A**: Set `toc: true` in the frontmatter of your page. The table of contents will be automatically generated from your heading structure.

### Collections and Dynamic Content

#### Q: How do I add a new publication?
**A**:
1. Create a new .md file in `src/content/publications/`
2. Use the publication template with all required fields
3. The publication will automatically appear in publication lists

#### Q: How do I add a job offer?
**A**:
1. Create a new .md file in `src/content/job-offers/`
2. Include both English and French versions
3. Set the correct project (PC1-PC5) and type (postdoc, phd, engineer, intern)
4. The job will automatically appear in the Join Us section

#### Q: How do I organize events by type?
**A**: Use the `type` field in event frontmatter with values: "conference", "workshop", or "seminar". Events can be filtered by type in list displays.

### Navigation and Menus

#### Q: How do I add a new section to the main navigation?
**A**:
1. Update both `src/content/menu/en.json` and `src/content/menu/fr.json`
2. Add the new section with appropriate name and href
3. Create the corresponding content pages
4. Test navigation in both languages

#### Q: How do I create dropdown menus?
**A**: In the menu JSON files, add an `items` array to any section:
```json
{
  "name": "Projects",
  "href": "/focused-projects",
  "items": [
    {"name": "PC1", "href": "/focused-projects/fp1"},
    {"name": "PC2", "href": "/focused-projects/fp2"}
  ]
}
```

### Styling and Layout

#### Q: How do I use custom styling in my content?
**A**: Use Tailwind CSS classes directly in your MDX content:
```mdx
<div class="bg-primary-50 border-l-4 border-primary-500 p-4">
  <p class="text-primary-700">Highlighted content</p>
</div>
```

#### Q: How do I create multi-column layouts?
**A**: Use CSS Grid classes:
```mdx
<div class="grid md:grid-cols-2 gap-6">
  <div>Left column content</div>
  <div>Right column content</div>
</div>
```

### Accessibility

#### Q: What accessibility requirements must I follow?
**A**: 
- Provide alt text for all images
- Use proper heading hierarchy (H1 → H2 → H3)
- Ensure sufficient color contrast
- Write descriptive link text
- Test with keyboard navigation
- See the [Accessibility Guide](guidelines/accessibility-guide.md) for details

#### Q: How do I write good alt text for images?
**A**:
- Describe the content and function of the image
- Be concise but complete (aim for 125 characters or less)
- Don't start with "Image of" or "Picture of"
- Include important text that appears in the image
- For decorative images, use empty alt text (`alt=""`)

### Technical Issues

#### Q: Why isn't my content showing up on the website?
**A**: Check these common issues:
1. File is in the correct directory
2. Frontmatter is valid and complete
3. Required fields are present
4. File extension is correct (.md or .mdx)
5. Build completed successfully without errors

#### Q: How do I test my content locally?
**A**:
1. Run `npm run dev` to start the development server
2. Navigate to `http://localhost:4321`
3. Check for any console errors
4. Test in both languages
5. Verify all links and images work

#### Q: What should I do if the build fails?
**A**:
1. Check the error message in the console
2. Verify all frontmatter fields are correct
3. Ensure all imported components exist
4. Check for syntax errors in MDX files
5. Validate image paths and file names

## Getting Help

### Internal Support
- **Content Team**: [content@edt-program.fr](mailto:content@edt-program.fr)
- **Technical Support**: [tech@edt-program.fr](mailto:tech@edt-program.fr)
- **Accessibility Questions**: [accessibility@edt-program.fr](mailto:accessibility@edt-program.fr)

### Documentation Resources
- [Content Style Guide](guidelines/content-style-guide.md)
- [Frontmatter Reference](guidelines/frontmatter-reference.md)
- [Component Usage Guide](guidelines/component-usage.md)
- [Accessibility Guide](guidelines/accessibility-guide.md)

### External Resources
- [Astro Documentation](https://docs.astro.build/)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [RGAA 4.1 Guidelines](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/)

### Community Support
- **EDT Slack Channel**: #content-editors
- **Monthly Office Hours**: First Tuesday of each month, 2:00 PM CET
- **Training Sessions**: Quarterly hands-on workshops

## Reporting Issues

### Bug Reports
When reporting technical issues, please include:
1. **Description**: What you were trying to do
2. **Expected Result**: What should have happened
3. **Actual Result**: What actually happened
4. **Steps to Reproduce**: How to recreate the issue
5. **Environment**: Browser, operating system, etc.
6. **Screenshots**: If applicable

### Content Issues
For content-related problems:
1. **Page URL**: Where the issue occurs
2. **Content Type**: Page, publication, event, etc.
3. **Language**: English, French, or both
4. **Issue Description**: What's wrong or missing
5. **Suggested Fix**: If you have a solution

### Feature Requests
For new features or improvements:
1. **Use Case**: Why this feature is needed
2. **Proposed Solution**: How it should work
3. **Alternatives**: Other ways to solve the problem
4. **Priority**: How urgent this is
5. **Impact**: Who would benefit from this feature

## Best Practices Summary

### Content Quality
- Write for your audience (researchers, industry, students)
- Use clear, accessible language
- Provide complete, accurate information
- Include relevant keywords for SEO
- Test all links and references

### Technical Quality
- Validate all frontmatter fields
- Use semantic HTML structure
- Optimize images before uploading
- Test in both languages
- Check accessibility compliance

### Maintenance
- Review content regularly for accuracy
- Update outdated information promptly
- Monitor for broken links
- Keep translations synchronized
- Archive old events and job postings

### Collaboration
- Coordinate with team members on major changes
- Use version control effectively
- Document significant updates
- Share knowledge and best practices
- Ask for help when needed