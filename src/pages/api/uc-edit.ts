export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { slug, token, sectionId, content } = body;

        // Validate
        if (!slug || !token || !sectionId || content === undefined) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
        }

        // Find the UC file
        const ucDir = path.join(process.cwd(), 'src', 'content', 'use-cases');
        const files = fs.readdirSync(ucDir);
        const ucFile = files.find(f => f.includes(slug));
        if (!ucFile) {
            return new Response(JSON.stringify({ error: 'UC not found' }), { status: 404 });
        }

        const filePath = path.join(ucDir, ucFile);
        let fileContent = fs.readFileSync(filePath, 'utf-8');

        // Verify token from frontmatter
        const tokenMatch = fileContent.match(/previewToken:\s*"([^"]+)"/);
        if (!tokenMatch || tokenMatch[1] !== token) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 403 });
        }

        // Replace the section content
        // Sections are formatted as: ### MC{N} — Title\n\nContent\n\n### MC{N+1}
        const sectionRegex = new RegExp(
            `(### ${sectionId} —[^\n]*\n\n)([\\s\\S]*?)(?=\n### MC|\\n---|\$)`,
            'm'
        );

        if (sectionRegex.test(fileContent)) {
            fileContent = fileContent.replace(sectionRegex, `$1${content}\n\n`);
            fs.writeFileSync(filePath, fileContent, 'utf-8');
            return new Response(JSON.stringify({ ok: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Section not found' }), { status: 404 });
        }
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
