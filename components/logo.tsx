/**
 * Shared nav + footer wordmark, ported from the reference's repeated `.logo`/`.logo-mark` markup.
 *
 * `href` defaults to the landing's own hero anchor; callers on other routes pass a root-relative
 * one (see lib/en-landing.ts's landingHref) so the wordmark goes home rather than nowhere.
 *
 * Ticket 6.7 — the mark itself is now `public/brand/mark.png` (the Stakeholder's gold-star icon),
 * not the CSS-drawn gradient box + inline SparkleIcon glyph this used to render. The image already
 * contains its own rounded shape, gradient, and shadow, so `.logo-mark` no longer draws any of
 * those itself (see globals.css) — it's just a sizing wrapper now.
 */
export function Logo({ href = "#top" }: { href?: string }) {
  return (
    <a className="logo" href={href}>
      <img className="logo-mark" src="/brand/mark.png" alt="" width={38} height={38} aria-hidden="true" />
      ReviewGuide
    </a>
  );
}
