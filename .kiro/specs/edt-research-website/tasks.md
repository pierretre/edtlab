# Implementation Plan

## Project Setup and Foundation

- [x] 1. Initialize Astro.js project with TypeScript and required dependencies
  - Create new Astro project with TypeScript template
  - Install Tailwind CSS, Flowbite, and Sass dependencies
  - Configure Astro for static site generation with ES modules
  - Set up development scripts and build configuration
  - _Requirements: 19.1, 19.2, 19.3_

- [x] 2. Configure internationalization and routing structure
  - Install and configure Astro i18n integration
  - Set up prefix-based routing for English (`/en/`) and French (`/fr/`)
  - Create language detection and fallback mechanisms
  - Configure URL structure consistency across languages
  - _Requirements: 24.1, 24.2, 24.3, 5.3, 5.4_

- [x] 3. Set up Tailwind CSS with Flowbite and Marianne font
  - Configure Tailwind CSS with custom configuration
  - Install and configure Flowbite component library
  - Add Marianne font files and CSS configuration
  - Set up custom color scheme and accessibility-compliant contrast ratios
  - _Requirements: 19.2, 19.3, 30.1, 30.2_

## Content Architecture and Collections

- [x] 4. Create Astro Content Collections with Zod schemas
  - Define content collections for pages, publications, events, and job offers
  - Create Zod validation schemas for each content type
  - Set up bilingual content structure with language field validation
  - Configure content directory structure matching design specifications
  - _Requirements: 22.1, 22.2, 22.3, 23.1, 23.2_

- [x] 5. Create navigation menu structure and data
  - Create English and French navigation menu JSON files
  - Define 8-section menu structure (Program, Projects, Production, Demo Center, Resources, News, Join Us, Contact)
  - Implement hierarchical navigation with dropdown support
  - Ensure menu consistency across languages
  - _Requirements: 1.3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [x] 6. Create bilingual content pages structure
  - Create all main section pages with bilingual content files (en.md, fr.md)
  - Set up focused projects pages (PC1-PC5) with individual directories
  - Implement production subsections (publications, platform)
  - Create sample content for publications, events, and job offers collections
  - _Requirements: 22.4, 23.3, 23.4, 5.3, 3.2, 16.2_

## Core Layout and Components

- [x] 7. Build basic navigation and language switching components
  - Create Navigation component with Flowbite Navbar and responsive design
  - Implement LanguageToggle component with accessible language switching
  - Set up UI translation strings in `src/i18n/ui.ts`
  - Add mobile menu support with Flowbite collapse functionality
  - _Requirements: 5.1, 5.2, 5.5, 24.4, 24.5, 28.1, 29.1_

- [x] 8. Create reusable BaseLayout component and integrate with existing pages
  - Build BaseLayout component with meta tags, analytics, and RGAA compliance
  - Add Header and Footer components with site branding and contact info
  - Update `src/pages/[lang]/index.astro` to use BaseLayout
  - Update `src/pages/[lang]/[...slug].astro` to use BaseLayout
  - Add skip links and focus management for accessibility
  - _Requirements: 28.1, 28.4, 29.1, 29.2, 31.4_

- [x] 9. Build content-specific layout components
  - Create PageLayout component extending BaseLayout with Breadcrumb and TOC
  - Build HomeLayout component for front page with TileGrid using Flowbite Cards
  - Update existing page files to use appropriate layout components
  - Ensure all layouts are responsive and accessible
  - _Requirements: 2.1, 2.4, 1.2, 1.4_

## Dynamic Content Integration

- [x] 10. Implement content-driven page routing in existing slug handler
  - Update `src/pages/[lang]/[...slug].astro` to use content collections for page rendering
  - Replace static page list with dynamic content collection queries
  - Integrate PageLayout component for proper content display
  - Add proper error handling for missing content and 404 pages
  - Ensure bilingual content is properly rendered with correct metadata
  - _Requirements: 22.1, 22.4, 23.3, 23.4_

- [x] 11. Build publications system with filtering and integrate with content pages
  - Create PublicationList component with Flowbite Table and filters
  - Implement filtering by type and year using existing schema
  - Update production/publications content pages to display PublicationList
  - Ensure publications are rendered through the content-driven routing system
  - Create publication templates for editors to use
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 3.3_

