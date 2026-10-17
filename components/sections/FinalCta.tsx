'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { CallButton } from '@/components/ui/CallButton';

/** The page ends on the two actions that matter: get the app, or call. */
export function FinalCta() {
  const { t } = useI18n();
  return (
    <section aria-labelledby="final-title" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl bg-primary px-6 py-14 text-center text-white sm:px-12">
        <h2 id="final-title" className="text-3xl font-semibold sm:text-4xl">
          {t.final.title}
        </h2>
        <p className="max-w-xl text-lg leading-8 text-white/80">{t.final.body}</p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <StoreBadges placement="final" />
          <CallButton up />
        </div>
      </div>
    </section>
  );
}
