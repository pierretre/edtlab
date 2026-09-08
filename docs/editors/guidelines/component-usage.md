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

Displays an image with responsive sizing and an optional caption.

#### Usage

```mdx
import OptimizedFigure from '@components/OptimizedFigure.astro';

<OptimizedFigure
  src="/media/uploads/INRIA_EDT_PCs_ATs.png"
  alt="Descriptive alt text for accessibility"
  caption="Optional caption providing additional context"
/>
```

#### Props

- `src` (required): a string starting with `/media/uploads/` — the filename of an image already uploaded to `public/media/uploads/`. Any other value (a bare filename, an imported image object, a `src/assets/images/...` path) renders no image at all, silently.
- `alt` (required)
- `caption` (optional)
- `class` (optional): extra classes on the `<figure>`
- `loading` (optional): `"eager"` (default) or `"lazy"`
- `align` (optional): `"left"` | `"center"` (default) | `"right"`
- `maxWidth` (optional): number, in pixels

### EventTimeline

Renders the chronological timeline of program milestones and events for one language — combines the `calendar` collection entry with `news` items where `newsType: event`. Not filterable beyond language.

```mdx
import EventTimeline from '@components/EventTimeline.astro';

<EventTimeline lang="en" />
```

**Props:** `lang` (required): `"en"` or `"fr"`.

### PublicationList

```mdx
import PublicationList from '@components/PublicationList.astro';

<PublicationList lang="en" origin="edt" />
```

**Props:**

- `lang` (required): `"en"` or `"fr"`
- `origin` (optional): `"edt"` or `"external"` — omit to show all publications regardless of origin

There is no `limit`, `showFilters`, `defaultType`/`defaultYear`, or `showAuthors`/`showVenue` prop — filtering (by type, year, search) is built into the component's own UI, not configured from the outside.

### PositionList

Lists open (non-filled) positions for one language.

```mdx
import PositionList from '@components/PositionList.astro';

<PositionList lang="en" />
```

**Props:** `lang` (required): `"en"` or `"fr"`.

### TableOfContent

Note the singular name (`TableOfContent.astro`, not `TableOfContents`). It renders a project logo (if `projectId` matches `PC1`–`PC5`) plus a table of contents — but the TOC entries are generated client-side by scanning the page's `<article>` for `h1`/`h2` elements after load, not from a `headings` prop.

```mdx
import TableOfContent from '@components/TableOfContent.astro';

<TableOfContent projectId="PC1" />
```

**Props:** `projectId` (optional): `"PC1"`–`"PC5"` or `"FP1"`–`"FP5"`, selects the logo shown above the TOC. There is no `maxDepth`, `showNumbers`, or `sticky` prop.

### Breadcrumb

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

**Props:** `items` (required): array of `{ name, href? }`. There is no `separator` prop.

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
    src="/media/uploads/INRIA_EDT_PCs_ATs.png"
    alt="Custom styled diagram"
    class="border-2 border-primary-300 rounded-lg"
  />
</div>
```

### Combining Components

```mdx
<div class="grid lg:grid-cols-3 gap-8">
  <div class="lg:col-span-2">
    <EventTimeline lang="en" />
  </div>
  <div>
    <PositionList lang="en" />
  </div>
</div>
```

### Conditional Content

```mdx
{/* Show different content based on language */}
{lang === 'en' ? (
  <EventTimeline lang="en" />
) : (
  <EventTimeline lang="fr" />
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
