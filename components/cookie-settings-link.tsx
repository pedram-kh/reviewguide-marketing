"use client";

import { CookieIcon } from "@/components/icons";
import { OPEN_COOKIE_SETTINGS_EVENT } from "@/lib/cookie-consent";

/**
 * Ticket 6.6, parts A + D — the footer's "Ustawienia cookies" control, shared by every page.
 *
 * Dispatches a DOM CustomEvent rather than importing the banner's own open-state setter directly:
 * the footer is mounted on every page (including the legal pages, which are plain server
 * components), while <CookieConsentBanner> is mounted once in the root layout — a same-window
 * event is the simplest way to reach across that boundary without prop-drilling a client-only
 * callback through server components.
 *
 * Styled as a pill rather than a bare text link because it opens a dialog instead of navigating,
 * which a link's appearance would misrepresent.
 */
export function CookieSettingsLink({ label = "Ustawienia cookies" }: { label?: string }) {
  return (
    <button
      type="button"
      className="foot-cookie-btn"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      <CookieIcon size={15} />
      {label}
    </button>
  );
}
