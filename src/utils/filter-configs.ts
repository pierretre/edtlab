/**
 * Filter configurations for different content types
 * 
 * This module provides pre-configured filter systems for job offers,
 * publications, and news items. Each configuration defines the available
 * filters, their options, predicates, and URL parameter mappings.
 * 
 * @module filter-configs
 */

import type { FilterSystemConfig } from './filtering';
import type { JobOffer } from '../models/JobOffer.model';
import type { Publication } from '../models/Publication.model';
import type { NewsItem } from '../models/NewsItem.model';

/**
 * Type representing data extracted from DOM element data attributes
 * Used by filter predicates to match against filter values
 */
interface DOMItemData {
    [key: string]: string | undefined;
}

/**
 * Filter configuration for job offers
 * 
 * Provides filtering by:
 * - Project (PC1-PC5, General)
 * - Type (postdoc, phd, engineer, intern)
 * - Status (available, filled based on position availability)
 * - Search (title, description, location)
 * 
 * Expected data attributes on job offer items:
 * - data-tags: Space-separated list of tags (including project codes like PC1-PC5, General)
 * - data-type: The job type (postdoc, phd, engineer, intern)
 * - data-status: The status (active, expired)
 * - data-search-text: Combined searchable text (title, description, location)
 * 
 * @example
 * ```typescript
 * import { jobOffersFilterConfig } from './filter-configs';
 * import { FilterManagerImpl } from './filtering';
 * 
 * const filterManager = new FilterManagerImpl(jobOffersFilterConfig);
 * filterManager.initialize();
 * ```
 */
export const jobOffersFilterConfig: FilterSystemConfig<DOMItemData> = {
    filters: [
        {
            id: 'project-filter',
            type: 'select',
            label: 'Project',
            translationKey: 'job-offers.filter.project',
            options: [
                { value: '', label: 'All Projects', translationKey: 'job-offers.filter.all-projects' },
                { value: 'PC1', label: 'PC1' },
                { value: 'PC2', label: 'PC2' },
                { value: 'PC3', label: 'PC3' },
                { value: 'PC4', label: 'PC4' },
                { value: 'PC5', label: 'PC5' },
                { value: 'General', label: 'General', translationKey: 'badge.general' },
                { value: 'Extern', label: 'Extern', translationKey: 'badge.extern' }
            ],
            predicate: (data, value) => {
                if (!value) return true;
                // Check if the project tag is present in the tags string
                const tags = (data.tags || '').toLowerCase();
                const projectTag = value.toLowerCase();
                return tags.includes(projectTag);
            },
            urlParam: 'project',
            defaultValue: ''
        },
        {
            id: 'type-filter',
            type: 'select',
            label: 'Type',
            translationKey: 'job-offers.filter.type',
            options: [
                { value: '', label: 'All Types', translationKey: 'job-offers.filter.all-types' },
                { value: 'postdoc', label: 'Postdoc', translationKey: 'job-offers.type.PostDoc' },
                { value: 'phd', label: 'PhD', translationKey: 'job-offers.type.PhD' },
                { value: 'engineer', label: 'Engineer', translationKey: 'job-offers.type.Engineer' },
                { value: 'intern', label: 'Intern', translationKey: 'job-offers.type.Intern' },
                { value: 'others', label: 'Others', translationKey: 'job-offers.type.Others' }
            ],
            predicate: (data, value) => {
                if (!value) return true;
                return (data.type || '').toLowerCase() === value.toLowerCase();
            },
            urlParam: 'type',
            defaultValue: ''
        },
        {
            id: 'status-filter',
            type: 'select',
            label: 'Status',
            translationKey: 'job-offers.filter.status',
            options: [
                { value: '', label: 'All Status', translationKey: 'job-offers.filter.all-status' },
                { value: 'available', label: 'Available', translationKey: 'job-offers.filter.available' },
                { value: 'filled', label: 'Filled', translationKey: 'job-offers.filter.filled' }
            ],
            predicate: (data, value) => {
                if (!value) return true;

                // Determine if the job offer is available or filled based on filled status
                // The status should be set as a data attribute on the DOM element
                const status = data.status || '';
                return status === value;
            },
            urlParam: 'status',
            defaultValue: 'available'
        },
        {
            id: 'search-filter',
            type: 'search',
            label: 'Search',
            translationKey: 'job-offers.filter.search',
            placeholder: 'Search job offers...',
            placeholderTranslationKey: 'job-offers.filter.search-placeholder',
            predicate: (data, value) => {
                if (!value) return true;
                const searchText = (data.searchText || '').toLowerCase();
                const words = value.toLowerCase().split(/\s+/).filter(Boolean);
                return words.every(word => searchText.includes(word));
            },
            urlParam: 'search',
            debounce: 200,
            defaultValue: ''
        }
    ],
    itemSelector: '.job-offer-item',
    containerSelector: '#job-offers-grid',
    noResultsSelector: '#no-results',
    resultsCountSelector: '#results-count',
    clearButtonSelector: '#clear-filters'
};

