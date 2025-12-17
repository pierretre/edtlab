# How to Create and Manage News Content

This guide provides step-by-step instructions for creating, updating, and managing news content (events and press releases) on the EDT Research Website.

## Quick Start Checklist

- [ ] Determine content type (event or press release)
- [ ] Create both English and French versions
- [ ] Use appropriate naming convention
- [ ] Include required photo/image
- [ ] Fill all required frontmatter fields
- [ ] Write engaging, newsworthy content
- [ ] Test content before publishing
- [ ] Promote through appropriate channels

## Content Types Overview

The news system handles two types of content:

### Events
- Conferences, workshops, seminars
- Future or past events
- Associated with specific dates and locations
- Often linked to focused projects

### Press Releases
- Program announcements
- Funding news
- Partnership announcements
- Milestone achievements
- Media coverage

## File Structure and Naming

### Location
All news content is stored in: `src/content/news/`

### Naming Convention

**Events:**
```
event-{identifier}-{lang}.md
```

**Press Releases:**
```
press-{identifier}-{lang}.md
```

**Examples:**
```
event-models2024-conference-en.md
event-models2024-conference-fr.md
press-edt-funding-announcement-en.md
press-edt-funding-announcement-fr.md
event-pc1-workshop-spring2025-en.md
event-pc1-workshop-spring2025-fr.md
```

**Guidelines:**
- Use lowercase with hyphens
- Include descriptive identifier
- Keep names concise but clear
- Always create both language versions

## Step-by-Step Creation Process

### Step 1: Prepare Assets

**Required for All News:**
- Hero image/photo (high quality, web-optimized)
- Content in both English and French
- Relevant links and references

**Image Guidelines:**
- Format: JPG, PNG, or WebP
- Size: Minimum 1200px wide for social sharing
- Aspect ratio: 16:9 or 4:3 preferred
- File size: Under 500KB when possible
- Descriptive filename (e.g., `edt-funding-ceremony-2024.jpg`)

### Step 2: Create the Files

1. Navigate to `src/content/news/`
2. Create two files following the naming convention
3. Start with the English version, then translate to French

### Step 3: Set Up Frontmatter

#### For Events:

```yaml
---
title: "Event Title"
date: 2024-06-15 # Event date (YYYY-MM-DD)
newsType: "event"
location: "Paris, France" # Optional: event location
description: "Brief description for listings and SEO"
url: "https://conference2024.example.com" # Optional: event website
lang: "en" # en | fr
photo: "event-photo.jpg" # Required: filename in assets or public
tags: # Optional: project association
  - "PC1"
template: "default" # Optional: custom template
---
```

#### For Press Releases:

```yaml
---
title: "Press Release Title"
date: 2024-02-10 # Publication date (YYYY-MM-DD)
newsType: "press-release"
description: "Brief description for listings and SEO"
url: "https://news.example.com/article" # Optional: external coverage
lang: "en" # en | fr
photo: "press-photo.jpg" # Required: filename in assets or public
tags: # Optional: categorization
  - "announcement"
  - "PC2"
template: "default" # Optional: custom template
---
```

## Content Writing Guidelines

### Events

#### Structure Template:
```markdown
## Event Overview

Brief introduction to the event, its significance, and relevance to the EDT program.

## Key Information

- **Date**: [Event date and time]
- **Location**: [Venue and address or "Virtual"]
- **Registration**: [Link and deadline if applicable]
- **Contact**: [Organizer contact information]

## Program Highlights

- Key speakers or presentations
- Important sessions or workshops
- Networking opportunities
- Special activities

## EDT Participation

Describe how the EDT program or team members are involved:
- Presentations or papers
- Organizing committee participation
- Sponsored sessions
- Networking opportunities

## Registration and Attendance

Provide clear information about:
- How to register
- Registration fees (if any)
- Deadlines
- What's included
- Accommodation recommendations

## Related Resources

- Links to event website
- Related publications or materials
- Previous event coverage
- Contact information
```

#### Event-Specific Guidelines:

**Future Events:**
- Use present/future tense
- Include registration information
- Emphasize participation opportunities
- Provide practical attendance information

