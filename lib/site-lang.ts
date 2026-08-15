export const SITE_LANG_CHANGE_EVENT = "reviewguide:lang-changed";

export type SiteLang = "pl" | "en";

/**
 * Sets `<html lang>` and broadcasts the change so any client component mounted outside the page
 * subtree (e.g. the cookie banner, mounted once in the root layout — see components/set-html-lang.tsx
 * for why this site corrects `<html lang>` per-page rather than per-route-group) can react to the
 * *current* page language without prop-drilling through the server-rendered root layout.
 */
export function announceLang(lang: SiteLang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent<SiteLang>(SITE_LANG_CHANGE_EVENT, { detail: lang }));
}

export function currentLang(): SiteLang {
  if (typeof document === "undefined") return "pl";
  return document.documentElement.lang === "en" ? "en" : "pl";
}
