import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        // Validate required fields
        const { name, email, subject, message, privacy } = data;

        if (!name || !email || !subject || !message || !privacy) {
            return new Response(
                JSON.stringify({
                    error: 'Missing required fields',
                    details: 'Please fill in all required fields.'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({
                    error: 'Invalid email format',
                    details: 'Please provide a valid email address.'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Message length validation
        if (message.length < 10 || message.length > 2000) {
            return new Response(
                JSON.stringify({
                    error: 'Invalid message length',
                    details: 'Message must be between 10 and 2000 characters.'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // In a real implementation, you would:
        // 1. Send an email using a service like SendGrid, Mailgun, or Nodemailer
        // 2. Store the message in a database
        // 3. Send notifications to the appropriate team members

        // For now, we'll just log the submission and return success
        console.log('Contact form submission:', {
            name,
            email,
            organization: data.organization || 'Not provided',
            subject,
            message: message.substring(0, 100) + '...', // Log only first 100 chars for privacy
            timestamp: new Date().toISOString(),
            userAgent: request.headers.get('user-agent'),
            ip: request.headers.get('x-forwarded-for') || 'unknown'
        });

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Your message has been sent successfully. We will get back to you soon.'
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Contact form error:', error);

        return new Response(
            JSON.stringify({
                error: 'Server error',
                details: 'An unexpected error occurred. Please try again later.'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};

// Handle preflight requests for CORS
export const OPTIONS: APIRoute = async () => {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
};