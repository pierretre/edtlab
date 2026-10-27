import { test, expect, type Page, type Route } from '@playwright/test';
import { ui } from '../../i18n/ui';

// E2E tests for the three site forms (contact, PhD club, CT industriels).
// The API is always mocked with page.route so no email is ever sent and the
// server-side rate limiter is never hit. The mock also captures the JSON
// payload so the tests can assert exactly what the form submits.

type Lang = 'en' | 'fr';
const LANGS: Lang[] = ['en', 'fr'];

const tr = (lang: Lang, key: string): string => (ui as any)[lang][key];

const INVALID_EMAILS = ['plainaddress', 'missing-at.example.com', 'user@', '@example.com', 'user@example', 'user name@example.com'];
const VALID_EMAIL = 'jane.doe@example.org';

const LONG_TEXT = 'This is a sufficiently long text for validation.'; // 48 chars

/** Intercept the form endpoint; resolves with the captured JSON bodies. */
async function mockApi(page: Page, apiPath: string, respond?: (route: Route) => Promise<void>) {
    const payloads: any[] = [];
    await page.route(`**${apiPath}`, async (route) => {
        payloads.push(route.request().postDataJSON());
        if (respond) return respond(route);
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    });
    return payloads;
}

const fulfillJson = (status: number, body: unknown) => (route: Route) =>
    route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });

/** Toggles are visually hidden `sr-only` inputs: click their label instead. */
async function toggle(page: Page, id: string) {
    await page.locator(`label:has(#${id})`).click();
}

/**
 * Submit with the keyboard: a blur-triggered error can shift the button down
 * between mousedown and mouseup and make a plain click miss it.
 */
async function submit(page: Page) {
    await page.focus('#submit-button');
    await page.keyboard.press('Enter');
}

const errorOf = (page: Page, id: string) => page.locator(`#${id}-error`);

/** An inline validation error is shown for `id`, with the translated text when given. */
async function expectInlineError(page: Page, id: string, translated?: string) {
    await expect(errorOf(page, id)).toBeVisible();
    if (translated) await expect(errorOf(page, id)).toHaveText(translated);
}

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------
const CONTACT_SUBJECTS = ['general', 'collaboration', 'research', 'technical', 'media', 'other'];

