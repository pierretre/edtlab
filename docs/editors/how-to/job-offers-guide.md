# How to Create and Manage Job Offers

This guide provides step-by-step instructions for creating, updating, and managing job offers on the EDT Research Website.

## Quick Start Checklist

- [ ] Choose appropriate job type (postdoc, phd, engineer, intern)
- [ ] Create both English and French versions
- [ ] Use consistent naming convention
- [ ] Fill all required frontmatter fields
- [ ] Write clear, inclusive job descriptions
- [ ] Test content before publishing
- [ ] Update status when position is filled

## File Structure and Naming

### Location

All job offers are stored in: `src/content/job-offers/`

### Naming Convention

Use this pattern: `{type}-{project}-{identifier}.md`

**Examples:**

```
postdoc-pc1-hybridization-en.md
postdoc-pc1-hybridization-fr.md
phd-pc2-architecture-en.md
phd-pc2-architecture-fr.md
engineer-pc3-platform-en.md
engineer-pc3-platform-fr.md
intern-general-summer2025-en.md
intern-general-summer2025-fr.md
```

**Guidelines:**

- Use lowercase with hyphens
- Include project code (pc1, pc2, etc.) or "general"
- Add descriptive identifier for multiple positions of same type

## Step-by-Step Creation Process

### Step 1: Create the Files

1. Navigate to `src/content/job-offers/`
2. Create two files following the naming convention
3. Start with the English version, then translate to French

### Step 2: Set Up Frontmatter

Copy this template and customize:

```yaml
---
title: "Position Title"
type: "postdoc" # postdoc | phd | engineer | intern
location: "City, Country"
expectedStartDate: "Spring 2025" # Flexible format
filled: false # true when position is no longer available
publishedDate: 2024-01-15 # YYYY-MM-DD format
description: "Brief description for listings and SEO"
requirements:
  - "Requirement 1"
  - "Requirement 2"
  - "Requirement 3"
contacts:
  - "supervisor@institution.edu"
  - "hr@edt-program.fr"
tags:
  - "PC1" # Optional: associate with focused project
---
```

### Step 3: Write the Job Description

Structure your content using this template:

```markdown
## Position Overview

Brief introduction to the position and its importance within the EDT program.

## Research Focus

Detailed description of the research area, objectives, and expected contributions.

## Key Responsibilities

- Responsibility 1
- Responsibility 2
- Responsibility 3

## Required Qualifications

- Educational requirements
- Technical skills
- Experience requirements
- Language requirements

## Preferred Qualifications

- Additional skills that would be beneficial
- Previous experience in related areas
- Specific software or methodology knowledge

## Application Process

Provide clear instructions on how to apply, what documents to include, and any specific requirements.

## About the Project

Brief description of the associated focused project (if applicable) and how this position contributes to the overall EDT goals.
```

## Frontmatter Field Reference

### Required Fields

#### `title`

- **Purpose**: Position title displayed in listings and page headers
- **Guidelines**:
  - Be specific and descriptive
  - Include level (PhD, Postdoc, etc.)
  - Mention key research area if space allows
- **Examples**:
  - "PhD Position in Digital Twin Model Hybridization"
  - "Postdoctoral Researcher - Architecture and Interoperability"
  - "Software Engineer - Platform Development"

#### `type`

- **Options**: `postdoc`, `phd`, `engineer`, `intern`
- **Purpose**: Categorization and filtering
- **Guidelines**: Choose the option that best matches the position level

#### `location`

- **Format**: "City, Country" or "City, Region, Country"
- **Examples**:
  - "Paris, France"
  - "Rennes, Brittany, France"
  - "Remote (France-based)"
- **Guidelines**: Be specific enough for applicants to understand logistics

#### `expectedStartDate`

- **Format**: Flexible - can use dates, seasons, quarters, or ranges
- **Examples**:
  - "2025-06-01" (specific date)
  - "Spring 2025" (seasonal)
  - "Q2 2025" (quarterly)
  - "January-June 2025" (range)
- **Guidelines**: Align with academic calendars when relevant

#### `filled`

- **Options**: `true` or `false`
- **Purpose**: Controls whether position appears in active listings
- **Guidelines**:
  - Set to `false` for new positions
  - Update to `true` when position is no longer accepting applications
  - Filled positions remain visible on project pages for reference

#### `publishedDate`

- **Format**: YYYY-MM-DD
- **Purpose**: Chronological sorting and freshness indicators
- **Guidelines**: Use the date when the position was first published

#### `description`

- **Purpose**: Brief summary for listings, search results, and SEO
- **Guidelines**:
  - Keep to 120-160 characters
  - Include key terms and research area
  - Make it compelling for potential applicants

#### `requirements`

- **Format**: Array of strings
- **Purpose**: Clear qualification criteria
- **Guidelines**:
  - List essential requirements only
  - Be specific about education, skills, and experience
  - Use inclusive language
  - Include language requirements if applicable

### Optional Fields

#### `contacts`

- **Format**: Array of email addresses
- **Purpose**: Direct contact for position inquiries
- **Guidelines**:
  - Include supervisor and/or HR contact
  - Ensure emails are monitored and responsive
  - Use institutional email addresses when possible

#### `tags`

- **Format**: Array of strings
- **Purpose**: Project association and additional categorization
- **Common Values**: `PC1`, `PC2`, `PC3`, `PC4`, `PC5`, `General`
- **Guidelines**: Use project codes to associate positions with focused projects

## Content Writing Guidelines