**Past Events:**
- Use past tense
- Include outcomes and highlights
- Share photos or videos if available
- Link to presentations or proceedings

### Press Releases

#### Structure Template:
```markdown
## Headline Summary

Lead paragraph with the most important information: who, what, when, where, why.

## Background and Context

Provide context for the announcement:
- Why this is significant
- How it relates to EDT program goals
- Impact on the research community

## Key Details

Specific information about the announcement:
- Funding amounts, partnership details, etc.
- Timeline and milestones
- Key participants or stakeholders

## Quotes and Statements

Include relevant quotes from:
- Program leadership
- Partner organizations
- Key researchers or participants

## About EDT Program

Brief boilerplate about the EDT program (can be standardized across releases).

## Contact Information

Media contact details for follow-up questions.
```

#### Press Release Guidelines:

**Writing Style:**
- Use inverted pyramid structure (most important first)
- Write in third person
- Use active voice
- Include specific facts and figures
- Avoid jargon and technical terms

**Content Requirements:**
- Clear, newsworthy angle
- Relevant quotes from stakeholders
- Specific dates and details
- Contact information for media inquiries

## Frontmatter Field Reference

### Required Fields (All News)

#### `title`
- **Purpose**: Headline displayed in listings and page headers
- **Guidelines**: 
  - Keep under 60 characters for SEO
  - Make it compelling and newsworthy
  - Include key information (event name, announcement type)

#### `date`
- **Format**: YYYY-MM-DD
- **Purpose**: Chronological sorting and organization
- **Guidelines**: 
  - For events: use event date
  - For press releases: use publication date

#### `newsType`
- **Options**: `event` or `press-release`
- **Purpose**: Content type identification and filtering

#### `description`
- **Purpose**: Brief summary for listings, search results, and SEO
- **Guidelines**:
  - Keep to 120-160 characters
  - Include key information and compelling details
  - Use action words and specific terms

#### `lang`
- **Options**: `en` or `fr`
- **Purpose**: Language-specific routing and content organization

#### `photo`
- **Format**: Filename string
- **Purpose**: Hero image for listings, cards, and social sharing
- **Guidelines**:
  - Store images in `src/assets/images/` or `public/`
  - Use descriptive filenames
  - Ensure high quality and appropriate licensing

### Optional Fields

#### `location` (Events)
- **Format**: "City, Country" or "Virtual"
- **Purpose**: Geographic information for event attendees
- **Examples**: "Paris, France", "Virtual", "Rennes, Brittany, France"

#### `url`
- **Format**: Valid URL
- **Purpose**: Link to external event website or press coverage
- **Guidelines**: Ensure links are working and relevant

#### `tags`
- **Format**: Array of strings
- **Purpose**: Categorization and filtering
- **Common Values**: 
  - Project codes: `PC1`, `PC2`, `PC3`, `PC4`, `PC5`
  - Event types: `conference`, `workshop`, `seminar`
  - Press categories: `announcement`, `partnership`, `milestone`

#### `template`
- **Format**: String
- **Purpose**: Custom rendering template
- **Guidelines**: Coordinate with developers for custom templates

## Bilingual Content Management

### Translation Guidelines

- **Equivalent Information**: Ensure both versions contain the same key facts
- **Cultural Adaptation**: Adapt examples and context for target audience
- **Local Relevance**: Include location-specific information when relevant
- **Consistent Messaging**: Maintain the same tone and key messages

### Language-Specific Considerations

**Events:**
- Adapt time zones and date formats
- Include local travel and accommodation information
- Translate speaker names and affiliations appropriately
- Consider local registration and payment methods

**Press Releases:**
- Adapt quotes to sound natural in target language
- Include relevant local context or implications
- Ensure proper translation of technical terms
- Consider local media landscape and interests

## Content Promotion Strategy

### Internal Channels

1. **Website Integration**:
   - Ensure content appears in news listings
   - Link from relevant project pages
   - Include in homepage news rotation

2. **Cross-References**:
   - Link to related publications
   - Reference relevant focused projects
   - Connect to related events or announcements

### External Promotion

1. **Social Media**:
   - Create engaging social media posts
   - Use appropriate hashtags
   - Tag relevant organizations and individuals

