export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { findUcFile, readUcFile, verifyToken, errorResponse, successResponse } from '@utils/uc-file-utils';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { slug, token, message, senderName, senderEmail } = await request.json();
        if (!slug || !token || !message) return errorResponse('Missing fields');

        const file = findUcFile(slug);
        if (!file) return errorResponse('UC not found', 404);

        const content = readUcFile(file.filePath);
        if (!verifyToken(content, token)) return errorResponse('Invalid token', 403);

        // Store correction request as JSON file
        const requestsDir = path.join(process.cwd(), 'src', 'content', 'use-cases', '.requests');
        fs.mkdirSync(requestsDir, { recursive: true });

        const requestFile = path.join(requestsDir, `${slug}-${Date.now()}.json`);
        fs.writeFileSync(requestFile, JSON.stringify({
            slug,
            date: new Date().toISOString(),
            senderName: senderName || 'Anonymous',
            senderEmail: senderEmail || '',
            message
        }, null, 2), 'utf-8');

        return successResponse({ ok: true });
    } catch (err: any) {
        return errorResponse('Server error: ' + err?.message, 500);
    }
};