/**
 * Filter configuration for publications
 * 
 * Provides filtering by:
 * - Project (PC1-PC5)
 * - Type (journal, conference, book, report, white-paper)
 * - Year (dynamically populated from available publications)
 * - Search (title, authors, venue)
 * 
 * Expected data attributes on publication items:
 * - data-tags: Space-separated list of tags (including project codes like PC1-PC5)
 * - data-type: The publication type (journal, conference, book, report, white-paper)
 * - data-year: The publication year
 * - data-search-text: Combined searchable text (title, authors, venue)
 * 
 * @example
 * ```typescript
 * import { publicationsFilterConfig } from './filter-configs';
 * import { FilterManagerImpl } from './filtering';
 * 
 * // Optionally populate year options dynamically
 * const years = getAvailableYears(publications);
 * publicationsFilterConfig.filters.find(f => f.id === 'year-filter')!.options = [
 *     { value: '', label: 'All Years' },
 *     ...years.map(year => ({ value: year.toString(), label: year.toString() }))
 * ];
 * 
 * const filterManager = new FilterManagerImpl(publicationsFilterConfig);
 * filterManager.initialize();
 * ```
 */
export const publicationsFilterConfig: FilterSystemConfig<DOMItemData> = {
    filters: [
        {
            id: 'project-filter',
            type: 'select',
            label: 'Project',
            translationKey: 'publications.filter.project',
            options: [
                { value: '', label: 'All Projects', translationKey: 'publications.filter.all-projects' },
                { value: 'PC1', label: 'PC1' },
                { value: 'PC2', label: 'PC2' },
                { value: 'PC3', label: 'PC3' },
                { value: 'PC4', label: 'PC4' },
                { value: 'PC5', label: 'PC5' },
                { value: 'General', label: 'General', translationKey: 'badge.general' }
            ],
            predicate: (data, value) => {
                if (!value) return true;
                // Check if the project tag is present in the tags string
                const tags = (data.tags || '').toLowerCase();
                const projectTag = value.toLowerCase();
                return tags.includes(projectTag);
            },
            urlParam: 'project',
            defaultValue: ''
        },
        {
            id: 'type-filter',
            type: 'select',
            label: 'Type',
            translationKey: 'publications.filter.type',
            options: [
                { value: '', label: 'All Types', translationKey: 'publications.filter.all-types' },
                { value: 'journal', label: 'Journal Article', translationKey: 'publications.type.journal' },
                { value: 'conference', label: 'Conference Paper', translationKey: 'publications.type.conference' },
                { value: 'book', label: 'Book', translationKey: 'publications.type.book' },
                { value: 'report', label: 'Technical Report', translationKey: 'publications.type.report' },
                { value: 'white-paper', label: 'White Paper', translationKey: 'publications.type.white-paper' },
                { value: 'preprint', label: 'Preprint', translationKey: 'publications.type.preprint' },
                { value: 'thesis', label: 'Thesis', translationKey: 'publications.type.thesis' },
                { value: 'workshop', label: 'Workshop', translationKey: 'publications.type.workshop' },
                { value: 'slidedeck', label: 'Slide Deck', translationKey: 'publications.type.slidedeck' }
            ],
            predicate: (data, value) => {
                if (!value) return true;
                return data.type === value;
            },
            urlParam: 'type',
            defaultValue: ''
        },
        {
            id: 'year-filter',
            type: 'select',
            label: 'Year',
            translationKey: 'publications.filter.year',
            options: [
                { value: '', label: 'All Years', translationKey: 'publications.filter.all-years' }
                // Additional year options should be populated dynamically
                // based on available publications
            ],
            predicate: (data, value) => {
                if (!value) return true;
                // Compare as strings since data attributes are strings
                return data.year === value;
            },
            urlParam: 'year',
            defaultValue: ''
        },
        {
            id: 'search-filter',
            type: 'search',
            label: 'Search',
            translationKey: 'publications.filter.search',
            placeholder: 'Search publications...',
            placeholderTranslationKey: 'publications.filter.search-placeholder',
            predicate: (data, value) => {
                if (!value) return true;
                const searchText = (data.searchText || '').toLowerCase();
                const words = value.toLowerCase().split(/\s+/).filter(Boolean);
                return words.every(word => searchText.includes(word));
            },
            urlParam: 'search',
            debounce: 200,
            defaultValue: ''
        }
    ],
    itemSelector: '.publication-item',
    containerSelector: '#publications-list',
    noResultsSelector: '#no-results',
    resultsCountSelector: '#results-count',
    clearButtonSelector: '#clear-filters'
};

