/**
 * Badge utility functions for consistent badge styling
 */

import type { Badge } from "../models/Badge.model";

const BACKGROUND_COLORS = {
    PC1: "bg-blue-bell-200",
    PC2: "bg-blue-bell-200",
    PC3: "bg-blue-bell-200",
    PC4: "bg-hit-pink-200",
    PC5: "bg-marzipan-200",
    'job-offers.deadline-approaching': "bg-yellow-800",
    'job-offers.deadline-passed': "bg-red-800",
    default: "bg-gray-100",
} as const;

const COLORS = {
    PC1: "text-blue-bell-900",
    PC2: "text-blue-bell-900",
    PC3: "text-blue-bell-900",
    PC4: "text-hit-pink-900",
    PC5: "text-marzipan-900",
    'job-offers.deadline-approaching': "text-yellow-100",
    'job-offers.deadline-passed': "text-red-100",
    default: "text-gray-800"
} as const;

export function getBadge(value: string, t: any): Badge {
    let color = COLORS[value as keyof typeof COLORS] || COLORS.default;
    let backgroundColor = BACKGROUND_COLORS[value as keyof typeof BACKGROUND_COLORS] || BACKGROUND_COLORS.default;

    return {
        label: t(`badge.${value}`) || t(value) || value,
        color: color,
        backgroundColor: backgroundColor,
    };
}