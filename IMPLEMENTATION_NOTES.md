# Implementation Notes — PDF Upload for Use Case References

## Architecture

### Storage
- **Location**: `public/docs/{slug}-{timestamp}.pdf`
- **Naming**: Uses slug + Unix timestamp to ensure uniqueness
- **Access**: Files served at `/docs/{filename}` via Astro's public directory

### Data Model
References are stored in use case frontmatter as an array:
```yaml
references:
  - title: "Paper Title"
    venue: "Conference 2025"  # Optional
    url: "https://..."        # Can be external URL or /docs/...pdf
  - title: "Local Poster"
    url: "/docs/uc-05-1712800000000.pdf"
```

### API Design
All three endpoints follow the same pattern:
- **Token verification**: All requests require a valid previewToken from frontmatter
- **YAML parsing**: Uses gray-matter for robust frontmatter manipulation
- **Error responses**: Standardized error/success format

#### POST /api/uc-upload-pdf
- Validates file type (MIME type check)
- Generates unique filename with timestamp
- Creates public/docs directory if needed
- Returns public URL for the uploaded file

#### POST /api/uc-references
- Supports three actions:
  - `add`: Append single reference
  - `remove`: Remove reference by index
  - `bulk-update`: Replace entire references array
- Validates all references have required fields (title, url)
- Preserves optional fields (venue)

#### GET /api/uc-references-get
- Simple read-only endpoint
- Returns current references from frontmatter
- Used by frontend to load state before editing

### Frontend Implementation
The preview page (src/pages/preview/[slug].astro) includes:

**References Editor UI**:
- Located in the prose content area under "Références" heading
- Double-click trigger (consistent with existing section editing)
- Tab interface: URL vs PDF upload
- Reference list with inline remove buttons
- Save/cancel buttons for bulk operations

**Key Features**:
- Fetches current references via GET endpoint
- Supports adding references without reloading
- Local form state before persistence
- Visual feedback during upload (progress text)
- Reload on save to refresh content

**Design Decisions**:
- Uniform display: PDFs and URLs treated identically
- No special handling needed in rendering layer
- Venue field optional to support both journal and conference formats
- Timestamp in filename ensures no collisions across uploads

## Code Quality

### TypeScript
- Proper type casting for DOM elements
- gray-matter types imported correctly
- All API routes properly typed with Astro's APIRoute

### Testing
- Unit tests for gray-matter YAML parsing
- Reference validation tests
- PDF reference structure verification
- Comprehensive test coverage for data transformations

### Build Integration
- Full Astro build passes without errors
- No new dependencies added (gray-matter already in use)
- TypeScript compilation successful
- No breaking changes to existing functionality

## Integration with Existing Systems

### Compatible With
- Existing use case editing (markdown section editing)
- Current image upload system (uc-upload-image.ts)
- Astro content collections
- Preview token authentication

### Unchanged
- Use case markdown content structure
- Domain/maturity metadata editing
- Contact information management
- Approval workflow

## Performance Considerations
- PDF files stored in public directory (fast static serving)
- Timestamp-based naming prevents lookup queries
- No database overhead
- Client-side file validation before upload

## Security
- Token verification on all write operations
- File type validation (PDF MIME type)
- Uses Node.js file APIs with proper directory creation
- No arbitrary path injection possible (slug + timestamp only)

## Future Enhancements
- Add file size limits in API
- Drag-drop UI for uploads
- Thumbnail preview for PDFs
- Bulk reference import from JSON/CSV
- Reference de-duplication
- Metadata extraction from PDFs (title, author)
