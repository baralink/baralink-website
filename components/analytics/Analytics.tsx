'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { Button } from '@/components/ui/Button';
import {
  CONSENT_OPEN_EVENT,
  GTM_ID,
  applyConsent,
  readConsent,
  storeConsent,
  subscribeToStore,
  track,
  type ConsentChoice,
} from '@/lib/analytics';

let gtmLoaded = false;

/** Tag Manager, once per page load, and only after "Accept". */
function loadTagManager() {
  if (gtmLoaded || !GTM_ID) return;
  gtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);
}

/**
 * One listener for the plan's three website events. A link opts in with
 * data-analytics="download_click" and its parameters as data-store, data-placement,
 * data-method or data-network — so the components only carry attributes.
 */
function onClick(event: MouseEvent) {
  const target = (event.target as Element | null)?.closest<HTMLElement>('[data-analytics]');
  if (!target) return;
  const name = target.dataset.analytics;
  if (name === 'download_click') {
    track(name, { store: target.dataset.store ?? '', placement: target.dataset.placement ?? '' });
  } else if (name === 'contact_click') {
    track(name, { method: target.dataset.method ?? '' });
  } else if (name === 'social_click') {
    track(name, { network: target.dataset.network ?? '' });
  }
}

export function Analytics() {
  const { t, href } = useI18n();
  // undefined while rendering on the server: the banner is decided in the browser only.
  const choice = useSyncExternalStore(subscribeToStore, readConsent, () => undefined);
  const [reopened, setReopened] = useState(false);
  const open = choice !== undefined && Boolean(GTM_ID) && (choice === null || reopened);

  useEffect(() => {
    if (choice === 'granted') {
      applyConsent('granted');
      loadTagManager();
    }
  }, [choice]);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const decide = useCallback((next: ConsentChoice) => {
    storeConsent(next);
    setReopened(false);
    if (next === 'denied' && gtmLoaded) {
      // Changed their mind on this page: Google's tags stop collecting at once.
      applyConsent('denied');
    }
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
      className="fixed inset-x-0 bottom-0 z-[60] bg-white px-5 py-4"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="t-ui max-w-[68ch] text-ink-soft">
          <p id="consent-title" className="font-semibold text-ink">
            {t.consent.title}
          </p>
          <p id="consent-body" className="mt-1">
            {t.consent.body}{' '}
            <Link href={href('/privacy#analytics')} className="font-medium text-primary underline underline-offset-2">
              {t.consent.privacyLink}
            </Link>
          </p>
        </div>
        {/* Equal buttons: refusing is as easy as accepting. */}
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" onClick={() => decide('denied')}>
            {t.consent.refuse}
          </Button>
          <Button variant="secondary" onClick={() => decide('granted')}>
            {t.consent.accept}
          </Button>
        </div>
      </div>
      {choice && (
        <p className="t-ui mx-auto mt-2 max-w-5xl text-ink-soft">
          {choice === 'granted' ? t.consent.currentlyAccepted : t.consent.currentlyRefused}
        </p>
      )}
    </div>
  );
}