/**
 * Filter configuration for news items
 * 
 * Provides filtering by:
 * - Project (PC1-PC5, based on tags)
 * - Category (event, press-release, platform-update)
 * - Sort (date-desc, date-asc, title-asc, title-desc)
 * - Search (title, description)
 * 
 * Expected data attributes on news items:
 * - data-tags: Space-separated list of tags (including project codes)
 * - data-category: The news category (event, press-release, platform-update)
 * - data-search-text: Combined searchable text (title, description)
 * 
 * Note: Sorting is handled separately from filtering and requires
 * additional implementation in the component using this configuration.
 * 
 * @example
 * ```typescript
 * import { newsFilterConfig } from './filter-configs';
 * import { FilterManagerImpl } from './filtering';
 * 
 * const filterManager = new FilterManagerImpl(newsFilterConfig);
 * filterManager.initialize();
 * 
 * // Handle sorting separately
 * const sortFilter = document.getElementById('sort-filter');
 * sortFilter?.addEventListener('change', (e) => {
 *     const sortValue = (e.target as HTMLSelectElement).value;
 *     sortNewsItems(sortValue);
 * });
 * ```
 */
export const newsFilterConfig: FilterSystemConfig<DOMItemData> = {
    filters: [
        {
            id: 'project-filter',
            type: 'select',
            label: 'Project',
            translationKey: 'news.filter.project',
            options: [
                { value: '', label: 'All Projects', translationKey: 'news.filter.all-projects' },
                { value: 'PC1', label: 'PC1' },
                { value: 'PC2', label: 'PC2' },
                { value: 'PC3', label: 'PC3' },
                { value: 'PC4', label: 'PC4' },
                { value: 'PC5', label: 'PC5' },
                { value: 'General', label: 'General', translationKey: 'badge.general' }
            ],
            predicate: (data, value) => {
                if (!value) return true;

                // Check if the project tag is present in the tags string
                // Tags should be stored as a space-separated string in data-tags attribute
                const tags = (data.tags || '').toLowerCase();
                const projectTag = value.toLowerCase();

                return tags.includes(projectTag);
            },
            urlParam: 'project',
            defaultValue: ''
        },
        {
            id: 'category-filter',
            type: 'select',
            label: 'Category',
            translationKey: 'news.filter.category',
            options: [
                { value: '', label: 'All Categories', translationKey: 'news.filter.all-categories' },
                { value: 'event', label: 'Event', translationKey: 'badge.event' },
                { value: 'press-release', label: 'Press Release', translationKey: 'badge.press-release' },
                { value: 'platform-update', label: 'Platform Update', translationKey: 'badge.platform-update' }
            ],
            predicate: (data, value) => {
                if (!value) return true;
                // The category should be set as a data attribute on the DOM element
                // Note: The data attribute is named 'category' but maps to newsType from the model
                return data.category === value;
            },
            urlParam: 'category',
            defaultValue: ''
        },
        {
            id: 'sort-filter',
            type: 'select',
            label: 'Sort',
            translationKey: 'news.filter.sort',
            options: [
                { value: 'date-desc', label: 'Newest First', translationKey: 'news.sort.date-desc' },
                { value: 'date-asc', label: 'Oldest First', translationKey: 'news.sort.date-asc' },
                { value: 'title-asc', label: 'Title A-Z', translationKey: 'news.sort.title-asc' },
                { value: 'title-desc', label: 'Title Z-A', translationKey: 'news.sort.title-desc' }
            ],
            predicate: () => {
                // Sorting is handled separately, not as a filter predicate
                // All items pass this filter
                return true;
            },
            urlParam: 'sort',
            defaultValue: 'date-desc'
        },
        {
            id: 'search-filter',
            type: 'search',
            label: 'Search',
            translationKey: 'news.filter.search',
            placeholder: 'Search news...',
            placeholderTranslationKey: 'news.filter.search-placeholder',
            predicate: (data, value) => {
                if (!value) return true;

                if (!value) return true;
                const searchText = (data.searchText || '').toLowerCase();
                const words = value.toLowerCase().split(/\s+/).filter(Boolean);
                return words.every(word => searchText.includes(word));
            },
            urlParam: 'search',
            debounce: 200,
            defaultValue: ''
        }
    ],
    itemSelector: '.news-item',
    containerSelector: '#unified-list',
    noResultsSelector: '#no-results',
    resultsCountSelector: '#results-count',
    clearButtonSelector: '#clear-filters'
};

