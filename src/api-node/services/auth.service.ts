import crypto from 'crypto';
import { Request, Response } from 'express';

interface OAuthConfig {
    clientId: string;
    clientSecret: string;
    repoIsPrivate: boolean;
}

/**
 * Generate random hex string for OAuth state parameter
 */
export const randomHex = (bytes: number): string => {
    return crypto.randomBytes(bytes).toString('hex');
};

/**
 * Build GitHub OAuth authorization URL
 */
export const buildAuthUrl = (
    clientId: string,
    scope: string,
    state: string
): string => {
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope
    });
    return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

/**
 * Exchange OAuth code for access token
 */
export const exchangeCodeForToken = async (
    clientId: string,
    clientSecret: string,
    code: string,
): Promise<string> => {
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: 'authorization_code',
        }),
    });

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error_description || data.error);
    }

    return data.access_token;
};

/**
 * Get OAuth configuration from environment
 */
export const getOAuthConfig = (): OAuthConfig => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('Missing GitHub OAuth credentials');
    }

    const repoIsPrivate = process.env.GITHUB_REPO_PRIVATE !== undefined
        && process.env.GITHUB_REPO_PRIVATE !== '0';

    return {
        clientId,
        clientSecret,
        repoIsPrivate
    };
};

/**
 * Handle OAuth authentication initiation
 */
export const handleAuth = (req: Request, res: Response): void => {
    const provider = req.query.provider;
    if (provider && provider !== 'github') {
        res.status(400).send('Invalid provider');
        return;
    }

    try {
        const config = getOAuthConfig();
        const scope = config.repoIsPrivate ? 'repo,user' : 'public_repo,user';
        const state = randomHex(4);

        const authUrl = buildAuthUrl(config.clientId, scope, state);

        console.log('🔐 OAuth: Redirecting to GitHub');
        console.log('Scope:', scope);

        res.redirect(authUrl);
    } catch (error) {
        console.error('❌ Auth error:', error);
        res.status(500).send('Server configuration error');
    }
};
