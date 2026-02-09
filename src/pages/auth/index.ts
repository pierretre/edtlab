import type { APIRoute } from "astro";

export const GET: APIRoute = ({ redirect }) => {
    const clientId = import.meta.env.GITHUB_CLIENT_ID;

    // Validate that the client ID is configured
    if (!clientId) {
        console.error("GitHub OAuth client ID is not configured");
        return new Response("OAuth configuration error", { status: 500 });
    }

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user`;

    return redirect(authUrl, 302);
};