/**
 * Helper function to extract unique years from publications
 * Useful for dynamically populating the year filter options
 * 
 * @param publications - Array of publications
 * @returns Sorted array of unique years (descending)
 * 
 * @example
 * ```typescript
 * const publications = await getCollection('publications');
 * const years = getAvailableYears(publications);
 * 
 * // Update the year filter options
 * const yearFilter = publicationsFilterConfig.filters.find(f => f.id === 'year-filter');
 * if (yearFilter) {
 *     yearFilter.options = [
 *         { value: '', label: 'All Years' },
 *         ...years.map(year => ({ value: year.toString(), label: year.toString() }))
 *     ];
 * }
 * ```
 */
export function getAvailableYears(publications: Publication[]): number[] {
    const years = new Set<number>();

    publications.forEach(pub => {
        if (pub.year) {
            years.add(pub.year);
        }
    });

    // Return sorted array (descending - newest first)
    return Array.from(years).sort((a, b) => b - a);
}

/**
 * Helper function to determine if a job offer is available or filled
 * 
 * @param filled - The job offer filled status
 * @returns 'available' if position is open, 'filled' if position is filled
 * 
 * @example
 * ```typescript
 * const status = getJobOfferStatus(jobOffer.filled);
 * console.log(status); // 'available' or 'filled'
 * ```
 */
export function getJobOfferStatus(filled: boolean): 'available' | 'filled' {
    return filled ? 'filled' : 'available';
}

/**
 * Helper function to prepare tags string for a job offer
 * Converts tags array to a space-separated lowercase string
 * 
 * @param jobOffer - The job offer object
 * @returns Space-separated lowercase tags string
 * 
 * @example
 * ```typescript
 * const tagsString = prepareJobOfferTagsString(jobOffer);
 * // Use in data-tags attribute
 * ```
 */
export function prepareJobOfferTagsString(jobOffer: JobOffer): string {
    if (!jobOffer.tags || jobOffer.tags.length === 0) {
        return '';
    }

    return jobOffer.tags.join(' ').toLowerCase();
}

/**
 * Helper function to prepare search text for a job offer
 * Combines all searchable fields including title, description, location,
 * requirements, tags, partner, and contacts into a single searchable string
 *
 * @param jobOffer - The job offer object
 * @returns Lowercase search text
 *
 * @example
 * ```typescript
 * const searchText = prepareJobOfferSearchText(jobOffer);
 * // Use in data-search-text attribute
 * ```
 */
export function prepareJobOfferSearchText(jobOffer: JobOffer): string {
    const parts = [
        jobOffer.title || '',
        jobOffer.description || '',
        jobOffer.location || '',
        ...(jobOffer.requirements || []),
        ...(jobOffer.tags || []),
        jobOffer.partner || '',
        ...(jobOffer.contacts || []),
    ];

    return parts.join(' ').toLowerCase();
}

/**
 * Helper function to prepare tags string for a publication
 * Converts tags array to a space-separated lowercase string
 * 
 * @param publication - The publication object
 * @returns Space-separated lowercase tags string
 * 
 * @example
 * ```typescript
 * const tagsString = preparePublicationTagsString(publication);
 * // Use in data-tags attribute
 * ```
 */
export function preparePublicationTagsString(publication: Publication): string {
    if (!publication.tags || publication.tags.length === 0) {
        return '';
    }

    return publication.tags.join(' ').toLowerCase();
}

/**
 * Helper function to prepare search text for a publication
 * Combines title, authors, and venue into a single searchable string
 * 
 * @param publication - The publication object
 * @returns Lowercase search text
 * 
 * @example
 * ```typescript
 * const searchText = preparePublicationSearchText(publication);
 * // Use in data-search-text attribute
 * ```
 */
export function preparePublicationSearchText(publication: Publication): string {
    const parts = [
        publication.title || '',
        publication.authors?.join(' ') || '',
        publication.venue || ''
    ];

    return parts.join(' ').toLowerCase();
}

/**
 * Helper function to prepare search text for a news item
 * Combines title and description into a single searchable string
 * 
 * @param newsItem - The news item object
 * @returns Lowercase search text
 * 
 * @example
 * ```typescript
 * const searchText = prepareNewsSearchText(newsItem);
 * // Use in data-search-text attribute
 * ```
 */
export function prepareNewsSearchText(newsItem: NewsItem): string {
    const parts = [
        newsItem.title || '',
        newsItem.description || ''
    ];

    return parts.join(' ').toLowerCase();
}

/**
 * Helper function to prepare tags string for a news item
 * Converts tags array to a space-separated lowercase string
 * 
 * @param newsItem - The news item object
 * @returns Space-separated lowercase tags string
 * 
 * @example
 * ```typescript
 * const tagsString = prepareNewsTagsString(newsItem);
 * // Use in data-tags attribute
 * ```
 */
export function prepareNewsTagsString(newsItem: NewsItem): string {
    if (!newsItem.tags || newsItem.tags.length === 0) {
        return '';
    }

    return newsItem.tags.join(' ').toLowerCase();
}