for (const lang of LANGS) {
    const url = lang === 'en' ? '/en/contact-us' : '/fr/nous-contacter';
    const k = (key: string) => tr(lang, `contact.form.${key}`);

    test.describe(`Contact form [${lang}]`, () => {
        let payloads: any[];

        test.beforeEach(async ({ page }) => {
            payloads = await mockApi(page, '/api/contact');
            await page.goto(url);
            await expect(page.locator('#contact-form')).toBeVisible();
        });

        const fillValid = async (page: Page, subject = 'general') => {
            await page.fill('#name', 'Jane Doe');
            await page.fill('#email', VALID_EMAIL);
            await page.fill('#organization', 'Inria');
            await page.selectOption('#subject', subject);
            await page.fill('#message', 'Hello, this is a test message.');
            await page.check('#privacy');
        };

        for (const subject of CONTACT_SUBJECTS) {
            test(`submits with subject "${subject}"`, async ({ page }) => {
                await fillValid(page, subject);
                await submit(page);

                await expect(page.locator('#success-message')).toBeVisible();
                await expect(page.locator('#error-message')).toBeHidden();
                expect(payloads).toEqual([{
                    name: 'Jane Doe',
                    email: VALID_EMAIL,
                    organization: 'Inria',
                    subject,
                    message: 'Hello, this is a test message.',
                    privacy: true,
                }]);
                // The form is reset after success
                await expect(page.locator('#name')).toHaveValue('');
                await expect(page.locator('#privacy')).not.toBeChecked();
            });
        }

        test('submits without the optional organization', async ({ page }) => {
            await fillValid(page);
            await page.fill('#organization', '');
            await submit(page);

            await expect(page.locator('#success-message')).toBeVisible();
            expect(payloads[0].organization).toBe('');
        });

        test('shows required errors and does not submit an empty form', async ({ page }) => {
            await submit(page);

            await expectInlineError(page, 'name', k('validation-required'));
            // optional field has no error element
            await expect(page.locator('#organization-error')).toHaveCount(0);
            expect(payloads).toHaveLength(0);
        });

        for (const email of INVALID_EMAILS) {
            test(`rejects invalid email "${email}"`, async ({ page }) => {
                await fillValid(page);
                await page.fill('#email', email);
                await submit(page);

                await expectInlineError(page, 'email', k('validation-email'));
                await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true');
                await expect(page.locator('#success-message')).toBeHidden();
                expect(payloads).toHaveLength(0);
            });
        }

        test('validates email on blur and clears the error once fixed', async ({ page }) => {
            await page.fill('#email', 'not-an-email');
            await page.locator('#name').focus(); // blur the email field
            await expect(errorOf(page, 'email')).toHaveText(k('validation-email'));

            await page.fill('#email', VALID_EMAIL);
            await expect(errorOf(page, 'email')).toBeHidden();
            await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'false');
        });

        test('rejects a message that is too short', async ({ page }) => {
            await fillValid(page);
            await page.fill('#message', 'short');
            await submit(page);

            await expect(errorOf(page, 'message')).toHaveText(k('validation-message-short'));
            expect(payloads).toHaveLength(0);
        });

        test('rejects a message that is too long', async ({ page }) => {
            await fillValid(page);
            // maxlength=2000 blocks typing, so bypass it the way a script would
            await page.evaluate(() => {
                const el = document.querySelector<HTMLTextAreaElement>('#message')!;
                el.removeAttribute('maxlength');
                el.value = 'x'.repeat(2001);
            });
            await submit(page);

            await expectInlineError(page, 'message', k('validation-message-long'));
            expect(payloads).toHaveLength(0);
        });

        test('requires the privacy notice', async ({ page }) => {
            await fillValid(page);
            await page.uncheck('#privacy');
            await submit(page);

            await expectInlineError(page, 'privacy', k('validation-privacy'));
            expect(payloads).toHaveLength(0);
        });

        test('trims whitespace-only required fields', async ({ page }) => {
            await fillValid(page);
            await page.fill('#name', '   ');
            await submit(page);

            await expectInlineError(page, 'name', k('validation-required'));
            expect(payloads).toHaveLength(0);
        });
    });

    test.describe(`Contact form server errors [${lang}]`, () => {
        const fill = async (page: Page) => {
            await page.fill('#name', 'Jane Doe');
            await page.fill('#email', VALID_EMAIL);
            await page.selectOption('#subject', 'general');
            await page.fill('#message', 'Hello, this is a test message.');
            await page.check('#privacy');
        };

        test('shows the invalid-email message when the API rejects the address', async ({ page }) => {
            await mockApi(page, '/api/contact', fulfillJson(400, { error: 'Invalid email address', code: 'invalid_email' }));
            await page.goto(url);
            await fill(page);
            await submit(page);

            await expect(page.locator('#error-message')).toBeVisible();
            await expect(page.locator('#error-details')).toHaveText(k('validation-email'));
            await expect(page.locator('#submit-button')).toBeEnabled();
        });

        test('shows the rate-limit message on HTTP 429', async ({ page }) => {
            await mockApi(page, '/api/contact', fulfillJson(429, { error: 'slow down', retry_after: 42 }));
            await page.goto(url);
            await fill(page);
            await submit(page);

            await expect(page.locator('#error-details')).toHaveText(k('error-cooldown').replace('{seconds}', '42'));
        });

        test('shows the server error message on HTTP 500', async ({ page }) => {
            await mockApi(page, '/api/contact', fulfillJson(500, { error: 'Boom' }));
            await page.goto(url);
            await fill(page);
            await submit(page);

            await expect(page.locator('#error-details')).toHaveText('Boom');
            await expect(page.locator('#success-message')).toBeHidden();
        });

        test('shows the generic error when the network fails', async ({ page }) => {
            await page.route('**/api/contact', (route) => route.abort());
            await page.goto(url);
            await fill(page);
            await submit(page);

            await expect(page.locator('#error-message')).toBeVisible();
            await expect(page.locator('#submit-button')).toBeEnabled();
        });

        test('blocks a second submission during the client cooldown', async ({ page }) => {
            const payloads = await mockApi(page, '/api/contact');
            await page.goto(url);
            await fill(page);
            await submit(page);
            await expect(page.locator('#success-message')).toBeVisible();

            await fill(page);
            await submit(page);

            await expect(page.locator('#error-message')).toBeVisible();
            await expect(page.locator('#error-details')).toContainText(/\d+/);
            expect(payloads).toHaveLength(1);
        });
    });
}

