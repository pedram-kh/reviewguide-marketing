import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.reviewguide.eu";

/**
 * Slim sticky top bar — not explicitly listed in ticket 4.1's section list, but a single-page
 * scroll layout with no way back to the top-of-hero CTA once scrolled past it seemed like an
 * omission worth disclosing rather than silently adding or silently skipping.
 */
export function SiteNav() {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold tracking-wide text-white">ReviewGuide</span>
        <Link
          href={`${APP_URL}/signup`}
          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-white/90"
        >
          Wypróbuj za darmo
        </Link>
      </nav>
    </div>
  );
}
