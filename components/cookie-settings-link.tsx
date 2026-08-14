"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/lib/cookie-consent";

/**
 * Ticket 6.6, parts A + D — the footer's "Ustawienia cookies" link, shared by every page.
 *
 * Dispatches a DOM CustomEvent rather than importing the banner's own open-state setter directly:
 * the footer is mounted on every page (including the legal pages, which are plain server
 * components), while <CookieConsentBanner> is mounted once in the root layout — a same-window
 * event is the simplest way to reach across that boundary without prop-drilling a client-only
 * callback through server components.
 */
export function CookieSettingsLink({ label = "Ustawienia cookies" }: { label?: string }) {
  return (
    <button
      type="button"
      className="foot-legal-link-btn"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      {label}
    </button>
  );
}