// ---------------------------------------------------------------------------
// CT industriels (industrial expert committee) form
// ---------------------------------------------------------------------------
for (const lang of LANGS) {
    const url = lang === 'en' ? '/en/industrials-ec' : '/fr/ct-industriels';
    const k = (key: string) => tr(lang, `ct-industriels.form.${key}`);

    const fillText = async (page: Page) => {
        await page.fill('#name', 'Jane Doe');
        await page.fill('#email', VALID_EMAIL);
        await page.fill('#institution', 'ACME Industries');
        await page.fill('#motivation', LONG_TEXT);
    };

    test.describe(`CT industriels form [${lang}]`, () => {
        let payloads: any[];

        test.beforeEach(async ({ page }) => {
            payloads = await mockApi(page, '/api/ct-industriels');
            await page.goto(url);
            await expect(page.locator('#ct-industriels-form')).toBeVisible();
        });

        for (const mailingList of [false, true]) {
            test(`submits with mailing list ${mailingList ? 'opted in' : 'opted out'}`, async ({ page }) => {
                await fillText(page);
                await toggle(page, 'consentCtIndustriels');
                if (mailingList) await toggle(page, 'consentMailingList');
                await submit(page);

                await expect(page.locator('#success-message')).toBeVisible();
                expect(payloads).toEqual([{
                    name: 'Jane Doe',
                    email: VALID_EMAIL,
                    institution: 'ACME Industries',
                    motivation: LONG_TEXT,
                    consentCtIndustriels: true,
                    mailingList,
                }]);
                await expect(page.locator('#consentCtIndustriels')).not.toBeChecked();
            });
        }

        test('shows required errors and does not submit an empty form', async ({ page }) => {
            await submit(page);

            await expectInlineError(page, 'name', k('validation-required'));
            await expectInlineError(page, 'consentCtIndustriels', k('validation-consent'));
            expect(payloads).toHaveLength(0);
        });

        for (const email of INVALID_EMAILS) {
            test(`rejects invalid email "${email}"`, async ({ page }) => {
                await fillText(page);
                await page.fill('#email', email);
                await toggle(page, 'consentCtIndustriels');
                await submit(page);

                await expectInlineError(page, 'email', k('validation-email'));
                await expect(page.locator('#success-message')).toBeHidden();
                expect(payloads).toHaveLength(0);
            });
        }

        test('requires the CT industriels consent even when the mailing list is checked', async ({ page }) => {
            await fillText(page);
            await toggle(page, 'consentMailingList');
            await submit(page);

            await expectInlineError(page, 'consentCtIndustriels', k('validation-consent'));
            expect(payloads).toHaveLength(0);
        });

        test('the mailing list consent is optional (no error element)', async ({ page }) => {
            await expect(page.locator('#consentMailingList')).not.toHaveAttribute('required', '');
        });

        test('shows the invalid-email error when the API rejects the address', async ({ page }) => {
            await page.unroute('**/api/ct-industriels');
            await mockApi(page, '/api/ct-industriels', fulfillJson(400, { error: 'Invalid email address', code: 'invalid_email' }));
            await fillText(page);
            await toggle(page, 'consentCtIndustriels');
            await submit(page);

            await expect(errorOf(page, 'email')).toHaveText(k('validation-email'));
            await expect(page.locator('#error-message')).toBeVisible();
        });

        test('shows the rate-limit message on HTTP 429', async ({ page }) => {
            await page.unroute('**/api/ct-industriels');
            await mockApi(page, '/api/ct-industriels', fulfillJson(429, { error: 'slow down', retry_after: 30 }));
            await fillText(page);
            await toggle(page, 'consentCtIndustriels');
            await submit(page);

            await expect(page.locator('#error-details')).toHaveText(k('error-cooldown').replace('{seconds}', '30'));
        });

        test('blocks a second submission during the client cooldown', async ({ page }) => {
            await fillText(page);
            await toggle(page, 'consentCtIndustriels');
            await submit(page);
            await expect(page.locator('#success-message')).toBeVisible();

            await fillText(page);
            await toggle(page, 'consentCtIndustriels');
            await submit(page);

            await expect(page.locator('#error-message')).toBeVisible();
            expect(payloads).toHaveLength(1);
        });
    });
}

// ---------------------------------------------------------------------------
// PhD students club form
// ---------------------------------------------------------------------------
const FUNDING_OPTIONS = ['doctoral-contract', 'cifre', 'project', 'other'];
const PCS = ['PC1', 'PC2', 'PC3', 'PC4', 'PC5'];

