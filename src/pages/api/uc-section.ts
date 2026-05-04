export const prerender = false;

import type { APIRoute } from 'astro';
import { findUcFile, readUcFile, verifyToken, findSection, errorResponse, successResponse } from '@utils/uc-file-utils';

export const GET: APIRoute = async ({ url }) => {
    try {
        const slug = url.searchParams.get('slug');
        const token = url.searchParams.get('token');
        const sectionId = url.searchParams.get('sectionId');

        if (!slug || !token || !sectionId) return errorResponse('Missing fields');

        const uc = findUcFile(slug);
        if (!uc) return errorResponse('UC not found', 404);

        const fileContent = readUcFile(uc.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        const section = findSection(fileContent, sectionId);
        if (!section) return errorResponse('Section not found', 404);

        return successResponse({ markdown: section.content });
    } catch (err: any) {
        return errorResponse(`Server error: ${err?.message}`, 500);
    }
};
