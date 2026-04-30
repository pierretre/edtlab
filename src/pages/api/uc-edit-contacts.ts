export const prerender = false;

import type { APIRoute } from 'astro';
import matter from 'gray-matter';
import { findUcFile, readUcFile, writeUcFile, verifyToken, errorResponse, successResponse } from '@utils/uc-file-utils';

export const GET: APIRoute = async ({ url }) => {
    try {
        const slug = url.searchParams.get('slug');
        const token = url.searchParams.get('token');

        if (!slug || !token) return errorResponse('Missing fields');

        const uc = findUcFile(slug);
        if (!uc) return errorResponse('UC not found', 404);

        const fileContent = readUcFile(uc.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        const { data } = matter(fileContent);
        const contacts = Array.isArray(data.contacts) ? data.contacts : [];
        return successResponse({ contacts });
    } catch (err: any) {
        return errorResponse(`Server error: ${err?.message}`, 500);
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const { slug, token, contacts } = await request.json();

        if (!slug || !token || !Array.isArray(contacts)) return errorResponse('Missing fields');

        const uc = findUcFile(slug);
        if (!uc) return errorResponse('UC not found', 404);

        const fileContent = readUcFile(uc.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        const { data: frontmatter, content: body } = matter(fileContent);
        frontmatter.contacts = contacts;
        writeUcFile(uc.filePath, matter.stringify(body, frontmatter));
        return successResponse();
    } catch (err: any) {
        return errorResponse(`Server error: ${err?.message}`, 500);
    }
};
