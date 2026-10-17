'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { openConsentSettings } from '@/lib/analytics';

export function PrivacyContent() {
  const { t, href } = useI18n();
  const p = t.privacy;
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{p.title}</h1>
      <p className="mt-2 text-sm text-slate-500">{p.updated}</p>
      <p className="mt-6 text-base leading-7 text-slate-700">{p.intro}</p>
      {p.sections.map((section) => (
        <section key={section.id} id={section.id} className="mt-10 scroll-mt-28">
          <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-3 text-base leading-7 text-slate-700">
              {paragraph}
            </p>
          ))}
          {section.id === 'analytics' && (
            <button
              type="button"
              onClick={openConsentSettings}
              className="mt-4 min-h-11 rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
            >
              {t.footer.cookies}
            </button>
          )}
        </section>
      ))}
      <Link href={href('/')} className="mt-12 inline-block font-medium text-primary underline underline-offset-2">
        {p.back}
      </Link>
    </article>
  );
}
