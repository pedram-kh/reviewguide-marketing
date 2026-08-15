# design-reference/index.html

Self-contained static mockup the Stakeholder places here whenever the landing gets redesigned
(most recently ticket 6.5). It's the source of truth for the live page's markup/CSS/copy — see the
main `README.md`'s "Design source of truth" section for how it's used.

## Sanctioned divergences (intentionally NOT matched pixel-for-pixel)

Diffing the live site against this file should be exact everywhere **except** the points below.
These are deliberate, Stakeholder+PM-approved content corrections — do not "fix" the live site
back to match the reference on these specific points.

### Example-card star ratings (ticket 6.5a)

`index.html`'s two "Zobacz sam" example cards both hardcode:

```html
<div class="stars">★★★★★</div>
```

...regardless of the review's actual rating. Both of the real reviews used in those cards
(`components/demo-section.tsx`) are 2-star complaints, so showing 5 filled stars next to visibly
negative review text is misleading — ticket 6.5a asks the live site to render the review's *actual*
rating instead: `★★☆☆☆` (filled/empty stars per `rating`), using the same glyph convention the
reference itself already uses elsewhere for a 2-star card (the hero's floating "Marek K." review,
`<span class="stars" ...>★★☆☆☆</span>`).

Implementation: `components/demo-section.tsx`'s `stars(rating)` helper.

### Footer layout (footer redesign) — SIGNED OFF (PM, 2026-08-15)

`index.html`'s footer is a single centred row — logo, three section anchors + the contact address,
and a copyright — all coloured `var(--muted)`:

```html
<footer>
  <div class="wrap foot-inner">
    <a class="logo" href="#top">…</a>
    <div class="foot-links">…</div>
    <div class="foot-copy">© 2026 ReviewGuide</div>
  </div>
</footer>
```

That row predates the content ticket 6.6 then had to add to it (four legal documents, the cookie
settings control, and the statutory company/registration block), and appending them produced a flat
pile of a dozen near-identically styled small links. The live footer is therefore restructured into
labelled groups (Produkt / Kontakt / Dokumenty) plus a bottom bar for the registration data —
`components/site-footer.tsx`, styles under `globals.css`'s "footer" section.

Two accessibility/correctness points are folded into the same change, and are the part that
shouldn't be reverted to match the reference under any circumstances:

- **Contrast.** `var(--muted)` (`#7b8698`) is **3.68:1** on white, below WCAG AA's 4.5:1 for text at
  the 0.82–0.94rem sizes the footer uses. Everything in the footer is now `var(--ink-soft)`
  (7.53:1) or darker; `--muted` is untouched everywhere else on the site.
- **Dead anchors.** The reference is a single page, so its bare `href="#jak"` / `href="#top"` always
  resolve. The nav and footer also render on the seven legal routes, which mount no such ids — those
  links did nothing there. Both now build root-relative hrefs via `lib/en-landing.ts`'s
  `landingHref(lang)`, which still smooth-scrolls on the landing itself.

### Footer contact email (PM decision, ticket 6.6b)

`index.html` and its own footer markup (quoted above) both show `anna@reviewguide.eu`. The live
footer now shows **`contact@reviewguide.eu`** instead — PM decision for consistency with the legal
documents (`content/legal/{pl,en}/*.md`), which already name `contact@` as the official
privacy/complaints address. `anna@` is the outreach persona's own inbox (backend
`REPLY_ADDRESS`, `docs/LOGIC.md` §7b) and must not double as the site's public contact channel.
`index.html` is left showing `anna@` unchanged, per this file's own "keep the reference pristine"
convention.

### Brand mark (PM pre-sanctioned, ticket 6.7)

`index.html`'s nav/footer `.logo-mark` still draws the **old** mark inline:

```html
<span class="logo-mark">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.9 6.1 20.2l1.2-6.6L2.5 9l6.6-.9L12 2z" fill="currentColor"/></svg>
</span>
```

— a small 4-point sparkle glyph on a CSS-drawn gold gradient box. The live site now renders the
Stakeholder's new mark (`public/brand/icon-source.png`, a self-contained gold rounded-square icon
with an embossed 5-point star) everywhere the brand appears: nav/footer `.logo-mark`
(`components/logo.tsx`, now an `<img>` rather than a CSS box + inline SVG), all favicon/app-icon
sizes, the OG image, and both app-repo (`reviewguide-app`) surfaces that show a mark. Ticket 6.7
pre-sanctioned this as "brand-mark superseded" rather than a pixel-fidelity bug — `index.html` is
left showing the old mark unchanged, per this file's own "keep the reference pristine" convention.
Full inventory, the source-quality gate (dimensions/transparency), and the 16px/32px legibility
check are in `docs/PROGRESS.md`'s 6.7 row (backend repo).

## Non-divergences worth noting

`og-image.png` (in `public/`, not here) was re-themed in ticket 6.5a to match this reference's
light cream/gold palette — that's a brand-asset change, not a divergence from this HTML file
(the reference doesn't define an OG image at all).
