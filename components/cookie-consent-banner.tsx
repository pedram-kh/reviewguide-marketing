"use client";

import { useEffect, useState } from "react";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  readConsentCookie,
  writeConsentCookie,
  type ConsentState,
} from "@/lib/cookie-consent";
import { currentLang, SITE_LANG_CHANGE_EVENT, type SiteLang } from "@/lib/site-lang";

type View = "hidden" | "banner" | "settings";

const COPY = {
  pl: {
    dialogLabel: "Ustawienia plików cookie",
    bannerTextPrefix:
      "Używamy niezbędnych plików cookies do działania Serwisu oraz — za Twoją zgodą — plików analitycznych, które pomagają nam go ulepszać. Szczegóły w ",
    policyLinkHref: "/cookies",
    policyLinkText: "Polityce Cookies",
    reject: "Odrzuć",
    settings: "Ustawienia",
    accept: "Akceptuj",
    settingsIntro: "Wybierz, które pliki cookies mogą być używane w Serwisie.",
    essentialTitle: "Niezbędne",
    essentialDesc:
      "Wymagane do działania logowania, płatności i zapamiętania Twojej decyzji o zgodach. Zawsze aktywne.",
    essentialAriaLabel: "Niezbędne (zawsze aktywne)",
    analyticsTitle: "Analityczne (Google Analytics 4)",
    analyticsDesc: "Pomagają nam analizować ruch i ulepszać Serwis. Ładowane wyłącznie po Twojej zgodzie.",
    analyticsAriaLabel: "Analityczne",
    rejectAll: "Odrzuć wszystkie",
    save: "Zapisz wybór",
  },
  en: {
    dialogLabel: "Cookie settings",
    bannerTextPrefix:
      "We use essential cookies to run the Service and — with your consent — analytics cookies that help us improve it. Details in the ",
    policyLinkHref: "/cookie-policy",
    policyLinkText: "Cookie Policy",
    reject: "Reject",
    settings: "Settings",
    accept: "Accept",
    settingsIntro: "Choose which cookies the Service may use.",
    essentialTitle: "Essential",
    essentialDesc:
      "Required for login, payments and remembering your consent choice to work. Always active.",
    essentialAriaLabel: "Essential (always active)",
    analyticsTitle: "Analytics (Google Analytics 4)",
    analyticsDesc: "Help us analyse traffic and improve the Service. Loaded only with your consent.",
    analyticsAriaLabel: "Analytics",
    rejectAll: "Reject all",
    save: "Save choice",
  },
} as const;

/**
 * Ticket 6.6, part D — first-visit consent banner with Accept / Reject / Settings at equal
 * prominence (same size/weight buttons — "reject must be as easy as accept"), reopenable from
 * the footer's "Ustawienia cookies" link at any time (even after a decision was already made).
 *
 * Only Essential vs. Analytics are offered — Functional/Marketing stay unlisted per the Cookie
 * Policy (content/legal/{pl,en}/3-polityka-cookies.md § 3), which documents them as "used only
 * once implemented"; offering a toggle for a category with nothing behind it would be
 * misleading, not extra safety.
 *
 * Ticket 6.6a follow-up — mounted once in the root layout (app/layout.tsx) alongside every route,
 * so it has no route-specific `lang` prop of its own; it previously rendered hardcoded Polish
 * everywhere, including on `/en`, `/terms`, `/privacy-policy`, `/cookie-policy` and the English
 * side of `/dpa`'s toggle. It now reads lib/site-lang.ts's shared signal (which every page/toggle
 * that sets `<html lang>` also broadcasts) and re-renders in that language.
 */
export function CookieConsentBanner() {
  const [view, setView] = useState<View>("hidden");
  const [analyticsChoice, setAnalyticsChoice] = useState(false);
  const [lang, setLang] = useState<SiteLang>("pl");

  useEffect(() => {
    const existing = readConsentCookie();
    if (existing) {
      setAnalyticsChoice(existing.analytics);
    } else {
      setView("banner");
    }
    setLang(currentLang());

    function reopen() {
      setAnalyticsChoice(readConsentCookie()?.analytics ?? false);
      setView("settings");
    }
    function onLangChange(event: Event) {
      setLang((event as CustomEvent<SiteLang>).detail);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    window.addEventListener(SITE_LANG_CHANGE_EVENT, onLangChange);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
      window.removeEventListener(SITE_LANG_CHANGE_EVENT, onLangChange);
    };
  }, []);

  const t = COPY[lang];

  function decide(analytics: boolean): ConsentState {
    const state = writeConsentCookie(analytics);
    setAnalyticsChoice(analytics);
    setView("hidden");
    return state;
  }

  if (view === "hidden") return null;

  return (
    <div className="cookie-overlay" role="dialog" aria-modal="false" aria-label={t.dialogLabel}>
      <div className="cookie-banner">
        {view === "banner" ? (
          <>
            <p className="cookie-banner-text">
              {t.bannerTextPrefix}
              <a href={t.policyLinkHref}>{t.policyLinkText}</a>.
            </p>
            <div className="cookie-banner-actions">
              <button type="button" className="btn btn-ghost" onClick={() => decide(false)}>
                {t.reject}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setView("settings")}>
                {t.settings}
              </button>
              <button type="button" className="btn btn-primary" onClick={() => decide(true)}>
                {t.accept}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="cookie-banner-text">{t.settingsIntro}</p>
            <div className="cookie-settings-rows">
              <div className="cookie-settings-row">
                <div>
                  <div className="cookie-settings-row-title">{t.essentialTitle}</div>
                  <div className="cookie-settings-row-desc">{t.essentialDesc}</div>
                </div>
                <input type="checkbox" checked disabled aria-label={t.essentialAriaLabel} />
              </div>
              <div className="cookie-settings-row">
                <div>
                  <div className="cookie-settings-row-title">{t.analyticsTitle}</div>
                  <div className="cookie-settings-row-desc">{t.analyticsDesc}</div>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsChoice}
                  onChange={(event) => setAnalyticsChoice(event.target.checked)}
                  aria-label={t.analyticsAriaLabel}
                />
              </div>
            </div>
            <div className="cookie-banner-actions">
              <button type="button" className="btn btn-ghost" onClick={() => decide(false)}>
                {t.rejectAll}
              </button>
              <button type="button" className="btn btn-primary" onClick={() => decide(analyticsChoice)}>
                {t.save}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
