export const prerender = false;

import type { APIRoute } from 'astro';
import { findUcFile, readUcFile, writeUcFile, sendEmail } from '@utils/uc-file-utils';

export const GET: APIRoute = async ({ url }) => {
    try {
        const slug = url.searchParams.get('slug');
        const confirmToken = url.searchParams.get('confirmToken');

        if (!slug || !confirmToken) {
            return new Response('<h1>Lien invalide</h1><p>Paramètres manquants.</p>', { status: 400, headers: { 'Content-Type': 'text/html' } });
        }

        const file = findUcFile(slug);
        if (!file) {
            return new Response('<h1>Cas d\'usage introuvable</h1>', { status: 404, headers: { 'Content-Type': 'text/html' } });
        }

        let content = readUcFile(file.filePath);

        // Verify confirm token
        const tokenMatch = content.match(/confirmToken:\s*"([^"]+)"/);
        if (!tokenMatch || tokenMatch[1] !== confirmToken) {
            return new Response('<h1>Lien invalide ou expiré</h1><p>Ce lien de confirmation n\'est plus valide.</p>', { status: 403, headers: { 'Content-Type': 'text/html' } });
        }

        // Check not already published
        if (content.match(/^status:\s*published$/m)) {
            return new Response('<h1>Déjà publié</h1><p>Ce cas d\'usage est déjà publié.</p>', { status: 200, headers: { 'Content-Type': 'text/html' } });
        }

        // Publish
        content = content.replace(/^status:\s*.*$/m, 'status: published');
        // Remove confirmToken (one-time use)
        content = content.replace(/^confirmToken:\s*.*\n/m, '');
        writeUcFile(file.filePath, content);

        // Notify Guy
        try {
            await sendEmail(
                'oc@edtlab.fr',
                `[EDT] UC publié — ${slug}`,
                `<p>Le cas d'usage <strong>${slug}</strong> a été confirmé et publié sur edtlab.fr.</p>`
            );
        } catch (e) { /* notification failure is not critical */ }

        // Return a nice HTML confirmation page
        const html = `
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Publication confirmée</title></head>
        <body style="font-family:system-ui,sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh; background:#f0fdf4;">
            <div style="text-align:center; max-width:500px; padding:40px;">
                <div style="font-size:64px; margin-bottom:16px;">✅</div>
                <h1 style="color:#16a34a; margin-bottom:8px;">Publication confirmée</h1>
                <p style="color:#374151; font-size:18px;">Le cas d'usage a été publié avec succès sur edtlab.fr.</p>
                <a href="https://www.edtlab.fr" style="display:inline-block; margin-top:24px; padding:12px 24px; background:#2563eb; color:white; text-decoration:none; border-radius:8px;">Retour au site</a>
            </div>
        </body>
        </html>
        `;

        return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html' } });
    } catch (err: any) {
        return new Response(`<h1>Erreur</h1><p>${err?.message}</p>`, { status: 500, headers: { 'Content-Type': 'text/html' } });
    }
};
