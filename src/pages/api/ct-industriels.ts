import {
    createEmailRoute, emailField, emailMessageField, escapeHtml, escapeMultiline,
    parseRecipients, renderEmailLayout, sendEmail
} from '~/utils/email';

// Types
interface JoinFormData {
    name: string;
    email: string;
    institution: string;
    motivation: string;
    consentCtIndustriels: boolean;
    mailingList: boolean;
}

/**
 * Generate HTML email content
 */
const generateEmailHtml = (data: JoinFormData): string => {
    const yes = '✅';
    const mailing = data.mailingList ? 'Oui' : 'Non';

    return renderEmailLayout({
        title: "Nouvelle demande d'adhésion — CT industriels",
        footer: "Demande envoyée depuis le formulaire d'adhésion au CT industriels — EDT Research Program",
        content: `
            ${emailField('Nom :', escapeHtml(data.name))}
            ${emailField('Email :', `&lt;${escapeHtml(data.email)}&gt;`)}
            ${emailField('Institution :', escapeHtml(data.institution))}
            ${emailMessageField('Pourquoi rejoindre le comité :', escapeMultiline(data.motivation))}
            ${emailField('Adhésion au CT industriels :', yes)}
            ${emailField('Inscription liste de diffusion EDT :', mailing)}`
    });
};

export const POST = createEmailRoute<JoinFormData>({
    name: 'CT industriels join request',
    validate: ({ name, email, institution, motivation, consentCtIndustriels, mailingList }) => {
        if (!name || !email || !institution || !motivation || consentCtIndustriels === undefined || mailingList === undefined) {
            return { error: 'Missing required fields' };
        }
        if (!consentCtIndustriels) {
            return { error: 'All consents must be accepted' };
        }
        return { data: { name, email, institution, motivation, consentCtIndustriels, mailingList: !!mailingList } };
    },
    send: (data) => sendEmail({
        tag: 'ct-industriels',
        to: parseRecipients(process.env.CT_INDUSTRIELS_INBOX || import.meta.env.CT_INDUSTRIELS_INBOX),
        replyTo: { email: data.email, name: data.name },
        subject: `CT industriels — Demande d'adhésion : ${data.name}`,
        htmlContent: generateEmailHtml(data),
        devPayload: data,
    }),
});
