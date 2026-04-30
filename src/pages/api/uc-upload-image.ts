export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { findUcFile, readUcFile, writeUcFile, verifyToken, errorResponse, successResponse } from '@utils/uc-file-utils';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const image = formData.get('image') as File | null;
        const slug = formData.get('slug') as string | null;
        const token = formData.get('token') as string | null;

        if (!image || !slug || !token) return errorResponse('Missing fields');

        const uc = findUcFile(slug);
        if (!uc) return errorResponse('UC not found', 404);

        let fileContent = readUcFile(uc.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        const ext = path.extname(image.name) || '.png';
        const imgName = `${slug}${ext}`;
        const imgDir = path.join(process.cwd(), 'public', 'media', 'use-cases');
        fs.mkdirSync(imgDir, { recursive: true });
        fs.writeFileSync(path.join(imgDir, imgName), Buffer.from(await image.arrayBuffer()));

        const newPhoto = `/media/use-cases/${imgName}`;
        const { data: frontmatter, content: body } = matter(fileContent);
        frontmatter.photo = newPhoto;
        writeUcFile(uc.filePath, matter.stringify(body, frontmatter));

        return successResponse({ ok: true, photo: newPhoto });
    } catch (err: any) {
        return errorResponse(`Server error: ${err?.message}`, 500);
    }
};
