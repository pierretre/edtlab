import type { APIRoute } from "astro";
import * as brevo from '@getbrevo/brevo';

// Shared helpers for the form endpoints that email submissions via Brevo
// (src/pages/api/*.ts): rate limiting, HTML email layout, sending, and the
// common POST handler flow.

// Rate limiting configuration
const RATE_LIMIT_SECONDS = 60;

/**
 * Get client IP from request
 */
export const getClientIp = (request: Request): string => {
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
 * In-memory, per-IP rate limiter. Each endpoint creates its own so that
 * submitting one form does not block the others.
 */
export const createRateLimiter = (limitSeconds: number = RATE_LIMIT_SECONDS) => {
    const limitMs = limitSeconds * 1000;
    const lastRequests = new Map<string, number>();

    return {
        /** Seconds left before `ip` may submit again, or 0 if it is allowed now. */
        remaining(ip: string): number {
            const now = Date.now();

            // Clean old entries
            for (const [key, timestamp] of lastRequests) {
                if (now - timestamp >= limitMs) {
                    lastRequests.delete(key);
                }
            }

            const timestamp = lastRequests.get(ip);
            return timestamp === undefined ? 0 : Math.ceil((limitMs - (now - timestamp)) / 1000);
        },
        record(ip: string): void {
            lastRequests.set(ip, Date.now());
        },
    };
};

/**
 * HTML escape helper
 */
export const escapeHtml = (text: string): string => {
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
 * Escape multi-line user text and keep its line breaks
 */
export const escapeMultiline = (text: string): string => escapeHtml(text).replace(/\n/g, '<br>');

/**
 * JSON response helper
 */
export const jsonResponse = (body: unknown, status: number = 200, headers: Record<string, string> = {}): Response =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', ...headers }
    });

/**
 * One "Label: value" line of an email. `value` must already be escaped.
 */
export const emailField = (label: string, value: string): string => `
            <div class='field'>
                <span class='label'>${label}</span> ${value}
            </div>`;

/**
 * A labelled block for long text. `html` must already be escaped.
 */
export const emailMessageField = (label: string, html: string): string => `
            <div class='field'>
                <span class='label'>${label}</span>
                <div class='message-box'>${html}</div>
            </div>`;

interface EmailLayoutOptions {
    title: string;
    content: string;
    footer: string;
    extraStyles?: string;
}

/**
 * Wrap email content in the shared EDT layout (header, content, footer)
 */
export const renderEmailLayout = ({ title, content, footer, extraStyles = '' }: EmailLayoutOptions): string => `
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
        .footer { background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px; }${extraStyles}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='margin: 0;'>${title}</h2>
        </div>
        <div class='content'>${content}
        </div>
        <div class='footer'>
            <p>${footer}</p>
            <p>EDT Research Program | <a href='https://edtlab.fr'>edtlab.fr</a></p>
        </div>
    </div>
</body>
</html>
`;

/**
 * Parse a comma-separated list of email addresses
 */
export const parseRecipients = (value: string | undefined): string[] =>
    (value || '')
        .split(',')
        .map((email) => email.trim())
        .filter(Boolean);

interface SendEmailOptions {
    /** Prefix for dev-mode logs, e.g. "contact" */
    tag: string;
    to: string[];
    replyTo: { email: string; name: string };
    subject: string;
    htmlContent: string;
    /** Logged instead of sending when running `astro dev` without configuration */
    devPayload: unknown;
}

/**
 * Send a transactional email via Brevo
 */
export const sendEmail = async ({ tag, to, replyTo, subject, htmlContent, devPayload }: SendEmailOptions): Promise<void> => {
    // In SSR mode with Node adapter, use process.env for runtime access
    const brevoApiKey = process.env.BREVO_API_KEY || import.meta.env.BREVO_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL || import.meta.env.SENDER_EMAIL || 'contact@edtlab.fr';
    const senderName = process.env.SENDER_NAME || import.meta.env.SENDER_NAME || 'EDT Research Program';

    if (!brevoApiKey || to.length === 0) {
        // Local/dev fallback: with no Brevo key or recipient configured, log the
        // request so the whole flow can be tested end-to-end without sending a
        // real email. This branch only runs under `astro dev`; a built
        // (production) server still requires the configuration.
        if (import.meta.env.DEV) {
            console.log(`[${tag}] DEV mode — mail configuration missing; request NOT emailed.`);
            console.log(`[${tag}] DEV mode — would be sent to: ${to.join(', ') || '(none configured)'}`);
            console.log(`[${tag}] DEV mode — payload:`, JSON.stringify(devPayload, null, 2));
            return;
        }
        throw new Error('Missing required mail configuration');
    }

    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = to.map((email) => ({ email }));
    sendSmtpEmail.replyTo = replyTo;
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
        // The SDK rejects with the raw axios error; Brevo's reason is in the body.
        const response = (error as { response?: { status?: number; data?: { code?: string; message?: string } } }).response;
        if (response?.status === 400 && /reply/i.test(response.data?.message ?? '')) {
            throw new InvalidReplyToError(response.data?.message ?? 'Invalid replyTo');
        }
        throw error;
    }
};

/**
 * Brevo refused the submitter's email address (used as replyTo), e.g. a typo
 * such as "name@inria.f" that passes the loose client-side check.
 */
export class InvalidReplyToError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidReplyToError';
    }
}

type Validation<T> = { data: T } | { error: string };

interface EmailRouteOptions<T> {
    /** Used in the server error log, e.g. "contact form" */
    name: string;
    /** Check the parsed JSON body; return the data to send or a 400 error message */
    validate: (body: any) => Validation<T>;
    send: (data: T) => Promise<void>;
}

/**
 * Build a POST route that rate-limits, validates the JSON body and sends it
 */
export const createEmailRoute = <T>({ name, validate, send }: EmailRouteOptions<T>): APIRoute => {
    const rateLimiter = createRateLimiter();

    return async ({ request }) => {
        let rawBody = '';
        try {
            const clientIp = getClientIp(request);

            // Rate limiting check
            const remainingTime = rateLimiter.remaining(clientIp);
            if (remainingTime > 0) {
                return jsonResponse(
                    {
                        error: `Please wait ${remainingTime} seconds before submitting again.`,
                        retry_after: remainingTime
                    },
                    429,
                    { 'Retry-After': String(remainingTime) }
                );
            }

            // Parse and validate request body
            rawBody = await request.text();
            const result = validate(JSON.parse(rawBody));
            if ('error' in result) {
                return jsonResponse({ error: result.error }, 400);
            }

            await send(result.data);

            rateLimiter.record(clientIp);

            return jsonResponse({ success: true });

        } catch (error) {
            console.error(`Error processing ${name}:`, error, `\nRequest body: ${rawBody || '(not read)'}`);
            if (error instanceof InvalidReplyToError) {
                return jsonResponse({ error: 'Invalid email address', code: 'invalid_email' }, 400);
            }
            const message = error instanceof Error ? error.message : 'An error occurred while processing your request';

            return jsonResponse({ error: message }, 500);
        }
    };
};
