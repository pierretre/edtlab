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

        // Find section header — h3 for MC, h2 for other sections
        let headerPattern: RegExp;
        if (sectionId.startsWith('MC')) {
            headerPattern = new RegExp(`^### ${sectionId} [—–-].*$`, 'm');
        } else {
            headerPattern = new RegExp(`^## ${sectionId}$`, 'm');
        }

        const headerMatch = fileContent.match(headerPattern);
        if (!headerMatch || headerMatch.index === undefined) {
            return new Response(JSON.stringify({ error: 'Section not found' }), { status: 404 });
        }

        // Content starts after header + blank line(s)
        const headerLineEnd = headerMatch.index + headerMatch[0].length;
        const afterHeader = fileContent.substring(headerLineEnd);
        const blankMatch = afterHeader.match(/^(\n+)/);
        const contentStart = headerLineEnd + (blankMatch ? blankMatch[1].length : 0);

        // Content ends at next ## or ### or --- or EOF
        const rest = fileContent.substring(contentStart);
        const nextMatch = rest.match(/\n(?=## |### |---)/);
        const contentEnd = nextMatch ? contentStart + nextMatch.index! : fileContent.length;

        const markdown = fileContent.substring(contentStart, contentEnd).trim();

        return new Response(JSON.stringify({ markdown }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: 'Server error', details: err?.message }), { status: 500 });
    }
};
