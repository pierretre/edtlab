/**
 * Core filtering utilities and types for the EDT website filtering system.
 * 
 * This module provides a centralized, type-safe solution for filtering and searching
 * content across job offers, news, and publications. The design emphasizes declarative
 * configuration, performance, and accessibility.
 * 
 * @module filtering
 */

/**
 * Supported filter types
 */
export type FilterType = 'select' | 'search' | 'custom';

/**
 * Configuration for a single filter option in a select dropdown
 */
export interface FilterOption {
    /** The value used for filtering (e.g., "PC1", "phd") */
    value: string;
    /** Display label for the option */
    label: string;
    /** Optional translation key for i18n support */
    translationKey?: string;
}

/**
 * Configuration for a single filter
 * 
 * @template T The type of items being filtered
 */
export interface FilterConfig<T = any> {
    /** Unique identifier for this filter */
    id: string;
    /** Type of filter control to render */
    type: FilterType;
    /** Display label for the filter */
    label: string;
    /** Translation key for i18n support */
    translationKey: string;
    /** Available options for select filters */
    options?: FilterOption[];
    /** Predicate function to determine if an item matches the filter value */
    predicate: (item: T, value: string) => boolean;
    /** Default value for the filter */
    defaultValue?: string;
    /** URL parameter name for state persistence */
    urlParam?: string;
    /** Debounce delay in milliseconds (for search filters) */
    debounce?: number;
}

/**
 * Complete configuration for a filtering system
 * 
 * @template T The type of items being filtered
 */
export interface FilterSystemConfig<T = any> {
    /** Array of filter configurations */
    filters: FilterConfig<T>[];
    /** CSS selector for individual content items */
    itemSelector: string;
    /** CSS selector for the container holding all items */
    containerSelector: string;
    /** CSS selector for the "no results" message element */
    noResultsSelector: string;
    /** CSS selector for the results count display element */
    resultsCountSelector: string;
    /** CSS selector for the clear filters button */
    clearButtonSelector: string;
}

/**
 * Interface for the FilterManager class
 * 
 * The FilterManager is responsible for:
 * - Managing filter state
 * - Applying filters to content items
 * - Synchronizing state with URL parameters
 * - Handling user interactions
 * 
 * @template T The type of items being filtered
 */
export interface FilterManager<T = any> {
    /**
     * Apply all active filters to content items
     * Updates visibility of items based on current filter state
     */
    applyFilters(): void;

    /**
     * Clear all filters and reset to default state
     * Shows all items and clears URL parameters
     */
    clearFilters(): void;

    /**
     * Get the current value of a specific filter
     * 
     * @param filterId - The unique identifier of the filter
     * @returns The current filter value, or undefined if not set
     */
    getFilterState(filterId: string): string | undefined;

    /**
     * Set the value of a specific filter
     * 
     * @param filterId - The unique identifier of the filter
     * @param value - The new filter value
     */
    setFilterState(filterId: string, value: string): void;

    /**
     * Load filter state from URL query parameters
     * Applies filters based on URL params on page load
     */
    loadFromURL(): void;

    /**
     * Update URL query parameters to reflect current filter state
     * Enables bookmarking and sharing of filtered views
     */
    updateURL(): void;

    /**
     * Initialize the filter manager
     * Sets up event listeners and loads initial state
     */
    initialize(): void;

    /**
     * Clean up event listeners and resources
     * Should be called when the filter manager is no longer needed
     */
    destroy(): void;
}

/**
 * Validation result for filter configurations
 */
export interface FilterConfigValidationResult {
    /** Whether the configuration is valid */
    valid: boolean;
    /** Array of validation error messages */
    errors: string[];
}

/**
 * Validates a filter configuration
 * 
 * Checks that:
 * - All required fields are present
 * - Filter IDs are unique
 * - Select filters have options
 * - Predicates are functions
 * - Debounce values are positive numbers
 * 
 * @param config - The filter system configuration to validate
 * @returns Validation result with any errors found
 */
