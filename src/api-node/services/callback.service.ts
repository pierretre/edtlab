import { Request, Response } from 'express';
import { exchangeCodeForToken, getOAuthConfig } from './auth.service.js';

/**
 * Generate callback HTML that communicates with Decap CMS
 */
export const generateCallbackHtml = (token: string): string => {
    const content = {
        token: token,
        provider: "github",
    };

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Authorizing...</title>
</head>
<body>
    <p>Authorizing...</p>
    <script>
    (function() {
        console.log("=== OAuth Callback ===");
        console.log("window.opener exists:", !!window.opener);
        
        const content = ${JSON.stringify(content)};
        
        // Store in localStorage
        try {
            localStorage.setItem('netlify-cms-user', JSON.stringify(content));
            localStorage.setItem('decap-cms-user', JSON.stringify(content));
            console.log('✓ Token stored in localStorage');
        } catch (e) {
            console.error("✗ Error storing token:", e);
        }
        
        // If popup mode (window.opener exists), send message and close
        if (window.opener && !window.opener.closed) {
            console.log("✓ Popup mode detected");
            
            try {
                window.opener.postMessage(
                    'authorization:github:success:' + JSON.stringify(content),
                    '*'
                );
                console.log('✓ Message sent to opener');
                
                // Close popup after short delay
                setTimeout(() => {
                    console.log('✓ Closing popup');
                    window.close();
                }, 500);
            } catch (e) {
                console.error("✗ Error sending message:", e);
                // Fallback: redirect
                window.location.href = '/admin/';
            }
        } else {
            // Full redirect mode
            console.log("✓ Redirect mode - going to /admin/");
            window.location.href = '/admin/';
        }
    })();
    </script>
</body>
</html>`;
};


/**
 * Handle OAuth callback
 */
export const handleCallback = async (req: Request, res: Response): Promise<void> => {
    const provider = req.query.provider;
    if (provider && provider !== 'github') {
        res.status(400).send('Invalid provider');
        return;
    }

    const code = req.query.code as string;
    if (!code) {
        res.status(400).send('Missing authorization code');
        return;
    }

    try {
        console.log('🔐 OAuth: Exchanging code for token');

        const config = getOAuthConfig();
        const accessToken = await exchangeCodeForToken(
            config.clientId,
            config.clientSecret,
            code
        );

        console.log('✅ Token received successfully');

        const html = generateCallbackHtml(accessToken);

        // Set headers to allow window.opener communication
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
        res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src *;");
        res.send(html);

    } catch (error) {
        console.error('❌ OAuth error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).send(`Authentication error: ${message}`);
    }
};
