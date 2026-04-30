export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const image = formData.get('image') as File | null;
        const slug = formData.get('slug') as string | null;
        const token = formData.get('token') as string | null;

        if (!image || !slug || !token) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
        }

        // Find UC file and verify token
        const ucDir = path.join(process.cwd(), 'src', 'content', 'use-cases');
        const files = fs.readdirSync(ucDir);
        const ucFile = files.find(f => f.includes(slug));
        if (!ucFile) {
            return new Response(JSON.stringify({ error: 'UC not found' }), { status: 404 });
        }

        const filePath = path.join(ucDir, ucFile);
        let fileContent = fs.readFileSync(filePath, 'utf-8');
        const tokenMatch = fileContent.match(/previewToken:\s*"([^"]+)"/);
        if (!tokenMatch || tokenMatch[1] !== token) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 403 });
        }

        // Save image to public/media/use-cases/
        const ext = path.extname(image.name) || '.png';
        const imgName = `${slug}${ext}`;
        const imgDir = path.join(process.cwd(), 'public', 'media', 'use-cases');
        fs.mkdirSync(imgDir, { recursive: true });
        const imgPath = path.join(imgDir, imgName);

        const buffer = Buffer.from(await image.arrayBuffer());
        fs.writeFileSync(imgPath, buffer);

        // Update photo in frontmatter
        const newPhoto = `/media/use-cases/${imgName}`;
        fileContent = fileContent.replace(/photo:\s*"[^"]*"/, `photo: "${newPhoto}"`);
        fs.writeFileSync(filePath, fileContent, 'utf-8');

        return new Response(JSON.stringify({ ok: true, photo: newPhoto }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: 'Server error', details: err?.message }), { status: 500 });
    }
};
