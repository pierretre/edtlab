export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { findUcFile, readUcFile, verifyToken, errorResponse, successResponse } from '@utils/uc-file-utils';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const slug = formData.get('slug') as string | null;
        const token = formData.get('token') as string | null;

        if (!file || !slug || !token) return errorResponse('Missing fields');

        // Validate file type (PDF only)
        if (file.type !== 'application/pdf') {
            return errorResponse('Only PDF files are allowed', 400);
        }

        const uc = findUcFile(slug);
        if (!uc) return errorResponse('UC not found', 404);

        let fileContent = readUcFile(uc.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        // Generate unique filename
        const timestamp = Date.now();
        const fileName = `${slug}-${timestamp}.pdf`;
        const docsDir = path.join(process.cwd(), 'public', 'docs');
        fs.mkdirSync(docsDir, { recursive: true });
        const filePath = path.join(docsDir, fileName);
        fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));

        const publicUrl = `/docs/${fileName}`;
        return successResponse({ ok: true, url: publicUrl });
    } catch (err: any) {
        return errorResponse(`Server error: ${err?.message}`, 500);
    }
};
