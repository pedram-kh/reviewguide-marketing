# ReviewGuide — Legal documents: implementation note for the developer

**Audience:** front-end / full-stack developer implementing reviewguide.eu
**Goal:** publish the legal documents correctly and wire up the consent/compliance flows they assume.

The documents live as Markdown in this package (`PL/` and `EN/`). The **Polish version is the legally binding one**; English is a convenience translation. Render both and let the user switch language.

---

## 1. Pages to publish

Create dedicated, permanently reachable pages. Suggested routes (keep PL and EN in sync via your i18n setup):

| Document | PL route | EN route |
|---|---|---|
| Terms of Service | `/regulamin` | `/terms` |
| Privacy Policy | `/polityka-prywatnosci` | `/privacy-policy` |
| Cookie Policy | `/cookies` | `/cookie-policy` |
| Data Processing Agreement (DPA) | `/dpa` | `/dpa` (or `/data-processing-agreement`) |

**Footer:** link to Terms, Privacy Policy, Cookie Policy and DPA from the global footer on every page. Also link Terms + Privacy from the sign-up screen and from the Stripe checkout step.

**Rendering:** convert Markdown → HTML at build time (e.g. MDX / a Markdown loader), or paste into your CMS. Preserve the tables (pricing/cookies/sub-processors are tables). Keep a visible "Effective date" and "Version" at the top of each page.

**Do not** put these pages behind auth or `noindex` — Terms/Privacy/Cookies should be publicly crawlable. The DPA can be public too.

---

## 2. Sign-up flow — consent checkboxes

On the registration form implement **separate, unticked** checkboxes (no pre-checking, no bundling):

1. **[required]** "I accept the [Terms of Service] and [Privacy Policy]." — blocks sign-up until ticked.
2. **[optional]** "I want to receive marketing information (newsletter) by e‑mail." — separate, voluntary; drives marketing-email eligibility.

Store, per user: which checkbox was ticked, timestamp, and the **document version** accepted (see §6). This is your proof of consent.

The **DPA** (Annex 2 to the Terms) is concluded automatically when the customer accepts the Terms — no separate checkbox needed, but the DPA page must be linked and accessible.

---

## 3. Digital-service consent (loss of withdrawal right)

Because the paid service starts immediately (and there is a card-based trial), for customers who qualify as consumers / sole traders treated as consumers you must capture, at the moment they start the paid service or trial:

- **[required checkbox]** "I request that the service start immediately and I acknowledge that once the service is fully performed I lose the right to withdraw from the contract."

This corresponds to Terms § 8. Log it with timestamp + version, same as §2. (For pure B2B customers this is not strictly required, but showing it to everyone is simpler and safe.)

---

## 4. Cookie banner / consent management

The Cookie Policy assumes a real consent mechanism:

- **Essential cookies** (session/auth, consent-choice cookie, Stripe `__stripe_mid` / `__stripe_sid`) may load without consent.
- **Analytics (Google Analytics 4 `_ga`)** must load **only after** the user grants consent. Default state = denied.
- Provide **Accept / Reject / Settings** with equivalent prominence (reject must be as easy as accept).
- Persist the choice and let the user change/withdraw it later (a "Cookie settings" link in the footer).
- Recommended: Google **Consent Mode v2** (set `analytics_storage` / `ad_storage` to `denied` by default, update on consent). A CMP (e.g. Cookiebot, Osano, Iubenda, or your own) is fine.

If you later add Meta Pixel / Google Ads, add a "marketing" category — the Cookie Policy already lists it as conditional.

---

## 5. Pricing & Stripe

- The **price is not hard-coded** in the Terms by design. Show the current price (launch: **PLN 39 net / month + VAT**) on the pricing page and inside **Stripe Checkout** before confirmation.
- Prices are **net**; display VAT and the **gross amount payable** at checkout. Use Stripe Tax or configure VAT so the gross total is shown before the customer confirms.
- **14-day trial, card required, 0 PLN during trial**, auto-converts to a paid monthly subscription (Stripe subscription with `trial_period_days: 14`). Recurring monthly charges until cancelled.
- **Cancellation** must be self-service from the account (Stripe Billing customer portal is the easiest route) — Terms § 9 promises "cancel anytime".
- **Price changes:** the Terms require **≥ 1 month prior notice** by e‑mail/in-app; the new price applies from the next billing period. Build an admin path to notify users before changing Stripe prices.
- **Invoices** are electronic — enable Stripe invoicing / send invoice e‑mails.
- Never store full card data yourself — Stripe handles it (the documents state this).

---

## 6. Versioning & change management

- Keep each document under version control with a **version number + effective date** (already in the files: v1.0, 2026‑08‑11).
- When you materially change the Terms, the Terms require **≥ 14 days notice** to users (e‑mail or in-app) before they take effect. Build a mechanism to (a) notify and (b) re-request acceptance on next login for the new version.
- Record which version each user accepted and when.

---

## 7. Placeholder / accuracy check before go-live

The vendor lists in the Privacy Policy (§5) and DPA (§5) enumerate **categories + typical providers**. This wording is legally safe, but please confirm it matches the real stack and trim/add as needed. Concretely, verify which of these you actually use: hosting (AWS / Google Cloud / Vercel), AI provider(s) (OpenAI / Anthropic / Google), transactional e‑mail (SES / SendGrid / Postmark / Brevo / Mailchimp), analytics (GA4), support tool (Intercom / Crisp / HubSpot). Remove any you don't use; add any you do.

The contact address `contact@reviewguide.eu` is used across all documents — make sure the mailbox exists and is monitored (privacy requests and complaints come here).

---

## 8. Quick checklist

- [ ] 4 documents published (PL + EN), linked in footer, indexable
- [ ] Sign-up: required Terms+Privacy checkbox + optional marketing checkbox, versioned + timestamped
- [ ] Immediate-start / withdrawal-waiver checkbox on paid start/trial
- [ ] Cookie banner with Accept/Reject/Settings; GA4 loads only after consent; withdrawable
- [ ] Stripe: price shown pre-confirm, net+VAT gross shown, 14-day trial, self-serve cancel, e‑invoices
- [ ] Price-change (≥1 month) and Terms-change (≥14 days) notification paths
- [ ] Vendor lists confirmed against real stack; contact@reviewguide.eu mailbox live
