import 'dotenv/config';
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import { render } from "@react-email/render";
import html from "remark-html";
import * as brevo from "@getbrevo/brevo";
import NewsletterEmail from "./NewsletterEmail.jsx";

const filePath = process.env.NEWSLETTER_FILE;

console.log("Starting newsletter campaign...", filePath);

if (!filePath) {
    console.log("No newsletter file provided.");
    process.exit(0);
}

// Read markdown
const raw = fs.readFileSync(filePath, "utf8");
const { data, content } = matter(raw);
console.log("Markdown loaded:", data.title);

// Convert markdown → HTML
const htmlContent = String(await remark().use(html).process(content));
console.log("Markdown converted to HTML.");

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

apiInstance.setApiKey(
    brevo.EmailCampaignsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);
console.log("Brevo API client initialized.");

console.log("Creating campaign with title:", data.title);

console.log("Recipients:", data.recipients);
const listId = data.recipients === "External" ? process.env.BREVO_EXTERNAL_LIST_ID : process.env.BREVO_INTERNAL_LIST_ID;
console.log("List ID:", listId);

// 5️⃣ Create Campaign
const campaign = await apiInstance.createEmailCampaign({
    name: data.title,
    subject: data.title,
    sender: {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL
    },
    type: "regular",
    htmlContent: modifiedEmailHtml,
    recipients: {
        listIds: [Number(listId)]
    }
});

const { body } = campaign;

// Send Campaign Immediately
// let response = await apiInstance.sendEmailCampaignNow(`${body.id}`);

console.log("Campaign sent successfully.");

console.log(modifiedEmailHtml);