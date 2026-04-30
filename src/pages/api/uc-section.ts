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

        // Special case: "intro" = text between end of frontmatter and first ## or ---
        let markdown: string;
        if (sectionId === 'intro') {
            const fmEnd = fileContent.indexOf('---', fileContent.indexOf('---') + 3);
            if (fmEnd === -1) {
                return new Response(JSON.stringify({ error: 'Frontmatter not found' }), { status: 404 });
            }
            const contentStart2 = fmEnd + 3;
            const afterFm = fileContent.substring(contentStart2);
            const blankMatch2 = afterFm.match(/^(\n+)/);
            const realStart = contentStart2 + (blankMatch2 ? blankMatch2[1].length : 0);
            const rest2 = fileContent.substring(realStart);
            const nextMatch2 = rest2.match(/\n(?=## |---)/);
            const contentEnd2 = nextMatch2 ? realStart + nextMatch2.index! : fileContent.length;
            markdown = fileContent.substring(realStart, contentEnd2).trim();
        } else {
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

            const headerLineEnd = headerMatch.index + headerMatch[0].length;
            const afterHeader = fileContent.substring(headerLineEnd);
            const blankMatch = afterHeader.match(/^(\n+)/);
            const contentStart = headerLineEnd + (blankMatch ? blankMatch[1].length : 0);

            const rest = fileContent.substring(contentStart);
            const nextMatch = rest.match(/\n(?=## |### |---)/);
            const contentEnd = nextMatch ? contentStart + nextMatch.index! : fileContent.length;

            markdown = fileContent.substring(contentStart, contentEnd).trim();
        }

        return new Response(JSON.stringify({ markdown }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: 'Server error', details: err?.message }), { status: 500 });
    }
};
