# Component Usage Guide

This guide explains how to use MDX components in advanced content pages to create rich, interactive experiences while maintaining accessibility and performance.

## Overview

MDX allows you to use Astro components directly in your markdown content, enabling:

- Interactive elements and dynamic content
- Consistent styling and behavior
- Reusable content patterns
- Enhanced accessibility features
- Responsive design elements

## Available Components

### OptimizedFigure

Displays images with responsive sizing, accessibility features, and optional captions.

#### Usage

```mdx
import OptimizedFigure from '@components/OptimizedFigure.astro';

<OptimizedFigure 
  src="image-filename.jpg"
  alt="Descriptive alt text for accessibility"
  caption="Optional caption providing additional context"
/>
```

#### Props

- `src` (required): Image filename (relative to `src/assets/images/` or `public/`)
- `alt` (required): Alternative text for screen readers
- `caption` (optional): Caption text displayed below the image
- `width` (optional): Maximum width constraint
- `height` (optional): Maximum height constraint

#### Guidelines

- Always provide descriptive alt text
- Use captions to provide additional context, not just repeat the alt text
- Optimize images before adding them to the project
- Use meaningful filenames

#### Example

```mdx
<OptimizedFigure 
  src="/src/assets/images/INRIA_EDT_CBLOT_PC1.jpg"
  alt="PC1 project diagram showing model hybridization workflow with data inputs, processing stages, and output validation"
  caption="PC1 Model Hybridization: Workflow diagram illustrating the integration of physical and data-driven models in digital twin applications"
/>
```

### EventList

Displays a filtered list of events with customizable display options.

#### Usage

```mdx
import EventList from '@components/EventList.astro';

<EventList 
  limit={5}
  showType={true}
  lang="en"
  filterType="conference"
/>
```

#### Props

- `limit` (optional): Maximum number of events to display (default: 10)
- `showType` (optional): Show event type badges (default: true)
- `lang` (required): Language filter ("en" or "fr")
- `filterType` (optional): Filter by event type ("conference", "workshop", "seminar")
- `showPast` (optional): Include past events (default: false)

#### Guidelines

- Use appropriate limits to avoid overwhelming users
- Consider the page context when choosing filters
- Include both upcoming and recent events when relevant

### PublicationList

Displays publications with filtering and sorting capabilities.

#### Usage

```mdx
import PublicationList from '@components/PublicationList.astro';

<PublicationList 
  limit={10}
  showFilters={true}
  defaultType="all"
  defaultYear="all"
  showAuthors={true}
/>
```

#### Props

- `limit` (optional): Maximum number of publications to display
- `showFilters` (optional): Display filter controls (default: true)
- `defaultType` (optional): Default publication type filter
- `defaultYear` (optional): Default year filter
- `showAuthors` (optional): Display author information (default: true)
- `showVenue` (optional): Display venue information (default: true)

#### Guidelines

- Enable filters for large publication lists
- Consider the target audience when setting defaults
- Provide clear categorization

### JobOfferList

Displays current job opportunities with project-based filtering.

#### Usage

```mdx
import JobOfferList from '@components/JobOfferList.astro';

<JobOfferList 
  limit={5}
  showProject={true}
  lang="en"
  filterProject="PC1"
/>
```

#### Props

- `limit` (optional): Maximum number of job offers to display
- `showProject` (optional): Display project badges (default: true)
- `lang` (required): Language filter ("en" or "fr")
- `filterProject` (optional): Filter by specific project ("PC1"-"PC5", "General")
- `showDeadline` (optional): Display application deadlines (default: true)

#### Guidelines

- Keep job lists current and relevant
- Highlight urgent deadlines
- Provide clear project associations

### TableOfContents

Generates an interactive table of contents for long-form content.

#### Usage

```mdx
import TableOfContents from '@components/TableOfContents.astro';

<TableOfContents 
  maxDepth={3}
  showNumbers={true}
/>
```

#### Props

- `maxDepth` (optional): Maximum heading level to include (default: 3)
- `showNumbers` (optional): Show section numbers (default: false)
- `sticky` (optional): Make TOC sticky on scroll (default: true)

#### Guidelines

- Use for pages with multiple sections
- Consider mobile experience with sticky positioning
- Limit depth to maintain usability

### Breadcrumb

Displays navigation breadcrumbs for page hierarchy.

#### Usage

```mdx
import Breadcrumb from '@components/Breadcrumb.astro';

<Breadcrumb 
  items={[
    { name: "Home", href: "/" },
    { name: "Projects", href: "/focused-projects" },
    { name: "PC1", href: "/focused-projects/fp1" }
  ]}
/>
```