2. **Email Lists**:
   - Include in newsletters
   - Send to relevant mailing lists
   - Notify key stakeholders directly

3. **Media Outreach** (Press Releases):
   - Send to relevant journalists and publications
   - Follow up with key media contacts
   - Provide additional resources and interviews

## SEO and Discoverability

### Optimization Guidelines

1. **Keywords**:
   - Include relevant research terms
   - Use location names for events
   - Include organization and program names

2. **Meta Information**:
   - Craft compelling descriptions
   - Use descriptive titles
   - Include relevant tags

3. **Internal Linking**:
   - Link to related content
   - Reference focused projects
   - Connect to relevant publications

### Social Media Optimization

1. **Images**:
   - Use high-quality, engaging photos
   - Ensure proper aspect ratios for different platforms
   - Include alt text for accessibility

2. **Descriptions**:
   - Write platform-appropriate descriptions
   - Include relevant hashtags and mentions
   - Provide clear calls to action

## Quality Assurance Checklist

### Before Publishing

- [ ] Both language versions created with consistent information
- [ ] All required frontmatter fields completed
- [ ] High-quality photo included and properly referenced
- [ ] External links tested and working
- [ ] Content follows style guidelines
- [ ] Spelling and grammar checked
- [ ] SEO elements optimized
- [ ] Social media assets prepared

### After Publishing

- [ ] Content appears correctly in news listings
- [ ] Filtering and categorization working
- [ ] Social sharing functions properly
- [ ] Internal links and cross-references updated
- [ ] Promotion activities completed
- [ ] Analytics tracking confirmed

## Common Issues and Solutions

### Technical Issues

**Image Problems**:
- Verify image file exists in correct location
- Check filename spelling in frontmatter
- Ensure image format is supported
- Optimize file size for web performance

**Date Formatting**:
- Use YYYY-MM-DD format consistently
- Verify dates are logical (not in far future/past)
- Check time zone considerations for events

**Link Issues**:
- Test all external URLs before publishing
- Use HTTPS when available
- Verify internal links point to correct pages

### Content Issues

**Inconsistent Information**:
- Verify facts and figures across language versions
- Check that dates and times are consistent
- Ensure contact information is current

**Missing Context**:
- Provide sufficient background for general audience
- Explain technical terms and acronyms
- Include relevant program context

## Best Practices

### Event Coverage

1. **Pre-Event**:
   - Announce early with save-the-date
   - Provide regular updates as program develops
   - Share speaker announcements and highlights

2. **During Event**:
   - Share live updates on social media
   - Collect photos and quotes for follow-up coverage
   - Engage with attendees and speakers

3. **Post-Event**:
   - Publish summary with key outcomes
   - Share presentations and resources
   - Thank participants and sponsors

### Press Release Strategy

1. **Timing**:
   - Coordinate with partner announcements
   - Consider news cycles and competing stories
   - Plan for appropriate lead time

2. **Distribution**:
   - Target relevant media outlets
   - Provide additional resources for journalists
   - Follow up with key contacts

3. **Follow-up**:
   - Monitor coverage and engagement
   - Respond to media inquiries promptly
   - Share coverage with stakeholders

## Templates and Resources

### Quick Templates

**Event Announcement Email:**
```
Subject: [Event Name] - [Date] in [Location]

Dear Colleagues,

We're pleased to announce [Event Name], taking place [Date] in [Location/Virtual].

Key Details:
- Date: [Full date and time]
- Location: [Venue or platform]
- Registration: [Link and deadline]

This event will focus on [brief description] and features [key highlights].

EDT program participants will be [describe participation].

Register now: [Link]

Best regards,
[Name]
```

**Press Release Template:**
```
FOR IMMEDIATE RELEASE

[Compelling Headline]

[City, Date] – [Lead paragraph with key information]

[Body paragraphs with details, context, and quotes]

About EDT Program:
[Standard boilerplate]

Media Contact:
[Name, title, email, phone]

###
```

### Useful Resources

- [Event Planning Checklist](internal-link)
- [Media Contact List](internal-link)
- [Brand Guidelines](internal-link)
- [Social Media Guidelines](internal-link)
- [Photography Guidelines](internal-link)