export const prerender = false;

import type { APIRoute } from 'astro';
import matter from 'gray-matter';
import { findUcFile, readUcFile, verifyToken, errorResponse, successResponse } from '@utils/uc-file-utils';

export const GET: APIRoute = async ({ url }) => {
    try {
        const slug = url.searchParams.get('slug');
        const token = url.searchParams.get('token');

        if (!slug || !token) return errorResponse('Missing fields');

        const uc = findUcFile(slug);
        if (!uc) return errorResponse('UC not found', 404);

        let fileContent = readUcFile(uc.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        // Parse frontmatter using gray-matter
        const { data: frontmatter } = matter(fileContent);

        const references = Array.isArray(frontmatter.references) ? frontmatter.references : [];
        return successResponse({ ok: true, references });
    } catch (err: any) {
        return errorResponse(`Server error: ${err?.message}`, 500);
    }
};
