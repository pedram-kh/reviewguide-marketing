/**
 * Ticket 6.6, part E — the EN copy (hero/pricing/FAQ) must be pasted into the delivery report
 * and approved by the PM *before* `/en` goes live; the PL-side changes in the same ticket deploy
 * immediately. Rather than holding the whole `/en` implementation out of git, it ships dark
 * behind this flag (same env-gating pattern as `NEXT_PUBLIC_GA_MEASUREMENT_ID` in
 * components/ga4-loader.tsx): `app/en/page.tsx` 404s and the nav's PL→EN switch stays hidden
 * until Ops sets this to "true" on Netlify post-approval — no code changes needed to flip it on.
 */
export const EN_LANDING_ENABLED = process.env.NEXT_PUBLIC_EN_LANDING_ENABLED === "true";
