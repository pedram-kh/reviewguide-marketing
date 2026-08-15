"use client";

import { useEffect } from "react";
import { announceLang, type SiteLang } from "@/lib/site-lang";

/**
 * Ticket 6.6, part E — the root `<html lang="pl">` in app/layout.tsx is shared by every route
 * (this site has a single root layout, not per-locale route groups), so every EN-rendering page
 * corrects it client-side on mount and restores the previous value on unmount (client-side `<a>`
 * navigations back to a PL route don't remount the root layout, only the page subtree). A
 * one-frame mismatch before hydration is an acceptable trade-off given the rest of the site's
 * single-root-layout structure.
 *
 * Broadcasts via lib/site-lang.ts rather than mutating `document.documentElement.lang` directly:
 * the cookie banner (components/cookie-consent-banner.tsx) is mounted once in that same root
 * layout with no route-specific `lang` prop of its own, and needs to react to this same signal to
 * render in the right language (ticket 6.6a follow-up — it was rendering Polish on every EN page).
 */
export function SetHtmlLang({ lang }: { lang: SiteLang }) {
  useEffect(() => {
    const previous = document.documentElement.lang as SiteLang;
    announceLang(lang);
    return () => {
      announceLang(previous);
    };
  }, [lang]);

  return null;
}