### Language and Tone

- **Professional but welcoming**: Balance academic rigor with approachability
- **Inclusive**: Use gender-neutral language and avoid unnecessary barriers
- **Clear and specific**: Provide concrete information about expectations and opportunities
- **Consistent**: Maintain similar structure and tone across all positions

### Research Description

- **Context**: Explain how the position fits within the EDT program
- **Objectives**: Clearly state research goals and expected outcomes
- **Methods**: Mention key methodologies or approaches
- **Impact**: Describe potential contributions to the field

### Requirements Section

- **Essential vs. Preferred**: Clearly distinguish between must-have and nice-to-have qualifications
- **Specific Skills**: List concrete technical skills, software, or methodologies
- **Experience Level**: Be realistic about experience expectations for the position level
- **Soft Skills**: Include collaboration, communication, and other relevant abilities

### Application Instructions

- **Documents**: Specify required application materials
- **Format**: Indicate preferred file formats and naming conventions
- **Timeline**: Provide realistic timelines for review and decision
- **Process**: Explain interview or selection process if relevant

## Bilingual Content Management

### Translation Guidelines

- **Equivalent Content**: Ensure both versions convey the same information
- **Cultural Adaptation**: Adapt examples and references for the target audience
- **Consistent Terminology**: Use established French translations for technical terms
- **Local Context**: Include relevant information for French vs. international applicants

### Common Translation Considerations

- **Academic Titles**: PhD vs. Doctorat, Postdoc vs. Post-doctorant
- **Institutions**: Provide French names for French institutions
- **Qualifications**: Adapt degree requirements to French system when relevant
- **Legal Requirements**: Include any France-specific employment information

## Position Status Management

### Active Positions

- Keep `filled: false`
- Monitor applications and respond promptly
- Update content if requirements or details change
- Promote through appropriate channels

### Filled Positions

- Update `filled: true` in both language versions
- Keep content available for reference
- Consider adding brief note about successful candidate (if appropriate)
- Use for future position planning and requirements refinement

### Expired Positions

- Set `filled: true` if no longer recruiting
- Consider archiving very old positions
- Use historical data for improving future job postings

## Quality Assurance Checklist

### Before Publishing

- [ ] Both language versions created with identical structure
- [ ] All required frontmatter fields completed
- [ ] Contact emails are valid and monitored
- [ ] Requirements are clear and realistic
- [ ] Application process is well-defined
- [ ] Content follows inclusive language guidelines
- [ ] Links and references are working
- [ ] Spelling and grammar checked

### After Publishing

- [ ] Position appears correctly in listings
- [ ] Filtering by project/type works correctly
- [ ] Contact forms or emails are functional
- [ ] Social media and other promotion completed
- [ ] Application tracking system updated (if applicable)

## Common Issues and Solutions

### Validation Errors

**Missing Required Fields**

- Check that all required frontmatter fields are present
- Verify date formats (YYYY-MM-DD for publishedDate)
- Ensure email addresses in contacts array are valid

**Invalid Enum Values**

- Use only specified values for `type` field
- Check spelling of project codes in tags

**Array Format Issues**

- Ensure requirements and contacts use proper YAML array syntax
- Use quotes around strings containing special characters

### Content Issues

**Inconsistent Information**

- Verify that English and French versions match
- Check that project associations are correct
- Ensure contact information is current

**SEO and Discoverability**

- Include relevant keywords in title and description
- Use descriptive file names
- Ensure proper internal linking from project pages

## Best Practices

### Writing Effective Job Descriptions

1. **Start with Impact**: Lead with the research significance and potential contributions
2. **Be Specific**: Provide concrete details about responsibilities and expectations
3. **Show Opportunity**: Highlight learning, growth, and collaboration opportunities
4. **Include Context**: Explain how the position fits within the larger EDT program
5. **Call to Action**: End with clear, encouraging application instructions

### Managing Multiple Positions

1. **Consistent Structure**: Use similar organization across all positions
2. **Clear Differentiation**: Highlight what makes each position unique
3. **Project Integration**: Ensure positions align with focused project goals
4. **Timeline Coordination**: Stagger publication dates for better visibility

### Promoting Positions

1. **Internal Channels**: Share with project teams and institutional networks
2. **Academic Networks**: Post to relevant mailing lists and job boards
3. **Social Media**: Use project and institutional social media accounts
4. **Conference Networks**: Announce at relevant conferences and workshops
5. **Direct Outreach**: Contact potential candidates through professional networks

## Resources and Templates

### Email Templates

**Application Acknowledgment**

```
Subject: Application Received - [Position Title]

Dear [Applicant Name],

Thank you for your interest in the [Position Title] position within the EDT program. We have received your application and will review it carefully.

We expect to complete our initial review by [Date] and will contact you regarding next steps.

If you have any questions, please don't hesitate to contact us.

Best regards,
[Contact Name]
```

**Position Filled Notification**

```
Subject: Position Update - [Position Title]

Dear [Applicant Name],

Thank you for your interest in the [Position Title] position. We wanted to inform you that this position has been filled.

We were impressed by the quality of applications and encourage you to apply for future opportunities within the EDT program.

Best regards,
[Contact Name]
```

### Useful Links

- [EDT Program Overview](/program)
- [Focused Projects](/focused-projects)
- [Application Guidelines](internal-link-to-application-process)
- [Contact Information](/contact)

### Internal Resources

- Content Style Guide
- Frontmatter Reference
- Accessibility Guidelines
- SEO Best Practices
