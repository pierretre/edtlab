import type { APIRoute } from "astro";

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

interface GitHubTokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
}

interface OAuthContent {
    token: string;
    provider: string;
}

export const GET: APIRoute = async ({ url, redirect }) => {
    const clientId = import.meta.env.GITHUB_CLIENT_ID;
    const clientSecret = import.meta.env.GITHUB_CLIENT_SECRET;

    // Validate OAuth configuration
    if (!clientId || !clientSecret) {
        console.error("GitHub OAuth credentials are not configured");
        return redirect("/?error=oauth_config_missing");
    }

    // Get authorization code from query params
    const code = url.searchParams.get("code");

    if (!code) {
        console.error("No authorization code provided");
        return redirect("/?error=no_code");
    }

    try {
        // Exchange code for access token
        const response = await fetch(GITHUB_TOKEN_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code,
                client_id: clientId,
                client_secret: clientSecret,
            }),
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const tokenData = (await response.json()) as GitHubTokenResponse;

        if (!tokenData.access_token) {
            throw new Error("No access token received from GitHub");
        }

        const content: OAuthContent = {
            token: tokenData.access_token,
            provider: "github",
        };

        // Generate HTML response that communicates with Decap CMS
        // This uses window.postMessage to send the token to the CMS window
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OAuth Callback</title>
</head>
<body>
    <p>Authorization successful. This window will close automatically.</p>
    <script>
        (function() {
            const receiveMessage = (message) => {
                // Send success message to Decap CMS
                window.opener.postMessage(
                    'authorization:${content.provider}:success:${JSON.stringify(content)}',
                    message.origin
                );

                window.removeEventListener("message", receiveMessage, false);
                
                // Close the popup after a short delay
                setTimeout(() => {
                    window.close();
                }, 1000);
            };
            
            window.addEventListener("message", receiveMessage, false);

            // Notify Decap CMS that we're authorizing
            window.opener.postMessage("authorizing:${content.provider}", "*");
        })();
    </script>
</body>
</html>
        `.trim();

        return new Response(html, {
            status: 200,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        });
    } catch (error) {
        console.error("OAuth callback error:", error);

        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return redirect(`/?error=${encodeURIComponent(errorMessage)}`);
    }
};