- [x] 12. Create job offers system and integrate with join-us pages
  - Build JobOfferCard components with Flowbite Cards and Badges
  - Update join-us content pages to display job offers
  - Add filtering by project (PC1-PC5) using existing schema
  - Link job offers to specific projects through content routing
  - Ensure job offers work with the PageLayout component
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 3.7_

- [x] 13. Build events system and integrate with news pages
  - Create EventCard components using Flowbite Timeline or Cards
  - Update news content pages to display events with chronological organization
  - Add event filtering by type using existing schema
  - Ensure events are rendered through the content-driven routing system
  - Integrate events into news index pages using PageLayout
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 3.6_

## Project Pages and Management

- [x] 14. Create project pages and management
- [ ] 14.1 Build individual project pages (PC1-PC5)
  - Create dynamic project page template with ProjectLayout and ProjectHero components
  - Display project objectives, participants, and progress using structured content
  - Show related publications and resources for each project through content integration
  - Implement responsive design with optional table of contents sidebar
  - Ensure proper image handling and optimization for project illustrations
  - _Requirements: 2.3, 4.2, 16.2, 28.2, 31.3_

- [ ] 14.2 Implement projects listing and navigation
  - Create projects overview page with all 5 projects using existing focused-projects index pages
  - Build project cards with key information and links using TileGrid component
  - Implement filtering and search within projects through navigation structure
  - Ensure consistent project branding and color schemes across all project pages
  - Integrate project navigation with main site navigation menu
  - _Requirements: 2.3, 9.1, 1.3, 3.2_

## Front Page and User Experience

- [x] 15. Enhance front page with interactive content using HomeLayout
  - Update `src/pages/[lang]/index.astro` to use HomeLayout component
  - Build Hero section using Flowbite Hero component
  - Implement 8 interactive navigation tiles using Flowbite Cards
  - Add smooth transitions and hover effects
  - Replace placeholder content with dynamic content from collections
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 1.1_

- [x] 16. Update color scheme to Scampi and Woodsmoke palette
  - Replace existing EDT color scheme with Scampi primary colors
  - Update secondary colors to Woodsmoke palette
  - Ensure RGAA 4.1 AA compliance with new color contrast ratios
  - Update CSS custom properties and Tailwind configuration
  - Verify accessibility across all components and pages
  - _Requirements: 30.1, 30.2, 30.3_

- [x] 17. Integrate project diagrams and visual content from assets
  - Add project overview diagrams (PC1-PC5) to focused projects pages
  - Integrate main program architecture diagrams into program page
  - Add physical-digital twin relationship diagram to relevant sections
  - Create responsive image components with proper alt text and captions
  - Optimize images for web delivery and accessibility compliance
  - Ensure all images meet RGAA 4.1 requirements for alternative text
  - _Requirements: 28.3, 31.3, 3.2, 16.2_

- [x] 18. Optimize images using Astro's Picture component and consolidate image assets
  - Replace ResponsiveImage and OptimizedImage components with Astro's built-in Picture component
  - Move all images from public/ folder to src/assets/images/ for Astro optimization
  - Remove duplicate images between public/ and src/assets/images/ directories
  - Update all image references throughout the codebase to use assets instead of public paths
  - Implement Picture component with responsive breakpoints and modern formats (WebP, AVIF)
  - Remove custom image optimization components that are no longer needed
  - Ensure all images maintain proper alt text and accessibility compliance
  - _Requirements: 4.3, 28.2, 31.3_

## Accessibility Implementation

- [x] 19. Implement basic accessibility foundation
  - Set up RGAA-compliant color contrast ratios in Tailwind config
  - Add accessible typography with Marianne font and proper line heights
  - Implement focus management and visible focus indicators
  - Add basic keyboard navigation support
  - _Requirements: 30.1, 30.2, 30.3, 29.1, 29.2_

- [x] 20. Enhance RGAA 4.1 AA compliance features
  - Add semantic HTML structure with proper heading hierarchy
  - Implement ARIA labels and roles for complex components
  - Ensure all interactive elements have accessible names
  - Add alternative text requirements for all images
  - _Requirements: 28.1, 28.2, 28.3, 28.4, 31.1, 31.2, 31.3_

- [ ] 21. Add screen reader and assistive technology support
  - Implement proper content structure for screen readers
  - Add descriptive labels for all form elements
  - Create accessibility statement page
  - Ensure dynamic content updates are announced
  - _Requirements: 31.1, 31.2, 31.5, 33.3_

## Performance and SEO Optimization

