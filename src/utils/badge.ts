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
    'job-offers.available': "bg-green-200",
    'job-offers.filled': "bg-gray-200",
    default: "bg-gray-100",
} as const;

const COLORS = {
    PC1: "text-blue-bell-900",
    PC2: "text-blue-bell-900",
    PC3: "text-blue-bell-900",
    PC4: "text-hit-pink-900",
    PC5: "text-marzipan-900",
    General: "text-primary-900",
    'job-offers.available': "text-green-800",
    'job-offers.filled': "text-gray-800",
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

    const color = COLORS[value as keyof typeof COLORS] || COLORS.default;
    const backgroundColor = BACKGROUND_COLORS[value as keyof typeof BACKGROUND_COLORS] || BACKGROUND_COLORS.default;
    const upperedValue = value.charAt(0).toUpperCase() + value.slice(1);

    return {
        label: t(`badge.${value.toLowerCase()}`) || t(value) || upperedValue,
        color: color,
        backgroundColor: backgroundColor,
    };
}