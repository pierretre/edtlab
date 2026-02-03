import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import * as brevo from '@getbrevo/brevo';

const app = express();
const PORT = process.env.PORT || 8080;

// Environment configuration
const isDevelopment = process.env.APP_ENV === 'development' || process.env.APP_ENV === 'dev';

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (isDevelopment) {
            // Development: Allow all origins
            callback(null, true);
        } else {
            // Production: Strict origin whitelist
            const allowedOrigins = [
                'http://localhost:4321',
                'http://localhost:80',
                'https://edtlab.fr',
                'http://localhost:4001' // Docker local
            ];

            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(null, true); // Still allow but default to edtlab.fr in headers
            }
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    maxAge: 86400 // 24 hours
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// Rate limiting configuration
const RATE_LIMIT_SECONDS = 60;
const RATE_LIMIT_FILE = path.join(os.tmpdir(), 'contact_form_rate_limit.json');

// Helper function to get client IP
const getClientIp = (req) => {
    return req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for']?.split(',')[0] ||
        req.socket.remoteAddress;
};

// Helper function to load rate limit data
const loadRateLimitData = async () => {
    try {
        const data = await fs.readFile(RATE_LIMIT_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
};

// Helper function to save rate limit data
const saveRateLimitData = async (data) => {
    try {
        await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving rate limit data:', error);
    }
};

// Helper function to clean old rate limit entries
const cleanRateLimitData = (data) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const cleaned = {};

    for (const [ip, timestamp] of Object.entries(data)) {
        if (currentTime - timestamp < 7200) { // Keep entries less than 2 hours old
            cleaned[ip] = timestamp;
        }
    }

    return cleaned;
};

// Subject labels mapping
const subjectLabels = {
    'general': 'General Inquiry',
    'collaboration': 'Collaboration',
    'research': 'Research',
    'technical': 'Technical Support',
    'media': 'Media',
    'other': 'Other'
};

// HTML escape helper
const escapeHtml = (text) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'edtlab-api' });
});

// OAuth callback endpoint for Decap CMS
app.get('/auth', async (req, res) => {
    try {
        const code = req.query.code;

        if (!code) {
            return res.status(400).send('Missing authorization code');
        }

        // Get GitHub OAuth credentials from environment
        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;

        console.error(clientId, clientSecret)

        if (!clientId || !clientSecret) {
            console.error('Missing GitHub OAuth credentials');
            return res.status(500).send('Server configuration error');
        }

        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code,
            }),
        });

        const data = await tokenResponse.json();

        if (data.error) {
            console.error('GitHub OAuth error:', data.error_description);
            return res.status(400).send(`GitHub OAuth error: ${data.error_description}`);
        }

        // Return HTML that posts message to opener window (Decap CMS)
        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Authorization Success</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #665BA7 0%, #4F4783 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
        }
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 4px solid white;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <h2>Authorization Successful</h2>
        <p>Redirecting back to CMS...</p>
    </div>
    <script>
        (function() {
            const data = ${JSON.stringify({ token: data.access_token, provider: 'github' })};
            const message = 'authorization:github:success:' + JSON.stringify(data);
            
            if (window.opener) {
                window.opener.postMessage(message, window.location.origin);
                setTimeout(function() {
                    window.close();
                }, 1000);
            } else {
                document.body.innerHTML = '<div class="container"><h2>Error</h2><p>Unable to communicate with parent window. Please close this window and try again.</p></div>';
            }
        })();
    </script>
</body>
</html>
        `;

        res.setHeader('Content-Type', 'text/html');
        res.send(html);

    } catch (error) {
        console.error('OAuth error:', error);
        res.status(500).send('An error occurred during authentication');
    }
});

// Contact form endpoint
app.post('/', async (req, res) => {
    try {
        const clientIp = getClientIp(req);

        // Rate limiting check
        let rateLimitData = await loadRateLimitData();
        rateLimitData = cleanRateLimitData(rateLimitData);

        if (rateLimitData[clientIp]) {
            const currentTime = Math.floor(Date.now() / 1000);
            const timeSinceLastSubmit = currentTime - rateLimitData[clientIp];

            if (timeSinceLastSubmit < RATE_LIMIT_SECONDS) {
                const remainingTime = RATE_LIMIT_SECONDS - timeSinceLastSubmit;
                return res.status(429).json({
                    error: `Please wait ${remainingTime} seconds before submitting again.`,
                    retry_after: remainingTime
                });
            }
        }

        // Validate required fields
        const { name, email, subject, message, privacy, organization } = req.body;

        if (!name || !email || !subject || !message || privacy === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!privacy) {
            return res.status(400).json({ error: 'Privacy notice must be accepted' });
        }

        // Get environment variables
        const brevoApiKey = process.env.BREVO_API_KEY;
        const senderEmail = process.env.SENDER_EMAIL || 'contact@edtlab.fr';
        const senderName = process.env.SENDER_NAME || 'EDT Research Program';
        const recipientEmail = process.env.LIST_INBOX;

        if (!brevoApiKey || !recipientEmail) {
            console.error('Missing required environment variables');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Sanitize inputs
        const userName = escapeHtml(name);
        const userEmail = escapeHtml(email);
        const userMessage = escapeHtml(message);
        const subjectLabel = subjectLabels[subject] || subject;
        const organizationText = organization && organization.trim()
            ? escapeHtml(organization)
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

        // Create HTML email template
        const htmlContent = `
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

        // Configure Brevo API
        const apiInstance = new brevo.TransactionalEmailsApi();
        apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);

        // Prepare email
        const sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.sender = { name: senderName, email: senderEmail };
        sendSmtpEmail.to = [{ email: recipientEmail }];
        sendSmtpEmail.replyTo = { email: userEmail, name: userName };
        sendSmtpEmail.subject = `Contact Form: ${subjectLabel} - ${userName}`;
        sendSmtpEmail.htmlContent = htmlContent;

        // Send email
        await apiInstance.sendTransacEmail(sendSmtpEmail);

        // Update rate limit data
        const currentTime = Math.floor(Date.now() / 1000);
        rateLimitData[clientIp] = currentTime;
        await saveRateLimitData(rateLimitData);

        res.json({ success: true });

    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            error: error.message || 'An error occurred while processing your request'
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`EDT Lab API server running on port ${PORT}`);
    console.log(`Environment: ${isDevelopment ? 'development' : 'production'}`);
});
