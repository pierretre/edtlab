import React from "react";
import { Html, Head, Body, Container } from "@react-email/components";

interface Props {
  title: string;
  content: string; // already HTML
}

export default function NewsletterEmail({ title, content }: Props) {
  return (
    <Html>
      <Head>
        <style type="text/css">
          {`
            /* Font */
            @import url("../assets/fonts/marianne.css");

            /* Base */
            body {
              font-family: 'Marianne', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              letter-spacing: 0.01em;
              color: #262626;
              margin: 0;
              padding: 0;
              background-color: #ffffff;
            }

            /* Headings */
            h1 {
              font-size: 32px;
              font-weight: 700;
              color: #262626;
              margin: 0 0 24px;
            }

            h2 {
              font-size: 24px;
              font-weight: 600;
              color: #262626;
              margin: 24px 0 16px;
            }

            h3 {
              font-size: 20px;
              font-weight: 600;
              color: #404040;
              margin: 16px 0 12px;
            }

            h4 {
              font-size: 18px;
              font-weight: 500;
              color: #404040;
              margin: 12px 0 8px;
            }

            /* Paragraphs */
            p {
              margin: 0 0 16px;
              color: #525252;
            }

            /* Links */
            a {
              color: #323464;
              text-decoration: none;
            }

            a:hover {
              color: #1f2a8f;
            }

            /* Lists */
            ul, ol {
              margin: 0 0 16px;
              padding-left: 24px;
            }

            li {
              margin-bottom: 6px;
              color: #525252;
            }

            /* Tables */
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 16px;
            }

            th, td {
              padding: 12px;
              text-align: left;
            }

            th {
              background-color: #f5f5f5;
              font-weight: 600;
              color: #262626;
            }

            /* Card */
            .card {
              background-color: #ffffff;
              border: 1px solid #e5e5e5;
              border-radius: 8px;
              padding: 16px;
            }

            /* Headers with gradients (may not work in Outlook) */
            .header-blue-bell {
              background: #3b82f6;
              background: linear-gradient(135deg, #3b82f6, #1e40af);
              color: #ffffff;
              padding: 16px;
            }

            .header-hit-pink {
              background: #f472b6;
              background: linear-gradient(135deg, #f472b6, #be185d);
              color: #ffffff;
              padding: 16px;
            }

            /* Blockquote */
            blockquote {
              border-left: 4px solid #6366f1;
              padding-left: 16px;
              margin: 16px 0;
              font-style: italic;
              color: #737373;
            }

            /* Divider */
            hr {
              border: 0;
              border-top: 1px solid #e5e5e5;
              margin: 24px 0;
            }
          `}
        </style>
      </Head>
      <Body>
        <Container style={{ fontFamily: "'Marianne', Arial, sans-serif", lineHeight: 1.6, backgroundColor: "#fafafa", margin: "0 auto", textAlign: "center" }}>
          <img
            src="https://edtlab.fr/_assets/Logo_EDT_CBLOT.BFMY5V0T_WwoJy.webp"
            alt="Engineering Digital Twin"
            style={{ maxWidth: "200px", marginBottom: "24px", margin: "0 auto 24px" }}
          />
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Container>

      </Body>
    </Html>
  );
}