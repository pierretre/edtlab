/**
 * Badge utility functions for consistent badge styling
 */

import type { Badge } from "@models/Badge.model";

const BACKGROUND_COLORS = {
    PC1: "bg-blue-bell-200",
    PC2: "bg-blue-bell-200",
    PC3: "bg-blue-bell-200",
    PC4: "bg-hit-pink-200",
    PC5: "bg-marzipan-200",
    General: "bg-primary-200",
    'positions.available': "bg-green-200",
    'positions.filled': "bg-gray-200",
    event: "bg-primary-200",
    'press-release': "bg-secondary-200",
    at1: "bg-tertiary-200",
    at2: "bg-tertiary-200",
    at3: "bg-tertiary-200",
    at4: "bg-tertiary-200",
    at5: "bg-tertiary-200",
    workshop: "bg-marzipan-50",
    seminar: "bg-blue-bell-50",
    concept: "bg-blue-bell-50",
    poc: "bg-blue-bell-50",
    prototype: "bg-blue-bell-50",
    operational: "bg-blue-bell-50",
    default: "bg-gray-100",
} as const;

const COLORS = {
    PC1: "text-blue-bell-900",
    PC2: "text-blue-bell-900",
    PC3: "text-blue-bell-900",
    PC4: "text-hit-pink-900",
    PC5: "text-marzipan-900",
    General: "text-primary-900",
    'positions.available': "text-green-800",
    'positions.filled': "text-gray-800",
    event: "text-primary-900",
    'press-release': "text-secondary-900",
    at1: "text-tertiary-900",
    at2: "text-tertiary-900",
    at3: "text-tertiary-900",
    at4: "text-tertiary-900",
    at5: "text-tertiary-900",
    workshop: "text-marzipan-700",
    seminar: "text-blue-bell-700",
    concept: "text-blue-bell-700",
    poc: "text-blue-bell-700",
    prototype: "text-blue-bell-700",
    operational: "text-blue-bell-700",
    default: "text-gray-800"
} as const;

export function getBadge(value: string, t: any): Badge {
    // Safety check for undefined or empty values
    if (!value || typeof value !== 'string') {
        return {
            label: '',
            color: COLORS.default,
            backgroundColor: BACKGROUND_COLORS.default,
        };
    }

    const lookupKey = (Object.keys(COLORS) as Array<keyof typeof COLORS>).find(
        k => k.toLowerCase() === value.toLowerCase()
    );
    const color = lookupKey ? COLORS[lookupKey] : COLORS.default;
    const backgroundColor = lookupKey ? BACKGROUND_COLORS[lookupKey] : BACKGROUND_COLORS.default;
    const upperedValue = value.charAt(0).toUpperCase() + value.slice(1);

    return {
        label: t(`badge.${value.toLowerCase()}`) || t(value) || upperedValue,
        color: color,
        backgroundColor: backgroundColor,
    };
}
