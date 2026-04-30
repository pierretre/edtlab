export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

function findSection(fileContent: string, sectionId: string): { headerEnd: number; contentEnd: number; content: string } | null {
    let headerPattern: RegExp;

    if (sectionId.startsWith('MC')) {
        // h3 pattern: ### MC{N} — ...
        headerPattern = new RegExp(`^### ${sectionId} [—–-].*$`, 'm');
    } else {
        // h2 pattern: ## Résumé, ## Données, ## Références
        headerPattern = new RegExp(`^## ${sectionId}$`, 'm');
    }

    const headerMatch = fileContent.match(headerPattern);
    if (!headerMatch || headerMatch.index === undefined) return null;

    // Content starts after header + blank line
    const headerLineEnd = headerMatch.index + headerMatch[0].length;
    const afterHeader = fileContent.substring(headerLineEnd);

    // Skip the blank line(s) after the header
    const blankMatch = afterHeader.match(/^(\n+)/);
    const contentStart = headerLineEnd + (blankMatch ? blankMatch[1].length : 0);

    // Content ends at the next section header (## or ###), horizontal rule (---), or end of file
    const rest = fileContent.substring(contentStart);
    const nextSectionMatch = rest.match(/\n(?=## |### |---)/);
    const contentEnd = nextSectionMatch ? contentStart + nextSectionMatch.index! : fileContent.length;

    const content = fileContent.substring(contentStart, contentEnd).trim();

    return { headerEnd: contentStart, contentEnd, content };
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { slug, token, sectionId, content } = body;

        if (!slug || !token || !sectionId || content === undefined) {
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

        const section = findSection(fileContent, sectionId);
        if (!section) {
            return new Response(JSON.stringify({ error: 'Section not found in file' }), { status: 404 });
        }

        // Replace section content
        fileContent = fileContent.substring(0, section.headerEnd) + content + '\n\n' + fileContent.substring(section.contentEnd);
        fs.writeFileSync(filePath, fileContent, 'utf-8');

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: 'Server error', details: err?.message }), { status: 500 });
    }
};
