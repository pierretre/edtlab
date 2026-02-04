import * as brevo from '@getbrevo/brevo';

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    privacy: boolean;
    organization?: string;
}

export interface MailConfig {
    brevoApiKey: string;
    senderEmail: string;
    senderName: string;
    recipientEmail: string;
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
 * Get mail configuration from environment
 */
export const getMailConfig = (): MailConfig => {
    const brevoApiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL || 'contact@edtlab.fr';
    const senderName = process.env.SENDER_NAME || 'EDT Research Program';
    const recipientEmail = process.env.LIST_INBOX;

    if (!brevoApiKey || !recipientEmail) {
        throw new Error('Missing required mail configuration');
    }

    return {
        brevoApiKey,
        senderEmail,
        senderName,
        recipientEmail
    };
};

/**
 * Generate HTML email content
 */
export const generateEmailHtml = (data: ContactFormData): string => {
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
export const sendContactEmail = async (
    data: ContactFormData,
    config: MailConfig
): Promise<void> => {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, config.brevoApiKey);

    const subjectLabel = subjectLabels[data.subject] || data.subject;
    const htmlContent = generateEmailHtml(data);

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: config.senderName, email: config.senderEmail };
    sendSmtpEmail.to = [{ email: config.recipientEmail }];
    sendSmtpEmail.replyTo = { email: data.email, name: data.name };
    sendSmtpEmail.subject = `Contact Form: ${subjectLabel} - ${data.name}`;
    sendSmtpEmail.htmlContent = htmlContent;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
};
