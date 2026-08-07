# reviewguide-marketing

Public Polish-language marketing landing page for [ReviewGuide](https://github.com/pedram-kh/Review-AI)
(the `reviewpilot-backend` repo). Next.js 16 (App Router, TypeScript, Tailwind v4), built as a
**static export** and deployed on Netlify. Built per `docs/sprints/SPRINT_04.md` ticket 4.1 in the
backend repo — that repo's `/docs` folder is the single source of truth for product rules and
sprint status; this README only covers running/deploying *this* site.

## What's here (ticket 4.1 scope)

- `/` — single-page landing site, entirely in Polish:
  - **Hero** — dark illuminated-glow hero (`components/ui/illuminated-hero.tsx`, shadcn-style
    `components/ui/` convention + `lib/utils.ts`'s `cn()`), adapted from the Stakeholder-provided
    reference component with Polish copy, a real `<h1>` for a11y/SEO behind the decorative
    `aria-hidden` glow text, a CTA pair, and a `prefers-reduced-motion` + `<768px` fallback that
    swaps the SVG glow filter (and the text-duplicating fade-in effect) for a plain text-shadow.
  - **Jak to działa** — 3-step explainer.
  - **Zobacz sam** — 2 real review→response pairs from
    `docs/review/generation_batch_2026-08-05_v1.2.md` (restaurant name *and* address redacted —
    see the comment in `components/demo-section.tsx`).
  - **Cennik** — 129 zł/mies., 14 dni za darmo, bez karty.
  - **FAQ** — 4 questions, native `<details>`/`<summary>` accordion (no client JS needed).
  - Footer with `anna@reviewguide.eu` contact.
- All CTAs link to `${NEXT_PUBLIC_APP_URL}/signup` — that page doesn't exist yet (`reviewguide-app`
  ticket 4.2 builds it), so the link is a stub per the ticket's own "(stub ok)".
- No backend calls, no auth, no server code at all — this is a fully static site
  (`next.config.ts`: `output: "export"`).

## Environment variables

| Var | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | public, inlined at build time | Base URL of the `reviewguide-app` deployment; every CTA links to `${NEXT_PUBLIC_APP_URL}/signup` |

There are no secrets in this repo — `NEXT_PUBLIC_APP_URL` is meant to be public (it's just the
app's own public URL), which is why it's safe to inline into the static build.

Copy `.env.example` to `.env.local` for local dev and fill in a real value.

## Local development

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_APP_URL
npm run dev                  # http://localhost:3000
```

## Production build (static export)

```bash
npm run build   # outputs to ./out
npx serve out   # preview the static export locally
```

## Deployed (live)

Done as of 2026-08-07: Netlify site `reviewguide-marketing` (id `7cd0b502-1332-4ee4-a887-18c29d168f35`,
account `sideprojects`), linked to this GitHub repo for continuous deployment (every push to `main`
builds + deploys to production — verified live, not just configured, by triggering and watching an
actual repo-sourced build reach `ready`/`production`). `NEXT_PUBLIC_APP_URL` is set to the
`reviewguide-app` Netlify URL (`https://dynamic-puppy-631956.netlify.app`) until `reviewguide.eu`
gets its own app subdomain.

- Live URL: **https://reviewguide-marketing.netlify.app**
- Admin: https://app.netlify.com/projects/reviewguide-marketing

## Connecting the `reviewguide.eu` domain (Stakeholder action — GoDaddy only)

The domain is already registered on the Netlify site (`custom_domain: reviewguide.eu`,
`domain_aliases: ["www.reviewguide.eu"]`) — the only remaining step is pointing GoDaddy's DNS at
Netlify. GoDaddy doesn't support ALIAS/ANAME/flattened-CNAME records on an apex domain, so use the
A-record fallback:

| Type | Host/Name | Value | Notes |
|---|---|---|---|
| A | `@` (or blank, per GoDaddy's UI) | `75.2.60.5` | Netlify's standard-edge load balancer IP. Remove GoDaddy's default parking-page `A`/`CNAME`/forwarding records for `@` first — multiple `A` records on the apex will break certificate issuance. |
| CNAME | `www` | `reviewguide-marketing.netlify.app` | |

Also delete any leftover `AAAA` (IPv6) records on `@` — Netlify's load balancer doesn't support
IPv6, and a stray `AAAA` will fail cert provisioning even with the `A` record correct.

Steps:
1. GoDaddy → `reviewguide.eu` → **DNS Management** → add/edit the two records above.
2. Wait for propagation (GoDaddy's default TTLs can take longer than the DNS-standard minutes;
   check with `dig reviewguide.eu` / `dig www.reviewguide.eu` or dnschecker.org).
3. Netlify auto-detects the correct DNS and auto-provisions a free SSL certificate — no action
   needed on the Netlify side once DNS resolves correctly. Check
   https://app.netlify.com/projects/reviewguide-marketing/domain-management for a green check.
4. Once `reviewguide.eu` is live, update `NEXT_PUBLIC_APP_URL` if the app also moves to a
   `reviewguide.eu` subdomain (e.g. `app.reviewguide.eu`), and redeploy.

Note: `mail.reviewguide.eu` (Postmark's sending domain, ticket 4.2) uses separate DNS records
(DKIM + Return-Path TXT/CNAME) in the same GoDaddy zone — the two are independent and won't
conflict, since one is the apex/www host and the other is the `mail.` subdomain.

## Relationship to the other two repos

This site has zero runtime dependency on the backend or the app — it's static marketing content.
Its only integration point is the CTA `href`s pointing at `reviewguide-app`'s `/signup` (ticket
4.2). See the backend repo's `docs/sprints/SPRINT_04.md` for the full Sprint 4 picture (auth,
billing, hardening) this landing page is the front door for.
