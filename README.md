# reviewguide-marketing

Public Polish-language marketing landing page for [ReviewGuide](https://github.com/pedram-kh/Review-AI)
(the `reviewpilot-backend` repo). Next.js 16 (App Router, TypeScript, Tailwind v4), built as a
**static export** and deployed on Netlify. Built per `docs/sprints/SPRINT_04.md` ticket 4.1 in the
backend repo — that repo's `/docs` folder is the single source of truth for product rules and
sprint status; this README only covers running/deploying *this* site.

## Design source of truth (ticket 6.5)

`design-reference/index.html` is a self-contained static mockup the Stakeholder places here when
the landing gets redesigned — inline CSS/JS, no build step, meant to be opened directly in a
browser. It is **not served**; it's committed purely so the live page's markup/CSS has something
exact to diff against. If you're changing `app/page.tsx` or `app/globals.css`, open
`design-reference/index.html` side by side first and check your diff doesn't drift from it —
spacing, colors, shadows and copy all come from that file, not from taste. The light
cream/gold/green palette, Plus Jakarta Sans, and the reveal-on-scroll fade are all ported from it
1:1 (see `app/globals.css`'s top comment for the exact list of mechanical differences, e.g. the
font loads via `next/font` instead of the reference's Google Fonts `<link>`).

**One sanctioned content divergence (ticket 6.5a) — see `design-reference/README.md`:** the
"Zobacz sam" example cards render each review's actual star rating instead of the reference's
hardcoded `★★★★★`. Don't "fix" this back when diffing against the reference.

## What's here (ticket 6.5 redesign; supersedes ticket 4.1's dark illuminated-hero version)

- `/` — single-page landing site, entirely in Polish:
  - **Hero** (`components/hero-section.tsx`) — light cream/gold hero with a real, visible `<h1>`
    (no hidden-behind-a-glow-effect duplicate — see the component's doc comment for why that
    matters, carried over from the old dark hero's text-ghosting bug), floating review→reply demo
    cards, a "ready" status pill and a "checks every 2h" ping badge.
  - **Jak to działa** — 3-step explainer.
  - **Zobacz sam** (`components/demo-section.tsx`) — 2 real review→response pairs from
    `docs/review/generation_batch_2026-08-05_v1.2.md` (restaurant name *and* address redacted —
    see the comment in that file). Wording is unchanged since ticket 4.1; only the surrounding
    visual style changed in 6.5. Star badges show the review's actual rating (both are 2-star
    complaints → ★★☆☆☆), a deliberate ticket-6.5a divergence from the reference's fixed ★★★★★ —
    see `design-reference/README.md`.
  - **Cennik** — 39 zł netto/mies. + VAT (ticket 6.6, part B — supersedes the 129 zł/mies.
    launch price, see `reviewpilot-backend/docs/ROADMAP.md`'s G3 revision row), "14 dni za
    darmo — karta wymagana, 0 zł przez okres próbny" — card-upfront trial per Stakeholder
    decision 2026-08-09.
  - **FAQ** — 4 questions, native `<details>`/`<summary>` accordion (no client JS needed); the
    card-upfront answer is kept byte-identical to `design-reference/index.html` (CR-1-correct).
  - **Final CTA** — new in 6.5, the closing band between FAQ and the footer.
  - Footer with nav anchors + `anna@reviewguide.eu` contact.
- Reveal-on-scroll (`components/reveal-on-scroll.tsx`) is a small client component using
  `IntersectionObserver` — a progressive enhancement only (content stays visible if JS never
  runs), and does nothing when `prefers-reduced-motion` is set (handled in CSS).
- CTA wiring: "Wypróbuj za darmo" / "Rozpocznij 14-dniowy okres próbny" → `${NEXT_PUBLIC_APP_URL}/signup`;
  "Zaloguj się" → `${NEXT_PUBLIC_APP_URL}/login`; "Zobacz, jak to działa" → `#jak`; nav links →
  section anchors (`#jak`, `#przyklady`, `#cennik`, `#faq`).
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
account `sideprojects`), pointed at this GitHub repo (`build_settings.repo_url` set via the Netlify
API) with the reviewguide-app-matching build config (`npm run build` → `out`). `NEXT_PUBLIC_APP_URL`
is set to the `reviewguide-app` Netlify URL (`https://dynamic-puppy-631956.netlify.app`) until
`reviewguide.eu` gets its own app subdomain.

- Live URL: **https://reviewguide-marketing.netlify.app**
- Admin: https://app.netlify.com/projects/reviewguide-marketing

**Push-to-deploy is NOT yet live — one Stakeholder action needed.** Triggering a build via the
Netlify API works (proven: an on-demand repo-sourced build reached `ready`/`production` and the
live site serves it), so the repo link itself is valid. But two subsequent pushes to `main` did
*not* auto-trigger a build — compared against `reviewguide-app`'s site record, that one has a set
of `github_app_commit_status`/`github_app_checks` hook rows that this new site is missing, meaning
Netlify's own PATCH-the-repo-field API sets enough metadata for an on-demand build but doesn't run
the full "connect repo" flow (deploy-key exchange + GitHub webhook subscription) that the Netlify
UI/`netlify init` normally performs. The likely root cause: the existing "Netlify" GitHub App
installation on `pedram-kh` is scoped to specific repos (confirmed indirectly — `gh api -X PUT
/user/installations/151598263/repositories/{repo_id}` was attempted and rejected with "You do not
have permission to modify this app", which needs a browser-authorized action, not a plain token) and
`reviewguide-marketing` was never added to it.

**Fix (one-time, ~1 minute):** go to
[github.com/settings/installations](https://github.com/settings/installations) → **Netlify** →
**Configure** → under "Repository access", add `pedram-kh/reviewguide-marketing` (or switch to
"All repositories" to cover future repos too) → **Save**. After that, a normal `git push` to `main`
should auto-deploy like it already does for `reviewguide-app`; no Netlify-side change needed once
the GitHub permission is granted. Until then, deploy with `netlify api createSiteBuild --data
'{"site_id":"7cd0b502-1332-4ee4-a887-18c29d168f35"}'` (or `netlify deploy --build --prod` from a
linked local checkout) after each push.

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

## Brand assets (ticket 4.6)

`public/brand/icon-source.png` (Stakeholder-provided, 975×1024, transparent bg) is the single
source of truth for the mark. `scripts/generate-brand-assets.cjs` derives everything else from it —
re-run with `node scripts/generate-brand-assets.cjs` any time `icon-source.png` changes:

- `public/favicon.ico` (16/32/48) — a **flat-silhouette** variant (dark bubble + solid amber star,
  hand-authored SVG in the script), not the photoreal source. At true 16px the photoreal metallic
  render turns into an illegible muddy blob (checked by rendering both at 16px and upscaling
  8x nearest-neighbor for review); the flat version reads clearly as a star. `public/brand/icon-flat-silhouette.png`
  keeps the 1024px flat master as a standalone asset.
- `public/icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180×180) — full-detail renders of
  `icon-source.png`, padded onto the landing's `#0A0806` background (not left transparent —
  iOS fills transparent apple-touch-icons with white, which would look wrong against the dark UI).
- `public/og-image.png` (1200×630) — **re-themed in ticket 6.5a** to match the light cream/gold
  landing: cream gradient background, the same gold-gradient `.logo-mark` sparkle mark and
  "ReviewGuide" wordmark as the live nav, set in Plus Jakarta Sans (bundled as TTF under
  `scripts/fonts/`, see that folder's README — `next/font/google` only produces hashed woff2 for
  browser use, not a plain-path TTF a Node script can read). Rendered via `next/og`'s
  `ImageResponse` (Satori), same technique as before, just re-themed. Favicon/`icon-*.png`/
  `apple-touch-icon.png` intentionally still pad onto the **original** `#0A0806` dark background —
  ticket 6.5a only asked to re-theme the OG image, not the app icons.

All wired via the Next.js Metadata API in `app/layout.tsx` (`icons`, `openGraph.images`,
`twitter.images`) rather than the old `app/icon.tsx`/`app/opengraph-image.tsx` file-convention
placeholders (removed — they only ever rendered a generic "R" glyph since no real mark existed yet).
The same generated set is copied into `reviewguide-app/public/brand/` so `/signup`, `/login`, and
`/app` share the identical favicon/apple-touch-icon.

**Ticket 6.5 → 6.5a history:** ticket 6.5 explicitly said "preserve OG tags + favicon", so
`og-image.png` was carried over unchanged with its old `#0A0806` dark background — disclosed at
the time as sitting oddly against the new light-cream page it advertises when shared on social.
PM/Stakeholder follow-up ticket 6.5a asked for exactly that regeneration; done above. Favicon and
app icons were out of scope for 6.5a and remain the original dark-background renders.

## Relationship to the other two repos

This site has zero runtime dependency on the backend or the app — it's static marketing content.
Its only integration point is the CTA `href`s pointing at `reviewguide-app`'s `/signup` (ticket
4.2). See the backend repo's `docs/sprints/SPRINT_04.md` for the full Sprint 4 picture (auth,
billing, hardening) this landing page is the front door for.
