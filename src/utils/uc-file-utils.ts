import fs from 'node:fs';
import path from 'node:path';

const UC_DIR = path.join(process.cwd(), 'src', 'content', 'use-cases');

/** Find a UC file by slug (partial match) */
export function findUcFile(slug: string): { filePath: string; fileName: string } | null {
    const files = fs.readdirSync(UC_DIR);
    const fileName = files.find(f => f.includes(slug));
    if (!fileName) return null;
    return { filePath: path.join(UC_DIR, fileName), fileName };
}

/** Read UC file content, normalized to LF */
export function readUcFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');
}

/** Write UC file content */
export function writeUcFile(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content, 'utf-8');
}

/** Verify preview token from frontmatter */
export function verifyToken(fileContent: string, token: string): boolean {
    const match = fileContent.match(/previewToken:\s*"([^"]+)"/);
    return !!match && match[1] === token;
}

/** Find section boundaries in the markdown file */
export function findSection(fileContent: string, sectionId: string): { start: number; end: number; content: string } | null {
    if (sectionId === 'intro') {
        return findIntroSection(fileContent);
    }

    const headerPattern = sectionId.startsWith('MC')
        ? new RegExp(`^### ${sectionId} [—–-].*$`, 'm')
        : new RegExp(`^## ${sectionId}$`, 'm');

    const headerMatch = fileContent.match(headerPattern);
    if (!headerMatch || headerMatch.index === undefined) return null;

    const headerLineEnd = headerMatch.index + headerMatch[0].length;
    const afterHeader = fileContent.substring(headerLineEnd);
    const blankMatch = afterHeader.match(/^(\n+)/);
    const contentStart = headerLineEnd + (blankMatch ? blankMatch[1].length : 0);

    const rest = fileContent.substring(contentStart);
    const nextMatch = rest.match(/\n(?=## |### |---)/);
    const contentEnd = nextMatch ? contentStart + nextMatch.index! : fileContent.length;

    return { start: contentStart, end: contentEnd, content: fileContent.substring(contentStart, contentEnd).trim() };
}

function findIntroSection(fileContent: string): { start: number; end: number; content: string } | null {
    const fmEnd = fileContent.indexOf('---', fileContent.indexOf('---') + 3);
    if (fmEnd === -1) return null;

    const afterFm = fileContent.substring(fmEnd + 3);
    const blankMatch = afterFm.match(/^(\n+)/);
    const contentStart = fmEnd + 3 + (blankMatch ? blankMatch[1].length : 0);

    const rest = fileContent.substring(contentStart);
    const nextMatch = rest.match(/\n(?=## |---)/);
    const contentEnd = nextMatch ? contentStart + nextMatch.index! : fileContent.length;

    return { start: contentStart, end: contentEnd, content: fileContent.substring(contentStart, contentEnd).trim() };
}

/** Replace a frontmatter field value */
export function replaceFrontmatterField(fileContent: string, field: string, value: string): string {
    const regex = new RegExp(`^${field}:\\s*.*$`, 'm');
    return fileContent.replace(regex, `${field}: ${value}`);
}

/** Standard error response */
export function errorResponse(message: string, status: number = 400): Response {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

/** Standard success response */
export function successResponse(data: Record<string, unknown> = { ok: true }): Response {
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

/** Send a transactional email via Brevo */
import * as brevo from '@getbrevo/brevo';

export async function sendEmail(to: string, subject: string, htmlContent: string): Promise<void> {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        throw new Error('BREVO_API_KEY not configured — cannot send email');
    }
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
    const email = new brevo.SendSmtpEmail();
    email.sender = { name: 'EDT Lab', email: 'noreply@edtlab.fr' };
    email.to = [{ email: to }];
    email.subject = subject;
    email.htmlContent = htmlContent;
    await apiInstance.sendTransacEmail(email);
}
