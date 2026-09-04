# Accessibility Guide for Content Creators

This guide helps content creators ensure their content meets RGAA 4.1 AA accessibility standards and provides an inclusive experience for all users.

## Overview

Accessibility is not optional—it's a legal requirement and moral imperative. The EDT Research Website must comply with RGAA 4.1 (Référentiel Général d'Amélioration de l'Accessibilité) at AA level, ensuring equal access for users with disabilities.

## Key Principles

### Perceivable

Content must be presentable in ways users can perceive:

- Provide text alternatives for images
- Offer captions and alternatives for multimedia
- Ensure sufficient color contrast
- Make content adaptable to different presentations

### Operable

Interface components must be operable:

- Make all functionality keyboard accessible
- Give users enough time to read content
- Don't use content that causes seizures
- Help users navigate and find content

### Understandable

Information and UI operation must be understandable:

- Make text readable and understandable
- Make content appear and operate predictably
- Help users avoid and correct mistakes

### Robust

Content must be robust enough for various assistive technologies:

- Maximize compatibility with assistive technologies
- Use valid, semantic HTML
- Ensure content works across different browsers and devices

## Content Guidelines

### Headings and Structure

#### Use Proper Heading Hierarchy

```markdown
# Page Title (H1) - Only one per page
## Main Section (H2)
### Subsection (H3)
#### Detail Level (H4)
```

**Do:**

- Use headings to create logical document structure
- Don't skip heading levels (H1 → H3)
- Make headings descriptive and meaningful
- Use only one H1 per page

**Don't:**

- Use headings just for visual styling
- Skip heading levels
- Use empty headings
- Make headings too long or vague

#### Example

```markdown
# Digital Twin Research Program

## Program Overview
Brief introduction to the program.

### Goals and Objectives
Specific program goals.

### Research Areas
Different areas of focus.

## Focused Projects
Description of the five projects.

### PC1: Model Hybridization
Details about PC1.
```

### Images and Media

#### Alternative Text Requirements

Every image must have descriptive alternative text:

```mdx
<OptimizedFigure 
  src="/media/uploads/research-diagram.jpg"
  alt="Flowchart showing digital twin development process with five stages: data collection, model creation, validation, deployment, and monitoring"
  caption="Digital Twin Development Process"
/>
```

**Alt Text Guidelines:**

- Describe the content and function of the image
- Be concise but complete (aim for 125 characters or less)
- Don't start with "Image of" or "Picture of"
- Include important text that appears in the image
- For decorative images, use empty alt text (`alt=""`)

#### Complex Images

For complex diagrams, charts, or infographics:

- Provide detailed description in the surrounding text
- Consider using a table or list to present the same information
- Link to a text description if needed

```mdx
<OptimizedFigure 
  src="/media/uploads/complex-architecture.jpg"
  alt="System architecture diagram with 5 main components"
  caption="EDT System Architecture (detailed description follows)"
/>

The system architecture consists of five main components:
1. Data Collection Layer - Sensors and IoT devices
2. Processing Layer - Real-time data processing
3. Model Layer - Digital twin models and simulations
4. Interface Layer - User interfaces and APIs
5. Storage Layer - Data persistence and backup
```

### Links and Navigation

#### Descriptive Link Text

Links must clearly describe their destination:

**Good:**

