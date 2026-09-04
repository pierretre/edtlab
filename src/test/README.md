# Testing Documentation

This directory contains the automated testing suite for the EDT Research Website.

## Test Structure

```text
src/test/
├── accessibility/          # Accessibility compliance tests (Vitest)
├── content/                # Content validation and schema tests (Vitest)
├── integration/            # build.test.ts — build-process integration test (Vitest)
├── e2e/                    # Playwright specs: accessibility, routes, link-verification, performance
├── utils/                  # Utility function tests (Vitest)
├── setup.ts                # Test environment setup
└── README.md                # This file
```

## Test Types

### Unit Tests
- **Content Schema Validation**: Tests for Zod schemas and content structure
- **Internationalization**: Tests for language support and URL structure
- **Utility Functions**: Tests for helper functions and core logic

### Integration Tests
- **Route Testing**: Validates all content pages are accessible
- **Navigation Testing**: Tests menu functionality across languages
- **Content Collection Testing**: Tests dynamic content generation

### End-to-End Tests
- **Accessibility Testing**: Automated RGAA 4.1 AA compliance testing with axe-core
- **Route Validation**: Tests that all routes return proper responses
- **User Journey Testing**: Tests complete user workflows

## Running Tests

### Local Development
```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests
npx playwright test

# Run specific test file
npm run test src/test/content/schema.test.ts
```

### CI/CD Pipeline
`.github/workflows/ci.yml` runs on push and pull request to `main` only (not `develop`). It runs `npm run check` on every push/PR, and `npm run test:ci` (unit tests, excluding the spelling test) on pushes to `main`. Playwright e2e/accessibility tests are not run in CI — see [CI/CD Setup](../../docs/developers/ci-cd-setup.md).

## Test Coverage

The test suite aims for:
- **Unit Tests**: 80%+ coverage for critical components
- **Route Tests**: 100% coverage for all defined routes
- **Accessibility Tests**: RGAA 4.1 AA compliance validation
- **Content Validation**: Schema compliance for all content types

## Coverage Thresholds

Set in `vitest.config.ts`:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Accessibility Testing

Automated accessibility testing includes:
- WCAG 2.1 AA compliance
- Color contrast validation
- Keyboard navigation testing
- Screen reader compatibility
- Semantic HTML structure validation

## Content Validation

Content tests validate:
- Zod schema compliance
- Bilingual content structure
- Required frontmatter fields
- Content type consistency

## CI/CD Integration

See "CI/CD Pipeline" above — accessibility/route testing, coverage reporting, and quality gates are not part of the current `ci.yml`, only `check`/`test:ci`/`build`.

## Adding New Tests

### Unit Tests
1. Create test file in appropriate subdirectory
2. Follow naming convention: `*.test.ts`
3. Import test utilities from `setup.ts`
4. Focus on core functionality only

### E2E Tests
1. Create test file in `e2e/` directory
2. Follow naming convention: `*.spec.ts`
3. Use Playwright test framework
4. Include accessibility checks where appropriate

### Best Practices
- Keep tests focused and minimal
- Test real functionality, not implementation details
- Use descriptive test names
- Group related tests with `describe` blocks
- Mock external dependencies when necessary
- Validate against requirements from specs

## Troubleshooting

### Common Issues
- **Build failures**: Check TypeScript compilation
- **Route tests failing**: Verify content files exist
- **Accessibility violations**: Check RGAA compliance
- **Coverage too low**: Add tests for uncovered code

### Debug Commands
```bash
# Run tests with verbose output
npm run test -- --reporter=verbose

# Run specific test pattern
npm run test -- --grep "accessibility"

# Debug Playwright tests
npx playwright test --debug

# Generate coverage report
npm run test:coverage
open coverage/index.html
```