for (const lang of LANGS) {
    const url = lang === 'en' ? '/en/phd-club' : '/fr/club-des-doctorants';
    const k = (key: string) => tr(lang, `phd-club.form.${key}`);

    const fillText = async (page: Page, funding = 'doctoral-contract') => {
        await page.fill('#firstName', 'Jane');
        await page.fill('#lastName', 'Doe');
        await page.fill('#email', VALID_EMAIL);
        await page.fill('#institution', 'Inria');
        await page.fill('#supervisors', 'Prof. Smith');
        await page.fill('#startDate', '2024-09-01');
        await page.selectOption('#funding', funding);
        await page.fill('#funder', 'ANR');
        await page.fill('#thesisDescription', LONG_TEXT);
        await page.fill('#motivation', LONG_TEXT);
    };

    /** Open the charter (without leaving the page) which enables its consent toggle. */
    const openCharter = async (page: Page) => {
        await page.evaluate(() =>
            document.getElementById('charter-link')!.addEventListener('click', (e) => e.preventDefault()));
        await page.click('#charter-link');
    };

    const acceptAllConsents = async (page: Page) => {
        await toggle(page, 'consentSupervisors');
        await openCharter(page);
        await toggle(page, 'consentCharter');
        await toggle(page, 'mailingList');
    };

    test.describe(`PhD club form [${lang}]`, () => {
        let payloads: any[];

        test.beforeEach(async ({ page }) => {
            payloads = await mockApi(page, '/api/phd-club');
            await page.goto(url);
            await expect(page.locator('#phd-club-form')).toBeVisible();
        });

        for (const funding of FUNDING_OPTIONS) {
            test(`submits with funding "${funding}"`, async ({ page }) => {
                await fillText(page, funding);
                await acceptAllConsents(page);
                await submit(page);

                await expect(page.locator('#success-message')).toBeVisible();
                expect(payloads).toEqual([{
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: VALID_EMAIL,
                    institution: 'Inria',
                    supervisors: 'Prof. Smith',
                    startDate: '2024-09-01',
                    pcs: [],
                    funding,
                    funder: 'ANR',
                    thesisDescription: LONG_TEXT,
                    motivation: LONG_TEXT,
                    consentSupervisors: true,
                    consentCharter: true,
                    mailingList: true,
                }]);
            });
        }

        test('submits with every focused project selected', async ({ page }) => {
            await fillText(page);
            for (const pc of PCS) await page.check(`input[name="pc"][value="${pc}"]`);
            await acceptAllConsents(page);
            await submit(page);

            await expect(page.locator('#success-message')).toBeVisible();
            expect(payloads[0].pcs).toEqual(PCS);
        });

        test('submits with a subset of focused projects', async ({ page }) => {
            await fillText(page);
            await page.check('input[name="pc"][value="PC2"]');
            await page.check('input[name="pc"][value="PC4"]');
            await acceptAllConsents(page);
            await submit(page);

            await expect(page.locator('#success-message')).toBeVisible();
            expect(payloads[0].pcs).toEqual(['PC2', 'PC4']);
        });

        test('shows required errors and does not submit an empty form', async ({ page }) => {
            await submit(page);

            await expectInlineError(page, 'firstName', k('validation-required'));
            await expectInlineError(page, 'consentSupervisors', k('validation-consent'));
            expect(payloads).toHaveLength(0);
        });

        for (const email of INVALID_EMAILS) {
            test(`rejects invalid email "${email}"`, async ({ page }) => {
                await fillText(page);
                await page.fill('#email', email);
                await acceptAllConsents(page);
                await submit(page);

                await expectInlineError(page, 'email', k('validation-email'));
                await expect(page.locator('#success-message')).toBeHidden();
                expect(payloads).toHaveLength(0);
            });
        }

        test('the charter consent is disabled until the charter link is opened', async ({ page }) => {
            const charterConsent = page.locator('#consentCharter');
            const hint = page.locator('#consentCharter-hint');

            await expect(charterConsent).toBeDisabled();
            await expect(hint).toBeVisible();

            await openCharter(page);

            await expect(charterConsent).toBeEnabled();
            await expect(hint).toBeHidden();
        });

        test('the charter link points to the PDF and opens in a new tab', async ({ page }) => {
            const link = page.locator('#charter-link');
            await expect(link).toHaveAttribute('href', /\.pdf$/);
            await expect(link).toHaveAttribute('target', '_blank');
            await expect(link).toHaveAttribute('rel', /noopener/);
        });

        test('blocks submission when the charter was never opened', async ({ page }) => {
            await fillText(page);
            await toggle(page, 'consentSupervisors');
            await toggle(page, 'mailingList');
            await submit(page);

            await expectInlineError(page, 'consentCharter', k('charter-hint'));
            expect(payloads).toHaveLength(0);
        });

        for (const missing of ['consentSupervisors', 'mailingList']) {
            test(`requires the "${missing}" consent`, async ({ page }) => {
                await fillText(page);
                await acceptAllConsents(page);
                await toggle(page, missing); // untick it
                await submit(page);

                await expectInlineError(page, missing, k('validation-consent'));
                expect(payloads).toHaveLength(0);
            });
        }

        test('rejects a whitespace-only required field', async ({ page }) => {
            await fillText(page);
            await page.fill('#institution', '   ');
            await acceptAllConsents(page);
            await submit(page);

            await expectInlineError(page, 'institution', k('validation-required'));
            expect(payloads).toHaveLength(0);
        });
    });

    test.describe(`PhD club form server errors [${lang}]`, () => {
        const submitValid = async (page: Page) => {
            await fillText(page);
            await acceptAllConsents(page);
            await submit(page);
        };

        test('shows the invalid-email error when the API rejects the address', async ({ page }) => {
            await mockApi(page, '/api/phd-club', fulfillJson(400, { error: 'Invalid email address', code: 'invalid_email' }));
            await page.goto(url);
            await submitValid(page);

            await expect(errorOf(page, 'email')).toHaveText(k('validation-email'));
            await expect(page.locator('#error-message')).toBeVisible();
        });

        test('shows the rate-limit message on HTTP 429', async ({ page }) => {
            await mockApi(page, '/api/phd-club', fulfillJson(429, { error: 'slow down', retry_after: 15 }));
            await page.goto(url);
            await submitValid(page);

            await expect(page.locator('#error-details')).toHaveText(k('error-cooldown').replace('{seconds}', '15'));
        });

        test('shows the server error message on HTTP 500', async ({ page }) => {
            await mockApi(page, '/api/phd-club', fulfillJson(500, { error: 'Boom' }));
            await page.goto(url);
            await submitValid(page);

            await expect(page.locator('#error-details')).toHaveText('Boom');
            await expect(page.locator('#success-message')).toBeHidden();
            await expect(page.locator('#submit-button')).toBeEnabled();
        });

        test('blocks a second submission during the client cooldown', async ({ page }) => {
            const payloads = await mockApi(page, '/api/phd-club');
            await page.goto(url);
            await submitValid(page);
            await expect(page.locator('#success-message')).toBeVisible();

            await page.reload();
            await submitValid(page);

            await expect(page.locator('#error-message')).toBeVisible();
            expect(payloads).toHaveLength(1);
        });
    });
}

