import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { Request } from 'express';

const RATE_LIMIT_FILE = path.join(os.tmpdir(), 'contact_form_rate_limit.json');

export interface RateLimitData {
    [ip: string]: number;
}

/**
 * Get client IP from request
 */
export const getClientIp = (req: Request): string => {
    const forwarded = req.headers['x-forwarded-for'];
    const forwardedIp = typeof forwarded === 'string'
        ? forwarded.split(',')[0]
        : Array.isArray(forwarded)
            ? forwarded[0]
            : undefined;

    return req.headers['x-real-ip'] as string ||
        forwardedIp ||
        req.socket.remoteAddress ||
        'unknown';
};

/**
 * Load rate limit data from file
 */
export const loadRateLimitData = async (): Promise<RateLimitData> => {
    try {
        const data = await fs.readFile(RATE_LIMIT_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
};

/**
 * Save rate limit data to file
 */
export const saveRateLimitData = async (data: RateLimitData): Promise<void> => {
    try {
        await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving rate limit data:', error);
    }
};

/**
 * Clean old rate limit entries (older than 2 hours)
 */
export const cleanRateLimitData = (data: RateLimitData): RateLimitData => {
    const currentTime = Math.floor(Date.now() / 1000);
    const cleaned: RateLimitData = {};

    for (const [ip, timestamp] of Object.entries(data)) {
        if (currentTime - timestamp < 7200) {
            cleaned[ip] = timestamp;
        }
    }

    return cleaned;
};

/**
 * Check if IP is rate limited
 */
export const checkRateLimit = (
    ip: string,
    data: RateLimitData,
    limitSeconds: number
): { limited: boolean; remainingTime: number } => {
    if (!data[ip]) {
        return { limited: false, remainingTime: 0 };
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeSinceLastSubmit = currentTime - data[ip];

    if (timeSinceLastSubmit < limitSeconds) {
        return {
            limited: true,
            remainingTime: limitSeconds - timeSinceLastSubmit
        };
    }

    return { limited: false, remainingTime: 0 };
};

/**
 * Update rate limit for IP
 */
export const updateRateLimit = (ip: string, data: RateLimitData): RateLimitData => {
    const currentTime = Math.floor(Date.now() / 1000);
    return {
        ...data,
        [ip]: currentTime
    };
};
