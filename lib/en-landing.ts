/**
 * Ticket 6.6, part E — the EN copy (hero/pricing/FAQ) must be pasted into the delivery report
 * and approved by the PM *before* `/en` goes live; the PL-side changes in the same ticket deploy
 * immediately. Rather than holding the whole `/en` implementation out of git, it ships dark
 * behind this flag (same env-gating pattern as `NEXT_PUBLIC_GA_MEASUREMENT_ID` in
 * components/ga4-loader.tsx): `app/en/page.tsx` 404s and the nav's PL→EN switch stays hidden
 * until Ops sets this to "true" on Netlify post-approval — no code changes needed to flip it on.
 */
export const EN_LANDING_ENABLED = process.env.NEXT_PUBLIC_EN_LANDING_ENABLED === "true";

/**
 * Base path of the landing page for `lang`, for building root-relative section links
 * (`${landingHref("pl")}#cennik` → "/#cennik").
 *
 * Bare fragment hrefs ("#cennik") only work on the landing itself: the nav and footer also render
 * on the seven legal routes, which mount no such ids, so there the links did nothing at all. Going
 * root-relative fixes those without regressing the landing, where a URL differing only in its
 * fragment is still a same-document navigation and keeps smooth-scrolling.
 *
 * EN falls back to the PL landing while `/en` is gated off, matching components/legal-page.tsx's
 * breadcrumb: the EN legal pages are live independently of the EN landing.
 */
export function landingHref(lang: "pl" | "en"): "/" | "/en" {
  return lang === "en" && EN_LANDING_ENABLED ? "/en" : "/";
}
