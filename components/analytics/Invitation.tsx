'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import {
  invitationSnapshot,
  parseInvitation,
  readInvitation,
  storeHref,
  subscribeToStore,
} from '@/lib/analytics';

/**
 * A visitor who came through a campaign link (go.baralink.org/AMB7WK → baralink.org/?blc=AMB7WK)
 * sees the code to type in the app's sign-up (analytics plan §5.2). Store buttons marked with
 * data-store get the campaign values (Google Play keeps them in `referrer` for the app).
 */
export function Invitation() {
  const { t } = useI18n();
  const snapshot = useSyncExternalStore(subscribeToStore, invitationSnapshot, () => null);
  const invitation = parseInvitation(snapshot);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const found = readInvitation(window.location.search);
    document.querySelectorAll<HTMLAnchorElement>('a[data-store="play"], a[data-store="app_store"]').forEach((anchor) => {
      const href = storeHref(anchor.dataset.store === 'play' ? 'play' : 'app_store', found);
      if (href !== '#download') anchor.href = href;
    });
  }, []);

  if (!invitation || hidden) return null;
  return (
    <div role="status" className="bg-accent text-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 text-sm sm:px-6 lg:px-8">
        <p>
          {t.invitation.yourCode}{' '}
          <strong className="rounded bg-white/70 px-2 py-0.5 font-mono tracking-widest">{invitation.code}</strong>{' '}
          — {t.invitation.enterIt}
        </p>
        <button
          type="button"
          onClick={() => setHidden(true)}
          aria-label={t.invitation.close}
          className="min-h-9 min-w-9 rounded-full text-lg leading-none transition hover:bg-white/50"
        >
          ×
        </button>
      </div>
    </div>
  );
}