export function validateFilterConfig<T = any>(
    config: FilterSystemConfig<T>
): FilterConfigValidationResult {
    const errors: string[] = [];

    // Check required fields
    if (!config.filters || !Array.isArray(config.filters)) {
        errors.push('Configuration must have a "filters" array');
    }

    if (!config.itemSelector || typeof config.itemSelector !== 'string') {
        errors.push('Configuration must have a valid "itemSelector" string');
    }

    if (!config.containerSelector || typeof config.containerSelector !== 'string') {
        errors.push('Configuration must have a valid "containerSelector" string');
    }

    if (!config.noResultsSelector || typeof config.noResultsSelector !== 'string') {
        errors.push('Configuration must have a valid "noResultsSelector" string');
    }

    if (!config.resultsCountSelector || typeof config.resultsCountSelector !== 'string') {
        errors.push('Configuration must have a valid "resultsCountSelector" string');
    }

    if (!config.clearButtonSelector || typeof config.clearButtonSelector !== 'string') {
        errors.push('Configuration must have a valid "clearButtonSelector" string');
    }

    // Validate individual filters
    if (config.filters && Array.isArray(config.filters)) {
        const filterIds = new Set<string>();

        config.filters.forEach((filter, index) => {
            const filterPrefix = `Filter ${index}`;

            // Check required filter fields
            if (!filter.id || typeof filter.id !== 'string') {
                errors.push(`${filterPrefix}: Must have a valid "id" string`);
            } else {
                // Check for duplicate IDs
                if (filterIds.has(filter.id)) {
                    errors.push(`${filterPrefix}: Duplicate filter ID "${filter.id}"`);
                }
                filterIds.add(filter.id);
            }

            if (!filter.type || !['select', 'search', 'custom'].includes(filter.type)) {
                errors.push(`${filterPrefix}: Must have a valid "type" (select, search, or custom)`);
            }

            if (!filter.label || typeof filter.label !== 'string') {
                errors.push(`${filterPrefix}: Must have a valid "label" string`);
            }

            if (!filter.translationKey || typeof filter.translationKey !== 'string') {
                errors.push(`${filterPrefix}: Must have a valid "translationKey" string`);
            }

            if (typeof filter.predicate !== 'function') {
                errors.push(`${filterPrefix}: Must have a "predicate" function`);
            }

            // Type-specific validation
            if (filter.type === 'select') {
                if (!filter.options || !Array.isArray(filter.options)) {
                    errors.push(`${filterPrefix}: Select filters must have an "options" array`);
                } else if (filter.options.length === 0) {
                    errors.push(`${filterPrefix}: Select filters must have at least one option`);
                } else {
                    // Validate options
                    filter.options.forEach((option, optIndex) => {
                        if (option.value === undefined || option.value === null || typeof option.value !== 'string') {
                            errors.push(`${filterPrefix}, Option ${optIndex}: Must have a valid "value" string`);
                        }
                        if (!option.label || typeof option.label !== 'string') {
                            errors.push(`${filterPrefix}, Option ${optIndex}: Must have a valid "label" string`);
                        }
                    });
                }
            }

            // Validate debounce if present
            if (filter.debounce !== undefined) {
                if (typeof filter.debounce !== 'number' || filter.debounce < 0) {
                    errors.push(`${filterPrefix}: "debounce" must be a positive number`);
                }
            }

            // Validate URL param if present
            if (filter.urlParam !== undefined && typeof filter.urlParam !== 'string') {
                errors.push(`${filterPrefix}: "urlParam" must be a string`);
            }
        });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Type guard to check if a value is a valid FilterType
 * 
 * @param value - The value to check
 * @returns True if the value is a valid FilterType
 */
export function isValidFilterType(value: any): value is FilterType {
    return value === 'select' || value === 'search' || value === 'custom';
}

/**
 * Helper function to create a filter configuration with type safety
 * 
 * @template T The type of items being filtered
 * @param config - Partial filter configuration
 * @returns Complete filter configuration with defaults
 */
export function createFilterConfig<T = any>(
    config: Omit<FilterConfig<T>, 'defaultValue'> & { defaultValue?: string }
): FilterConfig<T> {
    return {
        defaultValue: '',
        ...config
    };
}

/**
 * Helper function to create a filter system configuration with type safety
 * 
 * @template T The type of items being filtered
 * @param config - Filter system configuration
 * @returns The same configuration (for type checking)
 */
export function createFilterSystemConfig<T = any>(
    config: FilterSystemConfig<T>
): FilterSystemConfig<T> {
    return config;
}

/**
 * Implementation of the FilterManager interface
 * 
 * Manages filter state, applies filters to DOM elements, and synchronizes
 * state with URL parameters. Supports debouncing for search inputs and
 * provides accessibility features.
 * 
 * @template T The type of items being filtered
 */
export class FilterManagerImpl<T = any> implements FilterManager<T> {
    private config: FilterSystemConfig<T>;
    private filterState: Map<string, string>;
    private debounceTimers: Map<string, number>;
    private eventListeners: Array<{ element: Element; event: string; handler: EventListener }>;
    private items: Element[];
    private container: Element | null;
    private noResultsElement: Element | null;
    private resultsCountElement: Element | null;
    private clearButton: Element | null;

    /**
     * Create a new FilterManager instance
     * 
     * @param config - The filter system configuration
     * @throws Error if configuration is invalid
     */
    constructor(config: FilterSystemConfig<T>) {
        // Validate configuration
        const validation = validateFilterConfig(config);
        if (!validation.valid) {
            throw new Error(`Invalid filter configuration:\n${validation.errors.join('\n')}`);
        }

        this.config = config;
        this.filterState = new Map();
        this.debounceTimers = new Map();
        this.eventListeners = [];
        this.items = [];
        this.container = null;
        this.noResultsElement = null;
        this.resultsCountElement = null;
        this.clearButton = null;

        // Initialize filter state with default values
        this.config.filters.forEach(filter => {
            this.filterState.set(filter.id, filter.defaultValue || '');
        });
    }

    /**
     * Initialize the filter manager
     * Sets up event listeners and loads initial state from URL
     */
    initialize(): void {
        // Cache DOM elements
        this.container = document.querySelector(this.config.containerSelector);
        this.noResultsElement = document.querySelector(this.config.noResultsSelector);
        this.resultsCountElement = document.querySelector(this.config.resultsCountSelector);
        this.clearButton = document.querySelector(this.config.clearButtonSelector);

        if (!this.container) {
            console.warn(`FilterManager: Container not found: ${this.config.containerSelector}`);
            return;
        }

        // Cache item elements
        this.items = Array.from(this.container.querySelectorAll(this.config.itemSelector));

        if (this.items.length === 0) {
            console.warn(`FilterManager: No items found: ${this.config.itemSelector}`);
        }

        // Set up event listeners for each filter
        this.config.filters.forEach(filter => {
            const element = document.getElementById(filter.id);
            if (!element) {
                console.warn(`FilterManager: Filter element not found: ${filter.id}`);
                return;
            }

            if (filter.type === 'search') {
                // Search filters use input event with debouncing
                const handler = (event: Event) => {
                    const target = event.target as HTMLInputElement;
                    const value = target.value;

                    // Clear existing timer for this filter
                    const existingTimer = this.debounceTimers.get(filter.id);
                    if (existingTimer !== undefined) {
                        window.clearTimeout(existingTimer);
                    }

                    // Set new timer
                    const debounceDelay = filter.debounce || 200;
                    const timer = window.setTimeout(() => {
                        this.setFilterState(filter.id, value);
                        this.applyFilters();
                        this.updateURL();
                    }, debounceDelay);

                    this.debounceTimers.set(filter.id, timer);
                };

                element.addEventListener('input', handler);
                this.eventListeners.push({ element, event: 'input', handler });
            } else {
                // Select and custom filters use change event (immediate)
                const handler = (event: Event) => {
                    const target = event.target as HTMLSelectElement;
                    const value = target.value;
                    this.setFilterState(filter.id, value);
                    this.applyFilters();
                    this.updateURL();
                };

                element.addEventListener('change', handler);
                this.eventListeners.push({ element, event: 'change', handler });
            }
        });

        // Set up clear button
        if (this.clearButton) {
            const handler = () => {
                this.clearFilters();
            };
            this.clearButton.addEventListener('click', handler);
            this.eventListeners.push({ element: this.clearButton, event: 'click', handler });
        }

        // Load initial state from URL
        this.loadFromURL();

        // Apply filters to set initial visibility
        this.applyFilters();
    }

    /**
     * Apply all active filters to content items
     * Uses AND logic - items must match all active filters
     */
    applyFilters(): void {
        if (this.items.length === 0) {
            return;
        }

        let visibleCount = 0;

        this.items.forEach(item => {
            // Extract data attributes from the item
            const itemData = this.extractItemData(item);

            // Check if item matches all active filters (AND logic)
            const matchesAllFilters = this.config.filters.every(filter => {
                const filterValue = this.filterState.get(filter.id) || '';

                // Empty filter value means no filtering for this filter
                if (!filterValue) {
                    return true;
                }

                // Apply the filter's predicate
                return filter.predicate(itemData, filterValue);
            });

            // Update item visibility
            if (matchesAllFilters) {
                item.classList.remove('hidden');
                item.removeAttribute('aria-hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
                item.setAttribute('aria-hidden', 'true');
            }
        });

        // Update results count
        this.updateResultsCount(visibleCount);

        // Show/hide no results message
        if (this.noResultsElement) {
            if (visibleCount === 0) {
                this.noResultsElement.classList.remove('hidden');
                this.noResultsElement.removeAttribute('aria-hidden');
            } else {
                this.noResultsElement.classList.add('hidden');
                this.noResultsElement.setAttribute('aria-hidden', 'true');
            }
        }
    }

    /**
     * Clear all filters and reset to default state
     */
    clearFilters(): void {
        // Reset all filter values to defaults
        this.config.filters.forEach(filter => {
            const defaultValue = filter.defaultValue || '';
            this.filterState.set(filter.id, defaultValue);

            // Update UI elements
            const element = document.getElementById(filter.id);
            if (element) {
                if (element instanceof HTMLInputElement) {
                    element.value = defaultValue;
                } else if (element instanceof HTMLSelectElement) {
                    element.value = defaultValue;
                }
            }
        });

        // Clear URL parameters
        const url = new URL(window.location.href);
        this.config.filters.forEach(filter => {
            if (filter.urlParam) {
                url.searchParams.delete(filter.urlParam);
            }
        });
        window.history.replaceState({}, '', url.toString());

        // Apply filters to show all items
        this.applyFilters();

        // Focus the first search input if available
        const firstSearchFilter = this.config.filters.find(f => f.type === 'search');
        if (firstSearchFilter) {
            const element = document.getElementById(firstSearchFilter.id);
            if (element instanceof HTMLInputElement) {
                element.focus();
            }
        }
    }

    /**
     * Get the current value of a specific filter
     */
    getFilterState(filterId: string): string | undefined {
        return this.filterState.get(filterId);
    }

    /**
     * Set the value of a specific filter
     */
    setFilterState(filterId: string, value: string): void {
        this.filterState.set(filterId, value);
    }

    /**
     * Load filter state from URL query parameters
     */
    loadFromURL(): void {
        const url = new URL(window.location.href);

        this.config.filters.forEach(filter => {
            if (filter.urlParam) {
                const value = url.searchParams.get(filter.urlParam);
                if (value !== null) {
                    // Validate the value before applying
                    if (this.isValidFilterValue(filter, value)) {
                        this.filterState.set(filter.id, value);

                        // Update UI element
                        const element = document.getElementById(filter.id);
                        if (element) {
                            if (element instanceof HTMLInputElement) {
                                element.value = value;
                            } else if (element instanceof HTMLSelectElement) {
                                element.value = value;
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Update URL query parameters to reflect current filter state
     */
    updateURL(): void {
        const url = new URL(window.location.href);

        this.config.filters.forEach(filter => {
            if (filter.urlParam) {
                const value = this.filterState.get(filter.id) || '';

                if (value && value !== (filter.defaultValue || '')) {
                    // Only add non-default values to URL
                    url.searchParams.set(filter.urlParam, value);
                } else {
                    // Remove parameter if value is default or empty
                    url.searchParams.delete(filter.urlParam);
                }
            }
        });

        // Update URL without reloading the page
        window.history.replaceState({}, '', url.toString());
    }

    /**
     * Clean up event listeners and resources
     */
    destroy(): void {
        // Clear all debounce timers
        this.debounceTimers.forEach(timer => {
            window.clearTimeout(timer);
        });
        this.debounceTimers.clear();

        // Remove all event listeners
        this.eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.eventListeners = [];

        // Clear references
        this.items = [];
        this.container = null;
        this.noResultsElement = null;
        this.resultsCountElement = null;
        this.clearButton = null;
    }

    /**
     * Extract data attributes from a DOM element
     * Converts data-* attributes to a plain object
     */
    private extractItemData(item: Element): any {
        const data: any = {};

        // Get all data attributes
        if (item instanceof HTMLElement) {
            Object.keys(item.dataset).forEach(key => {
                data[key] = item.dataset[key];
            });
        }

        return data;
    }

    /**
     * Update the results count display
     */
    private updateResultsCount(count: number): void {
        if (this.resultsCountElement) {
            // Get the template from data-template attribute
            const template = this.resultsCountElement.getAttribute('data-template') || '{count}';

            // Replace {count} placeholder with actual count
            this.resultsCountElement.textContent = template.replace(
                '{count}',
                count.toString()
            );

            // Announce to screen readers
            this.resultsCountElement.setAttribute('aria-live', 'polite');
            this.resultsCountElement.setAttribute('aria-atomic', 'true');
        }
    }

    /**
     * Validate a filter value
     * For select filters, checks if value is in options
     * For other filters, always returns true
     */
    private isValidFilterValue(filter: FilterConfig<T>, value: string): boolean {
        if (filter.type === 'select' && filter.options) {
            // Check if value exists in options
            return filter.options.some(option => option.value === value);
        }

        // For search and custom filters, any string is valid
        return true;
    }
}
