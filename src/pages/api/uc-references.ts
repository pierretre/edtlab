export const prerender = false;

import type { APIRoute } from 'astro';
import matter from 'gray-matter';
import { findUcFile, readUcFile, writeUcFile, verifyToken, errorResponse, successResponse } from '@utils/uc-file-utils';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { slug, token, action, reference, refIndex, references } = await request.json();

        if (!slug || !token || !action) return errorResponse('Missing fields');

        const uc = findUcFile(slug);
        if (!uc) return errorResponse('UC not found', 404);

        let fileContent = readUcFile(uc.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        // Parse frontmatter using gray-matter
        const { data: frontmatter, content } = matter(fileContent);

        // Ensure references array exists
        if (!Array.isArray(frontmatter.references)) {
            frontmatter.references = [];
        }

        if (action === 'add') {
            if (!reference || !reference.title || !reference.url) {
                return errorResponse('Reference must have title and url', 400);
            }
            frontmatter.references.push(reference);
        } else if (action === 'remove') {
            if (refIndex === undefined || refIndex < 0 || refIndex >= frontmatter.references.length) {
                return errorResponse('Invalid reference index', 400);
            }
            frontmatter.references.splice(refIndex, 1);
        } else if (action === 'bulk-update') {
            if (!Array.isArray(references)) {
                return errorResponse('References must be an array', 400);
            }
            // Validate all references have required fields
            for (const ref of references) {
                if (!ref.title || !ref.url) {
                    return errorResponse('All references must have title and url', 400);
                }
            }
            frontmatter.references = references;
        } else {
            return errorResponse('Invalid action', 400);
        }

        // Rebuild file content
        const newFileContent = matter.stringify(content, frontmatter);
        writeUcFile(uc.filePath, newFileContent);
        return successResponse({ ok: true, references: frontmatter.references });
    } catch (err: any) {
        return errorResponse(`Server error: ${err?.message}`, 500);
    }
};
