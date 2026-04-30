export const prerender = false;

import type { APIRoute } from 'astro';
import { findUcFile, readUcFile, writeUcFile, verifyToken, replaceFrontmatterField, errorResponse, successResponse } from '@utils/uc-file-utils';

const ALLOWED_FIELDS = ['domain', 'maturity'];

export const POST: APIRoute = async ({ request }) => {
    try {
        const { slug, token, field, value } = await request.json();

        if (!slug || !token || !field || value === undefined) return errorResponse('Missing fields');
        if (!ALLOWED_FIELDS.includes(field)) return errorResponse('Field not allowed');

        const uc = findUcFile(slug);
        if (!uc) return errorResponse('UC not found', 404);

        let fileContent = readUcFile(uc.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        fileContent = replaceFrontmatterField(fileContent, field, value);
        writeUcFile(uc.filePath, fileContent);

        return successResponse();
    } catch (err: any) {
        return errorResponse(`Server error: ${err?.message}`, 500);
    }
};