- [x] 22. Implement performance optimization features
  - Configure static site generation for sub-3-second load times
  - Optimize images and assets for fast loading
  - Implement caching strategies and CDN-ready static files
  - Optimize for fast loading and good user experience
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 1.1, 1.4_

- [x] 23. Add SEO optimization and search engine features
  - Implement meta tags and structured data for search optimization
  - Generate XML sitemaps for search engine crawling
  - Optimize page titles and descriptions for search visibility
  - Ensure proper URL structure and internal linking
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

## Analytics and Monitoring

- [x] 24. Integrate Matomo analytics with Docker deployment
  - Set up Matomo Docker container with MySQL database
  - Configure Matomo tracking script integration in BaseLayout component
  - Implement GDPR-compliant analytics with privacy controls
  - Add user behavior and engagement tracking with custom events
  - Configure geographic distribution and language preference tracking
  - Track content performance and actionable interactions
  - Set up Matomo dashboard for website analytics monitoring
  - _Requirements: 27.1, 27.2, 27.3, 27.4, 27.5_

## Content Management and Documentation

- [x] 25. Create content templates and editor documentation
  - Build markdown templates for different content types
  - Create comprehensive content creation guidelines
  - Document all available frontmatter options
  - Provide examples and templates for common content types
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 15.1, 15.2, 15.3, 15.4, 15.5_

- [x] 26. Set up development environment and preview system
  - Configure local development environment with hot-reload
  - Set up content preview functionality for both languages
  - Implement content validation and error handling
  - Enable build system with proper static site generation
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

## Code Quality and Refactoring

- [x] 27. Refactor duplicate utility functions across codebase
  - Identify and catalog all duplicate utility functions across different files
  - Create centralized utility modules organized by functional categories (string, date, validation, etc.)
  - Consolidate duplicate functions into single, well-designed interfaces
  - Update all import statements to reference centralized utility functions
  - Ensure TypeScript types and JSDoc documentation for all utility functions
  - Maintain test coverage and update test imports for refactored utilities
  - Verify no regression issues are introduced during refactoring
  - _GitHub Issue: #2 - Refactoring of utils functions_

## Testing and Quality Assurance

- [ ] 28. Implement automated testing suite
  - Create unit tests for critical components
  - Add route testing to verify all pages are accessible
  - Implement automated accessibility testing with axe-core
  - Set up content validation and schema testing
  - _Requirements: 26.1, 26.2, 26.3, 33.2_

- [x] 29. Set up CI/CD pipeline with automated testing
  - Create GitHub Actions workflow for automated testing
  - Configure unit test execution on pull requests and pushes
  - Add route testing to verify all content pages are accessible
  - Implement build validation and deployment checks
  - Set up test coverage reporting and quality gates
  - _Requirements: 26.1, 26.2, 26.3, 20.2_

- [x] 30. Enhance CI pipeline with comprehensive route and link testing
  - Create separate script for route accessibility testing with current routes (excluding content-specific routes)
  - Update Playwright configuration to include comprehensive link verification testing
  - Implement automated testing of all internal and external links from each web page
  - Add link validation to ensure no broken links exist across the site
  - Configure CI to run link verification as part of the testing pipeline
  - Set up proper error reporting and failure handling for broken links
  - Ensure route testing covers all main navigation paths and content pages
  - _Requirements: 26.1, 26.2, 26.3, 4.1, 4.2_

- [ ] 31. Add manual testing procedures
  - Create accessibility testing procedures with assistive technology
  - Document keyboard navigation testing protocols
  - Set up content review and translation validation processes
  - Implement basic testing procedures
  - _Requirements: 33.1, 33.4, 33.5_

## Deployment and Infrastructure

- [x] 32. Set up build and deployment pipeline with Matomo integration
  - Configure automated build process for static site generation
  - Implement continuous deployment pipeline with testing
  - Set up Docker containerization with Nginx for web server
  - Create Docker Compose configuration for multi-container deployment
  - Configure Matomo Docker container with MySQL database
  - Set up reverse proxy configuration for Matomo analytics access
  - Configure deployment to VPS with SSL/TLS certificates for both website and Matomo
  - Ensure proper network configuration between containers
  - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 17.1, 17.2_