- [Digital Twin Consortium guidelines](https://example.com)
- [Download the research report (PDF, 2.3MB)](/reports/research-2024.pdf)
- [Contact the research team](/contact)

**Avoid:**

- [Click here](https://example.com)
- [Read more](/article)
- [Link](https://example.com)

#### Link Context

Provide context for links that open in new windows or are downloads:

```markdown
[Annual Report 2024 (PDF, 1.2MB, opens in new window)](/reports/annual-2024.pdf)
```

### Tables

#### Accessible Table Structure

Use proper table markup with headers:

```markdown
| Project | Lead Institution | Focus Area | Duration |
|---------|------------------|------------|----------|
| PC1 | University A | Model Hybridization | 3 years |
| PC2 | University B | Architecture | 3 years |
| PC3 | University C | Development | 3 years |
```

For complex tables, consider:

- Adding a table caption
- Using `scope` attributes for headers
- Providing a summary if the table is complex

### Lists and Content Organization

#### Use Appropriate List Types

- **Unordered lists** for related items without sequence
- **Ordered lists** for sequential steps or ranked items
- **Definition lists** for term-definition pairs

```markdown
## Research Objectives (unordered)
- Develop new modeling techniques
- Improve system interoperability
- Enhance user interfaces

## Implementation Steps (ordered)
1. Conduct literature review
2. Design system architecture
3. Develop prototype
4. Test and validate
5. Deploy and monitor

## Key Terms (definition list)
**Digital Twin**
: A digital representation of a physical object or system

**Interoperability**
: The ability of different systems to work together
```

### Forms and Interactive Elements

#### Form Accessibility

When creating forms or interactive content:

```html
<label for="email">Email Address (required)</label>
<input type="email" id="email" name="email" required aria-describedby="email-help">
<div id="email-help">We'll use this to send you updates about the research program</div>
```

**Requirements:**

- Associate labels with form controls
- Indicate required fields
- Provide clear error messages
- Group related fields
- Use appropriate input types

### Color and Visual Design

#### Color Contrast

Ensure sufficient contrast ratios:

- **Normal text**: 4.5:1 minimum
- **Large text** (18pt+ or 14pt+ bold): 3:1 minimum
- **UI components**: 3:1 minimum

#### Don't Rely on Color Alone

Never use color as the only way to convey information:

**Good:**

```markdown
**Important:** This deadline is approaching (shown in red)
```

**Avoid:**

```markdown
Items in red are urgent
```

### Language and Readability

#### Clear Language

- Use simple, clear language
- Define technical terms when first used
- Keep sentences and paragraphs concise
- Use active voice when possible

#### Language Identification

Specify the language of content:

```yaml
---
lang: "en"  # or "fr"
---
```

For mixed-language content:

```html
<p>The French term <span lang="fr">jumeau numérique</span> translates to "digital twin" in English.</p>
```

## Testing and Validation

### Automated Testing

Use automated tools to catch common issues:

- **axe-core**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Built into Chrome DevTools

### Manual Testing

#### Keyboard Navigation

Test that all interactive elements are accessible via keyboard:

1. Use only the Tab key to navigate
2. Ensure all interactive elements receive focus
3. Check that focus indicators are visible
4. Verify logical tab order

#### Screen Reader Testing

Test with screen readers when possible:

- **NVDA** (Windows, free)
- **JAWS** (Windows, commercial)
- **VoiceOver** (macOS, built-in)
- **Orca** (Linux, free)

#### Visual Testing

- Test at 200% zoom level
- Check in high contrast mode
- Verify with different color settings
- Test on mobile devices

### Common Issues and Solutions

#### Missing Alt Text

**Problem:** Images without alternative text
**Solution:** Add descriptive alt text to all images

#### Poor Heading Structure

**Problem:** Skipped heading levels or non-descriptive headings
**Solution:** Use logical heading hierarchy with descriptive text

#### Insufficient Color Contrast

**Problem:** Text that's hard to read due to poor contrast
**Solution:** Use colors that meet WCAG contrast requirements

#### Inaccessible Links

**Problem:** Links with non-descriptive text like "click here"
**Solution:** Use descriptive link text that explains the destination

#### Missing Form Labels

**Problem:** Form inputs without proper labels
**Solution:** Associate labels with form controls using `for` and `id` attributes

## Content Review Checklist

Before publishing content, verify:

### Structure and Navigation

- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Descriptive headings that make sense out of context
- [ ] Logical reading order
- [ ] Clear page structure

### Images and Media

- [ ] All images have descriptive alt text
- [ ] Complex images have additional descriptions
- [ ] Decorative images have empty alt text
- [ ] Media files have appropriate alternatives

### Links and Interaction

- [ ] Link text describes the destination
- [ ] External links and downloads are identified
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible

### Content Quality

- [ ] Language is clear and appropriate for audience
- [ ] Technical terms are defined
- [ ] Content is well-organized with appropriate lists
- [ ] Color is not the only way information is conveyed

### Technical Validation

- [ ] HTML validates correctly
- [ ] Automated accessibility tests pass
- [ ] Manual keyboard testing completed
- [ ] Content works at 200% zoom

## Resources and Tools

### Testing Tools

- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluator
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) - Color contrast testing

### Guidelines and Standards

- [RGAA 4.1](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/) - French accessibility guidelines
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - International accessibility guidelines
- [WebAIM](https://webaim.org/) - Accessibility resources and training

### Screen Readers

- [NVDA](https://www.nvaccess.org/) - Free screen reader for Windows
- [VoiceOver Guide](https://webaim.org/articles/voiceover/) - Using macOS VoiceOver
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) - Commercial screen reader

## Getting Help

### Internal Resources

- Accessibility team contact: [accessibility@institution.edu]
- Technical support: [tech-support@institution.edu]
- Content review requests: [content-review@institution.edu]

### Training and Support

- Regular accessibility training sessions
- One-on-one content review sessions
- Accessibility testing workshops
- Screen reader demonstration sessions

Remember: Accessibility is everyone's responsibility. When in doubt, ask for help or err on the side of inclusion.
