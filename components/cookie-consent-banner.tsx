"use client";

import { useEffect, useState } from "react";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  readConsentCookie,
  writeConsentCookie,
  type ConsentState,
} from "@/lib/cookie-consent";

type View = "hidden" | "banner" | "settings";

/**
 * Ticket 6.6, part D — first-visit consent banner with Accept / Reject / Settings at equal
 * prominence (same size/weight buttons — "reject must be as easy as accept"), reopenable from
 * the footer's "Ustawienia cookies" link at any time (even after a decision was already made).
 *
 * Only Essential vs. Analytics are offered — Functional/Marketing stay unlisted per the Cookie
 * Policy (content/legal/{pl,en}/3-polityka-cookies.md § 3), which documents them as "used only
 * once implemented"; offering a toggle for a category with nothing behind it would be
 * misleading, not extra safety.
 */
export function CookieConsentBanner() {
  const [view, setView] = useState<View>("hidden");
  const [analyticsChoice, setAnalyticsChoice] = useState(false);

  useEffect(() => {
    const existing = readConsentCookie();
    if (existing) {
      setAnalyticsChoice(existing.analytics);
    } else {
      setView("banner");
    }

    function reopen() {
      setAnalyticsChoice(readConsentCookie()?.analytics ?? false);
      setView("settings");
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  function decide(analytics: boolean): ConsentState {
    const state = writeConsentCookie(analytics);
    setAnalyticsChoice(analytics);
    setView("hidden");
    return state;
  }

  if (view === "hidden") return null;

  return (
    <div className="cookie-overlay" role="dialog" aria-modal="false" aria-label="Ustawienia plików cookie">
      <div className="cookie-banner">
        {view === "banner" ? (
          <>
            <p className="cookie-banner-text">
              Używamy niezbędnych plików cookies do działania Serwisu oraz — za Twoją zgodą —
              plików analitycznych, które pomagają nam go ulepszać. Szczegóły w{" "}
              <a href="/cookies">Polityce Cookies</a>.
            </p>
            <div className="cookie-banner-actions">
              <button type="button" className="btn btn-ghost" onClick={() => decide(false)}>
                Odrzuć
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setView("settings")}>
                Ustawienia
              </button>
              <button type="button" className="btn btn-primary" onClick={() => decide(true)}>
                Akceptuj
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="cookie-banner-text">Wybierz, które pliki cookies mogą być używane w Serwisie.</p>
            <div className="cookie-settings-rows">
              <div className="cookie-settings-row">
                <div>
                  <div className="cookie-settings-row-title">Niezbędne</div>
                  <div className="cookie-settings-row-desc">
                    Wymagane do działania logowania, płatności i zapamiętania Twojej decyzji o
                    zgodach. Zawsze aktywne.
                  </div>
                </div>
                <input type="checkbox" checked disabled aria-label="Niezbędne (zawsze aktywne)" />
              </div>
              <div className="cookie-settings-row">
                <div>
                  <div className="cookie-settings-row-title">Analityczne (Google Analytics 4)</div>
                  <div className="cookie-settings-row-desc">
                    Pomagają nam analizować ruch i ulepszać Serwis. Ładowane wyłącznie po Twojej
                    zgodzie.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsChoice}
                  onChange={(event) => setAnalyticsChoice(event.target.checked)}
                  aria-label="Analityczne"
                />
              </div>
            </div>
            <div className="cookie-banner-actions">
              <button type="button" className="btn btn-ghost" onClick={() => decide(false)}>
                Odrzuć wszystkie
              </button>
              <button type="button" className="btn btn-primary" onClick={() => decide(analyticsChoice)}>
                Zapisz wybór
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