- [ ] 33. Configure production monitoring and maintenance with Matomo
  - Set up uptime monitoring and performance alerts for both website and Matomo
  - Implement error tracking and log management for multi-container setup
  - Configure automated security updates and backups for website and Matomo database
  - Add content freshness monitoring and validation
  - Configure log rotation and monitoring for Docker containers
  - Implement health checks for all services (website, Matomo, MySQL)
  - _Requirements: 17.3, 17.4, 17.5_

## Final Integration and Launch

- [x] 34. Populate initial content and perform final testing
  - Migrate existing program content and documentation
  - Populate all content sections with initial bilingual content
  - Perform comprehensive accessibility and performance testing
  - Validate all requirements are met and functional
  - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_

- [x] 35. Build interactive contact form on contact page
  - Create ContactForm component with Flowbite form elements
  - Implement form validation with client-side and server-side validation
  - Add bilingual form labels and error messages
  - Integrate form submission handling with email functionality
  - Ensure RGAA 4.1 accessibility compliance for form elements
  - Add proper ARIA labels and error announcements
  - Implement form success and error states with user feedback
  - _Requirements: 3.8, 28.1, 28.2, 31.1, 31.2_

## Content Filtering System Refactoring

- [x] 36. Create core filtering utilities and types
  - Create TypeScript type definitions for filter system
  - Define FilterConfig, FilterSystemConfig, and FilterManager interfaces
  - Create filter configuration validation utilities
  - _Requirements: 36.1, 36.4, 37.1, 37.4_

- [x] 37. Implement FilterManager class
  - Create FilterManager class implementing the interface
  - Implement filter state management (Map-based storage)
  - Implement URL synchronization (loadFromURL, updateURL methods)
  - Implement filter application logic with AND logic for multiple filters
  - Implement debouncing for search inputs
  - Implement event listener attachment and cleanup
  - _Requirements: 36.2, 37.5, 38.1, 38.2, 38.3, 39.1, 39.2, 42.2_

- [x] 38. Create FilterSidebar Astro component
  - Create reusable FilterSidebar.astro component
  - Implement rendering logic for select filters
  - Implement rendering logic for search filters
  - Add proper ARIA labels and accessibility attributes
  - Support internationalization for labels and options
  - Add clear filters button
  - _Requirements: 36.1, 37.3, 43.1, 43.5_

- [x] 39. Create filter configurations for each content type
  - Create job offers filter configuration (project, type, status, search)
  - Create publications filter configuration (project, type, year, search)
  - Create news filter configuration (project, category, sort, search)
  - Define filter predicates for each filter type
  - Map URL parameters for each filter
  - _Requirements: 41.1, 41.3, 41.4, 41.5_

- [x] 40. Refactor all list components with new filtering system
  - Replace inline filtering logic with FilterManager in JobOfferList
  - Replace inline filtering logic with FilterManager in PublicationList
  - Replace inline filtering logic with FilterManager in NewsList
  - Integrate FilterSidebar component in all three lists
  - Update data attributes on all content items
  - Implement sorting functionality for NewsList
  - Integrate with existing pagination in NewsList
  - Remove all duplicate filtering code
  - Test filtering functionality across all lists
  - Verify URL persistence works correctly
  - Verify accessibility compliance
  - _Requirements: 36.3, 38.4, 38.5, 40.1, 40.2, 40.3, 41.2, 43.3, 43.4_

- [ ] 41. Write comprehensive property tests for filtering system
- [ ] 41.1 Write property test for filter configuration validation
  - **Property 1: Filter configuration generates correct UI elements**
  - **Validates: Requirements 36.1**
- [ ] 41.2 Write property test for AND logic
  - **Property 6: AND logic for multiple filters**
  - **Validates: Requirements 38.1**
- [ ] 41.3 Write property test for URL synchronization
  - **Property 10: URL state synchronization**
  - **Validates: Requirements 39.1, 39.2, 39.3**
- [ ] 41.4 Write property test for debouncing
  - **Property 8: Search debouncing**
  - **Validates: Requirements 38.3, 42.2**
- [ ] 41.5 Write property test for results count accuracy
  - **Property 9: Results count accuracy**
  - **Validates: Requirements 38.5**
- [ ] 41.6 Write property test for clear filters
  - **Property 11: Clear filters reset**
  - **Validates: Requirements 40.1, 40.2, 40.3**
- [ ] 41.7 Write property test for keyboard accessibility
  - **Property 15: Keyboard accessibility**
  - **Validates: Requirements 43.3**
- [ ] 41.8 Write property test for focus management
  - **Property 16: Focus management**
  - **Validates: Requirements 43.4**
