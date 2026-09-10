# How to Create and Manage Positions

This guide provides step-by-step instructions for creating, updating, and managing positions on the EDT Research Website — both open positions (recruitment listings) and occupied/ongoing positions (the record of who ended up filling a position, maintained once they start).

## Quick Start Checklist

- [ ] Choose appropriate position type (`PostDoc`, `PhD`, `Engineer`, `Intern`, or `Others`)
- [ ] Create both English and French versions
- [ ] Use consistent naming convention
- [ ] Fill all required frontmatter fields
- [ ] Set `pc` if this position belongs to a focused project, so it shows up on that project's page
- [ ] Write clear, inclusive position descriptions
- [ ] Test content before publishing
- [ ] Update status when the position is filled (see "Marking a position as filled" below)

## File Structure and Naming

### Location

All positions are stored in: `src/content/positions/`

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

1. Navigate to `src/content/positions/`
2. Create two files following the naming convention
3. Start with the English version, then translate to French

### Step 2: Set Up Frontmatter

Copy this template and customize:

```yaml
---
title: "Position Title"
type: "PostDoc" # PostDoc | PhD | Engineer | Intern | Others
pc: "PC1" # Optional: PC1-PC5. Makes this position appear on that focused project's page.
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
  - "digital-twins" # Optional: keywords, or "General" / "Extern"
---
```

### Step 3: Write the Position Description

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

- **Options**: `PostDoc`, `PhD`, `Engineer`, `Intern`, `Others` (case-sensitive, exactly as written)
- **Purpose**: Categorization and filtering
- **Guidelines**: Choose the option that best matches the position level

#### `location`

- **Format**: "City, Country" or "City, Region, Country"
- **Examples**:
  - "Paris, France"
  - "Rennes, Brittany, France"
  - "Remote (France-based)"
- **Guidelines**: Be specific enough for applicants to understand logistics

#### `filled`

- **Options**: `true` or `false`
- **Purpose**: Controls whether position appears in the "join us" listing, and switches the page's CTA
- **Guidelines**:
  - Set to `false` for new positions
  - Update to `true` when position is no longer accepting applications
  - See "Marking a position as filled" below for turning it into an ongoing-research record

#### `description`

- **Purpose**: Brief summary for listings, search results, and SEO
- **Guidelines**:
  - Keep to 120-160 characters
  - Include key terms and research area
  - Make it compelling for potential applicants

### Fields used while the position is open

#### `expectedStartDate`

- **Format**: Flexible - can use dates, seasons, quarters, or ranges
- **Examples**:
  - "2025-06-01" (specific date)
  - "Spring 2025" (seasonal)
  - "Q2 2025" (quarterly)
  - "January-June 2025" (range)
- **Guidelines**: Align with academic calendars when relevant

#### `publishedDate`

- **Format**: YYYY-MM-DD
- **Purpose**: Chronological sorting and freshness indicators
- **Guidelines**: Use the date when the position was first published

#### `requirements`

- **Format**: Array of strings
- **Purpose**: Clear qualification criteria
- **Guidelines**:
  - List essential requirements only
  - Be specific about education, skills, and experience
  - Use inclusive language
  - Include language requirements if applicable

#### `contacts`

- **Format**: Array of email addresses
- **Purpose**: Direct contact for position inquiries; also powers the "Apply now" mailto link
- **Guidelines**:
  - Include supervisor and/or HR contact
  - Ensure emails are monitored and responsive
  - Use institutional email addresses when possible

### Fields used for every position

#### `pc` — how a position becomes visible on a focused project page

- **Options**: `PC1`, `PC2`, `PC3`, `PC4`, `PC5` — leave empty for a general/cross-project position
- **This is the field that controls whether a position shows up on that focused project's page.** Set `pc: "PC2"` and the position will automatically appear in the "Related positions" section of the PC2 focused-project page — as an open position while `filled: false`, and in the "Ongoing" section once it's filled in with a `researcher` (see below).
- There is no separate step needed on the project page itself — it queries positions by this field.

