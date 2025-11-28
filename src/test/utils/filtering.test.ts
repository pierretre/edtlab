/**
 * Tests for the filtering utilities and FilterManager class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
    validateFilterConfig,
    FilterManagerImpl,
    type FilterSystemConfig,
    type FilterConfig,
} from '../../utils/filtering';

describe('validateFilterConfig', () => {
    it('should validate a correct configuration', () => {
        const config: FilterSystemConfig = {
            filters: [
                {
                    id: 'test-filter',
                    type: 'select',
                    label: 'Test Filter',
                    translationKey: 'test.filter',
                    options: [
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' },
                    ],
                    predicate: (item, value) => item.test === value,
                    defaultValue: '',
                },
            ],
            itemSelector: '.item',
            containerSelector: '#container',
            noResultsSelector: '#no-results',
            resultsCountSelector: '#results-count',
            clearButtonSelector: '#clear-filters',
        };

        const result = validateFilterConfig(config);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
        const config: any = {
            filters: [],
        };

        const result = validateFilterConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should detect duplicate filter IDs', () => {
        const config: FilterSystemConfig = {
            filters: [
                {
                    id: 'duplicate',
                    type: 'select',
                    label: 'Filter 1',
                    translationKey: 'filter1',
                    options: [{ value: 'a', label: 'A' }],
                    predicate: () => true,
                },
                {
                    id: 'duplicate',
                    type: 'select',
                    label: 'Filter 2',
                    translationKey: 'filter2',
                    options: [{ value: 'b', label: 'B' }],
                    predicate: () => true,
                },
            ],
            itemSelector: '.item',
            containerSelector: '#container',
            noResultsSelector: '#no-results',
            resultsCountSelector: '#results-count',
            clearButtonSelector: '#clear-filters',
        };

        const result = validateFilterConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('Duplicate filter ID'))).toBe(true);
    });

    it('should validate select filters have options', () => {
        const config: FilterSystemConfig = {
            filters: [
                {
                    id: 'select-filter',
                    type: 'select',
                    label: 'Select Filter',
                    translationKey: 'select.filter',
                    predicate: () => true,
                },
            ],
            itemSelector: '.item',
            containerSelector: '#container',
            noResultsSelector: '#no-results',
            resultsCountSelector: '#results-count',
            clearButtonSelector: '#clear-filters',
        };

        const result = validateFilterConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('must have an "options" array'))).toBe(true);
    });
});

describe('FilterManagerImpl', () => {
    let container: HTMLElement;
    let config: FilterSystemConfig;

    beforeEach(() => {
        // Set up DOM
        document.body.innerHTML = `
            <div id="container">
                <div class="item" data-type="type1" data-search-text="item one">Item 1</div>
                <div class="item" data-type="type2" data-search-text="item two">Item 2</div>
                <div class="item" data-type="type1" data-search-text="item three">Item 3</div>
            </div>
            <div id="no-results" class="hidden">No results found</div>
            <div id="results-count">3</div>
            <select id="type-filter">
                <option value="">All</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
            </select>
            <input type="text" id="search-filter" />
            <button id="clear-filters">Clear</button>
        `;

        container = document.getElementById('container')!;

        config = {
            filters: [
                {
                    id: 'type-filter',
                    type: 'select',
                    label: 'Type',
                    translationKey: 'filter.type',
                    options: [
                        { value: '', label: 'All' },
                        { value: 'type1', label: 'Type 1' },
                        { value: 'type2', label: 'Type 2' },
                    ],
                    predicate: (data, value) => !value || data.type === value,
                    urlParam: 'type',
                },
                {
                    id: 'search-filter',
                    type: 'search',
                    label: 'Search',
                    translationKey: 'filter.search',
                    predicate: (data, value) => {
                        if (!value) return true;
                        return data.searchText?.toLowerCase().includes(value.toLowerCase());
                    },
                    urlParam: 'search',
                    debounce: 100,
                },
            ],
            itemSelector: '.item',
            containerSelector: '#container',
            noResultsSelector: '#no-results',
            resultsCountSelector: '#results-count',
            clearButtonSelector: '#clear-filters',
        };
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should initialize and cache DOM elements', () => {
        const manager = new FilterManagerImpl(config);
        manager.initialize();

        // Should not throw and should find elements
        expect(() => manager.applyFilters()).not.toThrow();

        manager.destroy();
    });

    it('should apply filters with AND logic', () => {
        const manager = new FilterManagerImpl(config);
        manager.initialize();

        // Filter by type1
        manager.setFilterState('type-filter', 'type1');
        manager.applyFilters();

        const items = Array.from(container.querySelectorAll('.item'));
        const visibleItems = items.filter(item => !item.classList.contains('hidden'));

        expect(visibleItems.length).toBe(2); // Items 1 and 3 are type1

        manager.destroy();
    });

    it('should update results count', () => {
        const manager = new FilterManagerImpl(config);
        manager.initialize();

        manager.setFilterState('type-filter', 'type2');
        manager.applyFilters();

        const resultsCount = document.getElementById('results-count');
        expect(resultsCount?.textContent).toBe('1'); // Only item 2 is type2

        manager.destroy();
    });

    it('should show no results message when no items match', () => {
        const manager = new FilterManagerImpl(config);
        manager.initialize();

        manager.setFilterState('type-filter', 'nonexistent');
        manager.applyFilters();

        const noResults = document.getElementById('no-results');
        expect(noResults?.classList.contains('hidden')).toBe(false);

        manager.destroy();
    });

    it('should clear all filters', () => {
        const manager = new FilterManagerImpl(config);
        manager.initialize();

        // Apply some filters
        manager.setFilterState('type-filter', 'type1');
        manager.applyFilters();

        // Clear filters
        manager.clearFilters();

        const items = Array.from(container.querySelectorAll('.item'));
        const visibleItems = items.filter(item => !item.classList.contains('hidden'));

        expect(visibleItems.length).toBe(3); // All items visible

        manager.destroy();
    });

    it('should update URL with filter state', () => {
        const manager = new FilterManagerImpl(config);
        manager.initialize();

        manager.setFilterState('type-filter', 'type1');
        manager.updateURL();

        const url = new URL(window.location.href);
        expect(url.searchParams.get('type')).toBe('type1');

        manager.destroy();
    });

    it('should load filter state from URL', () => {
        // Set up URL with parameters
        const url = new URL(window.location.href);
        url.searchParams.set('type', 'type2');
        window.history.replaceState({}, '', url.toString());

        const manager = new FilterManagerImpl(config);
        manager.initialize();

        expect(manager.getFilterState('type-filter')).toBe('type2');

        manager.destroy();
    });

    it('should handle debouncing for search filters', async () => {
        vi.useFakeTimers();

        const manager = new FilterManagerImpl(config);
        manager.initialize();

        const searchInput = document.getElementById('search-filter') as HTMLInputElement;

        // Simulate rapid typing
        searchInput.value = 'i';
        searchInput.dispatchEvent(new Event('input'));

        searchInput.value = 'it';
        searchInput.dispatchEvent(new Event('input'));

        searchInput.value = 'ite';
        searchInput.dispatchEvent(new Event('input'));

        searchInput.value = 'item';
        searchInput.dispatchEvent(new Event('input'));

        // Filter should not be applied yet
        expect(manager.getFilterState('search-filter')).toBe('');

        // Fast-forward time past debounce delay
        vi.advanceTimersByTime(100);

        // Now filter should be applied
        expect(manager.getFilterState('search-filter')).toBe('item');

        vi.useRealTimers();
        manager.destroy();
    });

    it('should clean up event listeners on destroy', () => {
        const manager = new FilterManagerImpl(config);
        manager.initialize();

        const typeSelect = document.getElementById('type-filter') as HTMLSelectElement;

        // Apply a filter before destroy
        typeSelect.value = 'type1';
        typeSelect.dispatchEvent(new Event('change'));

        // Verify filter was applied
        let items = Array.from(container.querySelectorAll('.item'));
        let visibleItems = items.filter(item => !item.classList.contains('hidden'));
        expect(visibleItems.length).toBe(2); // type1 items

        // Get state before destroy
        const stateBeforeDestroy = manager.getFilterState('type-filter');
        expect(stateBeforeDestroy).toBe('type1');

        manager.destroy();

        // After destroy, changing the select should not trigger filter updates
        typeSelect.value = 'type2';
        typeSelect.dispatchEvent(new Event('change'));

        // Filter state should remain the same as before destroy (event listener removed)
        expect(manager.getFilterState('type-filter')).toBe('type1');

        // Items should still show the previous filter state (no new filtering applied)
        items = Array.from(container.querySelectorAll('.item'));
        visibleItems = items.filter(item => !item.classList.contains('hidden'));
        expect(visibleItems.length).toBe(2); // Still showing type1 items
    });

    it('should validate filter values from URL', () => {
        // Set up URL with invalid parameter
        const url = new URL(window.location.href);
        url.searchParams.set('type', 'invalid-type');
        window.history.replaceState({}, '', url.toString());

        const manager = new FilterManagerImpl(config);
        manager.initialize();

        // Invalid value should not be loaded
        expect(manager.getFilterState('type-filter')).toBe('');

        manager.destroy();
    });
});
