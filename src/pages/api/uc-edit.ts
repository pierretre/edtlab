export const prerender = false;

import type { APIRoute } from 'astro';
import { findUcFile, readUcFile, writeUcFile, verifyToken, findSection, errorResponse, successResponse } from '@utils/uc-file-utils';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { slug, token, sectionId, content } = await request.json();

        if (!slug || !token || !sectionId || content === undefined) return errorResponse('Missing fields');

        const uc = findUcFile(slug);
        if (!uc) return errorResponse('UC not found', 404);

        let fileContent = readUcFile(uc.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        const section = findSection(fileContent, sectionId);
        if (!section) return errorResponse('Section not found in file', 404);

        fileContent = fileContent.substring(0, section.start) + content + '\n\n' + fileContent.substring(section.end);
        writeUcFile(uc.filePath, fileContent);

        return successResponse();
    } catch (err: any) {
        return errorResponse(`Server error: ${err?.message}`, 500);
    }
};
