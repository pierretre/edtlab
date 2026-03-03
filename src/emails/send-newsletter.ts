import 'dotenv/config';
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import { render } from "@react-email/render";
import html from "remark-html";
import * as brevo from "@getbrevo/brevo";
import NewsletterEmail from "./NewsletterEmail.jsx";

const filePath = process.argv[2];
if (!filePath) {
    console.error("No newsletter file provided.");
    process.exit(0);
}

// Read markdown
const raw = fs.readFileSync(filePath, "utf8");
const { data, content } = matter(raw);

// Convert markdown → HTML
const htmlContent = String(await remark().use(html).process(content));

// Render React Email template
const emailHtml = await render(
    NewsletterEmail({
        title: data.title,
        content: htmlContent
    })
);

// Replace relative image paths with absolute URLs
const modifiedEmailHtml = emailHtml.replace(
    /src="(\/media\/uploads\/[^"]+)"/g,
    'src="https://edtlab.fr$1"'
);

// Setup Brevo API
const apiInstance = new brevo.EmailCampaignsApi();
if (!process.env.BREVO_API_KEY) {
    console.error("No Brevo API key provided.");
    process.exit(0);
}
apiInstance.setApiKey(
    brevo.EmailCampaignsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

if (!process.env.BREVO_EXTERNAL_LIST_ID || !process.env.BREVO_INTERNAL_LIST_ID) {
    console.error("No Brevo list IDs provided.");
    process.exit(0);
}
const listId = data.recipients === "External" ? process.env.BREVO_EXTERNAL_LIST_ID : process.env.BREVO_INTERNAL_LIST_ID;

if (!process.env.SENDER_EMAIL) {
    console.error("No sender email provided.");
    process.exit(0);
}
// Create Campaign
const campaign = await apiInstance.createEmailCampaign({
    name: data.title,
    subject: data.title,
    sender: {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL
    },
    htmlContent: modifiedEmailHtml,
    recipients: {
        listIds: [Number(listId)]
    }
});

// Send Campaign Immediately
const { body } = campaign;
// @ts-ignore: Argument of type 'string' is not assignable to parameter of type 'number'.
await apiInstance.sendEmailCampaignNow(`${body.id}`);

