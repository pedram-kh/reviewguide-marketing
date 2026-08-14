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

## Non-divergences worth noting

`og-image.png` (in `public/`, not here) was re-themed in ticket 6.5a to match this reference's
light cream/gold palette — that's a brand-asset change, not a divergence from this HTML file
(the reference doesn't define an OG image at all).
