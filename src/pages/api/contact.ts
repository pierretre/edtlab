import type { APIRoute } from "astro";
import * as brevo from '@getbrevo/brevo';

// Types
interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    privacy: boolean;
    organization?: string;
}

interface RateLimitEntry {
    timestamp: number;
}

interface RateLimitData {
    [ip: string]: RateLimitEntry;
}

// Subject labels mapping
const subjectLabels: Record<string, string> = {
    'general': 'General Inquiry',
    'collaboration': 'Collaboration',
    'research': 'Research',
    'technical': 'Technical Support',
    'media': 'Media',
    'other': 'Other'
};

// Rate limiting configuration
const RATE_LIMIT_SECONDS = 60;
const rateLimitStore: RateLimitData = {};

/**
 * Get client IP from request
 */
const getClientIp = (request: Request): string => {
    // Try various headers that might contain the real IP
    const headers = request.headers;

    const forwardedFor = headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    const realIp = headers.get('x-real-ip');
    if (realIp) {
        return realIp;
    }

    // Fallback to a generic identifier
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
const generateEmailHtml = (data: ContactFormData): string => {
    const userName = escapeHtml(data.name);
    const userEmail = escapeHtml(data.email);
    const userMessage = escapeHtml(data.message);
    const subjectLabel = subjectLabels[data.subject] || data.subject;
    const organizationText = data.organization && data.organization.trim()
        ? escapeHtml(data.organization)
        : 'Not specified';

    // Create mailto link
    const mailtoSubject = encodeURIComponent(`Re: ${subjectLabel}`);
    const mailtoBody = encodeURIComponent(
        `Dear ${userName},\n\n` +
        `Thank you for contacting the EDT Research Program. We have received your message regarding ${subjectLabel}.\n\n` +
        `[Your response here]\n\n` +
        `Best regards,\n` +
        `EDT Research Team`
    );
    const mailtoLink = `mailto:${userEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

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
        .reply-template { background-color: #e8f4f8; padding: 15px; margin-top: 20px; border-radius: 5px; }
        .reply-template h3 { color: #665BA7; margin-top: 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='margin: 0;'>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>From:</span> ${userName} &lt;${userEmail}&gt;
            </div>
            <div class='field'>
                <span class='label'>Organization:</span> ${organizationText}
            </div>
            <div class='field'>
                <span class='label'>Subject:</span> ${subjectLabel}
            </div>
            <div class='field'>
                <span class='label'>Message:</span>
                <div class='message-box'>${userMessage.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class='reply-template'>
                <a href='${mailtoLink}' style='display: inline-block; background-color: #665BA7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-bottom: 15px;'>
                    Reply to ${userName}
                </a>
                <p style='font-size: 13px; color: #666;'>
                    Or click 'Reply' in your email client to respond directly to <strong>${userEmail}</strong>
                </p>
                <hr style='border: none; border-top: 1px solid #ddd; margin: 15px 0;'>
                <p style='font-size: 13px; color: #666; margin-bottom: 5px;'><strong>Suggested reply template:</strong></p>
                <p style='font-style: italic; color: #666; font-size: 13px; background-color: white; padding: 10px; border-radius: 3px;'>
                    Dear ${userName},<br><br>
                    Thank you for contacting the EDT Research Program. We have received your message regarding ${subjectLabel}.<br><br>
                    [Your response here]<br><br>
                    Best regards,<br>
                    EDT Research Team
                </p>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the EDT Research Program contact form</p>
            <p>EDT Research Program | <a href='https://edtlab.fr'>edtlab.fr</a></p>
        </div>
    </div>
</body>
</html>
`;
};

/**
 * Send contact form email via Brevo
 */
const sendContactEmail = async (data: ContactFormData): Promise<void> => {
    const brevoApiKey = import.meta.env.BREVO_API_KEY;
    const senderEmail = import.meta.env.SENDER_EMAIL || 'contact@edtlab.fr';
    const senderName = import.meta.env.SENDER_NAME || 'EDT Research Program';
    const recipientEmail = import.meta.env.LIST_INBOX;

    if (!brevoApiKey || !recipientEmail) {
        throw new Error('Missing required mail configuration');
    }

    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);

    const subjectLabel = subjectLabels[data.subject] || data.subject;
    const htmlContent = generateEmailHtml(data);

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email: recipientEmail }];
    sendSmtpEmail.replyTo = { email: data.email, name: data.name };
    sendSmtpEmail.subject = `Contact Form: ${subjectLabel} - ${data.name}`;
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
        const data = await request.json() as ContactFormData;
        const { name, email, subject, message, privacy, organization } = data;

        if (!name || !email || !subject || !message || privacy === undefined) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        if (!privacy) {
            return new Response(
                JSON.stringify({ error: 'Privacy notice must be accepted' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Send email
        await sendContactEmail({ name, email, subject, message, privacy, organization });

        // Update rate limit
        const updatedData = updateRateLimit(clientIp, rateLimitStore);
        Object.assign(rateLimitStore, updatedData);

        return new Response(
            JSON.stringify({ success: true }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Error processing contact form:', error);
        const message = error instanceof Error ? error.message : 'An error occurred while processing your request';

        return new Response(
            JSON.stringify({ error: message }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};
