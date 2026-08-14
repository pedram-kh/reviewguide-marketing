"use client";

import { useEffect } from "react";

/**
 * Ticket 6.6, part E — the root `<html lang="pl">` in app/layout.tsx is shared by every route
 * (this site has a single root layout, not per-locale route groups), so `/en` corrects it
 * client-side on mount and restores "pl" on unmount (client-side `<a>` navigations back to a PL
 * route don't remount the root layout, only the page subtree). A one-frame mismatch before
 * hydration is an acceptable trade-off given the rest of the site's single-root-layout structure.
 */
export function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);

  return null;
}