#### Props

- `items` (required): Array of breadcrumb items with `name` and `href`
- `separator` (optional): Custom separator character (default: "/")

#### Guidelines

- Provide logical navigation hierarchy
- Keep breadcrumb labels concise
- Ensure all links are functional

## Layout Components

### Grid Layouts

Use CSS Grid classes for complex layouts:

```mdx
<div class="grid md:grid-cols-2 gap-6 my-8">
  <div>
    <h4>Left Column</h4>
    <p>Content for the left column.</p>
  </div>
  <div>
    <h4>Right Column</h4>
    <p>Content for the right column.</p>
  </div>
</div>
```

### Card Layouts

Create card-style content sections:

```mdx
<div class="bg-white rounded-lg shadow-md p-6 my-4">
  <h3 class="text-lg font-semibold mb-3">Card Title</h3>
  <p>Card content with proper spacing and styling.</p>
</div>
```

### Alert Boxes

Highlight important information:

```mdx
<div class="bg-primary-50 border-l-4 border-primary-500 p-4 my-6">
  <div class="flex">
    <div class="ml-3">
      <p class="text-sm text-primary-700">
        <strong>Important:</strong> This is highlighted information.
      </p>
    </div>
  </div>
</div>
```

## Interactive Elements

### Expandable Sections

Use HTML details/summary for collapsible content:

```mdx
<details class="my-4">
<summary class="cursor-pointer font-semibold text-primary-600 hover:text-primary-800">
Click to expand additional information
</summary>

<div class="mt-3 pl-4 border-l-2 border-gray-200">
This content is hidden by default and expands when clicked.

- Hidden bullet point 1
- Hidden bullet point 2
- Hidden bullet point 3
</div>
</details>
```

### Tabbed Content

Create tabbed interfaces for organized content:

```mdx
<div class="border-b border-gray-200">
  <nav class="-mb-px flex space-x-8">
    <button class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
      Tab 1
    </button>
    <button class="border-primary-500 text-primary-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
      Tab 2
    </button>
  </nav>
</div>
```

## Best Practices

### Performance Considerations

- Only import components you actually use
- Optimize images before including them
- Use appropriate limits for dynamic lists
- Test page load times with components

### Accessibility Guidelines

- Provide alt text for all images
- Use semantic HTML structure
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper heading hierarchy

### Responsive Design

- Test components on mobile devices
- Use responsive grid classes
- Consider touch interfaces
- Ensure readable text sizes

### Content Organization

- Use components to enhance, not replace, good content structure
- Maintain logical information hierarchy
- Group related content together
- Provide clear navigation paths

## Troubleshooting

### Common Issues

#### Component Not Rendering

- Check import path is correct
- Verify component exists in the components directory
- Ensure all required props are provided

#### Styling Issues

- Check Tailwind classes are applied correctly
- Verify responsive breakpoints work as expected
- Test in different browsers

#### Performance Problems

- Reduce number of components per page
- Optimize images and media
- Check for unnecessary re-renders

#### Accessibility Violations

- Run automated accessibility tests
- Test with keyboard navigation
- Verify screen reader compatibility

### Debugging Tips

- Use browser developer tools
- Check console for error messages
- Validate HTML structure
- Test component props individually

## Advanced Usage

### Custom Component Styling

```mdx
<div class="custom-component-wrapper">
  <OptimizedFigure 
    src="diagram.jpg"
    alt="Custom styled diagram"
    class="border-2 border-primary-300 rounded-lg"
  />
</div>
```

### Combining Components

```mdx
<div class="grid lg:grid-cols-3 gap-8">
  <div class="lg:col-span-2">
    <EventList limit={5} lang="en" />
  </div>
  <div>
    <JobOfferList limit={3} lang="en" showProject={true} />
  </div>
</div>
```

### Conditional Content

```mdx
{/* Show different content based on language */}
{lang === 'en' ? (
  <EventList lang="en" filterType="conference" />
) : (
  <EventList lang="fr" filterType="conference" />
)}
```

## Component Development

### Creating New Components

When creating new reusable components:

1. Follow Astro component conventions
2. Include proper TypeScript types
3. Add accessibility features
4. Document props and usage
5. Test across different content types
6. Update this guide with usage instructions

### Component Guidelines

- Keep components focused and reusable
- Include proper error handling
- Follow accessibility best practices
- Use consistent styling patterns
- Document all props and behavior
