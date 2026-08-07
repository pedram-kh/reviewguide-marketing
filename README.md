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

## Deploying to Netlify

1. Create a Netlify site linked to this GitHub repo (`pedram-kh/reviewguide-marketing`).
2. Site settings → Environment variables → add `NEXT_PUBLIC_APP_URL` (the live `reviewguide-app`
   URL, e.g. `https://dynamic-puppy-631956.netlify.app` until `reviewguide.eu`'s own app subdomain
   exists).
3. Build command `npm run build`, publish directory `out` (see `netlify.toml` — no
   `@netlify/plugin-nextjs` needed here, unlike `reviewguide-app`, since there's no SSR/middleware
   surface to run at the edge).
4. Deploy. The site should be reachable at the Netlify-assigned `*.netlify.app` URL immediately.

## Connecting the `reviewguide.eu` domain (Stakeholder action)

The domain is registered in GoDaddy. To point it at this Netlify site:

1. In the Netlify site dashboard: **Domain settings → Add a domain** → enter `reviewguide.eu`.
2. Netlify will show the exact DNS records to add (an apex `A`/`ALIAS` record for `reviewguide.eu`
   itself, and usually a `CNAME` for `www`). **Use the values Netlify shows you at the time**, not
   ones copied from an old guide — Netlify's load-balancer IPs can change.
3. In GoDaddy: **DNS Management** for `reviewguide.eu` → add/edit those records to match exactly
   what Netlify displayed. Remove any existing GoDaddy "parking page" `A`/`CNAME` records for the
   same host first, or the new ones will conflict.
4. Wait for DNS propagation (usually minutes, can take longer with GoDaddy's default TTLs) —
   Netlify's domain settings page shows a green check once it verifies. Netlify auto-provisions a
   free SSL certificate once DNS resolves correctly.
5. Once `reviewguide.eu` is live, update `NEXT_PUBLIC_APP_URL` if the app also moves to a
   `reviewguide.eu` subdomain (e.g. `app.reviewguide.eu`), and redeploy.

Note: `mail.reviewguide.eu` (Postmark's sending domain, ticket 4.2) uses separate DNS records
(DKIM + Return-Path TXT/CNAME) in the same GoDaddy zone — the two are independent and won't
conflict, since one is the apex/www host and the other is the `mail.` subdomain.

## Relationship to the other two repos

This site has zero runtime dependency on the backend or the app — it's static marketing content.
Its only integration point is the CTA `href`s pointing at `reviewguide-app`'s `/signup` (ticket
4.2). See the backend repo's `docs/sprints/SPRINT_04.md` for the full Sprint 4 picture (auth,
billing, hardening) this landing page is the front door for.
