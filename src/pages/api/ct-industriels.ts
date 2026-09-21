import type { APIRoute } from "astro";
import * as brevo from '@getbrevo/brevo';

// CT industriels ("Comité Technique des Jumeaux Numériques") join request.
// Applications are emailed to the committee's EDT contacts, configured via
// CT_INDUSTRIELS_INBOX (comma-separated list of recipient addresses).

// Types
interface JoinFormData {
    name: string;
    email: string;
    institution: string;
    motivation: string;
    consentCtIndustriels: boolean;
    mailingList: boolean;
}

interface RateLimitEntry {
    timestamp: number;
}

interface RateLimitData {
    [ip: string]: RateLimitEntry;
}

// Rate limiting configuration
const RATE_LIMIT_SECONDS = 60;
const rateLimitStore: RateLimitData = {};

/**
 * Get client IP from request
 */
const getClientIp = (request: Request): string => {
    const headers = request.headers;

    const forwardedFor = headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    const realIp = headers.get('x-real-ip');
    if (realIp) {
        return realIp;
    }

    return 'unknown';
};

/**
 * Clean old rate limit entries
 */
const cleanRateLimitData = (data: RateLimitData): RateLimitData => {
    const now = Date.now();
    const cleaned: RateLimitData = {};

    for (const [ip, entry] of Object.entries(data)) {
        if (now - entry.timestamp < RATE_LIMIT_SECONDS * 1000) {
            cleaned[ip] = entry;
        }
    }

    return cleaned;
};

/**
 * Check rate limit
 */
const checkRateLimit = (ip: string, data: RateLimitData, limitSeconds: number): { limited: boolean; remainingTime?: number } => {
    const entry = data[ip];

    if (!entry) {
        return { limited: false };
    }

    const now = Date.now();
    const timeSinceLastRequest = now - entry.timestamp;
    const limitMs = limitSeconds * 1000;

    if (timeSinceLastRequest < limitMs) {
        const remainingTime = Math.ceil((limitMs - timeSinceLastRequest) / 1000);
        return { limited: true, remainingTime };
    }

    return { limited: false };
};

/**
 * Update rate limit
 */
const updateRateLimit = (ip: string, data: RateLimitData): RateLimitData => {
    return {
        ...data,
        [ip]: { timestamp: Date.now() }
    };
};

/**
 * HTML escape helper
 */
const escapeHtml = (text: string): string => {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
};

/**
 * Generate HTML email content
 */
const generateEmailHtml = (data: JoinFormData): string => {
    const name = escapeHtml(data.name);
    const userEmail = escapeHtml(data.email);
    const institution = escapeHtml(data.institution);
    const motivation = escapeHtml(data.motivation).replace(/\n/g, '<br>');

    const yes = '✅';
    const mailing = data.mailingList ? 'Oui' : 'Non';

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #665BA7; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #665BA7; }
        .message-box { background-color: white; padding: 15px; border-left: 4px solid #665BA7; margin-top: 10px; }
        .footer { background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='margin: 0;'>Nouvelle demande d'adhésion — CT industriels</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Nom :</span> ${name}
            </div>
            <div class='field'>
                <span class='label'>Email :</span> &lt;${userEmail}&gt;
            </div>
            <div class='field'>
                <span class='label'>Institution :</span> ${institution}
            </div>
            <div class='field'>
                <span class='label'>Pourquoi rejoindre le comité :</span>
                <div class='message-box'>${motivation}</div>
            </div>
            <div class='field'>
                <span class='label'>Adhésion au CT industriels :</span> ${yes}
            </div>
            <div class='field'>
                <span class='label'>Inscription liste de diffusion EDT :</span> ${mailing}
            </div>
        </div>
        <div class='footer'>
            <p>Demande envoyée depuis le formulaire d'adhésion au CT industriels — EDT Research Program</p>
            <p>EDT Research Program | <a href='https://edtlab.fr'>edtlab.fr</a></p>
        </div>
    </div>
</body>
</html>
`;
};

/**
 * Send join request email via Brevo
 */
const sendJoinRequestEmail = async (data: JoinFormData): Promise<void> => {
    const brevoApiKey = process.env.BREVO_API_KEY || import.meta.env.BREVO_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL || import.meta.env.SENDER_EMAIL || 'contact@edtlab.fr';
    const senderName = process.env.SENDER_NAME || import.meta.env.SENDER_NAME || 'EDT Research Program';
    const recipientEmails = (process.env.CT_INDUSTRIELS_INBOX || import.meta.env.CT_INDUSTRIELS_INBOX || '')
        .split(',')
        .map((email: string) => email.trim())
        .filter(Boolean);

    if (!brevoApiKey || recipientEmails.length === 0) {
        // Local/dev fallback: with no Brevo key or recipient configured, log the
        // request so the whole flow can be tested end-to-end without sending a
        // real email. This branch only runs under `astro dev`; a built
        // (production) server still requires the configuration.
        if (import.meta.env.DEV) {
            console.log('[ct-industriels] DEV mode — mail configuration missing; request NOT emailed.');
            console.log(`[ct-industriels] DEV mode — would be sent to: ${recipientEmails.join(', ') || '(none configured)'}`);
            console.log('[ct-industriels] DEV mode — payload:', JSON.stringify(data, null, 2));
            return;
        }
        throw new Error('Missing required mail configuration');
    }

    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);

    const htmlContent = generateEmailHtml(data);

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = recipientEmails.map((email: string) => ({ email }));
    sendSmtpEmail.replyTo = { email: data.email, name: data.name };
    sendSmtpEmail.subject = `CT industriels — Demande d'adhésion : ${data.name}`;
    sendSmtpEmail.htmlContent = htmlContent;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const clientIp = getClientIp(request);

        // Rate limiting check
        const cleanedData = cleanRateLimitData(rateLimitStore);
        Object.keys(rateLimitStore).forEach(key => delete rateLimitStore[key]);
        Object.assign(rateLimitStore, cleanedData);

        const rateCheck = checkRateLimit(clientIp, rateLimitStore, RATE_LIMIT_SECONDS);
        if (rateCheck.limited) {
            return new Response(
                JSON.stringify({
                    error: `Please wait ${rateCheck.remainingTime} seconds before submitting again.`,
                    retry_after: rateCheck.remainingTime
                }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': String(rateCheck.remainingTime)
                    }
                }
            );
        }

        // Parse and validate request body
        const data = await request.json() as JoinFormData;
        const { name, email, institution, motivation, consentCtIndustriels, mailingList } = data;

        if (!name || !email || !institution || !motivation || consentCtIndustriels === undefined || mailingList === undefined) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (!consentCtIndustriels) {
            return new Response(
                JSON.stringify({ error: 'All consents must be accepted' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Send email
        await sendJoinRequestEmail({
            name, email, institution, motivation, consentCtIndustriels, mailingList: !!mailingList
        });

        // Update rate limit
        const updatedData = updateRateLimit(clientIp, rateLimitStore);
        Object.assign(rateLimitStore, updatedData);

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error processing CT industriels join request:', error);
        const message = error instanceof Error ? error.message : 'An error occurred while processing your request';

        return new Response(
            JSON.stringify({ error: message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
