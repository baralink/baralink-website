'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { openConsentSettings } from '@/lib/analytics';

export function PrivacyContent() {
  const { t, href } = useI18n();
  const p = t.privacy;
  return (
    <article className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:p-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          BaraLink
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{p.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{p.updated}</p>
        <p className="mt-6 text-base leading-7 text-slate-700">{p.intro}</p>

        <div className="mt-10 space-y-8 border-t border-slate-100 pt-8">
          {p.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-slate-950">{section.title}</h2>
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
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8">
          <Link
            href={href('/')}
            className="inline-flex items-center gap-2 font-semibold text-primary transition hover:text-primary-dark"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {p.back}
          </Link>
        </div>
      </div>
    </article>
  );
}
