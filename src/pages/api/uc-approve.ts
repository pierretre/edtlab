export const prerender = false;

import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import { findUcFile, readUcFile, writeUcFile, verifyToken, errorResponse, successResponse, sendEmail } from '@utils/uc-file-utils';

export const POST: APIRoute = async ({ request, url }) => {
    try {
        const { slug, token, name, title, org } = await request.json();
        if (!slug || !token || !name || !title || !org) return errorResponse('Missing fields');

        const file = findUcFile(slug);
        if (!file) return errorResponse('UC not found', 404);

        let content = readUcFile(file.filePath);
        if (!verifyToken(content, token)) return errorResponse('Invalid token', 403);

        const today = new Date().toISOString().split('T')[0];
        const confirmToken = crypto.randomBytes(16).toString('hex');

        // Add or update approvedBy block in frontmatter
        if (content.includes('approvedBy:')) {
            content = content.replace(
                /approvedBy:\n(\s+\w+:.*\n)*/m,
                `approvedBy:\n  name: "${name}"\n  title: "${title}"\n  org: "${org}"\n  date: ${today}\n`
            );
        } else {
            content = content.replace(
                /previewToken:/,
                `approvedBy:\n  name: "${name}"\n  title: "${title}"\n  org: "${org}"\n  date: ${today}\npreviewToken:`
            );
        }

        // Add or update confirmToken
        if (content.includes('confirmToken:')) {
            content = content.replace(/^confirmToken:\s*.*$/m, `confirmToken: "${confirmToken}"`);
        } else {
            content = content.replace(/previewToken:/, `confirmToken: "${confirmToken}"\npreviewToken:`);
        }

        // Keep status as draft — will be published on confirmation
        writeUcFile(file.filePath, content);

        // Find contact email from frontmatter
        const emailMatch = content.match(/contacts:\n[\s\S]*?email:\s*"([^"]+)"/);
        const contactEmail = emailMatch?.[1];

        // Build confirmation URL
        const baseUrl = url.origin || 'https://www.edtlab.fr';
        const confirmUrl = `${baseUrl}/api/uc-confirm?slug=${slug}&confirmToken=${confirmToken}`;

        if (contactEmail) {
            const htmlContent = `
                <h2>Confirmation d'approbation — EDT Use Case</h2>
                <p>Bonjour,</p>
                <p><strong>${name}</strong> (${title}, ${org}) a approuvé la mise à disposition du cas d'usage suivant sur edtlab.fr.</p>
                <p>Pour confirmer cette approbation et publier le cas d'usage, veuillez cliquer sur le lien ci-dessous :</p>
                <p><a href="${confirmUrl}" style="display:inline-block; padding:12px 24px; background:#16a34a; color:white; text-decoration:none; border-radius:8px; font-weight:bold;">Confirmer et publier</a></p>
                <p>Si vous n'êtes pas à l'origine de cette approbation, veuillez ignorer cet email et contacter l'équipe EDT.</p>
                <p>Cordialement,<br>L'équipe EDT Lab</p>
            `;
            await sendEmail(contactEmail, `[EDT] Confirmation d'approbation — ${slug}`, htmlContent);
        }

        return successResponse({ ok: true, status: 'pending_confirmation', emailSent: !!contactEmail });
    } catch (err: any) {
        return errorResponse('Server error: ' + err?.message, 500);
    }
};
