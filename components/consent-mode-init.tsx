import { CONSENT_COOKIE_NAME } from "@/lib/cookie-consent";

/**
 * Ticket 6.6, part D — Google Consent Mode v2 bootstrap.
 *
 * Rendered as a literal inline `<script>` (not a "use client" component) so it executes
 * synchronously while the `<head>` is parsed — before React hydrates and, crucially, before any
 * gtag.js tag could load (see components/ga4-loader.tsx) — which is what Consent Mode v2 assumes
 * ("set defaults before any tags fire"). It duplicates the tiny cookie-read from lib/cookie-consent
 * in plain JS rather than importing that module, since a build-time bundle import can't be
 * guaranteed to execute ahead of a separately-tagged analytics script.
 *
 * Defaults every signal to "denied" — including ad_storage/ad_user_data/ad_personalization,
 * which this site has no use for today but which Consent Mode v2 expects a stance on — then, if
 * a prior consent cookie already grants analytics (returning visitor), immediately updates
 * analytics_storage to "granted" so there's no denied-then-granted flash.
 */
export function ConsentModeInit() {
  const script = `
(function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });
  try {
    var match = document.cookie.match(/(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)/);
    if (match) {
      var state = JSON.parse(decodeURIComponent(match[1]));
      if (state && state.analytics === true) {
        gtag('consent', 'update', { 'analytics_storage': 'granted' });
      }
    }
  } catch (e) {}
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
