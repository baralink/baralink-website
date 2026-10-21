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
    <div role="status" className="bg-accent text-ink">
      <div className="shell flex items-center justify-between gap-4 py-3">
        <p className="t-ui">
          {t.invitation.yourCode}{' '}
          <strong className="rounded-lg bg-white/70 px-2.5 py-0.5 tracking-[0.18em]">{invitation.code}</strong>{' '}
          {t.invitation.enterIt}
        </p>
        <button
          type="button"
          onClick={() => setHidden(true)}
          aria-label={t.invitation.close}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl leading-none transition-colors duration-200 hover:bg-white/50"
        >
          ×
        </button>
      </div>
    </div>
  );
}