- [ ] 41.9 Write property test for immediate updates
  - **Property 7: Immediate filter updates**
  - **Validates: Requirements 38.2**
- [ ] 41.10 Write property test for filter performance
  - **Property 13: Filter performance**
  - **Validates: Requirements 42.1**
- [ ] 41.11 Write property test for ARIA labels
  - **Property 14: ARIA label presence**
  - **Validates: Requirements 43.1**
- [ ] 41.12 Write property test for semantic HTML
  - **Property 17: Semantic HTML usage**
  - **Validates: Requirements 43.5**

- [ ] 42. Performance optimization and error handling
  - Implement DOM element caching
  - Optimize filter predicate execution
  - Add performance monitoring for filter operations
  - Test with datasets up to 1000 items
  - Verify 100ms performance target
  - Implement validation for invalid filter values
  - Handle missing DOM elements gracefully
  - Validate URL parameters before applying
  - Add error logging and user feedback
  - Test with malformed URLs and invalid inputs
  - _Requirements: 42.1, 42.3, 39.5_

- [ ] 44. Documentation and cleanup for filtering system
  - Document filter configuration format
  - Create usage examples for each content type
  - Add JSDoc comments to FilterManager
  - Update component documentation
  - Remove old filtering code from all components
  - _Requirements: 36.1, 37.1_

- [ ] 45. Final checkpoint - Ensure all filtering tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Internationalization Optimization

- [x] 46. Optimize i18n translation files
  - Analyze all translation key usage across the codebase
  - Remove unused translation keys from ui.ts
  - Consolidate duplicate or similar translation keys
  - Refactor translation structure for better maintainability
  - Update TypeScript types to reflect changes
  - Verify no broken translations after optimization
  - _Requirements: 24.1, 24.2, 24.3, 5.3, 5.4_

## Job Offer System Enhancement

- [x] 47. Update job offer data model and schema
- [x] 47.1 Update JobOffer TypeScript interface
  - Remove `deadline` field from JobOffer interface
  - Add `expectedStartDate` string field for flexible date formats
  - Add `filled` boolean field with default false value
  - Add optional `contacts` array field for multiple email addresses
  - Update all type imports throughout the codebase
  - _Requirements: 44.1, 46.1, 47.1_

- [x] 47.2 Update Zod schema for job offers collection
  - Remove deadline validation from jobOffersSchema
  - Add expectedStartDate string validation with flexible format support
  - Add filled boolean validation with default false
  - Add contacts array validation with email format checking
  - Update schema to handle backward compatibility during migration
  - _Requirements: 44.5, 46.4, 47.2_

- [ ]* 47.3 Write property tests for job offer schema
  - **Property 22: Flexible date format support** - Validates: Requirements 44.5
  - **Property 28: Boolean filled field support** - Validates: Requirements 46.1
  - **Property 31: Boolean field validation** - Validates: Requirements 46.4
  - **Property 33: Email validation in contacts** - Validates: Requirements 47.2

- [x] 48. Update job offer content files and templates
- [x] 48.1 Migrate existing job offer markdown files
  - Update all job offer files in `src/content/job-offers/` to use new schema
  - Replace `deadline` frontmatter with `expectedStartDate`
  - Add `filled: false` to all existing job offers
  - Add `contacts` array with appropriate email addresses for each position
  - Ensure all files validate against updated schema
  - _Requirements: 44.1, 46.3, 47.1_

- [x] 48.2 Update job offer templates for editors
  - Create new job offer template with updated frontmatter fields
  - Document expectedStartDate format options (specific dates, "Spring 2025", "Q2 2025")
  - Document filled field usage and boolean values
  - Document contacts array format and email validation
  - Update editor documentation with new field explanations
  - _Requirements: 44.4, 46.5, 47.5_

- [x] 49. Update JobOfferCard component
  - Replace deadline display with expectedStartDate
  - Add "Expected Start Date" label to job offer cards
  - Handle flexible date format display (dates, seasons, quarters)
  - Ensure proper internationalization for date labels
  - _Requirements: 44.1, 44.4_

- [x] 49.3 Implement multiple contact email handling
  - Generate mailto links using all emails from contacts array
  - Provide fallback contact information when contacts is empty
  - Validate email format before generating mailto links
  - Handle single vs. multiple contact display appropriately
  - _Requirements: 45.4, 45.5, 47.3, 47.4_

