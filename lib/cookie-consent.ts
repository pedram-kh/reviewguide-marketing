/**
 * Ticket 6.6, part D — cookie-banner consent state, shared by the banner UI and the GA4 loader.
 *
 * Persisted as an actual cookie (not localStorage) so it matches what the Cookie Policy itself
 * discloses as an essential, no-consent-required cookie: "cookie zapisujące decyzję o zgodach"
 * (content/legal/{pl,en}/3-*.md, § 3's Essential row) — the choice-recording cookie is the one
 * piece of client storage this app is allowed to set before any consent is given.
 */

export const CONSENT_COOKIE_NAME = "reviewguide_consent";
export const CONSENT_VERSION = "1";
export const CONSENT_MAX_AGE_DAYS = 180;
export const CONSENT_CHANGE_EVENT = "reviewguide:consent-changed";
export const OPEN_COOKIE_SETTINGS_EVENT = "reviewguide:open-cookie-settings";

export interface ConsentState {
  analytics: boolean;
  version: string;
  timestamp: string;
}

export function readConsentCookie(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    if (typeof parsed?.analytics === "boolean") return parsed as ConsentState;
  } catch {
    // Malformed/legacy cookie value — treat as "no decision yet" and let the banner re-ask.
  }
  return null;
}

export function writeConsentCookie(analytics: boolean): ConsentState {
  const state: ConsentState = { analytics, version: CONSENT_VERSION, timestamp: new Date().toISOString() };
  if (typeof document !== "undefined") {
    const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(state))}; path=/; max-age=${maxAge}; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_CHANGE_EVENT, { detail: state }));
  }
  return state;
}
