import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { handleAuth } from './services/auth.service.js';
import { handleCallback } from './services/callback.service.js';
import { sendContactEmail, getMailConfig, type ContactFormData } from './services/mail.service.js';
import {
    getClientIp,
    loadRateLimitData,
    saveRateLimitData,
    cleanRateLimitData,
    checkRateLimit,
    updateRateLimit
} from './utils/rate-limit.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Environment configuration
const isDevelopment = process.env.APP_ENV === 'development' || process.env.APP_ENV === 'dev';

// Rate limiting configuration
const RATE_LIMIT_SECONDS = 60;

// CORS configuration
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (isDevelopment) {
            callback(null, true);
        } else {
            const allowedOrigins = [
                'http://localhost:4321',
                'http://localhost:80',
                'https://edtlab.fr',
                'http://localhost:4001'
            ];

            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(null, true);
            }
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    maxAge: 86400
};

// Middleware
// Configure Helmet with relaxed COOP for OAuth routes
app.use((req, res, next) => {
    // Disable Cross-Origin-Opener-Policy on OAuth routes to allow window.opener
    if (req.path.startsWith('/auth') || req.path.startsWith('/callback')) {
        helmet({
            crossOriginOpenerPolicy: false,
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'unsafe-inline'"],
                    styleSrc: ["'unsafe-inline'"],
                    connectSrc: ["*"]
                }
            }
        })(req, res, next);
    } else {
        helmet()(req, res, next);
    }
});
app.use(cors(corsOptions));
app.use(express.json());

// ============================================
// API Endpoints
// ============================================

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'edtlab-api' });
});

// OAuth endpoints for Decap CMS
app.get('/auth', handleAuth);
app.get('/callback', handleCallback);

// Contact form endpoint
app.post('/', async (req: Request, res: Response) => {
    try {
        const clientIp = getClientIp(req);

        // Rate limiting check
        let rateLimitData = await loadRateLimitData();
        rateLimitData = cleanRateLimitData(rateLimitData);

        const rateCheck = checkRateLimit(clientIp, rateLimitData, RATE_LIMIT_SECONDS);
        if (rateCheck.limited) {
            return res.status(429).json({
                error: `Please wait ${rateCheck.remainingTime} seconds before submitting again.`,
                retry_after: rateCheck.remainingTime
            });
        }

        // Validate required fields
        const { name, email, subject, message, privacy, organization } = req.body as ContactFormData;

        if (!name || !email || !subject || !message || privacy === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!privacy) {
            return res.status(400).json({ error: 'Privacy notice must be accepted' });
        }

        // Get mail configuration
        const mailConfig = getMailConfig();

        // Send email
        await sendContactEmail(
            { name, email, subject, message, privacy, organization },
            mailConfig
        );

        // Update rate limit data
        rateLimitData = updateRateLimit(clientIp, rateLimitData);
        await saveRateLimitData(rateLimitData);

        res.json({ success: true });

    } catch (error) {
        console.error('Error processing contact form:', error);
        const message = error instanceof Error ? error.message : 'An error occurred while processing your request';
        res.status(500).json({ error: message });
    }
});

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log('========================================');
    console.log('🚀 EDT Lab API Server Started');
    console.log('========================================');
    console.log(`Port: ${PORT}`);
    console.log(`Environment: ${isDevelopment ? 'development' : 'production'}`);
    console.log(`Time: ${new Date().toISOString()}`);
    console.log('');
    console.log('📋 Configuration:');
    console.log(`  GITHUB_CLIENT_ID: ${process.env.GITHUB_CLIENT_ID ? '✓ Set' : '❌ Missing'}`);
    console.log(`  GITHUB_CLIENT_SECRET: ${process.env.GITHUB_CLIENT_SECRET ? '✓ Set' : '❌ Missing'}`);
    console.log(`  BREVO_API_KEY: ${process.env.BREVO_API_KEY ? '✓ Set' : '❌ Missing'}`);
    console.log(`  LIST_INBOX: ${process.env.LIST_INBOX || '❌ Missing'}`);
    console.log('');
    console.log('🔗 Endpoints:');
    console.log(`  GET  /health       - Health check`);
    console.log(`  GET  /auth         - OAuth authentication (Decap CMS)`);
    console.log(`  GET  /callback     - OAuth callback (Decap CMS)`);
    console.log(`  POST /             - Contact form`);
    console.log('========================================\n');
});
