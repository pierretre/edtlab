import React from "react";
import { Html, Head, Body, Container } from "@react-email/components";

interface Props {
  title: string;
  content: string;
}

export default function NewsletterEmail({ title, content }: Props) {
  return (
    <Html>
      <Head>
        <style type="text/css">
          {`
            @import url("../assets/fonts/marianne.css");

            body {
              font-family: 'Marianne', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              color: #262626;
              margin: 0;
              padding: 0;
              background-color: #fafafa;
            }

            h1, h2, h3, h4 {
              color: #262626;
              margin: 0 0 16px;
            }

            p, li {
              color: #525252;
            }

            a {
              color: #323464;
              text-decoration: none;
            }

            a:hover {
              color: #1f2a8f;
            }

            .card {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 24px;
              margin: 0 auto;
              max-width: 600px;
              text-align: left;
            }

            .header-footer {
              background-color: #313565;
              color: #ffffff;
              padding: 24px 16px;
              text-align: center;
            }

            .footer a {
              color: #ffffff;
              text-decoration: underline;
            }

            img {
              max-width: 200px;
              margin: 0 auto 24px;
              display: block;
            }
          `}
        </style>
      </Head>
      <Body style={{ margin: 0, padding: 0, backgroundColor: "#fafafa" }}>
        {/* Header */}
        <div className="header-footer">
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
            <img src="https://edtlab.fr/Logo_EDT_CBLOT.png" alt="Engineering Digital Twin" style={{ maxWidth: "200px", margin: 0 }} />
            <img src="https://edtlab.fr/logo-fr-white.png" alt="Engineering Digital Twin" style={{ maxWidth: "200px", margin: 0 }} />
          </div>
          <h1 style={{ color: "white" }}>{title}</h1>
        </div>

        {/* Main content */}
        <Container style={{ padding: "24px 16px" }}>
          <div className="card" dangerouslySetInnerHTML={{ __html: content }} />
        </Container>

        {/* Footer */}
        <div className="header-footer footer">
          <div style={{ fontSize: "14px", marginBottom: "8px" }}>
            <a href="https://edtlab.fr">https://edtlab.fr</a>
          </div>
          <div style={{ fontSize: "14px" }}>
            Newsletter à diffusion interne au Programme EDT, ne pas diffuser à l'extérieur du programme.
          </div>
        </div>
      </Body>
    </Html>
  );
}