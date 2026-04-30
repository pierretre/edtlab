export const prerender = false;

import type { APIRoute } from 'astro';
import { findUcFile, readUcFile, writeUcFile, verifyToken, errorResponse, successResponse } from '@utils/uc-file-utils';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { slug, token, name, title, org } = await request.json();
        if (!slug || !token || !name || !title || !org) return errorResponse('Missing fields');

        const file = findUcFile(slug);
        if (!file) return errorResponse('UC not found', 404);

        let content = readUcFile(file.filePath);
        if (!verifyToken(content, token)) return errorResponse('Invalid token', 403);

        const today = new Date().toISOString().split('T')[0];

        // Add or update approvedBy block in frontmatter
        if (content.includes('approvedBy:')) {
            // Replace existing approvedBy block
            content = content.replace(
                /approvedBy:\n(\s+\w+:.*\n)*/m,
                `approvedBy:\n  name: "${name}"\n  title: "${title}"\n  org: "${org}"\n  date: ${today}\n`
            );
        } else {
            // Insert before previewToken or before ---
            content = content.replace(
                /previewToken:/,
                `approvedBy:\n  name: "${name}"\n  title: "${title}"\n  org: "${org}"\n  date: ${today}\npreviewToken:`
            );
        }

        // Update status to published
        content = content.replace(/^status:\s*.*$/m, 'status: published');

        writeUcFile(file.filePath, content);
        return successResponse({ ok: true, status: 'published' });
    } catch (err: any) {
        return errorResponse('Server error: ' + err?.message, 500);
    }
};
