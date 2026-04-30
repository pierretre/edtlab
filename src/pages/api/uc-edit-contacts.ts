export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async ({ url }) => {
    try {
        const slug = url.searchParams.get('slug');
        const token = url.searchParams.get('token');

        if (!slug || !token) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
        }

        const ucDir = path.join(process.cwd(), 'src', 'content', 'use-cases');
        const files = fs.readdirSync(ucDir);
        const ucFile = files.find(f => f.includes(slug));
        if (!ucFile) {
            return new Response(JSON.stringify({ error: 'UC not found' }), { status: 404 });
        }

        const filePath = path.join(ucDir, ucFile);
        const fileContent = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');

        const tokenMatch = fileContent.match(/previewToken:\s*"([^"]+)"/);
        if (!tokenMatch || tokenMatch[1] !== token) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 403 });
        }

        // Parse contacts from frontmatter
        const contacts: any[] = [];
        const contactsMatch = fileContent.match(/contacts:\n((?:\s+-[\s\S]*?)(?=\n\w|\n---|\napproved))/m);
        if (contactsMatch) {
            const block = contactsMatch[1];
            const entries = block.split(/\n\s+-\s+name:/).filter(Boolean);
            for (const entry of entries) {
                const nameM = entry.match(/(?:name:\s*"([^"]+)")|(?:^"([^"]+)")/);
                const orgM = entry.match(/org:\s*"([^"]+)"/);
                const emailM = entry.match(/email:\s*"([^"]+)"/);
                const roleM = entry.match(/role:\s*"([^"]+)"/);
                contacts.push({
                    name: nameM?.[1] || nameM?.[2] || '',
                    org: orgM?.[1] || '',
                    email: emailM?.[1] || '',
                    role: roleM?.[1] || '',
                });
            }
        }

        return new Response(JSON.stringify({ contacts }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: 'Server error', details: err?.message }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { slug, token, contacts } = body;

        if (!slug || !token || !Array.isArray(contacts)) {
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

        const tokenMatch = fileContent.match(/previewToken:\s*"([^"]+)"/);
        if (!tokenMatch || tokenMatch[1] !== token) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 403 });
        }

        // Build new contacts YAML block
        let contactsYaml = 'contacts:\n';
        for (const c of contacts) {
            contactsYaml += `  - name: "${c.name || ''}"\n`;
            if (c.org) contactsYaml += `    org: "${c.org}"\n`;
            if (c.email) contactsYaml += `    email: "${c.email}"\n`;
            if (c.role) contactsYaml += `    role: "${c.role}"\n`;
        }

        // Replace contacts block in frontmatter
        const contactsRegex = /contacts:\n(?:\s+-[\s\S]*?)(?=\napproved|\npepr|\n\w+:)/m;
        if (contactsRegex.test(fileContent)) {
            fileContent = fileContent.replace(contactsRegex, contactsYaml);
        }

        fs.writeFileSync(filePath, fileContent, 'utf-8');
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: 'Server error', details: err?.message }), { status: 500 });
    }
};
