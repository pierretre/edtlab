# Sending the Newsletter

Sending a newsletter is a manual, explicit action performed by running a script locally. There is no automatic trigger — you decide when a newsletter is sent by running the command below.

---

## 1. Create the newsletter file in the correct location

The newsletter markdown file **must** live in `src/content/newsletter/` for the script (and the rest of the site tooling) to pick it up correctly:

```
src/content/newsletter/<file.md>
```

Use a descriptive, dated filename consistent with existing newsletters, e.g. `2026-06-newsletter-edt-internal.md`. You can create this file directly, or via Decap CMS.

---

## 2. Command

```bash
npx tsx src/emails/send-newsletter.ts src/content/newsletter/<file.md>
```

Replace `<file.md>` with the newsletter markdown file you want to send, e.g.:

```bash
npx tsx src/emails/send-newsletter.ts src/content/newsletter/2026-06-newsletter-edt-internal.md
```

This script (`src/emails/send-newsletter.ts`):
1. Reads the markdown file and parses its frontmatter (`title`, `recipients`, ...).
2. Converts the markdown body to HTML and renders it into the `NewsletterEmail` React Email template.
3. Rewrites relative `/media/uploads/...` image paths to absolute `https://edtlab.fr/...` URLs.
4. Prints a summary (title, recipients, sender) and asks for interactive confirmation (`yes`/`no`) before sending.
5. Once confirmed, creates a Brevo email campaign and sends it immediately to the corresponding Brevo list.

If you answer anything other than `yes` at the confirmation prompt, the script aborts and nothing is sent.

---

## Required environment variables

These must be set in your `.env` file (or exported in your shell) before running the command:

| Variable | Purpose |
|---|---|
| `BREVO_API_KEY` | Brevo API key used to create and send the campaign |
| `BREVO_EXTERNAL_LIST_ID` | Brevo list ID used when the newsletter's frontmatter has `recipients: External` |
| `BREVO_INTERNAL_LIST_ID` | Brevo list ID used for any other `recipients` value (e.g. `Internal`) |
| `SENDER_EMAIL` | Sender email address (must be verified in Brevo) |
| `SENDER_NAME` | Sender display name |

If any of these are missing, the script logs an error and exits without sending.

---

## Newsletter file frontmatter

```yaml
---
title: Newsletter EDT - Juin 2026
date: 2026-06-05T15:00:00.000+02:00
recipients: Internal
---
```

- `title`: used as both the campaign name and email subject.
- `recipients`: `External` sends to `BREVO_EXTERNAL_LIST_ID`; anything else (e.g. `Internal`) sends to `BREVO_INTERNAL_LIST_ID`.

---

## Important notes

- **Sending is immediate once confirmed.** The confirmation prompt is the only safety check — review the printed summary (title, recipients, sender) carefully before typing `yes`.
- The file must be located under `src/content/newsletter/`; the script simply reads the path you pass it, so a file elsewhere will not be found or picked up by the site.
- See [`brevo-emails.md`](./brevo-emails.md) for general Brevo API configuration and getting an API key.
