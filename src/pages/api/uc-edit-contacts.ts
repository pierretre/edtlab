export const prerender = false;

import type { APIRoute } from 'astro';
import { findUcFile, readUcFile, writeUcFile, verifyToken, errorResponse, successResponse } from '@utils/uc-file-utils';

function parseContacts(fileContent: string): any[] {
    const contacts: any[] = [];
    const match = fileContent.match(/contacts:\n((?:\s+-[\s\S]*?)(?=\n\w|\n---|\napproved))/m);
    if (!match) return contacts;

    const entries = match[1].split(/\n\s+-\s+name:/).filter(Boolean);
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
    return contacts;
}

function buildContactsYaml(contacts: any[]): string {
    let yaml = 'contacts:\n';
    for (const c of contacts) {
        yaml += `  - name: "${c.name || ''}"\n`;
        if (c.org) yaml += `    org: "${c.org}"\n`;
        if (c.email) yaml += `    email: "${c.email}"\n`;
        if (c.role) yaml += `    role: "${c.role}"\n`;
    }
    return yaml;
}

export const GET: APIRoute = async ({ url }) => {
    try {
        const slug = url.searchParams.get('slug');
        const token = url.searchParams.get('token');

        if (!slug || !token) return errorResponse('Missing fields');

        const uc = findUcFile(slug);
        if (!uc) return errorResponse('UC not found', 404);

        const fileContent = readUcFile(uc.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        return successResponse({ contacts: parseContacts(fileContent) });
    } catch (err: any) {
        return errorResponse(`Server error: ${err?.message}`, 500);
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const { slug, token, contacts } = await request.json();

        if (!slug || !token || !Array.isArray(contacts)) return errorResponse('Missing fields');

        const uc = findUcFile(slug);
        if (!uc) return errorResponse('UC not found', 404);

        let fileContent = readUcFile(uc.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        const contactsYaml = buildContactsYaml(contacts);
        const contactsRegex = /contacts:\n(?:\s+-[\s\S]*?)(?=\napproved|\npepr|\n\w+:)/m;
        if (contactsRegex.test(fileContent)) {
            fileContent = fileContent.replace(contactsRegex, contactsYaml);
        }

        writeUcFile(uc.filePath, fileContent);
        return successResponse();
    } catch (err: any) {
        return errorResponse(`Server error: ${err?.message}`, 500);
    }
};
