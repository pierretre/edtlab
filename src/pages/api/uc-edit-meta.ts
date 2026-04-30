export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { slug, token, field, value } = body;

        if (!slug || !token || !field || value === undefined) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
        }

        // Only allow specific fields
        const allowedFields = ['domain', 'maturity'];
        if (!allowedFields.includes(field)) {
            return new Response(JSON.stringify({ error: 'Field not allowed' }), { status: 400 });
        }

        const ucDir = path.join(process.cwd(), 'src', 'content', 'use-cases');
        const files = fs.readdirSync(ucDir);
        const ucFile = files.find(f => f.includes(slug));
        if (!ucFile) {
            return new Response(JSON.stringify({ error: 'UC not found' }), { status: 404 });
        }

        const filePath = path.join(ucDir, ucFile);
        let fileContent = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');

        const tokenMatch = fileContent.match(/previewToken:\s*"([^"]+)"/);
        if (!tokenMatch || tokenMatch[1] !== token) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 403 });
        }

        // Replace field value in frontmatter
        const fieldRegex = new RegExp(`^${field}:\\s*.*$`, 'm');
        if (fieldRegex.test(fileContent)) {
            fileContent = fileContent.replace(fieldRegex, `${field}: ${value}`);
        }

        fs.writeFileSync(filePath, fileContent, 'utf-8');
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: 'Server error', details: err?.message }), { status: 500 });
    }
};
