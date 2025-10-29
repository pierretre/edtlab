/**
 * Color utility functions for consistent styling across components
 */

/**
 * Event type color mappings using Tailwind CSS classes
 */
export const EVENT_TYPE_COLORS = {
    conference: "bg-scampi-100 text-scampi-800 border-scampi-200",
    workshop: "bg-blue-100 text-blue-800 border-blue-200",
    seminar: "bg-green-100 text-green-800 border-green-200",
    press: "bg-purple-100 text-purple-800 border-purple-200",
    default: "bg-gray-100 text-gray-800 border-gray-200"
} as const;

/**
 * Project color mappings using Tailwind CSS classes
 */
export const PROJECT_COLORS = {
    PC1: "bg-scampi-100 text-scampi-800 border-scampi-200",
    PC2: "bg-blue-100 text-blue-800 border-blue-200",
    PC3: "bg-green-100 text-green-800 border-green-200",
    PC4: "bg-yellow-100 text-yellow-800 border-yellow-200",
    PC5: "bg-purple-100 text-purple-800 border-purple-200",
    General: "bg-gray-100 text-gray-800 border-gray-200",
    default: "bg-gray-100 text-gray-800 border-gray-200"
} as const;

/**
 * Job offer type color mappings using Tailwind CSS classes
 */
export const JOB_TYPE_COLORS = {
    postdoc: "bg-scampi-100 text-scampi-800 border-scampi-200",
    phd: "bg-blue-100 text-blue-800 border-blue-200",
    engineer: "bg-green-100 text-green-800 border-green-200",
    intern: "bg-yellow-100 text-yellow-800 border-yellow-200",
    default: "bg-gray-100 text-gray-800 border-gray-200"
} as const;

/**
 * Press release type color mappings using Tailwind CSS classes
 */
export const PRESS_TYPE_COLORS = {
    announcement: "bg-scampi-100 text-scampi-800 border-scampi-200",
    award: "bg-yellow-100 text-yellow-800 border-yellow-200",
    partnership: "bg-blue-100 text-blue-800 border-blue-200",
    publication: "bg-green-100 text-green-800 border-green-200",
    event: "bg-purple-100 text-purple-800 border-purple-200",
    default: "bg-gray-100 text-gray-800 border-gray-200"
} as const;

/**
 * Get color classes for event types
 * @param type - The event type
 * @returns Tailwind CSS classes for the event type
 */
export function getEventTypeColor(type: string): string {
    return EVENT_TYPE_COLORS[type as keyof typeof EVENT_TYPE_COLORS] || EVENT_TYPE_COLORS.default;
}

/**
 * Get color classes for project types
 * @param project - The project identifier
 * @returns Tailwind CSS classes for the project
 */
export function getProjectColor(project: string): string {
    return PROJECT_COLORS[project as keyof typeof PROJECT_COLORS] || PROJECT_COLORS.default;
}

/**
 * Get color classes for job offer types
 * @param type - The job offer type
 * @returns Tailwind CSS classes for the job type
 */
export function getJobTypeColor(type: string): string {
    return JOB_TYPE_COLORS[type as keyof typeof JOB_TYPE_COLORS] || JOB_TYPE_COLORS.default;
}

/**
 * Get color classes for press release types
 * @param type - The press release type
 * @returns Tailwind CSS classes for the press type
 */
export function getPressTypeColor(type: string): string {
    return PRESS_TYPE_COLORS[type as keyof typeof PRESS_TYPE_COLORS] || PRESS_TYPE_COLORS.default;
}