# Testing Documentation

This directory contains the automated testing suite for the EDT Research Website.

## Test Structure

```
src/test/
├── accessibility/          # Accessibility compliance tests
├── content/                # Content validation and schema tests
├── e2e/                    # End-to-end tests with Playwright
├── routes/                 # Route structure and navigation tests
├── utils/                  # Utility function tests
├── setup.ts               # Test environment setup
└── README.md              # This file
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
Tests are automatically run on:
- Pull requests to main/develop branches
- Pushes to main/develop branches
- Manual workflow dispatch

## Test Coverage

The test suite aims for:
- **Unit Tests**: 80%+ coverage for critical components
- **Route Tests**: 100% coverage for all defined routes
- **Accessibility Tests**: RGAA 4.1 AA compliance validation
- **Content Validation**: Schema compliance for all content types

## Coverage Thresholds

Current minimum thresholds:
- Branches: 50%
- Functions: 50%
- Lines: 50%
- Statements: 50%

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

The GitHub Actions workflow includes:
- Unit test execution
- Build validation
- Accessibility testing
- Route validation
- Coverage reporting
- Quality gates

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