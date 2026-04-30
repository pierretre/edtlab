# Sprint Test Plan — PDF Upload for Use Case References

## Overview
This sprint adds the ability to upload PDF documents as references in use cases, complementing the existing URL-based reference system.

## Implementation Summary

### APIs Created
1. **POST /api/uc-upload-pdf** — Upload PDF documents
   - Accepts multipart/form-data with file field
   - Validates file type (PDF only)
   - Stores in `public/docs/{slug}-{timestamp}.pdf`
   - Returns public URL for the uploaded file

2. **POST /api/uc-references** — Manage references
   - Actions: `add`, `remove`, `bulk-update`
   - Parses frontmatter YAML using gray-matter
   - Maintains reference structure: `{title, url, venue (optional)}`
   - Supports both URL and PDF references uniformly

3. **GET /api/uc-references-get** — Fetch current references
   - Returns references array from use case frontmatter
   - Token-protected

### Frontend Enhancements
- Enhanced preview page (`src/pages/preview/[slug].astro`)
- References editor UI with:
  * Tab interface for URL links vs PDF uploads
  * Title field (required)
  * Venue field (optional, for publications)
  * URL field (for links) or file input (for PDFs)
  * List view of current references with inline remove buttons
  * Bulk save/cancel actions

## Test Cases

### Manual Testing

#### Test 1: Upload PDF Reference
1. Open a use case preview page (e.g., `/preview/uc-05?token=uc05-preview-2026`)
2. Double-click the "Références" section
3. The references editor panel appears
4. Click "Upload PDF" tab
5. Enter title: "Research Poster"
6. Click file input and select a PDF
7. Click "Upload et ajouter"
8. Verify the reference appears in the list
9. Click "Enregistrer"
10. Page reloads and the PDF reference persists in frontmatter

#### Test 2: Add URL Reference
1. Open references editor (double-click Références)
2. Ensure "Lien URL" tab is active
3. Enter:
   - Title: "Conference Paper"
   - Venue: "ASME IDETC-CIE 2025" (optional)
   - URL: "https://example.com/paper.pdf"
4. Click "Ajouter"
5. Reference appears in list
6. Save and verify persistence

#### Test 3: Mixed References
1. Add both URL and PDF references
2. Verify both appear in the list with correct information
3. Verify both can be removed individually
4. Verify they display identically in the use case page

#### Test 4: Edge Cases
- Large PDF file (should upload successfully)
- PDF with long filename (should be stored with timestamp)
- Remove all references and re-add (should work)
- Cancel editing without saving (should preserve original references)

### File Storage Validation
- Check `public/docs/` directory for uploaded PDFs
- Filename format: `{slug}-{timestamp}.pdf`
- Verify files are accessible via `/docs/{filename}` URL

### Frontmatter Integrity
- Verify references section in markdown frontmatter is valid YAML
- Check that other frontmatter fields are preserved during edits
- Ensure references maintain order

## Known Constraints
- PDF files only (other document types rejected)
- File size subject to Astro/Node.js limits (typically 100MB default)
- References stored as array in frontmatter (no database)

## Success Criteria
✅ PDF upload API works without breaking existing URL references
✅ Frontend UI allows adding/removing references with both methods
✅ All references display uniformly in rendered use case
✅ Astro build passes with no errors
✅ Reference data persists in frontmatter YAML
✅ TypeScript compilation passes

## Notes for Follow-up
- Add file size validation in API if needed
- Consider adding drag-drop UI for file uploads
- Track upload history/versions if needed
