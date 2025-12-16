# Job Offer Schema Migration Guide

This guide explains the changes to the job offer schema and how to migrate existing content to the new format.

## Overview of Changes

The job offer system has been updated to better reflect academic hiring practices by removing artificial application deadlines and focusing on expected start dates and position availability.

## Schema Changes

### Removed Fields

#### `deadline` → `expectedStartDate`

**Old Format:**
```yaml
deadline: 2024-12-31  # Application deadline
```

**New Format:**
```yaml
expectedStartDate: "Spring 2025"  # Expected start date
```

### New Fields

#### `filled` (Boolean)

**Purpose**: Indicates whether the position is still accepting applications

```yaml
filled: false  # Position is available
filled: true   # Position has been filled
```

#### `contacts` (Array, Optional)

**Purpose**: Provides specific contact emails for position inquiries

```yaml
contacts: ["hiring.manager@edt-program.fr", "hr@institution.edu"]
```

## Expected Start Date Format Options

The `expectedStartDate` field accepts flexible formats to accommodate academic scheduling:

### Specific Dates
```yaml
expectedStartDate: "2025-06-01"
expectedStartDate: "2025-09-15"
```

### Seasons
```yaml
expectedStartDate: "Spring 2025"
expectedStartDate: "Fall 2024"
expectedStartDate: "Summer 2025"
expectedStartDate: "Winter 2025"
```

### Quarters
```yaml
expectedStartDate: "Q1 2025"
expectedStartDate: "Q2 2025"
expectedStartDate: "Q3 2025"
expectedStartDate: "Q4 2025"
```

### Ranges
```yaml
expectedStartDate: "January-June 2025"
expectedStartDate: "September-December 2024"
```

### Flexible Descriptions
```yaml
expectedStartDate: "As soon as possible"
expectedStartDate: "Negotiable"
expectedStartDate: "Upon completion of PhD"
```

## Migration Steps

### Step 1: Update Frontmatter

For each job offer file in `src/content/job-offers/`:

1. **Replace `deadline` with `expectedStartDate`**
   ```yaml
   # Old
   deadline: 2024-12-31
   
   # New
   expectedStartDate: "Spring 2025"
   ```

2. **Add `filled` field**
   ```yaml
   filled: false  # For available positions
   filled: true   # For filled positions
   ```

3. **Add `contacts` array (optional)**
   ```yaml
   contacts: ["specific.contact@institution.edu"]
   ```

### Step 2: Update Content Body

Remove any deadline references from the content body and update with new information:

**Remove:**
- Application deadline sections
- "Apply by" language
- Deadline-based urgency messaging

**Add/Update:**
- Expected start date information
- "Open until filled" language
- Rolling application process descriptions

### Step 3: Validate Changes

After making changes:

1. Run `npm run astro check` to validate schema compliance
2. Test the build process: `npm run build`
3. Preview changes: `npm run preview`

## Content Guidelines

### Available Positions (`filled: false`)

- Emphasize "open until filled" approach
- Include expected start date prominently
- Provide clear application instructions
- Use encouraging, welcoming language

### Filled Positions (`filled: true`)

- Update title to indicate position is filled
- Keep content for reference but remove application instructions
- Consider adding information about successful candidate (if appropriate)
- May be displayed separately on project pages for tracking purposes

## Example Migration

### Before (Old Schema)
```yaml
---
title: "PhD Student - Digital Twin Modeling"
type: "phd"
location: "Paris, France"
deadline: 2024-06-30
publishedDate: 2024-01-15
description: "PhD opportunity in digital twin research"
requirements: ["Master's degree", "Programming experience"]
lang: "en"
---

## Application Deadline

Applications must be submitted by **June 30, 2024**.

## Contact

For questions, email: general@edt-program.fr
```

### After (New Schema)
```yaml
---
title: "PhD Student - Digital Twin Modeling"
type: "phd"
location: "Paris, France"
expectedStartDate: "September 2024"
filled: false
publishedDate: 2024-01-15
description: "PhD opportunity in digital twin research"
requirements: ["Master's degree", "Programming experience"]
contacts: ["phd.supervisor@edt-program.fr", "admissions@institution.edu"]
lang: "en"
---

## Application Process

Applications are accepted on a rolling basis until the position is filled.

## Expected Start Date

This position is expected to begin in **September 2024**.

## Contact

For questions about this position:
- PhD Supervisor: phd.supervisor@edt-program.fr
- Admissions: admissions@institution.edu
```

## Validation Rules

The new schema enforces these validation rules:

### Required Fields
- `expectedStartDate`: Must be a non-empty string
- `filled`: Must be a boolean value (true/false)

### Optional Fields
- `contacts`: If provided, must be an array of valid email addresses

### Email Validation
All email addresses in the `contacts` array are validated for proper format:
- Must contain @ symbol
- Must have valid domain format
- Must not contain spaces or invalid characters

## Common Migration Issues

### Issue: Build Errors After Migration

**Cause**: Missing required fields or invalid data types

**Solution**: 
1. Check that all required fields are present
2. Ensure `filled` is a boolean (true/false, not "true"/"false")
3. Verify email addresses in `contacts` array are properly formatted

### Issue: Content Not Displaying Correctly

**Cause**: Schema validation failures

**Solution**:
1. Run `npm run astro check` to see specific errors
2. Compare your frontmatter with the template
3. Check for typos in field names

### Issue: Apply Buttons Not Showing

**Cause**: Position marked as filled or missing contact information

**Solution**:
1. Ensure `filled: false` for available positions
2. Add `contacts` array or verify fallback contact system

## Testing Your Changes

After migration:

1. **Local Testing**
   ```bash
   npm run dev
   ```
   Visit job offer pages to verify display

2. **Schema Validation**
   ```bash
   npm run astro check
   ```

3. **Build Testing**
   ```bash
   npm run build
   npm run preview
   ```

## Getting Help

If you encounter issues during migration:

1. Check the console for specific error messages
2. Refer to the updated template at `docs/editors/templates/job-offer.md`
3. Review the frontmatter reference guide
4. Contact the development team for technical assistance

## Best Practices

### For New Job Offers

1. Use the updated template as your starting point
2. Choose appropriate `expectedStartDate` format for your context
3. Always set `filled: false` for new positions
4. Include specific contact emails when possible
5. Focus on "open until filled" messaging rather than artificial deadlines

### For Ongoing Management

1. Update `filled: true` when positions are filled
2. Keep filled position content for reference
3. Review and update expected start dates as needed
4. Monitor application flow and adjust contact information if necessary

This migration improves the job offer system by:
- Eliminating artificial deadlines that don't reflect academic hiring
- Providing clearer timeline expectations for applicants
- Enabling better position status tracking
- Improving contact management and applicant experience