- [ ]* 49.4 Write property tests for JobOfferCard component
  - **Property 23: Filled position UI hiding** - Validates: Requirements 45.1
  - **Property 24: Position filled indicator display** - Validates: Requirements 45.2
  - **Property 25: Available position apply button** - Validates: Requirements 45.3
  - **Property 27: Mailto link generation** - Validates: Requirements 45.5

- [x] 50. Update JobOfferList component with new filtering logic
- [x] 50.1 Implement availability-based filtering
  - Add showOnlyAvailable prop to filter by filled status
  - Add showOnlyFilled prop for filled position displays
  - Update filtering logic to handle filled field
  - Ensure backward compatibility during migration
  - _Requirements: 48.1, 48.4, 49.1_

- [x] 50.2 Implement expected start date sorting
  - Replace deadline-based sorting with expectedStartDate sorting
  - Handle flexible date formats in sorting logic
  - Implement chronological organization by start date
  - Ensure proper date parsing for different formats
  - _Requirements: 44.3, 48.3_

- [ ]* 50.3 Write property tests for JobOfferList component
  - **Property 20: Chronological sorting by start date** - Validates: Requirements 44.3
  - **Property 36: Project page available filtering** - Validates: Requirements 48.1
  - **Property 39: Filled position hiding from main listings** - Validates: Requirements 48.4

- [x] 51. Create FilledPhDComponent for project pages
- [x] 51.1 Build FilledPhDComponent
  - Create new component to display filled PhD positions
  - Filter positions by filled=true AND type='phd'
  - Filter by project association (PC1, PC2, PC3, PC4, PC5)
  - Exclude non-PhD positions (postdoc, engineer, intern)
  - Position component at bottom of project pages
  - Minimal information displayed (Title, description, location, dates)
  - _Requirements: 49.1, 49.2, 49.3, 49.4_

- [x] 51.2 Integrate FilledPhDComponent with project pages
  - Add FilledPhDComponent to all project page templates
  - Pass appropriate project filter to component
  - Ensure proper styling and layout integration
  - Add appropriate section heading and context
  - _Requirements: 49.1, 49.5_

- [ ]* 51.3 Write property tests for FilledPhDComponent
  - **Property 40: Filled PhD dedicated component display** - Validates: Requirements 49.1
  - **Property 41: PhD-only filled component filtering** - Validates: Requirements 49.2
  - **Property 42: Filled PhD project association** - Validates: Requirements 49.3
  - **Property 43: Non-PhD exclusion from filled component** - Validates: Requirements 49.4

- [ ] 52. Update project pages with new job offer logic
- [ ] 52.1 Update project page templates
  - Modify project pages to show only available job offers in main listings
  - Integrate FilledPhDComponent at bottom of each project page
  - Update job offer filtering to use project association
  - Ensure proper separation between available and filled position displays
  - _Requirements: 48.1, 48.2, 49.1_

- [ ]* 52.2 Write property tests for project page integration
  - **Property 37: Project association filtering** - Validates: Requirements 48.2
  - **Property 38: Start date independent availability** - Validates: Requirements 48.3

- [ ] 53. Add availability status filter
  - Add filled/available filter option to job offer configuration
  - Implement filter predicate for filled boolean field
  - Update filter UI to show availability options
  - Ensure proper internationalization for new filter labels
  - _Requirements: 45.1, 46.2_

- [ ]* 54. Write comprehensive property tests for job offer system
  - **Property 18: Expected start date display** - Validates: Requirements 44.1
  - **Property 19: Open indefinitely behavior** - Validates: Requirements 44.2
  - **Property 21: Expected start date label presence** - Validates: Requirements 44.4
  - **Property 26: Multiple contact email support** - Validates: Requirements 45.4
  - **Property 29: Filled position unavailability marking** - Validates: Requirements 46.2
  - **Property 30: Default availability behavior** - Validates: Requirements 46.3
  - **Property 32: Contacts array support** - Validates: Requirements 47.1
  - **Property 34: Complete contact inclusion in mailto** - Validates: Requirements 47.3
  - **Property 35: Fallback contact handling** - Validates: Requirements 47.4

- [ ] 55. Update editor documentation
  - Update content creation guidelines for new job offer fields
  - Document expectedStartDate format options and examples
  - Explain filled field usage and impact on display
  - Document contacts array format and validation
  - Update job offer template documentation
  - _Requirements: 9.1, 9.2, 9.3, 9.4_