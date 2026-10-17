/**
 * Website analytics (BaraLink analytics plan, AN-5): Google Tag Manager with Consent Mode v2.
 *
 * Nothing reaches Google before the visitor chooses: Tag Manager itself is loaded only after
 * "Accept" (and on later visits while that choice stands). Without NEXT_PUBLIC_GTM_ID — local
 * development and Vercel previews — nothing is ever loaded.
 *
 * No personal data goes into an event: no names, numbers, emails or free text.
 */

export type ConsentChoice = 'granted' | 'denied';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? '';
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? '';
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? '';

const CONSENT_KEY = 'baralink-analytics-consent';
const INVITATION_KEY = 'baralink-invitation';
export const CONSENT_OPEN_EVENT = 'baralink:consent-open';
const STORE_CHANGE_EVENT = 'baralink:analytics-store';

type DataLayerEntry = Record<string, unknown> | IArguments;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function storeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* private mode: asked again next visit */
  }
  window.dispatchEvent(new Event(STORE_CHANGE_EVENT));
}

/** For useSyncExternalStore: the consent and the invitation are read from browser storage. */
export function subscribeToStore(onChange: () => void) {
  window.addEventListener(STORE_CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(STORE_CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

// The gtag() of Google's Consent Mode documentation: it must push its `arguments` object
// (an array is not read as a command), so the parameter is declared for the type only.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

/** Consent Mode v2: everything denied by default; analytics storage only on "Accept". No ad features. */
export function applyConsent(choice: ConsentChoice) {
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });
  gtag('consent', 'update', { analytics_storage: choice });
}

/** Send one of the plan's website events (§4.2). Ignored unless the visitor accepted. */
export function track(event: 'download_click' | 'contact_click' | 'social_click', params: Record<string, string>) {
  if (!GTM_ID || readConsent() !== 'granted') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

// ── Campaign links (go.baralink.org): the code to type in the app ────────────────────────

export type Invitation = { code: string; params: Record<string, string> };

const CODE = /^[A-Z0-9]{4,12}$/;
const KEPT_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'blc'];

/** The invitation kept for this visit, as stored (a string, so React can compare snapshots). */
export function invitationSnapshot(): string | null {
  try {
    return window.sessionStorage.getItem(INVITATION_KEY);
  } catch {
    return null;
  }
}

export function parseInvitation(snapshot: string | null): Invitation | null {
  if (!snapshot) return null;
  try {
    return JSON.parse(snapshot) as Invitation;
  } catch {
    return null;
  }
}

/** Read `?blc=…&utm_…` once and keep it for the visit, so the store buttons can carry it. */
export function readInvitation(search: string): Invitation | null {
  const query = new URLSearchParams(search);
  const code = (query.get('blc') || '').trim().toUpperCase();
  if (CODE.test(code)) {
    const params: Record<string, string> = {};
    for (const key of KEPT_PARAMS) {
      const value = query.get(key);
      if (value) params[key] = value.slice(0, 100);
    }
    params.blc = code;
    const invitation = { code, params };
    try {
      window.sessionStorage.setItem(INVITATION_KEY, JSON.stringify(invitation));
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(STORE_CHANGE_EVENT));
    return invitation;
  }
  try {
    const kept = window.sessionStorage.getItem(INVITATION_KEY);
    return kept ? (JSON.parse(kept) as Invitation) : null;
  } catch {
    return null;
  }
}

/** A store button's address: Google Play keeps the campaign values in `referrer` for the app. */
export function storeHref(store: 'play' | 'app_store', invitation: Invitation | null): string {
  if (store === 'play' && PLAY_STORE_URL) {
    if (!invitation) return PLAY_STORE_URL;
    const join = PLAY_STORE_URL.includes('?') ? '&' : '?';
    return `${PLAY_STORE_URL}${join}referrer=${encodeURIComponent(new URLSearchParams(invitation.params).toString())}`;
  }
  if (store === 'app_store' && APP_STORE_URL) return APP_STORE_URL;
  return '#download';
}
