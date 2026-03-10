/**
 * Validation utility functions for data validation and type checking
 */

/**
 * Supported language codes
 */
export const SUPPORTED_LANGUAGES = ['en', 'fr'] as const;

/**
 * Supported event types
 */
export const EVENT_TYPES = ['conference', 'workshop', 'seminar', 'press'] as const;

/**
 * Supported publication types
 */
export const PUBLICATION_TYPES = ['journal', 'conference', 'book', 'report'] as const;

/**
 * Supported job offer types
 */
export const JOB_TYPES = ['postdoc', 'phd', 'engineer', 'intern', 'others'] as const;

/**
 * Supported project identifiers
 */
export const PROJECT_IDS = ['PC1', 'PC2', 'PC3', 'PC4', 'PC5', 'General'] as const;

/**
 * Supported press release types
 */
export const PRESS_TYPES = ['announcement', 'award', 'partnership', 'publication', 'event'] as const;

/**
 * Check if a language code is valid
 * @param lang - The language code to validate
 * @returns True if the language code is supported
 */
export function isValidLanguage(lang: string): lang is 'en' | 'fr' {
    return SUPPORTED_LANGUAGES.includes(lang as any);
}

/**
 * Check if an event type is valid
 * @param type - The event type to validate
 * @returns True if the event type is supported
 */
export function isValidEventType(type: string): boolean {
    return EVENT_TYPES.includes(type as any);
}

/**
 * Check if a publication type is valid
 * @param type - The publication type to validate
 * @returns True if the publication type is supported
 */
export function isValidPublicationType(type: string): boolean {
    return PUBLICATION_TYPES.includes(type as any);
}

/**
 * Check if a job offer type is valid
 * @param type - The job offer type to validate
 * @returns True if the job offer type is supported
 */
export function isValidJobType(type: string): boolean {
    return JOB_TYPES.includes(type as any);
}

/**
 * Check if a project ID is valid
 * @param project - The project ID to validate
 * @returns True if the project ID is supported
 */
export function isValidProjectId(project: string): boolean {
    return PROJECT_IDS.includes(project as any);
}

/**
 * Check if a press release type is valid
 * @param type - The press release type to validate
 * @returns True if the press release type is supported
 */
export function isValidPressType(type: string): boolean {
    return PRESS_TYPES.includes(type as any);
}

/**
 * Validate content file naming convention
 * @param fileName - The file name to validate
 * @returns True if the file name follows the convention
 */
export function isValidContentFileName(fileName: string): boolean {
    return /^(en|fr)\.(md|mdx)$/.test(fileName);
}

/**
 * Validate URL structure for languages
 * @param url - The URL to validate
 * @returns True if the URL has proper language structure
 */
export function hasValidLanguagePrefix(url: string): boolean {
    return /^\/(en|fr)\//.test(url);
}