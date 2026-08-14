# Fonts used by `scripts/generate-brand-assets.cjs`

`PlusJakartaSans-700.ttf` and `PlusJakartaSans-500.ttf` are bundled here so the
og-image.png regeneration (ticket 6.5a) is reproducible offline, the same way
the old Geist-based version relied on the TTF bundled inside
`next/dist/compiled/@vercel/og/`. `next/font/google` (used by the live site in
`app/layout.tsx`) only produces hashed woff2 files for browser `<link>`/CSS
use, not a plain TTF path a Node script can read — so these were fetched
directly from Google Fonts' CSS2 API once, with an old-browser `User-Agent` to
get the `.ttf` (not `.woff2`) source:

```bash
curl -s -A "Mozilla/4.0" "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700"
# → follow the two src: url(...) links, save as PlusJakartaSans-500.ttf / -700.ttf
```

If Plus Jakarta Sans ever changes (different weights needed, etc.), re-run
that and replace the files here — `generate-brand-assets.cjs` just reads them
by filename, no other wiring needed.
