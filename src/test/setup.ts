import { beforeAll, afterAll } from 'vitest';

// Global test setup
beforeAll(() => {
    // Setup global test environment
    console.log('Setting up test environment...');
});

afterAll(() => {
    // Cleanup after all tests
    console.log('Cleaning up test environment...');
});

// Mock Astro content collections for testing
export const mockContentCollections = {
    pages: [],
    publications: [],
    events: [],
    positions: []
};

// Helper functions for testing
export const createMockPage = (overrides = {}) => ({
    title: 'Test Page',
    href: 'test-page',
    lang: 'en',
    description: 'Test description',
    toc: false,
    ...overrides
});

export const createMockPublication = (overrides = {}) => ({
    title: 'Test Publication',
    authors: ['Test Author'],
    type: 'journal',
    year: 2024,
    lang: 'en',
    ...overrides
});

export const createMockPosition = (overrides = {}) => ({
    title: 'Test Position',
    pc: 'PC1',
    type: 'postdoc',
    location: 'Test Location',
    expectedStartDate: 'Spring 2025',
    filled: false,
    publishedDate: new Date('2024-01-15'),
    description: 'Test description',
    requirements: ['Test requirement'],
    contacts: ['contact@example.com'],
    lang: 'en',
    template: 'position',
    tags: ['research'],
    ...overrides
});

export const createMockEvent = (overrides = {}) => ({
    title: 'Test Event',
    date: new Date('2024-06-15'),
    type: 'conference',
    location: 'Test Location',
    description: 'Test description',
    lang: 'en',
    ...overrides
});