#### `tags`

- **Format**: Array of strings
- **Purpose**: Free-form keywords and additional categorization (search, filtering)
- **Common Values**: `General`, `Extern`, or any relevant keyword (e.g. "LLM", "Digital Twin")
- **Guidelines**: Do not put the PC code here — that's what `pc` is for. Use `General` for positions not tied to a specific focused project, or `Extern` for externally-funded/hosted positions.

## Marking a position as filled / ongoing research

When someone is hired, don't delete or archive the file — update it in place so it becomes the public record of the ongoing work, visible on the focused project's page. Set:

```yaml
filled: true
researcher:
  name: "Firstname Lastname"
  email: "firstname.lastname@institution.fr"
supervisors:
  - name: "Supervisor Name"
    org: "Institution — Team"
    role: "director" # optional
funding: "EDT" # or "external" (e.g. CIFRE)
host: "Institution, Team" # optional
startDate: 2025-10-01
expectedEndDate: 2028-10-01 # optional
researchStatus: "ongoing" # planned | ongoing | completed | paused | withdrawn
```

As soon as `researcher` is filled in, the page automatically switches from the "apply now" view to the ongoing-research view (researcher, supervisors, funding, status, dates), and the position moves out of the open "join us" listing into the "Ongoing" section of its `pc` project page. The `requirements`/`contacts`/apply-CTA fields are simply ignored at that point — no need to remove them.

Optionally, keep the record up to date over time:

- `useCases`: link related use cases (`title`, optional `ref` to a use-case slug, optional `note`)
- `publications`: list of related publication slugs, shown on the position page
- `lastUpdated`: bump when you update the record

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

## Quality Assurance Checklist

### Before Publishing

- [ ] Both language versions created with identical structure
- [ ] All required frontmatter fields completed
- [ ] `pc` set correctly if this position belongs to a focused project
- [ ] Contact emails are valid and monitored
- [ ] Requirements are clear and realistic
- [ ] Application process is well-defined
- [ ] Content follows inclusive language guidelines
- [ ] Links and references are working
- [ ] Spelling and grammar checked

### After Publishing

- [ ] Position appears correctly in the "join us" listing
- [ ] Filtering by project/type works correctly
- [ ] Position appears on its focused project's page if `pc` is set
- [ ] Contact forms or emails are functional
- [ ] Social media and other promotion completed

## Common Issues and Solutions

### Validation Errors

**Missing Required Fields**

- Check that all required frontmatter fields are present
- Verify date formats (YYYY-MM-DD for publishedDate)
- Ensure email addresses in contacts array are valid

**Invalid Enum Values**

- Use only specified values for `type` field
- Check spelling of the `pc` value (must be exactly `PC1`-`PC5`)

**Array Format Issues**

- Ensure requirements and contacts use proper YAML array syntax
- Use quotes around strings containing special characters

### Content Issues

**Inconsistent Information**

- Verify that English and French versions match
- Check that the `pc` value is correct
- Ensure contact information is current

**SEO and Discoverability**

- Include relevant keywords in title and description
- Use descriptive file names
- Ensure proper internal linking from project pages

## Best Practices

### Writing Effective Position Descriptions

1. **Start with Impact**: Lead with the research significance and potential contributions
2. **Be Specific**: Provide concrete details about responsibilities and expectations
3. **Show Opportunity**: Highlight learning, growth, and collaboration opportunities
4. **Include Context**: Explain how the position fits within the larger EDT program
5. **Call to Action**: End with clear, encouraging application instructions

### Managing Multiple Positions

1. **Consistent Structure**: Use similar organization across all positions
2. **Clear Differentiation**: Highlight what makes each position unique
3. **Project Integration**: Set `pc` correctly so positions align with focused project pages
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
