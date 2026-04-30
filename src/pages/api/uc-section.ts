export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async ({ url }) => {
    try {
        const slug = url.searchParams.get('slug');
        const token = url.searchParams.get('token');
        const sectionId = url.searchParams.get('sectionId');

        if (!slug || !token || !sectionId) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
        }

        const ucDir = path.join(process.cwd(), 'src', 'content', 'use-cases');
        const files = fs.readdirSync(ucDir);
        const ucFile = files.find(f => f.includes(slug));
        if (!ucFile) {
            return new Response(JSON.stringify({ error: 'UC not found' }), { status: 404 });
        }

        const filePath = path.join(ucDir, ucFile);
        let fileContent = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');

        // Verify token
        const tokenMatch = fileContent.match(/previewToken:\s*"([^"]+)"/);
        if (!tokenMatch || tokenMatch[1] !== token) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 403 });
        }

        // Extract section markdown
        const sectionRegex = new RegExp(
            `### ${sectionId} [—–-][^\\n]*\\n\\n([\\s\\S]*?)(?=\\n### |\\n---|$)`,
            'm'
        );
        const match = fileContent.match(sectionRegex);
        if (!match) {
            return new Response(JSON.stringify({ error: 'Section not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ markdown: match[1].trim() }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: 'Server error', details: err?.message }), { status: 500 });
    }
};
