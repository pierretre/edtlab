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
    jobOffers: []
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

export const createMockJobOffer = (overrides = {}) => ({
    title: 'Test Position',
    project: 'PC1',
    type: 'postdoc',
    location: 'Test Location',
    deadline: new Date('2024-12-31'),
    description: 'Test description',
    requirements: ['Test requirement'],
    lang: 'en',
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