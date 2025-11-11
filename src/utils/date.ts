/**
 * Date utility functions for formatting and validation
 */

/**
 * Format a date according to the specified language locale
 * @param date - The date to format
 * @param lang - The language code ('en' or 'fr')
 * @param options - Additional Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
    date: Date,
    lang: 'en' | 'fr' = 'en',
    options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
): string {
    const locale = lang === "fr" ? "fr-FR" : "en-US";
    return date.toLocaleDateString(locale, options);
}

/**
 * Check if a date is in the future (upcoming)
 * @param date - The date to check
 * @returns True if the date is in the future
 */
export function isUpcoming(date: Date): boolean {
    const now = new Date();
    return date > now;
}

/**
 * Check if a date is today
 * @param date - The date to check
 * @returns True if the date is today
 */
export function isToday(date: Date): boolean {
    const now = new Date();
    return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    );
}

/**
 * Check if a date is soon (within specified days)
 * @param date - The date to check
 * @param days - Number of days to consider as "soon" (default: 7)
 * @returns True if the date is within the specified number of days
 */
export function isSoon(date: Date, days: number = 7): boolean {
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff >= 0 && daysDiff <= days;
}

/**
 * Check if a deadline is approaching (within specified days)
 * @param deadline - The deadline date to check
 * @param days - Number of days to consider as "approaching" (default: 30)
 * @returns True if the deadline is within the specified number of days
 */
export function isDeadlineApproaching(deadline: Date, days: number = 30): boolean {
    const now = new Date();
    const timeDiff = deadline.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff >= 0 && daysDiff <= days;
}

/**
 * Check if a deadline has passed
 * @param deadline - The deadline date to check
 * @returns True if the deadline has passed
 */
export function isDeadlinePassed(deadline: Date): boolean {
    const now = new Date();
    return deadline < now;
}

/**
 * Check if a date is recent (within specified days from now)
 * @param date - The date to check
 * @param days - Number of days to consider as "recent" (default: 30)
 * @returns True if the date is within the specified number of days from now
 */
export function isRecent(date: Date, days: number = 30): boolean {
    const now = new Date();
    const timeDiff = now.getTime() - date.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff >= 0 && daysDiff <= days;
}