import { SparkleIcon } from "@/components/icons";

/**
 * Shared nav + footer wordmark, ported from the reference's repeated `.logo`/`.logo-mark` markup.
 *
 * `href` defaults to the landing's own hero anchor; callers on other routes pass a root-relative
 * one (see lib/en-landing.ts's landingHref) so the wordmark goes home rather than nowhere.
 */
export function Logo({ href = "#top" }: { href?: string }) {
  return (
    <a className="logo" href={href}>
      <span className="logo-mark">
        <SparkleIcon size={20} />
      </span>
      ReviewGuide
    </a>
  );
}
