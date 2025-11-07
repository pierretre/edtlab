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
 * Get color classes for event types
 * @param type - The event type
 * @returns Tailwind CSS classes for the event type
 */
export function getEventTypeColor(type: string): string {
    return EVENT_TYPE_COLORS[type as keyof typeof EVENT_TYPE_COLORS] || EVENT_TYPE_COLORS.default;
}

/**
 * Get color classes for job offer types
 * @param type - The job offer type
 * @returns Tailwind CSS classes for the job type
 */
export function getJobTypeColor(type: string): string {
    return JOB_TYPE_COLORS[type as keyof typeof JOB_TYPE_COLORS] || JOB_TYPE_COLORS.default;
}
