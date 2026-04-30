export const prerender = false;

import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import matter from 'gray-matter';
import { findUcFile, readUcFile, writeUcFile, verifyToken, errorResponse, successResponse, sendEmail } from '@utils/uc-file-utils';

export const POST: APIRoute = async ({ request, url }) => {
    try {
        const { slug, token, name, email, title, org } = await request.json();
        if (!slug || !token || !name || !email || !title || !org) return errorResponse('Missing fields');

        const file = findUcFile(slug);
        if (!file) return errorResponse('UC not found', 404);

        const fileContent = readUcFile(file.filePath);
        if (!verifyToken(fileContent, token)) return errorResponse('Invalid token', 403);

        const today = new Date().toISOString().split('T')[0];
        const confirmToken = crypto.randomBytes(16).toString('hex');

        // Update frontmatter via gray-matter (robust against YAML quoting differences)
        const { data: frontmatter, content: body } = matter(fileContent);
        frontmatter.approvedBy = { name, email, title, org, date: today };
        frontmatter.confirmToken = confirmToken;
        frontmatter.status = 'draft';
        const content = matter.stringify(body, frontmatter);

        // Send confirmation email FIRST — only write file if email succeeds
        const baseUrl = url.origin || 'https://www.edtlab.fr';
        const confirmUrl = `${baseUrl}/api/uc-confirm?slug=${slug}&confirmToken=${confirmToken}`;

        const htmlContent = `
            <h2>Confirmation d'approbation — EDT Use Case</h2>
            <p>Bonjour ${name},</p>
            <p>Vous avez approuvé la mise à disposition d'un cas d'usage sur edtlab.fr en tant que <strong>${title}</strong> (${org}).</p>
            <p>Pour confirmer cette approbation et publier le cas d'usage, veuillez cliquer sur le lien ci-dessous :</p>
            <p><a href="${confirmUrl}" style="display:inline-block; padding:12px 24px; background:#16a34a; color:white; text-decoration:none; border-radius:8px; font-weight:bold;">Confirmer et publier</a></p>
            <p>Si vous n'êtes pas à l'origine de cette approbation, veuillez ignorer cet email.</p>
            <p>Cordialement,<br>L'équipe EDT Lab</p>
        `;

        try {
            await sendEmail(email, `[EDT] Confirmation d'approbation — ${slug}`, htmlContent);
        } catch (e: any) {
            return errorResponse(`Impossible d'envoyer l'email de confirmation : ${e?.message}`, 500);
        }

        // Email sent successfully — now write the file
        writeUcFile(file.filePath, content);

        return successResponse({ ok: true, status: 'pending_confirmation', emailSentTo: email });
    } catch (err: any) {
        return errorResponse('Server error: ' + err?.message, 500);
    }
};