// ---------------------------------------------------------------------------
// Translated validation messages (the global submit handler must not override them)
// ---------------------------------------------------------------------------
test.describe('Translated validation messages on submit', () => {
    for (const lang of LANGS) {
        test(`contact form [${lang}] shows the site's invalid-email / required messages`, async ({ page }) => {
            await page.goto(lang === 'en' ? '/en/contact-us' : '/fr/nous-contacter');
            await page.fill('#email', 'plainaddress');
            await submit(page);

            await expect(errorOf(page, 'email')).toHaveText(tr(lang, 'contact.form.validation-email'));
            await expect(errorOf(page, 'name')).toHaveText(tr(lang, 'contact.form.validation-required'));
            await expect(errorOf(page, 'privacy')).toHaveText(tr(lang, 'contact.form.validation-privacy'));
        });

        test(`CT industriels form [${lang}] shows the site's invalid-email / required messages`, async ({ page }) => {
            await page.goto(lang === 'en' ? '/en/industrials-ec' : '/fr/ct-industriels');
            await page.fill('#email', 'plainaddress');
            await submit(page);

            await expect(errorOf(page, 'email')).toHaveText(tr(lang, 'ct-industriels.form.validation-email'));
            await expect(errorOf(page, 'name')).toHaveText(tr(lang, 'ct-industriels.form.validation-required'));
            await expect(errorOf(page, 'consentCtIndustriels')).toHaveText(tr(lang, 'ct-industriels.form.validation-consent'));
        });

        test(`PhD club form [${lang}] shows the site's invalid-email / required messages`, async ({ page }) => {
            await page.goto(lang === 'en' ? '/en/phd-club' : '/fr/club-des-doctorants');
            await page.fill('#email', 'plainaddress');
            await submit(page);

            await expect(errorOf(page, 'email')).toHaveText(tr(lang, 'phd-club.form.validation-email'));
            await expect(errorOf(page, 'firstName')).toHaveText(tr(lang, 'phd-club.form.validation-required'));
            await expect(errorOf(page, 'consentSupervisors')).toHaveText(tr(lang, 'phd-club.form.validation-consent'));
        });
    }
});
