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
try {
    console.log("==== Testing Brevo connection ====");

    const emailCampaignsAPI = new brevo.EmailCampaignsApi();
    emailCampaignsAPI.setApiKey(
        brevo.EmailCampaignsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY!
    );

    console.log("Connected to Brevo account");

    if (!process.env.BREVO_EXTERNAL_LIST_ID || !process.env.BREVO_INTERNAL_LIST_ID) {
        console.error("No Brevo list IDs provided.");
        process.exit(0);
    }
    const listId = data.recipients === "External" ? process.env.BREVO_EXTERNAL_LIST_ID : process.env.BREVO_INTERNAL_LIST_ID;

    if (!process.env.SENDER_EMAIL) {
        console.error("No sender email provided.");
        process.exit(0);
    }
    try {
        const campaign = await emailCampaignsAPI.createEmailCampaign({
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

        console.log("==== Campaign Created ====");
        console.log(JSON.stringify(campaign.body, null, 2));

        const campaignId = campaign.body.id;
        console.log("Sending campaign ID:", campaignId);

        await emailCampaignsAPI.sendEmailCampaignNow(campaignId);

        console.log("==== Campaign Sent Successfully ====");

    } catch (error: any) {
        console.log("==== BREVO ERROR ====");

        // Status code
        if (error?.response?.status) {
            console.log("Status:", error.response.status);
        }

        // Headers
        if (error?.response?.headers) {
            console.log("Headers:", error.response.headers);
        }

        // Body (THIS IS THE IMPORTANT PART)
        if (error?.response?.body) {
            console.log("Response body:");
            console.log(JSON.stringify(error.response.body, null, 2));
        }

        // Fallback
        console.log("Full error object:");
        console.dir(error, { depth: null });

        process.exit(1);
    }
} catch (error: any) {
    console.log("==== BREVO CONNECTION ERROR ====");

    if (error?.response?.status) {
        console.log("Status:", error.response.status);
    }

    if (error?.response?.data) {
        console.log("Response data:");
        console.log(JSON.stringify(error.response.data, null, 2));
    }

    console.dir(error, { depth: null });

    process.exit(1);
}
